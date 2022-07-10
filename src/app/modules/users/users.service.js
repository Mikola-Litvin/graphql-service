import { RESTDataSource } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3004/v1/users';
  }

  async getUser(id) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async registerUser(newUser) {
    return this.post(`/register`, newUser,);
  }

  async login(userData) {
    return this.post(`/login`, userData,);
  }
}
