
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";

// const GEMINI_MODEL = "gemini-3.8-flash";
const GEMINI_MODEL = "gemini-3.5-flash-lite";
const GEMINI_TIMEOUT_MS = 30000;

interface GeminiReplyOptions {
  apiKey: string;
  message: string;
  assistantName?: string;
  businessName?: string;
  businessType?: string;
  businessDescription?: string;
  tone?: string;
}

interface GeminiResponse {
  status?: string;
  error?: {
    message?: string;
    code?: number | string;
    status?: string;
  };
  steps?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
}

// Preserve upstream HTTP status so the controller can handle it.
export class GeminiApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "GeminiApiError";
  }
}

export const generateGeminiReply = async ({
  apiKey,
  message,
  assistantName = "Jarvish",
  businessName = "",
  businessType = "",
  businessDescription = "",
  tone = "friendly",
}: GeminiReplyOptions): Promise<string> => {
  // 1. Validate required inputs.
  if (typeof apiKey !== "string" || !apiKey.trim()) {
    throw new Error("Gemini API key is missing.");
  }

  if (typeof message !== "string" || !message.trim()) {
    throw new Error("Message cannot be empty.");
  }

  // 2. Build the assistant instructions.
  const systemInstruction = `
You are ${assistantName}, an AI website assistant.

Business name: ${businessName}
Business type: ${businessType}
Business description: ${businessDescription}
Communication tone: ${tone}.

Answer visitors clearly and helpfully.
Focus on the business and its services.
Do not invent business details.
If you do not know an answer, say so honestly.
Keep answers concise unless more detail is requested.
`;

  // 3. Call the Gemini Interactions API.
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey.trim(),
    },
    body: JSON.stringify({
      model: GEMINI_MODEL,
      input: message.trim(),
      system_instruction: systemInstruction,
    }),
    signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
  });

  // 4. Read the body exactly once.
  const rawBody = await response.text();

  let data: GeminiResponse | undefined;

  try {
    data = JSON.parse(rawBody) as GeminiResponse;
  } catch {
    // Preserve HTTP status even if an upstream error isn't JSON.
    if (!response.ok) {
      throw new GeminiApiError(
        `Gemini returned HTTP ${response.status} with an invalid error response.`,
        response.status,
      );
    }

    console.error("Gemini returned an invalid JSON response.");

    throw new Error("Gemini returned an invalid response.");
  }

  // 5. Handle upstream HTTP errors.
  if (!response.ok) {
    const errorMessage =
      data.error?.message ??
      `Gemini API request failed with HTTP ${response.status}.`;

    const errorCode =
      data.error?.status ??
      (typeof data.error?.code === "string"
        ? data.error.code
        : undefined);

    console.error("Gemini API request failed:", {
      httpStatus: response.status,
      code: errorCode,
      message: errorMessage,
    });

    throw new GeminiApiError(
      errorMessage,
      response.status,
      errorCode,
    );
  }

  // 6. Check the interaction status.
  if (data.status && data.status !== "completed") {
    console.error("Gemini interaction did not complete:", {
      status: data.status,
    });

    throw new Error(
      `Gemini interaction did not complete: ${data.status}`,
    );
  }

  // 7. Extract text from model output steps.
  const reply = data.steps
    ?.filter((step) => step.type === "model_output")
    .flatMap((step) => step.content ?? [])
    .filter((item) => item.type === "text")
    .map((item) => item.text ?? "")
    .join("")
    .trim();

  // 8. Validate the generated reply.
  if (!reply) {
    console.error("Gemini response contained no usable text.");

    throw new Error("Gemini returned no text response.");
  }

  return reply;
};
