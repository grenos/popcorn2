import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import {
  openMovieModalRequest,
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  relatedMovieSelected
} from '../../redux/actions/uiActions'
import {
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
} from '../../redux/actions/apiActions'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import { RouteComponentProps } from "react-router"
import chevron from '../../media/img/chevron.png'
import like from '../../media/img/like.png'
import liked from '../../media/img/liked.png'
import chunk from 'lodash.chunk'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'
import useWindowSize from '@rehooks/window-size';
import CatchAll from '../../components/Error/CatchAll'

const URL = 'https://image.tmdb.org/t/p/w500/'
interface RouteParams {
  name: any; id: string, param2?: string
}

export const UnconnectedTopItems: React.FC<INT.ITopResultsProps & RouteComponentProps<RouteParams>> = React.memo(({
  isMovieCatSelected,
  movies,
  series,
  getMovies,
  getSeries,
  moviesId,
  seriesId,
  location,
  history,
  match,
  TopItemsActive,
  openMovieModalRequest,
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  SearchItemsActive,
  getMovieFavoriteRequest,
  getSerieFavoriteRequest,
  favMovies,
  favSeries,
  removeFavMovieRequest,
  removeFavSerieRequest,
  isUserSignedIn,
  isFetchingTopItems,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  relatedMovieSelected
}): JSX.Element => {

  let ww = useWindowSize();

  const [_WW, set_WW] = useState<number>(0)

  useEffect(() => {
    if (ww.innerWidth > 1024) {
      // 7
      set_WW(7)
    } else if (ww.innerWidth >= 768) {
      // 4
      set_WW(4)
    } else if (ww.innerWidth < 768) {
      // 2
      set_WW(2)
    }
  }, [ww.innerWidth])

  const [movieCounter, setMovieCounter] = useState<number>(1)
  const [serieCounter, setSerieCounter] = useState<number>(1)

  const [genreMovieCounter, setGenreMovieCounter] = useState<number>(1)
  const [genreSerieCounter, setGenreSerieCounter] = useState<number>(1)

  const [selectedId, setSelectedId] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    setToggle(toggle => !toggle)
    return () => {
      setToggle(toggle => !toggle)
    }
  }, [toggle, setToggle])

  useEffect(() => {
    if (match.url === `/genres/films/${match.params.id}`) {
      getToggleMovieCatRequest(true)
      getToggleSerieCatRequest(false)
    } else if (match.url === `/genres/series/${match.params.id}`) {
      getToggleMovieCatRequest(false)
      getToggleSerieCatRequest(true)
    }
  }, [match.url, getToggleMovieCatRequest, getToggleSerieCatRequest, match.params.id])

  useEffect(() => {
    // this needs to be on the return (C.D.U.) otherwise pagination doesnt work
    return () => {
      if (match.url === '/') {
        sessionStorage.setItem('top_movies', JSON.stringify(movieCounter))
        sessionStorage.setItem('top_series', JSON.stringify(serieCounter))
      } else if (
        match.url === `/genres/films/${match.params.id}`
        || match.url === `/genres/series/${match.params.id}`
      ) {
        sessionStorage.setItem('genre_movies', JSON.stringify(genreMovieCounter))
        sessionStorage.setItem('genre_series', JSON.stringify(genreSerieCounter))
      } else if (match.url === '/results') {
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieCounter, serieCounter, genreMovieCounter, genreSerieCounter, match.url])

  useEffect(() => {
    if (match.url === '/') {
      setMovieCounter(parseInt(sessionStorage.getItem('top_movies') || `1`))
      setSerieCounter(parseInt(sessionStorage.getItem('top_series') || `1`))
    } else if (
      match.url === `/genres/films/${match.params.id}`
      || match.url === `/genres/series/${match.params.id}`
    ) {
      setGenreMovieCounter(parseInt(sessionStorage.getItem('genre_movies') || `1`))
      setGenreSerieCounter(parseInt(sessionStorage.getItem('genre_series') || `1`))
    } else if (match.url === '/results') {
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [])

  const handlePagination = (): void => {
    if (isMovieCatSelected) {
      if (match.url === '/') {
        setMovieCounter(movieCounter => movieCounter + 1)
        getMovies!(movieCounter)
      } else if (match.url === `/genres/films/${match.params.id}`) {
        if (location.pathname === location.state.from) {
          setGenreMovieCounter(genreMovieCounter => genreMovieCounter + 1)
          getMovies!(moviesId, genreMovieCounter, match.params.id)
        } else {
          // component mounts here if on genres
          // resets parameters on category change
          // and then falls into above if
          history.push({ state: { from: location.pathname } })
          setGenreMovieCounter(1)
          setGenreMovieCounter(genreMovieCounter => genreMovieCounter + 1)
        }
      } else if (match.url === 'results') {
        return
      }
    } else {

      if (match.url === '/') {
        setSerieCounter(serieCounter => serieCounter + 1)
        getSeries!(serieCounter)
      } else if (match.url === `/genres/series/${match.params.id}`) {
        if (location.pathname === location.state.from) {
          setGenreSerieCounter(genreSerieCounter => genreSerieCounter + 1)
          getSeries!(seriesId, genreSerieCounter, match.params.id)
        } else {
          // component mounts here if on genres
          // resets parameters on category change
          // and then falls into above if
          history.push({ state: { from: location.pathname } })
          setGenreSerieCounter(1)
          setGenreSerieCounter(genreSerieCounter => genreSerieCounter + 1)
        }
      } else if (match.url === 'results') {
        return
      }
    }
  }

  const handleModalStates = (
    id: number, index: number, ...rest: any
  ) => {
    if (ww.innerWidth <= 668) {
      if (isMovieCatSelected) {
        // open movie info modal
        getMovieInfoModalRequest(id, rest[0])
        relatedMovieSelected(true)
      } else {
        // open serie info modal
        getSerieInfoModalRequest(id, rest[0])
        relatedMovieSelected(false)
      }
    } else {
      setSelectedId(id)
      setSelectedIndex(index)
      openMovieModalRequest(true)
    }
  }


  const handleModal = (
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    index: number,
    poster_path: string
  ): JSX.Element | null => {
    if (id === selectedId && index === selectedIndex) {
      return (
        <MovieModal
          id={id}
          backdrop_path={backdrop_path}
          title={title}
          overview={overview}
          key={id}
          poster_path={poster_path}
        />
      )
    } else {
      return null
    }
  }


  const handleMovieFavs = (
    id: number, poster: string, genreId: number, title: string
  ) => {
    (favMovies.length === 0) &&
      getMovieFavoriteRequest({ id, poster, genreId, title })


    if (favMovies.length !== 0) {
      let removedID: boolean = false
      // eslint-disable-next-line array-callback-return
      favMovies.map((item, i) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavMovieRequest(item.id, item.genreId)
            removedID = true
          } else {
            (i + 1 === favMovies.length) &&
              getMovieFavoriteRequest({ id, poster, genreId, title })
          }
        }
      })
    }
  }

  const handleSerieFavs = (
    id: number, poster: string, genreId: number, name: string
  ): void => {
    (favSeries.length === 0) &&
      getSerieFavoriteRequest({ id, poster, genreId, name })

    if (favSeries.length !== 0) {
      let removedID: boolean = false
      // eslint-disable-next-line array-callback-return
      favSeries.map((item, i) => {
        if (!removedID) {
          if (item.id === id) {
            removeFavSerieRequest(item.id, item.genreId)
            removedID = true
          } else {
            (i + 1 === favSeries.length) &&
              getSerieFavoriteRequest({ id, poster, genreId, name })
          }
        }
      })
    }
  }



  const haandleFavMovieImg = (id: number): JSX.Element => {
    let itemId: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      itemId.push(item.id);
    })


    if (itemId.includes(id)) {
      return <img src={liked} alt="remove to favorites" />
    } else {
      return <img src={like} alt="add to favorites" />
    }
  }

  const haandleFavSerieImg = (id: number): JSX.Element => {
    let itemId: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favSeries.map(item => {
      itemId.push(item.id);
    })

    if (itemId.includes(id)) {
      return <img src={liked} alt="remove to favorites" />
    } else {
      return <img src={like} alt="add to favorites" />
    }
  }


  const renderMovies = (): JSX.Element[] => {
    return (
      chunk(movies, _WW).map((arr: INT.IMovie[], index: number) => (
        <div key={index}>
          <div className="row">
            {
              arr.map((movie: INT.IMovie, i) => (
                <CatchAll key={i}>
                  <div className="loc-wrapper" >
                    <div className="locandina-outer" data-test="locandina-movie" >
                      <img src={filterNoImg(URL, movie.poster_path, popcorn)} alt={`${movie.title}`} />
                      <div className="overlay-gallery">
                        <div className="chevron" onClick={() => handleModalStates(movie.id, index, movie.title)}>
                          <img src={chevron} alt="open modal" />
                        </div>
                        <div className="heart"
                          onClick={() => handleMovieFavs(movie.id, movie.backdrop_path, movie.genre_ids[0], movie.title)}>
                          {isUserSignedIn && haandleFavMovieImg(movie.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CatchAll>
              ))
            }
          </div>
          {
            movies!.map(({ id, backdrop_path, title, overview, poster_path }) => {
              return (
                handleModal(id, backdrop_path, title, overview, index, poster_path)
              )
            })
          }
        </div>
      )
      )
    )
  }

  const renderSeries = (): JSX.Element[] => {
    return (
      chunk(series, _WW).map((arr: INT.ISerie[], index: number) => (
        <div key={index}>
          <div className="row">
            {
              arr.map((serie: INT.ISerie, i) => (
                <CatchAll key={i}>
                  <div className="loc-wrapper" key={i}>
                    <div className="locandina-outer" data-test="locandina-serie" >
                      <img src={filterNoImg(URL, serie.poster_path, popcorn)} alt={`${serie.name}`} />
                      <div className="overlay-gallery">
                        <div className="chevron" onClick={() => handleModalStates(serie.id, index, serie.name)}>
                          <img src={chevron} alt="open modal" />
                        </div>
                        <div className="heart" onClick={() => handleSerieFavs(serie.id, serie.backdrop_path, serie.genre_ids[0], serie.name)}>
                          {isUserSignedIn && haandleFavSerieImg(serie.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CatchAll>
              ))
            }
          </div>
          {
            series!.map(({ id, backdrop_path, name, overview, poster_path }) => {
              return (
                handleModal(id, backdrop_path, name, overview, index, poster_path)
              )
            })
          }
        </div>
      )
      )
    )
  }

  const renderTitles = isMovieCatSelected ? renderMovies() : renderSeries()

  return (
    <div className="locandine-wrapper" data-test="component-locandine" style={{
      marginTop:
        TopItemsActive || SearchItemsActive
          ? '-11%'
          : '7%'
    }}>
      <div className="render-locandine-inner" >
        {renderTitles}
      </div>
      <div className="loader-wrapper">
        {isFetchingTopItems && <Loader />}
      </div>
      <Waypoint onEnter={handlePagination} fireOnRapidScroll={true} topOffset="-50%" />
    </div>
  )
})

const mapStateToProps = (state: any) => {
  return {
    TopItemsActive: state.uiReducer.TopItemsActive,
    SearchItemsActive: state.uiReducer.SearchItemsActive,
    genreItemsActive: state.uiReducer.genreItemsActive,
    isMovieModalOpen: state.uiReducer.isMovieModalOpen,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    isUserSignedIn: state.awsReducer.isUserSignedIn,
    isFetchingTopItems: state.uiReducer.isFetchingTopItems
  }
}

export default withRouter(connect(mapStateToProps, {
  openMovieModalRequest,
  getToggleMovieCatRequest,
  getToggleSerieCatRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  relatedMovieSelected
})(UnconnectedTopItems))

