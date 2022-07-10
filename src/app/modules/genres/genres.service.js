import { RESTDataSource } from 'apollo-datasource-rest';

export class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getGenres() {
    return this.get(`/genres`);
  }

  async getGenre(id) {
    return this.get(`/genres/${encodeURIComponent(id)}`);
  }

  async createGenre(newGenre) {
    return this.post(`/genres`, newGenre,);
  }

  async updateGenre(updatedGenre) {
    return this.put(`/genres/${encodeURIComponent(updatedGenre.id)}`, updatedGenre);
  }

  async deleteGenre(id) {
    return this.delete(`/genres/${encodeURIComponent(id)}`);
  }
}
