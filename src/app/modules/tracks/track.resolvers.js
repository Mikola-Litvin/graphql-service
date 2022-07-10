const tracks = async (_source, _args, { dataSources }) => {
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
};

const track = async (_source, { id }, { dataSources }) => {
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
};

const createTrack = async (_source, args, { dataSources }) => {
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
};

const updateTrack = async (_source, args, { dataSources }) => {
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
};

const deleteTrack = async (_source, { id }, { dataSources }) => {
  const result = await dataSources.tracksAPI.deleteTrack(id);
  
  if (result.deletedCount) {
    return { message: "The genre has been deleted." };
  }
  return { message: "Something went wrong..." };
};

export { tracks, track, createTrack, updateTrack, deleteTrack };
