require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const INTASEND_URL =
  process.env.INTASEND_ENV === "live"
    ? "https://api.intasend.com"
    : "https://sandbox.intasend.com";

const headers = {
  "Content-Type": "application/json",
  "X-PUBLIC-KEY": process.env.INTASEND_PUBLIC_KEY,
  "X-SECRET-KEY": process.env.INTASEND_SECRET_KEY,
};

app.post("/stk", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await axios.post(
      `${INTASEND_URL}/api/v1/checkout/mpesa/push`,
      {
        amount,
        phone_number: phone,
        currency: "KES",
      },
      { headers }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("STK push error:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: "Failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("IntaSend STK Push server running");
});
