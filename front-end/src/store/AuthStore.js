const { makeAutoObservable } = require('mobx');

export class Auth {
  constructor() {
    makeAutoObservable(this);
  }
}
