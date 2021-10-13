const { makeAutoObservable, observable, action } = require('mobx');

class Auth {
  user = {};

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      setUser: action
    });
  }

  setUser = (user) => (this.user = user);
}

export const authStore = new Auth();
