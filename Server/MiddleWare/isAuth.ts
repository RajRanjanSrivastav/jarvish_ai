import jwt, { type JwtPayload } from "jsonwebtoken";
interface UserPayload extends JwtPayload {
  userId: string;
}
 
export const isAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    console.log("token : ", token.value)

    if (!token) {
      return res.status(400).json({ message: "User does not have token" });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as UserPayload;
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "User does not have valid token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: `isAuth error : ${error}` });
  }
};
