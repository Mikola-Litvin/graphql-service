import { RESTDataSource } from 'apollo-datasource-rest';

export class AlbumsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3005/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getAlbums() {
    return this.get(`/albums`);
  }

  async getAlbum(id) {
    return this.get(`/albums/${encodeURIComponent(id)}`);
  }

  async createAlbum(newAlbum) {
    return this.post(`/albums`, newAlbum,);
  }

  async updateAlbum(updatedAlbum) {
    return this.put(`/albums/${encodeURIComponent(updatedAlbum.id)}`, updatedAlbum);
  }

  async deleteAlbum(id) {
    return this.delete(`/albums/${encodeURIComponent(id)}`);
  }
}
