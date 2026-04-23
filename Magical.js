const API_URL = "https://69ea60a315c7e2d51269c2f3.mockapi.io/pet";

const petsContainer = document.getElementById("petsContainer");
const formContainer = document.getElementById("formContainer");
const openFormBtn = document.getElementById("openFormBtn");
const petForm = document.getElementById("petForm");


openFormBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
});

async function getPets() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderPets(data);
  } catch (err) {
    console.log("Error fetching pets", err);
  }
}

function renderPets(pets) {
  petsContainer.innerHTML = "";

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Color: ${pet.color}</p>
      <p>${pet.description}</p>
      <button onclick="releasePet('${pet.id}')">Release ❌</button>
    `;

    petsContainer.appendChild(card);
  });
}

petForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPet = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    color: document.getElementById("color").value,
    description: document.getElementById("description").value,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    });

    petForm.reset();
    getPets();
  } catch (err) {
    console.log("Error adding pet", err);
  }
});

async function releasePet(id) {
  const confirmDelete = confirm("Are you sure you want to release this pet?");

  if (!confirmDelete) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    getPets();
  } catch (err) {
    console.log("Error deleting pet", err);
  }
}

 
getPets();