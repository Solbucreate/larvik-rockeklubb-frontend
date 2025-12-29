const API = "https://rockeklubb-web-backend.onrender.com/api";

async function startPurchase() {
  const qty = Number(document.getElementById("qty").value);
  const email = document.getElementById("email").value;
  const method = document.getElementById("payment-method").value;

  if (!email || qty < 1) {
    document.getElementById("status").innerHTML = "Ugyldig data";
    return;
  }

  // Opprett ordre i backend
  const order = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId: 1, // kobles mot events senere
      quantity: qty,
      email,
      totalPrice: qty * 100,
      paymentStatus: "pending",
    }),
  }).then(r => r.json());

  // Vipps
  if (method === "vipps") {
    const vipps = await fetch(`${API}/pay/vipps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.totalPrice,
      }),
    }).then(r => r.json());

    window.location.href = vipps.redirectUrl;
  }

  // Stripe
  if (method === "stripe") {
    const stripe = await fetch(`${API}/pay/stripe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.totalPrice,
      }),
    }).then(r => r.json());

    window.location.href = stripe.url;
  }
}
