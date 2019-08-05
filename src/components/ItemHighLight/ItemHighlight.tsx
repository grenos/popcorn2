import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated as a, config } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import {
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest
} from '../../redux/actions/apiActions'
import { relatedMovieSelected } from '../../redux/actions/uiActions'
import Scrollbar from 'react-scrollbars-custom'
import useWindowSize from '@rehooks/window-size';

const URL = 'https://image.tmdb.org/t/p/original'


/**
 * FAvorites component displays categorised favorites
 * @function
 * @param {bool} isMovieCatSelected - self explenatory
 * @param {arrray} searchMovies - Search results of input
 * @param {arrray} searchSeries - Search results of input
 * @param {function} getMovieInfoModalRequest -  Opens title page Action
 * @param {function} getSerieInfoModalRequest - Opens title page Action
 * @param {bool} relatedMovieSelected - Action to set to 'true' to render correct title modal
 * @param {arrray} favSeries - Arrys of object to control against favArrays
 * @param {arrray} favMovies - Arrys of object to control against favArrays
 * @param {function} getMovieFavoriteRequest - Action adds item to favorites
 * @param {function} removeFavMovieRequest - Action removes item from favorites
 * @param {function} getSerieFavoriteRequest - Action removes item from favorites
 * @param {function} removeFavSerieRequest - Action removes item from favorites
 * @param {bool} isUserSignedIn - check if user is signed in
 * @param {object} location - Location object taken from Router
 * @returns {JSX.Element} - Rendered Component 
 */
export const UnconnectedItemHighlight: React.FC<INT.IHighlightProps & RouteComponentProps> = ({
  isMovieCatSelected,
  location,
  searchMovies,
  searchSeries,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  relatedMovieSelected,
  favMovies,
  favSeries,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  isUserSignedIn
}): JSX.Element => {

  let ww = useWindowSize();

  const [_WW, set_WW] = useState<number>(0)

  useEffect(() => {
    if (ww.innerWidth > 1024) {
      // 7
      set_WW(110)
    } else if (ww.innerWidth >= 768) {
      // 4
      set_WW(160)
    }
  }, [ww.innerWidth])


  /**
   * gets data for the action to open title modal
   * @param {number} id 
   * @param {string} title 
   */
  const handleGoToMovie = (id: number, title: string, ): void => {
    relatedMovieSelected(true)
    getMovieInfoModalRequest(id, title)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(title)}`)
  }

  /**
   * gets data for the action to open title modal
   * @param {number} id 
   * @param {string} title 
   */
  const handleGoToSerie = (id: number, name: string, ): void => {
    relatedMovieSelected(false)
    getSerieInfoModalRequest(id, name)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(name)}`)
  }

  /**
   * checks if favorite item exist in state and adds or remove it depending on status
   * @param {number} id - data for the Action
   * @param {string} poster - data for the Action
   * @param {number} genreId - data for the Action
   * @param {string} title - data for the Action
   */
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

  /**
   * checks if favorite item exist in state and adds or remove it depending on status
   * @param {number} id - data for the Action
   * @param {string} poster - data for the Action
   * @param {number} genreId - data for the Action
   * @param {string} title - data for the Action
   */
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


  /**
   * checks if item is already in favorites and renderes right button/heart element
   * @param {number} id 
   * @param {string} backdrop_path 
   * @param {number} genre_ids 
   * @param {string} rest - title OR name of film/serie
   * @returns {JSX.Element} - Right element to render
   */
  const haandleFavMovieImg = (
    id: number, backdrop_path: string, genre_ids: any, ...rest: any
  ): JSX.Element | null => {
    let itemIdM: Array<number> = []
    let itemIdS: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      itemIdM.push(item.id);
    })

    // eslint-disable-next-line array-callback-return
    favSeries.map(item => {
      itemIdS.push(item.id);
    })

    if (isUserSignedIn) {
      if (isMovieCatSelected) {
        if (itemIdM.includes(id)) {
          return (
            <button
              onClick={() => handleMovieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button
              onClick={() => handleMovieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Add to list</span>
            </button>
          )
        }
      } else {
        if (itemIdS.includes(id)) {
          return (
            <button
              onClick={() => handleSerieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Remove from list</span>
            </button>
          )
        } else {
          return (
            <button
              onClick={() => handleSerieFavs(id, backdrop_path, genre_ids[0], rest[0])}>
              <span>Add to list</span>
            </button>
          )
        }
      }
    } else {
      return null
    }
  }


  const animateContainer = useTransition(location.pathname.includes('/results'), null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff
  })

  return (
    <>
      {
        animateContainer.map(
          ({ item, key, props }) => (item &&
            <a.div className="item-highlight" key={key} style={props} data-test="component-highlight">
              {isMovieCatSelected ?
                searchMovies.slice(0, 1).map(({ id, backdrop_path, poster_path, title, overview, genre_ids }) => {
                  return (
                    <div
                      key={id}
                      className="highlight-outer"
                      data-test="movie-highlight-outer"
                      style={
                        ww.innerWidth > 668
                          ? { backgroundImage: `url(${URL + backdrop_path})` }
                          : { backgroundImage: `url(${URL + poster_path})` }}>
                      <div className="highlight-content">
                        <div className="info-wrapper-highlight">
                          {ww.innerWidth > 668 && <h3>{title}</h3>}
                          {ww.innerWidth > 668 && <Scrollbar
                            noDefaultStyles
                            momentum={true}
                            style={{ height: _WW, marginBottom: 20 }}>
                            <p>{overview}</p>
                          </Scrollbar>}
                          <div className="cta">
                            <button onClick={() => handleGoToMovie(id, title)} data-test="cta-details">
                              Details
                            </button>
                            {haandleFavMovieImg(id, backdrop_path, genre_ids, title)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                searchSeries.slice(0, 1).map(({ id, backdrop_path, poster_path, name, overview, genre_ids }) => {
                  return (
                    <div
                      key={id}
                      className="highlight-outer"
                      data-test="serie-highlight-outer"
                      style={
                        ww.innerWidth > 668
                          ? { backgroundImage: `url(${URL + backdrop_path})` }
                          : { backgroundImage: `url(${URL + poster_path})` }}>
                      <div className="highlight-content">
                        <div className="info-wrapper-highlight">
                          {ww.innerWidth > 668 && <h3>{name}</h3>}
                          {ww.innerWidth > 668 && <Scrollbar
                            noDefaultStyles
                            momentum={true}
                            style={{ height: '10%', marginBottom: 20 }}>
                            <p>{overview}</p>
                          </Scrollbar>}
                          <div className="cta">
                            <button onClick={() => handleGoToSerie(id, name)} data-test="cta-details">
                              Details
                            </button>
                            {haandleFavMovieImg(id, backdrop_path, genre_ids, name)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </a.div>
          )
        )
      }
    </>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    searchMovies: state.searchMoviesReducer.searchMovies,
    searchSeries: state.searchSeriesReducer.searchSeries,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    isUserSignedIn: state.awsReducer.isUserSignedIn
  }
}

export default withRouter(connect(mapStateToProps, {
  getSerieInfoModalRequest,
  getMovieInfoModalRequest,
  relatedMovieSelected,
  getMovieFavoriteRequest,
  removeFavSerieRequest,
  getSerieFavoriteRequest,
  removeFavMovieRequest
})(UnconnectedItemHighlight))


