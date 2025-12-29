fetch("https://larvik-rockeklubb-backend.onrender.com/api/events")
  .then(res => res.json())
  .then(events => {
    const box = document.getElementById("events");
    box.innerHTML = "";

    events.forEach(e => {
      box.innerHTML += `
        <a class="arrangement" href="index_kjop_billett.html?eventId=${e.id}">
          <img src="assets/${e.image}" alt="${e.title}">
          <div class="arrangement-info">
            <h3>${e.title}</h3>
            <p>${e.event_date} | ${e.city}</p>
          </div>
        </a>
      `;
    });
  });
