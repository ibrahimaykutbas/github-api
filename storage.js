class Storage {
  static addSearchedUserToStorage(username) {
    // Aranan kullanıcı adlarını local storage'a ekleme
    // Eğer kullanıcı adı zaten storage'da mevcut ise yeniden eklemiyor
    
    let users = this.getSearchedFromStorage();
    if (users.indexOf(username) === -1) {
      users.push(username);
      localStorage.setItem("searched", JSON.stringify(users));
    }
  }

  static getSearchedFromStorage() {
    // Local storage içerisinde array kontrolü ve bu arrayi dönme

    let users;
    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }
    return users;
  }

  static deleteLastUserFromStorage(deleteUser) {
    // Aranan son kullanıcılar listesinden seçili kullanıcı adını storage'dan silme

    let users = this.getSearchedFromStorage();
    users.forEach((user, index) => {
      if (deleteUser === user) {
        users.splice(index, 1);
      }
    });
    localStorage.setItem("searched", JSON.stringify(users));
  }

  static clearAllLastUsersFromStorage() {
    // Local storage'daki array'i silme

    localStorage.removeItem("searched");
  }
}
