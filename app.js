const githubForm = document.querySelector("#github-form");
const githubName = document.querySelector("#githubname");
const lastUsers = document.querySelector("#lastSearch");
const clearLastUsers = document.querySelector("#clear-last-users");

const github = new Github();

const ui = new UI();

eventListener();

function eventListener() {
  // Tetiklenecek eventleri bir fonksiyon içerisinde tutma
  githubForm.addEventListener("submit", getData);
  document.addEventListener("DOMContentLoaded", getLastUsers);
  clearLastUsers.addEventListener("click", clearAllLastUsers);
  lastUsers.addEventListener("click", deleteLastUser);
}

function getData(e) {
  // Fetch üzerinden gelen dataları dinleyerek bunları UI'da gösterme
  // Dataları UI'a ve storage'a ekleme
  // Hataları yakalama

  const username = githubName.value.trim();

  github
    .getGithubData(username)
    .then((response) => {
      if (response.user.message === "Not Found") {
        ui.showAlert("danger", "Kullanıcı bulunamadı!");
      } else {
        ui.showUserProfile(response.user);
        ui.showUserRepos(response.repo);

        ui.addSearchedUserToUI(username);
        Storage.addSearchedUserToStorage(username);
      }
    })
    .catch((err) => console.log(err));

  ui.clearInput();
  e.preventDefault();
}

function getLastUsers() {
  // Local storage'a eklenen aranan son kullanıcıları UI'da listeleme

  let users = Storage.getSearchedFromStorage();

  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = user;

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = `<i class = 'fa fa-remove'></i>`;

    li.appendChild(link);
    lastUsers.appendChild(li);
  });
}

function deleteLastUser(e) {
  // Son aranan kullanıcılar listesinden seçilen kullanıcı adını UI'dan ve storage'dan silme

  if (e.target.className === "fa fa-remove") {
    ui.deleteLastUserFromUI(e.target);
    Storage.deleteLastUserFromStorage(
      e.target.parentElement.parentElement.textContent
    );
    ui.showAlert(
      "info",
      `${e.target.parentElement.parentElement.textContent} silindi!`
    );
  }
}

function clearAllLastUsers() {
  // Bütün son aranan kullanıcıları UI'dan ve storage'dan silme
  
  ui.clearAllLastUsersFromUI();
  Storage.clearAllLastUsersFromStorage();
  ui.showAlert("info", "Son aramalar temizlendi!");
}
