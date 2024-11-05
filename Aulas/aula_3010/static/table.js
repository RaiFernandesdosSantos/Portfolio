let users = [];
let currentPage = 1;
const recordsPerPage = 15;

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
    <div class="linha">
        <div class="coluna">ID</div>
        <div class="coluna">Nome</div>
        <div class="coluna">Sobrenome</div>
        <div class="coluna">E-mail</div>
        <div class="coluna">Acoes</div>
    </div>`;

  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;

  const usersToDisplay = users.slice(start, end);

  usersToDisplay.forEach((user) => {
    const row = document.createElement("div");
    row.classList.add("linha");
    row.innerHTML = `
      <div class="coluna">${user.id}</div>
      <div class="coluna">${user.name}</div>
      <div class="coluna">${user.username}</div>
      <div class="coluna">${user.email}</div>
      <div class="coluna">
          <button onclick="excluir(${user.id})">Excluir</button>
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
