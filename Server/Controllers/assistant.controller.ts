import type { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../Models/user.model.js";
import { generateGeminiReply } from "../Configs/gemini.js";

export const getPublicAssistant = async (req: any, res: any) => {
  try {
    const { assistantId } = req.params;

    const user = await User.findOne({
      _id: assistantId,
      isSetupComplete: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assistant not found",
      });
    }

    // Return only fields the public widget needs.
    return res.status(200).json({
      success: true,
      assistant: {
        id: user._id.toString(),
        name: user.assistantName,
        businessName: user.businessName,
        theme: user.theme,
        enableVoice: user.enableVoice,
        enableNavigation: user.enableNavigation,
        pages: user.pages,
      },
    });
  } catch (error) {
    console.error("getPublicAssistant error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load assistant",
    });
  }
};

export const chatController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 1. Validate the request body.
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({
        success: false,
        message: "A valid request body is required.",
      });
      return;
    }

    const { assistantId, message } = req.body;

    // 2. Validate assistantId against the MongoDB document _id.
    if (
      typeof assistantId !== "string" ||
      !mongoose.isObjectIdOrHexString(assistantId)
    ) {
      res.status(400).json({
        success: false,
        message: "A valid assistantId is required.",
      });
      return;
    }

    // 3. Validate and normalize the visitor's message.
    if (typeof message !== "string") {
      res.status(400).json({
        success: false,
        message: "Message must be a string.",
      });
      return;
    }

    const cleanMessage = message.trim();

    if (!cleanMessage) {
      res.status(400).json({
        success: false,
        message: "Message is required.",
      });
      return;
    }

    if (cleanMessage.length > 4000) {
      res.status(400).json({
        success: false,
        message: "Message must not exceed 4000 characters.",
      });
      return;
    }

    // 4. Find the configured assistant using the existing schema keys.
    let user;

    try {
      user = await User.findOne({
        _id: assistantId,
        isSetupComplete: true,
      }).select(
        "_id assistantName businessName businessType businessDescription tone geminiApiKey geminiStatus",
      );
    } catch (dbError: unknown) {
      console.error("MongoDB assistant lookup failed:", {
        name: dbError instanceof Error ? dbError.name : "UnknownError",
        message:
          dbError instanceof Error ? dbError.message : "Unknown database error",
      });

      res.status(503).json({
        success: false,
        message: "The chat service is temporarily unavailable.",
      });
      return;
    }

    // 5. Check whether the assistant exists and is configured.
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Assistant not found or not configured.",
      });
      return;
    }

    // 6. Check the stored Gemini API key.
    if (typeof user.geminiApiKey !== "string" || !user.geminiApiKey.trim()) {
      res.status(503).json({
        success: false,
        message: "This assistant's AI service is not configured.",
      });
      return;
    }

    // 7. Check the assistant's Gemini service status.
    if (user.geminiStatus !== "active") {
      res.status(503).json({
        success: false,
        message: "This assistant's AI service is unavailable.",
      });
      return;
    }

    // 8. Send the message to Gemini using your existing field names.
    let reply: string;

    try {
      reply = await generateGeminiReply({
        apiKey: user.geminiApiKey,
        message: cleanMessage,
        assistantName: user.assistantName,
        businessName: user.businessName,
        businessType: user.businessType,
        businessDescription: user.businessDescription,
        tone: user.tone,
      });
    } catch (aiError: unknown) {
      const err =
        aiError instanceof Error ? aiError : new Error("Unknown Gemini error");

      console.error("Gemini request failed:", {
        name: err.name,
        message: err.message,
      });

      const isTimeout =
        err.name === "TimeoutError" || err.name === "AbortError";

      if (isTimeout) {
        res.status(504).json({
          success: false,
          message: "The AI service took too long to respond. Please try again.",
        });
        return;
      }

      res.status(502).json({
        success: false,
        message: "The AI service could not process your request.",
      });
      return;
    }

    // 9. Validate Gemini's returned reply.
    if (typeof reply !== "string" || !reply.trim()) {
      console.error("Gemini returned an empty or invalid reply.");

      res.status(502).json({
        success: false,
        message: "The AI service returned an invalid response.",
      });
      return;
    }

    // 10. Return a consistent response to the widget.
    res.status(200).json({
      success: true,
      reply: reply.trim(),
    });
  } catch (error: unknown) {
    // Catch unexpected controller errors without exposing internals.
    console.error("Unexpected chat controller error:", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : "Unknown server error",
    });

    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
