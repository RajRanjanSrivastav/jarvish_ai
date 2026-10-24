import User from "../Models/user.model.js";

export const getCurrentUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "Failed to get current user" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `getCurrentUser error : ${error}` });
  }
};

export const saveAssistant = async (req: any, res: any) => {
  try {
    const {
      assistantName,
      businessName,
      businessType,
      businessDescription,
      tone,
      theme,
      pages,
      geminiApiKey,
    } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        message: "Failed to find current user",
      });
    }

    user.assistantName = assistantName;
    user.businessName = businessName;
    user.businessType = businessType;
    user.businessDescription = businessDescription;
    user.tone = tone;
    user.theme = theme;
    user.pages = pages || [];

    if (geminiApiKey) {
      user.geminiApiKey = geminiApiKey;
      user.geminiStatus = "active";
    }

    user.isSetupComplete = true;

    await user.save();

    return res.status(200).json({
      message: "Assistant saved successfully",
      user,
    });
  } catch (error) {
    console.error("saveAssistant error:", error);

    return res.status(500).json({
      message: `Failed to save Assistant ${error}`,
    });
  }
};


