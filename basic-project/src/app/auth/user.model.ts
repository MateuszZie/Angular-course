export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expirationTokenDate: Date
  ) {}

  get token() {
    if (!this._expirationTokenDate || new Date() > this._expirationTokenDate) {
      return null;
    }
    return this._token;
  }
}
