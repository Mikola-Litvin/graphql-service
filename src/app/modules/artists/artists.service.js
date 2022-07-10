import { RESTDataSource } from 'apollo-datasource-rest';

export class ArtistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getArtists() {
    return this.get(`/artists`);
  }

  async getArtist(id) {
    return this.get(`/artists/${encodeURIComponent(id)}`);
  }

  async createArtist(newArtist) {
    return this.post(`/artists`, newArtist,);
  }

  async updateArtist(updatedArtist) {
    return this.put(`/artists/${encodeURIComponent(updatedArtist.id)}`, updatedArtist);
  }

  async deleteArtist(id) {
    return this.delete(`/artists/${encodeURIComponent(id)}`);
  }
}
