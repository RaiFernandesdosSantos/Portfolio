let users = [];
let currentPage = 1;
const recordsPerPage = 13;

async function createUserArray() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    while (users.length < 997) {
      users = users.concat(
        data.map((user, index) => ({
          ...user,
          id: users.length + index + 1,
        }))
      );
    }
    users = users.slice(0, 997);

    populate();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function populate() {
  const tableBody = document.querySelector(".tbody");
  tableBody.innerHTML = `
    <div class="row">
        <div class="column">ID</div>
        <div class="column">Nome</div>
        <div class="column">Sobrenome</div>
        <div class="column">E-mail</div>
        <div class="column">Acoes</div>
    </div>`;

  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;

  const usersToDisplay = users.slice(start, end);

  usersToDisplay.forEach((user) => {
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `
      <div class="column">${user.id}</div>
      <div class="column">${user.name}</div>
      <div class="column">${user.username}</div>
      <div class="column">${user.email}</div>
      <div class="column">
          <button onclick="deleteUser(${user.id})">Excluir</button>
      </div>`;

    tableBody.appendChild(row);
  });
}

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  populate();
}

createUserArray();

function paginationButtons() {
  const totalPages = Math.ceil(users.length / recordsPerPage);
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Função para ir para a página anterior
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    populate();
  }
}

// Função para ir para a próxima página
function nextPage() {
  const totalPages = Math.ceil(users.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    populate();
  }
}
