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
  console.log([username, process.env.USER, password, process.env.PASSWORD]);
  if (username === process.env.USER && password === process.env.PASSWORD) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Invalid credentials for API authorization" });
  }
};
