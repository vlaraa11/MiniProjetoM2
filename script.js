// Array vazio para armazenar os animais cadastrados
let animals = [];

// Classe Animal
class Animal {
  constructor(name, breed, age, sex, weight) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.sex = sex;
    this.weight = weight;
  }
}

// Buscando os inputs do formulário
const inputName = document.getElementById("input-name");
const inputBreed = document.getElementById("input-breed");
const inputAge = document.getElementById("input-age");
const inputSex = document.getElementById("input-sex");
const inputWeight = document.getElementById("input-weight");
const btnSave = document.getElementById("btn-save");
const btnList = document.getElementById("btn-list");
const animalList = document.getElementById("animal-list");

let editingIndex = -1; // Variável para armazenar o índice do animal que está sendo editado

// Função para salvar um novo animal ou editar um existente
btnSave.addEventListener("click", () => {
  const name = inputName.value;
  const breed = inputBreed.value;
  const age = inputAge.value;
  const sex = inputSex.value;
  const weight = inputWeight.value;

  if (name && breed && age && sex && weight) {
    if (editingIndex === -1) {
      // Se não estiver editando, adiciona um novo animal
      const animal = new Animal(name, breed, age, sex, weight);
      animals.push(animal);
      alert("Animal cadastrado com sucesso!");
    } else {
      // Se estiver editando, atualiza o animal existente
      animals[editingIndex] = new Animal(name, breed, age, sex, weight);
      alert("Animal editado com sucesso!");
      editingIndex = -1; // Limpa o índice de edição após salvar
    }

    clearInputs();
    displayAnimals();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// Função para listar os animais cadastrados
btnList.addEventListener("click", () => {
  displayAnimals();
});

// Função para exibir a lista de animais
function displayAnimals() {
  animalList.innerHTML = ""; // Limpa a lista antes de exibir

  if (animals.length === 0) {
    // Exibe mensagem caso não haja animais cadastrados
    const message = document.createElement("li");
    message.textContent = "Nenhum animal cadastrado.";
    animalList.appendChild(message);
  } else {
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
}

// Função para editar um animal
function editAnimal(index) {
  const animal = animals[index];

  inputName.value = animal.name;
  inputBreed.value = animal.breed;
  inputAge.value = animal.age;
  inputSex.value = animal.sex;
  inputWeight.value = animal.weight;

  // Alterando a ação do botão de salvar para editar
  editingIndex = index; // Armazenando o índice do animal que será editado
  btnSave.textContent = "Salvar Edição";
}

// Função para deletar um animal
function deleteAnimal(index) {
  if (confirm("Tem certeza que deseja excluir este animal?")) {
    animals.splice(index, 1);
    displayAnimals();
  }
}

// Função para limpar os inputs após salvar ou editar
function clearInputs() {
  inputName.value = '';
  inputBreed.value = '';
  inputAge.value = '';
  inputSex.value = '';
  inputWeight.value = '';
  btnSave.textContent = "Salvar Animal"; // Restaura o texto do botão
}
