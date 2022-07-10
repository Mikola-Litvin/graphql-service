const albums = async (_source, _args, { dataSources }) => {
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
};

const album = async (_source, { id }, { dataSources }) => {
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
};

const createAlbum = async (_source, args, { dataSources }) => {
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
};

const updateAlbum = async (_source, args, { dataSources }) => {
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
};

const deleteAlbum = async (_source, { id }, { dataSources }) => {
  const result = await dataSources.albumsAPI.deleteAlbum(id);
  
  if (result.deletedCount) {
    return { message: "The genre has been deleted." };
  }
  return { message: "Something went wrong..." };
};

export { albums, album, createAlbum, updateAlbum, deleteAlbum };
