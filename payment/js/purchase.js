// 1. Hent eventId fra URL (f.eks index_kjop_billett.html?eventId=1)
function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("eventId") || "1");
}

// 2. Når brukeren trykker BEKREFT KJØP
async function startPurchase() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const qty = Number(document.getElementById("qty").value);
  const eventId = getEventIdFromUrl();

  if (!email || qty < 1) {
    alert("Vennligst fyll inn gyldige data.");
    return;
  }

  // 3. Opprett ordre i backend
  const order = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId,
      buyerName: name,
      email,
      phone,
      quantity: qty,
      totalPrice: qty * 100,  // backend kan lage korrekt pris
      paymentStatus: "pending",
    }),
  }).then((r) => r.json());

  // 4. Lagre ordre midlertidig for betalings-siden
  sessionStorage.setItem("order", JSON.stringify(order));

  // 5. Send bruker videre til betaling
  window.location.href = `index_betaling.html?eventId=${eventId}`;
}


