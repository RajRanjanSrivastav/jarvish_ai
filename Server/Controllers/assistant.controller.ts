import User from "../Models/user.model.js";

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
