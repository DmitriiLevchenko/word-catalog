export class UserDto {
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.activated;
  }
}
