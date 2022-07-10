const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

class ArtistsAPI extends RESTDataSource {
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

class BandsAPI extends RESTDataSource {
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

class GenresAPI extends RESTDataSource {
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

class TracksAPI extends RESTDataSource {
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

class AlbumsAPI extends RESTDataSource {
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

class FavouritesAPI extends RESTDataSource {
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

class UserAPI extends RESTDataSource {
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

const typeDefs = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  input ArtistInput {
    artistsIds: [String]
  }

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  input BandInput {
    bandsIds: [String]
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  input GenreInput {
    genresIds: [String]
  }

  type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  type Track {
    id: ID!
    title: String!
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  input TrackInput {
    trackIds: [String]
  }

  type Member {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    instrument: String
    years: [String]
  }

  input MemberInput {
    artist: String
    instrument: String
    years: [String]
  }

  type User {
    id: ID!
    firstName: String
    secondName: String
    password: String
    email: String!
  }

  type JWT {
    jwt: String
  }

  type DeleteAction {
    message: String
  }

  type Query {
    jwt(email: String! password: String): JWT
    user(id: ID!): User
    artists: [Artist]
    artist(id: ID!): Artist
    bands: [Band]
    band(id: ID!): Band
    genres: [Genre]
    genre(id: ID!): Genre
    tracks: [Track]
    track(id: ID!): Track
    albums: [Album]
    album(id: ID!): Album
    favourites: Favourites
  }

  type Mutation {
    registerUser(
      firstName: String
      secondName: String
      password: String
      email: String!
    ): User

    createArtist(
      firstName: String
      secondName: String
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bands: BandInput
      instruments: [String]
    ): Artist

    updateArtist(
      id: ID!
      firstName: String
      secondName: String
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bands: BandInput
      instruments: [String]
    ): Artist

    deleteArtist(id: ID!): DeleteAction

    createBand(
      name: String
      origin: String
      members: [MemberInput]
      website: String
      genres: GenreInput
    ): Band

    updateBand(
      id: ID!
      name: String
      origin: String
      members: [MemberInput]
      website: String
      genres: GenreInput
    ): Band

    deleteBand(id: ID!): DeleteAction

    createGenre(
      name: String
      description: String
      country: String
      year: Int
    ): Genre

    updateGenre(
      id: ID!
      name: String
      description: String
      country: String
      year: Int
    ): Genre

    deleteGenre(id: ID!): DeleteAction

    createTrack(
      title: String!
      artists: ArtistInput
      bands: BandInput
      duration: Int
      released: Int
      genres: GenreInput
    ): Track

    updateTrack(
      id: ID!
      title: String!
      artists: ArtistInput
      bands: BandInput
      duration: Int
      released: Int
      genres: GenreInput
    ): Track

    deleteTrack(id: ID!): DeleteAction

    createAlbum(
      name: String
      released: Int
      artists: ArtistInput
      bands: BandInput
      genres: GenreInput
      tracks: TrackInput
      image: String
    ): Album

    updateAlbum(
      id: ID!
      name: String
      released: Int
      artists: ArtistInput
      bands: BandInput
      genres: GenreInput
      tracks: TrackInput
      image: String
    ): Album

    deleteAlbum(id: ID!): DeleteAction

    addArtistToFavourites(artist: String): Favourites
    addBandToFavourites(band: String): Favourites
    addGenreToFavourites(genre: String): Favourites
    addTrackToFavourites(track: String): Favourites
  }
`;

const resolvers = {
  Query: {
    artists: async (_source, _args, { dataSources }) => {
      const result = await dataSources.artistsAPI.getArtists();
      return result.items.map(atrist => {
        const bands = atrist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        })
        return { ...atrist, id: atrist._id, bands };
      });
    },

    artist: async (_source, { id }, { dataSources }) => {
      const artist = await dataSources.artistsAPI.getArtist(id);
      const bands = artist.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });
      return { ...artist, id: artist._id, bands };
    },

    bands: async (_source, _args, { dataSources }) => {
      const result = await dataSources.bandsAPI.getBands();
      return result.items.map(band => {
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });
    },

    band: async (_source, { id }, { dataSources }) => {
      const band = await dataSources.bandsAPI.getBand(id);
      const genres = band.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })
      const members = band.members.map(async ({ artist, instrument, years }) => {
        const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
        return { id: _id, firstName, secondName, middleName, instrument, years};
      })
      return { ...band, id: band._id, genres, members };
    },

    genres: async (_source, _args, { dataSources }) => {
      const result = await dataSources.genresAPI.getGenres();
      return result.items.map(genre => ({ ...genre, id: genre._id }));
    },

    genre: async (_source, { id }, { dataSources }) => {
      const genre = await dataSources.genresAPI.getGenre(id);
      return { ...genre, id: genre._id };
    },

    tracks: async (_source, _args, { dataSources }) => {
      const result = await dataSources.tracksAPI.getTracks();

      return result.items.map(track => {
        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
  
        return { ...track, id: track._id, artists, bands, genres }
      });
    },

    track: async (_source, { id }, { dataSources }) => {
      const track = await dataSources.tracksAPI.getTrack(id);

      const artists = track.artistsIds.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = track.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = track.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      return { ...track, id: track._id, artists, bands, genres };
    },

    albums: async (_source, _args, { dataSources }) => {
      const result = await dataSources.albumsAPI.getAlbums();

      return result.items.map(album => {
        const artists = album.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });

        const bands = album.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });

        const genres = album.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        const tracks = album.trackIds.map(async (trackId) => {
          const track = await dataSources.tracksAPI.getTrack(trackId);

          const artists = track.artistsIds.map(async (artistId) => {
            const artist = await dataSources.artistsAPI.getArtist(artistId);
            const bands = artist.bandsIds.map(async (bandId) => {
              const band = await dataSources.bandsAPI.getBand(bandId);
              const genres = band.genresIds.map(async (genreId) => {
                const genre = await dataSources.genresAPI.getGenre(genreId);
                return { ...genre, id: genre._id };
              })
              const members = band.members.map(async ({ artist, instrument, years }) => {
                const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
                return { id: _id, firstName, secondName, middleName, instrument, years};
              })
              return { ...band, id: band._id, genres, members };
            });
            return { ...artist, id: artist._id, bands };
          });
    
          const bands = track.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
    
          const genres = track.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })

          return { ...track, id: track._id, artists, bands, genres }
        });

        return { ...album, id: album._id, artists, bands, genres, tracks }
      });
    },

    album: async (_source, { id }, { dataSources }) => {
      const album = await dataSources.albumsAPI.getAlbum(id);

      const artists = album.artistsIds.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = album.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = album.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = album.trackIds.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...album, id: album._id, artists, bands, genres, tracks }
    },

    favourites: async (_source, _args, { dataSources }) => {
      const favourites = await dataSources.favouritesAPI.getFavourites();
      
      const artists = favourites.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = favourites.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = favourites.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = favourites.tracksIds?.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...favourites, id: favourites._id, artists, bands, genres, tracks }
    },

    user: async (_source, { id }, { dataSources }) => {
      const user = await dataSources.userAPI.getUser(id);
      return { ...user, secondName: user.lastName, id: user._id };
    },

    jwt: async (_source, { email, password }, { dataSources }) => {
      return dataSources.userAPI.login({ email, password });
    },
  },

  Mutation: {
    createArtist: async (_source, args, { dataSources }) => {
      const newArtist = await dataSources.artistsAPI.createArtist({ ...args, bandsIds: args.bands.bandsIds });
      const bands = newArtist.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      })
      return { ...newArtist, id: newArtist._id, bands }
    },
    
    updateArtist: async (_source, args, { dataSources }) => {
      const updatedArtist = await dataSources.artistsAPI.updateArtist({ ...args, bandsIds: args.bands.bandsIds });
      const bands = updatedArtist.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      })
      return { ...updatedArtist, id: updatedArtist._id, bands }
    },

    deleteArtist: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.artistsAPI.deleteArtist(id);
      
      if (result.deletedCount) {
        return { message: "The artist has been deleted." };
      }
      return { message: "Something went wrong..." };
    },

    createBand: async (_source, args, { dataSources }) => {
      const newBand = await dataSources.bandsAPI.createBand({ ...args, genresIds: args.genres.genresIds });
      const genres = newBand.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })
      const members = newBand.members.map(async ({ artist, instrument, years }) => {
        const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
        return { id: _id, firstName, secondName, middleName, instrument, years};
      })
      return { ...newBand, id: newBand._id, genres, members }
    },
    
    updateBand: async (_source, args, { dataSources }) => {
      const updatedBand = await dataSources.bandsAPI.updateBand({ ...args, genresIds: args.genres?.genresIds });
      const genres = updatedBand.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })
      const members = updatedBand.members.map(async ({ artist, instrument, years }) => {
        const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
        return { id: _id, firstName, secondName, middleName, instrument, years};
      })
      return { ...updatedBand, id: updatedBand._id, genres, members }
    },

    deleteBand: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.bandsAPI.deleteBand(id);
      
      if (result.deletedCount) {
        return { message: "The band has been deleted." };
      }
      return { message: "Something went wrong..." };
    },

    createGenre: async (_source, args, { dataSources }) => {
      const newGenre = await dataSources.genresAPI.createGenre({ ...args });
      return { ...newGenre, id: newGenre._id }
    },
    
    updateGenre: async (_source, args, { dataSources }) => {
      const updatedGenre = await dataSources.genresAPI.updateGenre({ ...args });
      return { ...updatedGenre, id: updatedGenre._id }
    },

    deleteGenre: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.genresAPI.deleteGenre(id);
      
      if (result.deletedCount) {
        return { message: "The genre has been deleted." };
      }
      return { message: "Something went wrong..." };
    },

    createTrack: async (_source, args, { dataSources }) => {
      const newTrack = await dataSources.tracksAPI.createTrack(
        { ...args, artistsIds: args.artists?.artistsIds, bandsIds: args.bands?.bandsIds, genresIds: args.genres?.genresIds }
      );

      const artists = newTrack.artistsIds.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = newTrack.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = newTrack.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      return { ...newTrack, id: newTrack._id, artists, bands, genres }
    },

    updateTrack: async (_source, args, { dataSources }) => {
      const updatedTrack = await dataSources.tracksAPI.updateTrack(
        { ...args, artistsIds: args.artists?.artistsIds, bandsIds: args.bands?.bandsIds, genresIds: args.genres?.genresIds }
      );

      const artists = updatedTrack.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = updatedTrack.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = updatedTrack.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      return { ...updatedTrack, id: updatedTrack._id, artists, bands, genres }
    },

    deleteTrack: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.tracksAPI.deleteTrack(id);
      
      if (result.deletedCount) {
        return { message: "The genre has been deleted." };
      }
      return { message: "Something went wrong..." };
    },

    createAlbum: async (_source, args, { dataSources }) => {
      const newAlbum = await dataSources.albumsAPI.createAlbum(
        { ...args, artistsIds: args.artists?.artistsIds, bandsIds: args.bands?.bandsIds, genresIds: args.genres?.genresIds, trackIds: args.tracks?.trackIds }
      );
      
      const artists = newAlbum.artistsIds.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = newAlbum.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = newAlbum.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = newAlbum.trackIds.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...newAlbum, id: newAlbum._id, artists, bands, genres, tracks }
    },

    updateAlbum: async (_source, args, { dataSources }) => {
      const updatedAlbum = await dataSources.albumsAPI.updateAlbum(
        { ...args, artistsIds: args.artists?.artistsIds, bandsIds: args.bands?.bandsIds, genresIds: args.genres?.genresIds, trackIds: args.tracks?.trackIds }
      );
      
      const artists = updatedAlbum.artistsIds.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = updatedAlbum.bandsIds.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = updatedAlbum.genresIds.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = updatedAlbum.trackIds.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...updatedAlbum, id: updatedAlbum._id, artists, bands, genres, tracks }
    },

    deleteAlbum: async (_source, { id }, { dataSources }) => {
      const result = await dataSources.albumsAPI.deleteAlbum(id);
      
      if (result.deletedCount) {
        return { message: "The genre has been deleted." };
      }
      return { message: "Something went wrong..." };
    },

    addArtistToFavourites: async (_source, args, { dataSources }) => {
      const favourites = await dataSources.favouritesAPI.addToFavourites({ type: 'artists', id: args.artist });
      
      const artists = favourites.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = favourites.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = favourites.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = favourites.tracksIds?.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...favourites, id: favourites._id, artists, bands, genres, tracks }
    },

    addBandToFavourites: async (_source, args, { dataSources }) => {
      const favourites = await dataSources.favouritesAPI.addToFavourites({ type: 'bands', id: args.band });
      
      const artists = favourites.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = favourites.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = favourites.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = favourites.tracksIds?.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...favourites, id: favourites._id, artists, bands, genres, tracks }
    },

    addGenreToFavourites: async (_source, args, { dataSources }) => {
      const favourites = await dataSources.favouritesAPI.addToFavourites({ type: 'genres', id: args.genre });
      
      const artists = favourites.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = favourites.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = favourites.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = favourites.tracksIds?.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...favourites, id: favourites._id, artists, bands, genres, tracks }
    },

    addTrackToFavourites: async (_source, args, { dataSources }) => {
      const favourites = await dataSources.favouritesAPI.addToFavourites({ type: 'tracks', id: args.track });
      
      const artists = favourites.artistsIds?.map(async (artistId) => {
        const artist = await dataSources.artistsAPI.getArtist(artistId);
        const bands = artist.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
        return { ...artist, id: artist._id, bands };
      });

      const bands = favourites.bandsIds?.map(async (bandId) => {
        const band = await dataSources.bandsAPI.getBand(bandId);
        const genres = band.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })
        const members = band.members.map(async ({ artist, instrument, years }) => {
          const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
          return { id: _id, firstName, secondName, middleName, instrument, years};
        })
        return { ...band, id: band._id, genres, members };
      });

      const genres = favourites.genresIds?.map(async (genreId) => {
        const genre = await dataSources.genresAPI.getGenre(genreId);
        return { ...genre, id: genre._id };
      })

      const tracks = favourites.tracksIds?.map(async (trackId) => {
        const track = await dataSources.tracksAPI.getTrack(trackId);

        const artists = track.artistsIds.map(async (artistId) => {
          const artist = await dataSources.artistsAPI.getArtist(artistId);
          const bands = artist.bandsIds.map(async (bandId) => {
            const band = await dataSources.bandsAPI.getBand(bandId);
            const genres = band.genresIds.map(async (genreId) => {
              const genre = await dataSources.genresAPI.getGenre(genreId);
              return { ...genre, id: genre._id };
            })
            const members = band.members.map(async ({ artist, instrument, years }) => {
              const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
              return { id: _id, firstName, secondName, middleName, instrument, years};
            })
            return { ...band, id: band._id, genres, members };
          });
          return { ...artist, id: artist._id, bands };
        });
  
        const bands = track.bandsIds.map(async (bandId) => {
          const band = await dataSources.bandsAPI.getBand(bandId);
          const genres = band.genresIds.map(async (genreId) => {
            const genre = await dataSources.genresAPI.getGenre(genreId);
            return { ...genre, id: genre._id };
          })
          const members = band.members.map(async ({ artist, instrument, years }) => {
            const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
            return { id: _id, firstName, secondName, middleName, instrument, years};
          })
          return { ...band, id: band._id, genres, members };
        });
  
        const genres = track.genresIds.map(async (genreId) => {
          const genre = await dataSources.genresAPI.getGenre(genreId);
          return { ...genre, id: genre._id };
        })

        return { ...track, id: track._id, artists, bands, genres }
      });

      return { ...favourites, id: favourites._id, artists, bands, genres, tracks }
    },

    registerUser: async (_source, { firstName, secondName, password, email }, { dataSources }) => {
      const newUser = await dataSources.userAPI.registerUser({ firstName, lastName: secondName, password, email });
      return { ...newUser, id: newUser._id, secondName: newUser.lastName }
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: () => {
    return {
      artistsAPI: new ArtistsAPI(),
      bandsAPI: new BandsAPI(),
      genresAPI: new GenresAPI(),
      tracksAPI: new TracksAPI(),
      albumsAPI: new AlbumsAPI(),
      favouritesAPI: new FavouritesAPI(),
      userAPI: new UserAPI(),
    };
  },
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});