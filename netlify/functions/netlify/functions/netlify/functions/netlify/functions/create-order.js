
const Razorpay = require("razorpay");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { amount } = JSON.parse(event.body || "{}");

    if (!Number.isInteger(amount) || amount < 1) {
      return { statusCode: 400, body: "Invalid amount" };
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "eagle_" + Date.now()
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Order creation failed" })
    };
  }
};
