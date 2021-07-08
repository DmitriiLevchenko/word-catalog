export class UserService {
  constructor({ AuthRepository }) {
    this.AuthRepository = AuthRepository;
  }

  async getAllUsers() {
    const response = this.AuthRepository.getAll();
    return response;
  }
}
