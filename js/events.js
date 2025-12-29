fetch("https://larvik-rockeklubb-backend.onrender.com/events")
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById("events");

    events.forEach(event => {
      const div = document.createElement("div");
      div.className = "arrangement";

      div.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="arrangement-info">
          <h3>${event.title}</h3>
          <p>${event.event_date} | ${event.city}</p>
          <a href="index_kjop_billett.html?event_id=${event.id}">
            Kjøp billett
          </a>
        </div>
      `;

      container.appendChild(div);
    });
  });
