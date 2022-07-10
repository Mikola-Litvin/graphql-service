const favourites = async (_source, _args, { dataSources }) => {
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
};

const addArtistToFavourites = async (_source, args, { dataSources }) => {
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
};

const addBandToFavourites = async (_source, args, { dataSources }) => {
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
};

const addGenreToFavourites = async (_source, args, { dataSources }) => {
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
};

const addTrackToFavourites = async (_source, args, { dataSources }) => {
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
};

export { favourites, addArtistToFavourites, addBandToFavourites, addGenreToFavourites, addTrackToFavourites };
