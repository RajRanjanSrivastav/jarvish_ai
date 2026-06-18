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

export const saveAssistant = async(req:any,res:any) => {

}
