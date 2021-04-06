class Github {
  constructor() {
    // Api linki
    this.url = "https://api.github.com/users/";
  }

  async getGithubData(username) {
    // Aranan kullanının github profili
    const responseUser = await fetch(this.url + username);

    // Aranan kullanıcının repositorileri
    const responseRepo = await fetch(this.url + username + "/repos");

    // Fetch'den dönen dataları json formatına çevirme

    const userData = await responseUser.json();
    const repoData = await responseRepo.json();

    // Json formatına dönen dataları return yaparak tekrardan kullanma
    
    return {
      user: userData,
      repo: repoData,
    };
  }
}
