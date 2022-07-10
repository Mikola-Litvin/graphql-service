const bands = async (_source, _args, { dataSources }) => {
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
};

const band = async (_source, { id }, { dataSources }) => {
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
};

const createBand = async (_source, args, { dataSources }) => {
  const newBand = await dataSources.bandsAPI.createBand({ ...args, genresIds: args.genres?.genresIds });
  const genres = newBand.genresIds?.map(async (genreId) => {
    const genre = await dataSources.genresAPI.getGenre(genreId);
    return { ...genre, id: genre._id };
  })
  const members = newBand.members?.map(async ({ artist, instrument, years }) => {
    const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
    return { id: _id, firstName, secondName, middleName, instrument, years};
  })
  return { ...newBand, id: newBand._id, genres, members }
};

const updateBand = async (_source, args, { dataSources }) => {
  const updatedBand = await dataSources.bandsAPI.updateBand({ ...args, genresIds: args.genres?.genresIds });
  const genres = updatedBand.genresIds?.map(async (genreId) => {
    const genre = await dataSources.genresAPI.getGenre(genreId);
    return { ...genre, id: genre._id };
  })
  const members = updatedBand.members?.map(async ({ artist, instrument, years }) => {
    const { _id, firstName, secondName, middleName } = await dataSources.artistsAPI.getArtist(artist);
    return { id: _id, firstName, secondName, middleName, instrument, years};
  })
  return { ...updatedBand, id: updatedBand._id, genres, members }
};

const deleteBand = async (_source, { id }, { dataSources }) => {
  const result = await dataSources.bandsAPI.deleteBand(id);
  
  if (result.deletedCount) {
    return { message: "The band has been deleted." };
  }
  return { message: "Something went wrong..." };
};

export { bands, band, createBand, updateBand, deleteBand };
