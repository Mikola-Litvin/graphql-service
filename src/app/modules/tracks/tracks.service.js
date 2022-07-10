import { RESTDataSource } from 'apollo-datasource-rest';

export class TracksAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3006/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getTracks() {
    return this.get(`/tracks`);
  }

  async getTrack(id) {
    return this.get(`/tracks/${encodeURIComponent(id)}`);
  }

  async createTrack(newTrack) {
    return this.post(`/tracks`, newTrack,);
  }

  async updateTrack(updatedTrack) {
    return this.put(`/tracks/${encodeURIComponent(updatedTrack.id)}`, updatedTrack);
  }

  async deleteTrack(id) {
    return this.delete(`/tracks/${encodeURIComponent(id)}`);
  }
}
