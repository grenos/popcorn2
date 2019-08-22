import React from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import {
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest
} from '../../redux/actions/apiActions'
import { relatedMovieSelected } from '../../redux/actions/uiActions'
import { filterNoImg } from '../../helpers/helperFunctions'
import IMG from '../../media/img/index'
import useWindowSize from '@rehooks/window-size';
import CatchAll from '../../components/Error/CatchAll'

const URL = 'https://image.tmdb.org/t/p/original'
const URL_MOB = 'https://image.tmdb.org/t/p/w500'


/**
 * Visore slider get the first 7 items from movie/serie array to display 
 * @function
 * @param {bool} isMovieCatSelected
 * @param {array} topMovies - gets the first 7 items from movie/serie array to display
 * @param {array} topSeries - gets the first 7 items from movie/serie array to display
 * @param {function} getMovieInfoModalRequest ACTION - calls api to get item info for the title page
 * @param {function} getSerieInfoModalRequest ACTION - calls api to get item info for the title page
 * @param {function} getMovieFavoriteRequest Action - add item to favorites
 * @param {function} removeFavMovieRequest Action - remove item from favorites
 * @param {function} getSerieFavoriteRequest Action - add item to favorites
 * @param {function} removeFavSerieRequest Action - remove item from favorites
 * @param {array} favMovies array of favorites 
 * @param {array} favSeries array of favorites 
 * @param {bool} relatedMovieSelected set to true to render correct movie on title page (false for serie)
 * @param {bool} isUserSignedIn
 * @returns {JSX.Element}
 */
export const UnconnectedVisoreSlider: React.FC<INT.IVisoreProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  favMovies,
  favSeries,
  relatedMovieSelected,
  isUserSignedIn
}): JSX.Element | null => {

  let ww = useWindowSize();

  const params = {
    autoplay: true,
    autoplayInterval: 6000,
    dragging: false,
    slideWidth: 1,
    speed: 1500,
    swiping: false,
    width: '100%',
    height: ww.innerWidth > 1024 ? '100vh' : '77vh',
    wrapAround: true,
    pauseOnHover: false,
  }

  /**
   * calls action to go to title page
   * @function
   * @param id 
   * @param title 
   */
  const handleGoToMovie = (id: number, title: string, ): void => {
    relatedMovieSelected(true)
    getMovieInfoModalRequest(id, title)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(title)}`)
  }

  /**
   * calls action to go to title page
   * @function
   * @param id 
   * @param title 
   */
  const handleGoToSerie = (id: number, name: string, ): void => {
    relatedMovieSelected(false)
    getSerieInfoModalRequest(id, name)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(name)}`)
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


  /**
   * Checks if passed id exists on favorites array 
   * @function
   * @param {number} id
   * @param {string} backdrop_path
   * @param {Array} genre_ids
   * @param {array} rest - movie title and serie name
   * @returns {(JSX.Element | null)} - Returns correct element depending on user status (signin)
   */
  const haandleFavMovieImg = (
    id: number, backdrop_path: string, genre_ids: Array<number>, ...rest: Array<string>
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

  // first seven items of array displayed here
  if (topMovies || topSeries) {
    return (
      <Carousel {...params}
        transitionMode="fade"
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        renderBottomCenterControls={() => null}
        data-test="visore-component"
      >
        {
          isMovieCatSelected ?
            topMovies.slice(0, 7).map(({ id, backdrop_path, poster_path, title, overview, genre_ids }) => {
              return (
                <CatchAll key={id}>
                  <div
                    className="slide-outer"
                    data-test="movie-slide"
                    style={
                      ww.innerWidth > 668
                        ? { backgroundImage: `url(${filterNoImg(URL, backdrop_path, String(IMG.popcorn))})` }
                        : { backgroundImage: `url(${filterNoImg(URL_MOB, poster_path, String(IMG.popcorn))})` }
                    }>
                    <div className="overlay-gallery-1">
                      <div className="overlay-gallery-2">
                        <div className="info-wrapper">
                          {ww.innerWidth > 668 ? <h3>{title}</h3> : null}
                          {ww.innerWidth > 668 ? <p>{overview}</p> : null}
                          <div className="cta">
                            <button onClick={() => handleGoToMovie(id, title)}>
                              Details
                          </button>
                            {haandleFavMovieImg(id, backdrop_path, genre_ids, title)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CatchAll>
              )
            })
            :
            topSeries.slice(0, 7).map(({ id, backdrop_path, poster_path, name, overview, genre_ids }) => {
              return (
                <CatchAll key={id}>
                  <div
                    className="slide-outer"
                    data-test="serie-slide"
                    style={
                      ww.innerWidth > 668
                        ? { backgroundImage: `url(${filterNoImg(URL, backdrop_path, String(IMG.popcorn))})` }
                        : { backgroundImage: `url(${filterNoImg(URL_MOB, poster_path, String(IMG.popcorn))})` }
                    }>
                    >
                    <div className="overlay-gallery-1">
                      <div className="overlay-gallery-2">
                        <div className="info-wrapper">
                          {ww.innerWidth > 668 ? <h3>{name}</h3> : null}
                          {ww.innerWidth > 668 ? <p>{overview}</p> : null}
                          <div className="cta">
                            <button onClick={() => handleGoToSerie(id, name)}>
                              Details
                          </button>
                            {haandleFavMovieImg(id, backdrop_path, genre_ids, name)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CatchAll>
              )
            })

        }
      </Carousel>
    )
  } else {
    return null
  }



}

const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    isUserSignedIn: state.awsReducer.isUserSignedIn
  }
}

export default connect(mapStateToProps, {
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  getMovieFavoriteRequest,
  removeFavMovieRequest,
  getSerieFavoriteRequest,
  removeFavSerieRequest,
  relatedMovieSelected
})(UnconnectedVisoreSlider)


