let animals = [];

class Animal {
  constructor(name, breed, age, sex, weight) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.sex = sex;
    this.weight = weight;
  }
}

const inputName = document.getElementById("input-name");
const inputBreed = document.getElementById("input-breed");
const inputAge = document.getElementById("input-age");
const inputSex = document.getElementById("input-sex");
const inputWeight = document.getElementById("input-weight");
const btnSave = document.getElementById("btn-save");
const btnList = document.getElementById("btn-list");
const animalList = document.getElementById("animal-list");

let editingIndex = -1;

// Função para salvar ou editar um animal
btnSave.addEventListener("click", () => {
  const name = inputName.value;
  const breed = inputBreed.value;
  const age = parseFloat(inputAge.value);
  const sex = inputSex.value;
  const weight = parseFloat(inputWeight.value);

  if (name && breed && age > 0 && sex && weight > 0) {
    if (editingIndex === -1) {
      const animal = new Animal(name, breed, age, sex, weight);
      animals.push(animal);
      alert("Animal cadastrado com sucesso!");
    } else {
      animals[editingIndex] = new Animal(name, breed, age, sex, weight);
      alert("Animal editado com sucesso!");
      editingIndex = -1;
    }

    clearInputs();
    displayAnimals();
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
});

// Função para exibir todos os animais
function displayAnimals() {
  animalList.innerHTML = ""; // Limpa a lista antes de exibir

  if (animals.length === 0) {
    const noAnimalsMessage = document.createElement("li");
    noAnimalsMessage.textContent = "Nenhum animal cadastrado.";
    animalList.appendChild(noAnimalsMessage);
    return;
  }

  animals.forEach((animal, index) => {
    const li = document.createElement("li");
    li.classList.add("animal-item");

    li.innerHTML = `
      <span><strong>Nome:</strong> ${animal.name}</span>
      <span><strong>Raça:</strong> ${animal.breed}</span>
      <span><strong>Idade:</strong> ${animal.age}</span>
      <span><strong>Sexo:</strong> ${animal.sex}</span>
      <span><strong>Peso:</strong> ${animal.weight}</span>
      <button onclick="editAnimal(${index})">Editar</button>
      <button onclick="deleteAnimal(${index})">Deletar</button>
    `;
    
    animalList.appendChild(li);
  });
}

// Ao clicar no botão "Listar Animais", chama a função para exibir a lista
btnList.addEventListener("click", () => {
  displayAnimals(); // Exibe a lista de animais
});

// Função para editar um animal
function editAnimal(index) {
  const animal = animals[index];

  inputName.value = animal.name;
  inputBreed.value = animal.breed;
  inputAge.value = animal.age;
  inputSex.value = animal.sex;
  inputWeight.value = animal.weight;

  editingIndex = index;
  btnSave.textContent = "Salvar Edição";
}

// Função para deletar um animal
function deleteAnimal(index) {
  if (confirm("Tem certeza que deseja excluir este animal?")) {
    animals.splice(index, 1);
    clearInputs(); // Limpa os campos de entrada
    displayAnimals(); // Atualiza a lista
  }
}

// Função para limpar os inputs
function clearInputs() {
  inputName.value = '';
  inputBreed.value = '';
  inputAge.value = '';
  inputSex.value = '';
  inputWeight.value = '';
  btnSave.textContent = "Salvar Animal"; 
}
