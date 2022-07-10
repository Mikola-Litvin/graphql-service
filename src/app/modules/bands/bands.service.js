import { RESTDataSource } from 'apollo-datasource-rest';

export class BandsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3003/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getBands() {
    return this.get(`/bands`);
  }

  async getBand(id) {
    return this.get(`/bands/${encodeURIComponent(id)}`);
  }

  async createBand(newBand) {
    return this.post(`/bands`, newBand,);
  }

  async updateBand(updatedBand) {
    return this.put(`/bands/${encodeURIComponent(updatedBand.id)}`, updatedBand);
  }

  async deleteBand(id) {
    return this.delete(`/bands/${encodeURIComponent(id)}`);
  }
}
