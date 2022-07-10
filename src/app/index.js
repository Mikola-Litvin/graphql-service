import { ApolloServer, gql } from 'apollo-server';
import { AlbumsAPI } from './modules/albums/albums.service.js';
import { ArtistsAPI } from './modules/artists/artists.service.js';
import { BandsAPI } from './modules/bands/bands.service.js';
import { FavouritesAPI } from './modules/favourites/favourites.service.js';
import { GenresAPI } from './modules/genres/genres.service.js';
import { TracksAPI } from './modules/tracks/tracks.service.js';
import { UserAPI } from './modules/users/users.service.js';
import { user, registerUser, jwt } from './modules/users/users.resolvers.js'
import { albums, album, createAlbum, updateAlbum, deleteAlbum } from './modules/albums/albums.resolvers.js'
import { artists, artist, createArtist, updateArtist, deleteArtist } from './modules/artists/artists.resolvers.js'
import { bands, band, createBand, updateBand, deleteBand } from './modules/bands/bands.resolvers.js';
import {
  favourites,
  addArtistToFavourites,
  addBandToFavourites,
  addGenreToFavourites,
  addTrackToFavourites
} from './modules/favourites/favourites.resolvers.js';
import { genres, genre, createGenre, updateGenre, deleteGenre } from './modules/genres/genres.resolvers.js';
import { tracks, track, createTrack, updateTrack, deleteTrack } from './modules/tracks/track.resolvers.js'

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
    albums: [Album]
    album(id: ID!): Album
    artists: [Artist]
    artist(id: ID!): Artist
    bands: [Band]
    band(id: ID!): Band
    genres: [Genre]
    genre(id: ID!): Genre
    tracks: [Track]
    track(id: ID!): Track
    favourites: Favourites
  }

  type Mutation {
    registerUser(
      firstName: String
      secondName: String
      password: String
      email: String!
    ): User

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

    addArtistToFavourites(artist: String): Favourites
    addBandToFavourites(band: String): Favourites
    addGenreToFavourites(genre: String): Favourites
    addTrackToFavourites(track: String): Favourites
  }
`;

const resolvers = {
  Query: {
    albums,
    album,
    artists,
    artist,
    bands,
    band,
    favourites,
    genres,
    genre,
    tracks,
    track,
    user,
    jwt,
  },

  Mutation: {
    createAlbum,
    updateAlbum,
    deleteAlbum,
    createArtist,
    updateArtist,
    deleteArtist,
    createBand,
    updateBand,
    deleteBand,
    createGenre,
    updateGenre,
    deleteGenre,
    createTrack,
    updateTrack,
    deleteTrack,
    addArtistToFavourites,
    addBandToFavourites,
    addGenreToFavourites,
    addTrackToFavourites,
    registerUser,
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