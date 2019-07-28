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
import popcorn from '../../media/img/popcorn.png'

const URL = 'https://image.tmdb.org/t/p/original'

const params = {
  autoplay: true,
  autoplayInterval: 6000,
  dragging: false,
  slideWidth: 1,
  speed: 1500,
  swiping: false,
  width: '100%',
  height: '100vh',
  wrapAround: true,
  pauseOnHover: false,
}

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
}): JSX.Element => {

  const handleGoToMovie = (id: number, title: string, ): void => {
    relatedMovieSelected(TextTrackCueList)
    getMovieInfoModalRequest(id, title)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleGoToSerie = (id: number, name: string, ): void => {
    relatedMovieSelected(false)
    getSerieInfoModalRequest(id, name)
    //! called from saga
    // history.push(`/title/${makeDashesUrl(name)}`)
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
          topMovies.slice(0, 7).map(({ id, backdrop_path, title, overview, genre_ids }) => {
            return (
              <div
                key={id}
                className="slide-outer"
                data-test="movie-slide"
                style={{ backgroundImage: `url(${filterNoImg(URL, backdrop_path, popcorn)})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{title}</h3>
                      <p>{overview}</p>
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
            )
          })
          :
          topSeries.slice(0, 7).map(({ id, backdrop_path, name, overview, genre_ids }) => {
            return (
              <div
                key={id}
                className="slide-outer"
                data-test="serie-slide"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="overlay-gallery-1">
                  <div className="overlay-gallery-2">
                    <div className="info-wrapper">
                      <h3>{name}</h3>
                      <p>{overview}</p>
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
            )
          })

      }
    </Carousel>
  )
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


