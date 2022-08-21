export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  loggIn() {
    this.loggedIn = true;
  }

  loggOut() {
    this.loggedIn = false;
  }
}
