const API_BASE = "https://larvik-rockeklubb-backend.onrender.com";

fetch(`${API_BASE}/api/events`)
  .then(res => res.json())
  .then(events => {
    const box = document.getElementById("events");
    box.innerHTML = "";

    events.forEach(e => {
      const imgSrc = e.image
        ? (e.image.startsWith("/") ? API_BASE + e.image : e.image)
        : "";

      const dato = e.date
        ? new Date(e.date).toLocaleDateString("no-NO")
        : "";

      box.innerHTML += `
        <a class="arrangement" href="index_arr_band-abc.html?eventId=${e.id}">
          ${imgSrc ? `<img src="${imgSrc}" alt="${e.title}">` : ""}
          <div class="arrangement-info">
            <h3>${e.title}</h3>
            <p>${dato}${dato && e.city ? " | " : ""}${e.city || ""}</p>
          </div>
        </a>
      `;
    });
  });
