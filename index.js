require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { IntaSend } = require('intasend-node');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize IntaSend SDK with your live keys
const intasend = new IntaSend(
  process.env.INTASEND_PUBLIC_KEY,
  process.env.INTASEND_SECRET_KEY,
  false // false = live mode
);

const collection = intasend.collection();

app.post('/stk', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await collection.mpesaStkPush({
      first_name: 'Wycliff',
      last_name: 'Mutethia',
      email: 'wycliffmutethia8@gmail.com',
      host: 'https://intasend-node.onrender.com', // this must match your backend domain
      amount,
      phone_number: phone,
      api_ref: 'tecra-stk-payment'
    });

    console.log('✅ STK Push Response:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('❌ STK Push Error:', error);
    res.status(500).json({ error: 'STK Push failed', detail: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 IntaSend STK server running...');
});
