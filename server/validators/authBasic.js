import { Buffer } from "buffer";

export const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is missing in definition" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");
  if (
    username === process.env.EY_USER &&
    password === process.env.EY_PASSWORD
  ) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Invalid credentials for API authorization" });
  }
};
