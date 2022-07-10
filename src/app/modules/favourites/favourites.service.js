import { RESTDataSource } from 'apollo-datasource-rest';

export class FavouritesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3007/v1';
  }

  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getFavourites() {
    return this.get(`/favourites`);
  }

  async addToFavourites(data) {
    return this.put(`/favourites/add`, data);
  }
}
