document.addEventListener("DOMContentLoaded", () => {
  loadListings();

  // button togggle
  document.querySelector(".container").addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;

    const card = btn.closest(".listings");
    const isOpen = card.classList.toggle("open");
    btn.textContent = isOpen ? "Less" : "More";
  });
});

async function loadListings() {
  const container = document.querySelector(".container");
  const template = container.querySelector("article.listings");

  // remove the template from the DOM but keep it in memory
  template.remove();

  try {
    const response = await fetch("listings.json");
    if (!response.ok) throw new Error("Failed to load JSON");

    const data = await response.json();
    const listings = data.slice(0, 50);

    for (let item of listings) {
      const card = template.cloneNode(true);

      // main image
      const mainImg = card.querySelector(".thumbnail"); // <-- fixed
      mainImg.src = item.picture_url || "https://via.placeholder.com/600x400";
      mainImg.alt = item.name || "Listing";

      // listing name
      card.querySelector(".listing-name").textContent =
        item.name || "Untitled listing";

      // host name + photo
      card.querySelector(".host-name").textContent =
        item.host_name || "Unknown host";
      const hostImgEl = card.querySelector(".host-photo");
      hostImgEl.src = item.host_picture_url || "https://via.placeholder.com/64";
      hostImgEl.alt = "Host photo";

      // price
      card.querySelector(".price").textContent = `Price: ${
        item.price || "N/A"
      }`;

      // description
      const descEl = card.querySelector(".description");
      if (descEl) {
        const cleanText = item.description
          ? item.description.replace(/<[^>]*>/g, "") // removes all HTML tags
          : "No description available";
        descEl.textContent = cleanText;
      }

      // amenities
      const amenitiesEl = card.querySelector(".amenities");
      amenitiesEl.innerHTML = "";
      let amenitiesArr = [];
      if (typeof item.amenities === "string") {
        try {
          amenitiesArr = JSON.parse(item.amenities);
        } catch {
          amenitiesArr = [];
        }
      } else if (Array.isArray(item.amenities)) {
        amenitiesArr = item.amenities;
      }
      (amenitiesArr.length
        ? amenitiesArr.slice(0, 6)
        : ["No amenities listed"]
      ).forEach((am) => {
        const p = document.createElement("p");
        p.textContent = `⭐️ ${am}`;
        amenitiesEl.appendChild(p);
      });

      container.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Could not load listings.";
    container.appendChild(errorMsg);
  }
}
