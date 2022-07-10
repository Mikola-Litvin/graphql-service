const genres = async (_source, _args, { dataSources }) => {
  const result = await dataSources.genresAPI.getGenres();
  return result.items.map(genre => ({ ...genre, id: genre._id }));
};

const genre = async (_source, { id }, { dataSources }) => {
  const genre = await dataSources.genresAPI.getGenre(id);
  return { ...genre, id: genre._id };
};

const createGenre = async (_source, args, { dataSources }) => {
  const newGenre = await dataSources.genresAPI.createGenre({ ...args });
  return { ...newGenre, id: newGenre._id }
};

const updateGenre = async (_source, args, { dataSources }) => {
  const updatedGenre = await dataSources.genresAPI.updateGenre({ ...args });
  return { ...updatedGenre, id: updatedGenre._id }
};

const deleteGenre = async (_source, { id }, { dataSources }) => {
  const result = await dataSources.genresAPI.deleteGenre(id);
  
  if (result.deletedCount) {
    return { message: "The genre has been deleted." };
  }
  return { message: "Something went wrong..." };
};

export { genres, genre, createGenre, updateGenre, deleteGenre };
