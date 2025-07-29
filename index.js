require("dotenv").config();
const express = require("express");
const cors = require("cors");
const IntaSend = require("intasend-node"); // no "new" keyword
const app = express();

app.use(cors());
app.use(express.json());

const intasend = IntaSend(
  process.env.INTASEND_PUBLIC_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.INTASEND_ENV !== "live" // true for test env, false for live
);

const collection = intasend.collection();

app.post("/stk", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await collection.mpesaStkPush({
      first_name: "Wycliff",
      last_name: "Mutethia",
      email: "wycliffmutethia8@gmail.com",
      host: "https://intasend-node.onrender.com", // Must match your dashboard settings
      amount: amount,
      phone_number: phone,
      api_ref: "tecrastk",
    });

    res.status(200).json(response);
  } catch (err) {
    console.error("❌ STK Push error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ IntaSend STK Push server running...");
});
