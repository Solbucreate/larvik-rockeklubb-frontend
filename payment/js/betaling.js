// 1. Hent ordren fra purchase.js
const order = JSON.parse(sessionStorage.getItem("order") || "{}");

// 2. Hvis ingen ordre finnes -> feil
if (!order || !order.id) {
  document.body.innerHTML = "<h2>Ingen ordre funnet. Gå tilbake og prøv igjen.</h2>";
  throw new Error("Order missing");
}

// 3. Vis ordreinformasjon på betalings-siden
document.getElementById("eventName").innerText = order.event?.title || "Arrangement";
document.getElementById("quantity").innerText = order.quantity;
document.getElementById("totalPrice").innerText = order.totalPrice + " NOK";


// 4. Betaling med Vipps
async function payVipps() {
  const response = await fetch("http://localhost:5000/api/payment/vipps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId: order.id }),
  }).then(r => r.json());

  if (response.redirectUrl) {
    window.location.href = response.redirectUrl;
  } else {
    window.location.href = "public/payment-failed.html";
  }
}


// 5. Betaling med kort (Stripe)
async function payStripe() {
  const response = await fetch("http://localhost:5000/api/payment/stripe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId: order.id }),
  }).then(r => r.json());

  if (response.url) {
    window.location.href = response.url;
  } else {
    window.location.href = "public/payment-failed.html";
  }
}
