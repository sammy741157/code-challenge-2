const guestForm = document.getElementById("guest-form");
const guestInput = document.getElementById("guest-name")
const guestList = document.getElementById("guest-list");

//Number of guests
let guestCount = 0;

//Add guest to list
guestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the guest name from the input field
    const guestName = guestInput.value.trim();

    // Check if the input is empty
    if (!guestName) {
        alert("Please enter a name!")
    }

    // Guest Limit
    if (guestCount >= 10) {
        alert('Guest limit reached!');
        return;
    }

    //Create a new list
    const listItem = document.createElement("li");

    // Guest name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = guestName;

// Add RSVP
const rsvpBtn = document.createElement("button");
rsvpBtn.textContent = "❌ Not Attending"; 
rsvpBtn.addEventListener("click", function() {
    if(rsvpBtn.textContent.includes("❌"))
    {
        rsvpBtn.textContent = "✅ Attending";
    } else {
        rsvpBtn.textContent = "❌ Not Attending"
    }
});

    // Add Edit button
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.addEventListener("click", () => {
    const newName = prompt("Edit guest name:", guestName);
    if (newName) listItem.textContent = newName;
});

// Add remove button
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.addEventListener("click", () => {
    guestList.removeChild(listItem);
    guestCount--;
});

    // Append the new list item to the guest list
    listItem.append(nameSpan, rsvpBtn, editBtn, removeBtn);
    guestList.appendChild(listItem);

    // Clear the input field
    guestInput.value = "";

    // Increment the guest count
    guestCount++;
});
