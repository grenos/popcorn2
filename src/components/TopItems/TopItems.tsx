import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint'
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
import BodyVisore from '../BodyVisore/BodyVisore'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const URL = 'https://image.tmdb.org/t/p/w500/'

interface RouteParams {
  name: any; id: string, param2?: string
}

/**
 * Top Items Component - Main component - displays locandine and modal for all pages
 * @function
 * @param {bool} isMovieCatSelected - 
 * @param {array} movies - **GENERIC NAME** - check respective router pages to see array passed
 * @param {array} series - **GENERIC NAME** - check respective router pages to see array passed
 * @param {function} getMovies - **GENERIC NAME** - ACTION check respective router pages to see function passed
 * @param {function} getSeries - **GENERIC NAME** - ACTION check respective router pages to see function passed
 * @param {number} moviesId - Genre id - used to call next pages of genre top items
 * @param {number} seriesId - Genre id - used to call next pages of genre top items
 * @param {object} location -  check current page and router state to determine genre counter for pagination
 * @param {object} history -  used to push new state to router
 * @param {object} match -  to determine current page to set top item OR genre counter
 * @param {bool} TopItemsActive - used for styling purposes
 * @param {function} openMovieModalRequest - ACTION open movie modal on locandina click
 * @param {function} getToggleMovieCatRequest - ACTION makes movies selected category
 * @param {function} getToggleSerieCatRequest - ACTION makes series selected category
 * @param {bool} SearchItemsActive - used for styling purposes
 * @param {function} getMovieFavoriteRequest - ACTION adds movie to favorites
 * @param {function} getSerieFavoriteRequest - ACTION adds serie to favorites
 * @param {array} favMovies - get array of favorites 
 * @param {array} favSeries - get array of favorites  
 * @param {function} removeFavMovieRequest - ACTION remove movie from favorites
 * @param {function} removeFavSerieRequest - ACTION remove serie from favorites
 * @param {bool} isUserSignedIn - chekc if user is signed in (to render elements or not)
 * @param {bool} isFetchingTopItems - used for spinner in TopItems (different from isFetching which is used in AWS)
 * @param {function} getMovieInfoModalRequest - ACTION on locandina click if mobile opens title page instead of movie modal
 * @param {function} getSerieInfoModalRequest - ACTION on locandina click if mobile opens title page instead of movie modal
 * @param {bool} relatedMovieSelected ACTION - set to true to display correct movie on title page (set to false to display correct serie)
 * @returns {JSX.Element}
 */
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


  // used for comparisson to display correct modal info on locandina click
  const [selectedId, setSelectedId] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // const [toggle, setToggle] = useState<boolean>(false)
  // useEffect(() => {
  //   setToggle(toggle => !toggle)
  //   return () => {
  //     setToggle(toggle => !toggle)
  //   }
  // }, [toggle, setToggle])


  // dont remember why i used it
  useEffect(() => {
    if (match.url === `/genres/films/${match.params.id}`) {
      getToggleMovieCatRequest(true)
      getToggleSerieCatRequest(false)
    } else if (match.url === `/genres/series/${match.params.id}`) {
      getToggleMovieCatRequest(false)
      getToggleSerieCatRequest(true)
    }
  }, [match.url, getToggleMovieCatRequest, getToggleSerieCatRequest, match.params.id])

  // sets counter on sessionStorage 
  // so in return to previous page it remebers pagination
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

  // gets counter's info from sessionstorage for pagination
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

  // controls browser history 
  // to set correct counter for pagination
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


  /**
   * if desktop goes to last else and opens modal
   * if mobile opens title page instaed
   * @function
   * @param {number} id 
   * @param {number }index 
   * @param {string} rest - its movie title and serie name
   */
  const handleModalStates = (
    id: number,
    indexMainChunk: number,
    indexRowChunk: number,
    ...rest: Array<string>
  ) => {
    if (ww.innerWidth <= 668) {
      if (isMovieCatSelected) {
        // open movie title page
        getMovieInfoModalRequest(id, rest[0])
        relatedMovieSelected(true)
      } else {
        // open serie ititle page
        getSerieInfoModalRequest(id, rest[0])
        relatedMovieSelected(false)
      }
    } else {
      setSelectedId(id)
      // each chunk makes the rows to start with the same index
      // and this bugs the movie modal order
      // so we give an extreme number to avoid having the same row numbers 
      setSelectedIndex(indexMainChunk + indexRowChunk * 100)
      openMovieModalRequest(true)
    }
  }


  /**
   * Function that return the movie modal component
   * @param {number} id 
   * @param {string} backdrop_path 
   * @param {string} title 
   * @param {string} overview 
   * @param {number} index 
   * @param {string} poster_path 
   * @returns {JSX.Element | null} 
   */
  const handleModal = (
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    indexRowChunk: number,
    indexMainChunk: number,
    poster_path: string
  ): JSX.Element | null => {

    // each chunk makes the rows to start with the same index
    // and this bugs the movie modal order
    // so we give an extreme number to avoid having the same row numbers 
    const newIndex = indexRowChunk + indexMainChunk * 100

    if (id === selectedId && newIndex === selectedIndex) {
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


  /**
   * checks if item exists in favorites If NO adds it / if YES removes it
   * @function
   * @param {number} id 
   * @param {string} poster 
   * @param {number} genreId 
   * @param {string} title 
   */
  const handleMovieFavs = (
    id: number, poster: string, genreId: number, title: string
  ) => {
    // on first load to avoid "length of undefined"
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

  /**
   * checks if item exists in favorites If NO adds it / if YES removes it
   * @function
   * @param {number} id 
   * @param {string} poster 
   * @param {number} genreId 
   * @param {string} title 
   */
  const handleSerieFavs = (
    id: number, poster: string, genreId: number, name: string
  ): void => {
    // on first load to avoid "length of undefined"
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


  const handleLastItemMovie = (
    indexLastChunk: number,
    indexMainChunk: number,
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    genre_ids: any
  ) => {
    if (indexLastChunk === indexMainChunk) {
      return <BodyVisore
        id={id}
        backdrop_path={backdrop_path}
        title={title}
        overview={overview}
        key={id}
        genre_ids={genre_ids}
      />
    } else {
      return null
    }
  }

  const handleLastItemSerie = (
    indexLastChunk: number,
    indexMainChunk: number,
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    genre_ids: any
  ) => {
    if (indexLastChunk === indexMainChunk) {
      return <BodyVisore
        id={id}
        backdrop_path={backdrop_path}
        title={title}
        overview={overview}
        key={id}
        genre_ids={genre_ids}
      />
    } else {
      return null
    }
  }


  // uses lodash/chunk to seperate top items to smaller arrays
  // first chunk is for the body visore last item
  // so every row is consisted of maximum 7 items
  // and the movie modal opens bellow every row for the selected locandina
  const renderMovies = (): JSX.Element[] => {
    return (

      chunk(movies, 43).map((mainChunk: INT.IMovie[], indexMainChunk: number) => (
        <div key={indexMainChunk} className="big-chunk">
          {chunk(mainChunk.slice(0, 42), _WW).map((arr: INT.IMovie[], indexRowChunk: number) => (
            <div key={indexRowChunk}>
              <div className="row">
                {arr.map((movie: INT.IMovie, i) => (
                  <CatchAll key={i}>
                    <div className="loc-wrapper" >
                      <div className="locandina-outer" data-test="locandina-movie" >
                        <LazyLoadImage alt={movie.title} src={filterNoImg(URL, movie.poster_path, popcorn)} />
                        <div className="overlay-gallery">
                          <div className="chevron" onClick={() => handleModalStates(movie.id, indexRowChunk, indexMainChunk, movie.title)}>
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
                ))}
              </div>
              {movies!.map(({ id, backdrop_path, title, overview, poster_path }) => {
                return (
                  handleModal(id, backdrop_path, title, overview, indexRowChunk, indexMainChunk, poster_path)
                )
              })}
            </div>
          ))}
          <>
            {chunk(movies, 43).map((finalItem: INT.IMovie[], indexLastChunk: number) => (
              finalItem.slice(42, 43).map((last: INT.IMovie) => {
                return handleLastItemMovie(indexLastChunk, indexMainChunk, last.id, last.backdrop_path, last.title, last.overview, last.genre_ids)
              })
            ))}
          </>
        </div>
      ))

    )
  }

  // uses lodash/chunk to seperate top items to smaller arrays
  // so every row is consisted of maximum 7 items
  // and the movie modal opens bellow every row for the selected locandina
  const renderSeries = (): JSX.Element[] => {
    return (
      chunk(series, 43).map((mainChunk: INT.ISerie[], indexMainChunk: number) => (
        <div key={indexMainChunk} className="big-chunk">
          {chunk(mainChunk.slice(0, 42), _WW).map((arr: INT.ISerie[], indexRowChunk: number) => (
            <div key={indexRowChunk}>
              <div className="row">
                {
                  arr.map((serie: INT.ISerie, i) => (
                    <CatchAll key={i}>
                      <div className="loc-wrapper" key={i}>
                        <div className="locandina-outer" data-test="locandina-serie" >
                          <LazyLoadImage alt={serie.name} src={filterNoImg(URL, serie.poster_path, popcorn)} />
                          <div className="overlay-gallery">
                            <div className="chevron" onClick={() => handleModalStates(serie.id, indexRowChunk, indexMainChunk, serie.name)}>
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
                    handleModal(id, backdrop_path, name, overview, indexRowChunk, indexMainChunk, poster_path)
                  )
                })}
            </div>
          ))}
          <>
            {chunk(series, 43).map((finalItem: INT.ISerie[], indexLastChunk: number) => (
              finalItem.slice(42, 43).map((last: INT.ISerie) => {
                return handleLastItemSerie(indexLastChunk, indexMainChunk, last.id, last.backdrop_path, last.name, last.overview, last.genre_ids)
              })
            ))}
          </>
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

