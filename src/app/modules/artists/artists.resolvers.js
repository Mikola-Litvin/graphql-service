const artists = async (_source, _args, { dataSources }) => {
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
};

const artist = async (_source, { id }, { dataSources }) => {
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
};

const createArtist = async (_source, args, { dataSources }) => {
  const newArtist = await dataSources.artistsAPI.createArtist({ ...args, bandsIds: args.bands?.bandsIds });
  const bands = newArtist.bandsIds?.map(async (bandId) => {
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
};

const updateArtist = async (_source, args, { dataSources }) => {
  const updatedArtist = await dataSources.artistsAPI.updateArtist({ ...args, bandsIds: args.bands?.bandsIds });
  const bands = updatedArtist.bandsIds?.map(async (bandId) => {
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
};

const deleteArtist = async (_source, { id }, { dataSources }) => {
  const result = await dataSources.artistsAPI.deleteArtist(id);
  
  if (result.deletedCount) {
    return { message: "The artist has been deleted." };
  }
  return { message: "Something went wrong..." };
};

export { artists, artist, createArtist, updateArtist, deleteArtist };
