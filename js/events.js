fetch("https://larvik-rockeklubb-backend.onrender.com/events")
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById("events");

    events.forEach(e => {
      const div = document.createElement("div");
      div.className = "arrangement";

      div.innerHTML = `
        <h3>${e.title}</h3>
        <p>${e.event_date} | ${e.city}</p>
        <p>${e.price} kr</p>
        <a href="index_kjop_billett.html?eventId=${e.id}">Kjøp billett</a>
      `;

      container.appendChild(div);
    });
  });
