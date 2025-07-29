require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { IntaSend } = require('intasend-node');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize IntaSend SDK
const intasend = new IntaSend(
  process.env.INTASEND_PUBLIC_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.INTASEND_ENV !== 'live' // true if not live (i.e. sandbox/test)
);

// ✅ STK push endpoint
app.post('/stk', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const collection = intasend.collection();

    const response = await collection.mpesaStkPush({
      first_name: 'Wycliff',
      last_name: 'Mutethia',
      email: 'wycliffmutethia8@gmail.com',
      host: 'https://intasend-node.onrender.com',
      amount: amount,
      phone_number: phone,
      api_ref: `ref-${Date.now()}`
    });

    console.log('✅ STK Push response:', response);
    res.json(response);
  } catch (err) {
    console.error('❌ STK Push error:', err);
    res.status(500).json({ error: 'STK Push failed' });
  }
});

// ✅ Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('✅ IntaSend STK Push server running...');
});
