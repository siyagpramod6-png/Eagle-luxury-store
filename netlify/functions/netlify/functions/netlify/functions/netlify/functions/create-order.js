const Razorpay = require("razorpay");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { amount } = JSON.parse(event.body || "{}");

    if (!Number.isSafeInteger(amount) || amount < 100) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount" })
      };
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error("Razorpay environment variables missing");
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "eagle_" + Date.now()
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

  } catch (error) {
    console.error("Razorpay order error:", error.message);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Order creation failed"
      })
    };
  }
};
