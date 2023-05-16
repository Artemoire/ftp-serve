// TODO: User<TUserInfo> + UserInfoProvision<TUserInfo>
export class User {

  public name: string = "";
  public pass: string = "";

  isAnonymous() {
    return this.name === User.AnonymousUserName;
  }

  hasSetName() {
    return this.name !== "";
  }

  hasSetPassword() {
    return this.pass !== "";
  }

  isAuthenticated() {
    return this.hasSetName() && (this.isAnonymous() || this.hasSetPassword());
  }

  static AnonymousUserName = "anonymous";
}