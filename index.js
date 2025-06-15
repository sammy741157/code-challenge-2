const form = document.getElementById("guest-form");
const guestNameInput = document.getElementById("guest-name");
const categorySelect = document.getElementById("guest-category");
const guestList = document.getElementById("guest-list");

let guests = [];

const categoryColors = {
  Friend: "blue",
  Family: "green",
  Colleague: "orange"
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = guestNameInput.value.trim();
  const category = categorySelect.value;

  if (name === "") return;

  if (guests.length >= 10) {
    alert("Guest limit reached (10 guests max).");
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    rsvp: false,
    category,
    timeAdded: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  guestNameInput.value = "";
  saveGuests();
  renderGuests();
});

function renderGuests() {
  guestList.innerHTML = "";

  guests.forEach(guest => {
    const li = document.createElement("li");

    // Guest Info
    const guestInfo = document.createElement("span");
    guestInfo.textContent = `${guest.name} - ${guest.rsvp ? "Attending" : "Not Attending"}`;
    guestInfo.addEventListener("click", () => {
      guest.rsvp = !guest.rsvp;
      saveGuests();
      renderGuests();
    });

    // Category Badge
    const badge = document.createElement("span");
    badge.textContent = guest.category;
    badge.classList.add("badge");
    badge.style.color = categoryColors[guest.category];

    // Time
    const time = document.createElement("small");
    time.textContent = `Added at: ${guest.timeAdded}`;

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newName = prompt("Enter new name:", guest.name);
      if (newName) {
        guest.name = newName.trim();
        saveGuests();
        renderGuests();
      }
    });

    // Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      guests = guests.filter(g => g.id !== guest.id);
      saveGuests();
      renderGuests();
    });

    // Assemble
    const infoWrapper = document.createElement("div");
    infoWrapper.append(guestInfo, document.createElement("br"), badge, time);

    const controlsWrapper = document.createElement("div");
    controlsWrapper.append(editBtn, removeBtn);

    li.append(infoWrapper, controlsWrapper);
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    guestList.appendChild(li);
  });
}

function saveGuests() {
  localStorage.setItem("guests", JSON.stringify(guests));
}

function loadGuests() {
  const saved = localStorage.getItem("guests");
  if (saved) {
    guests = JSON.parse(saved);
    renderGuests();
  }
}

window.addEventListener("DOMContentLoaded", loadGuests);
// Add CSS styles for badges
