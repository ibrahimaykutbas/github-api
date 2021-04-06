class UI {
  constructor() {
    this.profile = document.querySelector("#profile");
    this.repos = document.querySelector("#repos");
    this.lastSearch = document.querySelector("#lastSearch");
    this.cardBody = document.querySelector(".card-body");
    this.name = document.querySelector("#githubname");
  }

  showUserProfile(user) {
    // Aranan kullanıcının profilini UI'a ekleme

    this.profile.innerHTML = `
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${user.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong> ${user.name}</strong></div>
             <hr>
             <div id="bio">${user.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">
                      Takipçi  <span class="badge badge-light">${user.followers}</span>
                </button>
                <button class="btn btn-info">
                     Takip Edilen  <span class="badge badge-light">${user.following}</span>
                  </button>
                <button class="btn btn-danger">
                    Repolar  <span class="badge badge-light">${user.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>                 
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>                   
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="company">${user.company}</span>                       
                    </li>                   
                </div>    
          </div>
    </div>    
        `;
  }

  showUserRepos(repos) {
    // Aranan kullanıcının repositorilerinin içerisinde dönme ve bunları UI'a ekleme

    this.repos.innerHTML = "";
    repos.forEach((repo) => {
      this.repos.innerHTML += `
            <div class="mb-2 card-body">
            <div class="row">
                <div class="col-md-2">
                <span></span> 
                <a href="#" target = "_blank" id = "repoName">${repo.name}</a>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary">
                        Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                    </button>
                    <button class="btn btn-info">
                        Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                    </button>
                </div>
        </div>
        </div>    
            `;
    });
  }

  showAlert(type, message) {
    // Olası hatalarda ve işlem sonlarında kullanıcıya UI'da bildirim gösterme

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    this.cardBody.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2000);
  }

  clearInput() {
    // İstenen durumlarda input alanını temizleme
    this.name.value = "";
  }

  addSearchedUserToUI(username) {
    // Aranan kullanıcı adlarını UI'a ekleme

    let users = Storage.getSearchedFromStorage();

    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = username;

      const link = document.createElement("a");
      link.href = "#";
      link.className = "delete-item";
      link.innerHTML = `<i class = 'fa fa-remove'></i>`;

      li.appendChild(link);
      this.lastSearch.appendChild(li);
    }
  }

  deleteLastUserFromUI(user) {
    // Aranan son kullanıcılar listesinden seçili kullanıcı adını UI'dan silme
    user.parentElement.parentElement.remove();
  }

  clearAllLastUsersFromUI() {
    // UI'daki son aranan kullanıcıların tamamını silme
    
    while (this.lastSearch.firstElementChild != null) {
      this.lastSearch.firstElementChild.remove();
    }
  }
}
