require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Live URL only — no more sandbox
const INTASEND_URL = "https://api.intasend.com";
const STK_ENDPOINT = `${INTASEND_URL}/api/v1/checkout/mpesa-stk-push/`;

// ✅ Use your live API token from IntaSend dashboard
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.INTASEND_API_TOKEN}`,
};

app.post("/stk", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const payload = {
      amount,
      phone_number: phone,
      narrative: "Tecra Live Payment", // Optional
    };

    const response = await axios.post(STK_ENDPOINT, payload, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ STK push error:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: "STK Push failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ IntaSend LIVE STK Push server running...");
});
