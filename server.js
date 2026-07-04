import express from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage",
);

app.post("/api/auth/google", async (req, res) => {
  try {
    const { code } = req.body;

    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log(payload);

    res.json({
      success: true,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Authentication failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
