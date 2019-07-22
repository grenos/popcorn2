import React from 'react'
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


const URL = 'https://image.tmdb.org/t/p/original'

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
  removeFavSerieRequest
}): JSX.Element => {

  const handleGoToMovie = (id: number, title: string, ): void => {
    relatedMovieSelected(true)
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



  const haandleFavMovieImg = (id: number): JSX.Element => {
    let itemId: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      itemId.push(item.id);
    })

    if (itemId.includes(id)) {
      return <span>Remove from list</span>
    } else {
      return <span>Add to list</span>
    }
  }

  const haandleFavSerieImg = (id: number): JSX.Element => {
    let itemId: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favSeries.map(item => {
      itemId.push(item.id);
    })

    if (itemId.includes(id)) {
      return <span>Remove from list</span>
    } else {
      return <span>Add to list</span>
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
                searchMovies.slice(0, 1).map(({ id, backdrop_path, title, overview, genre_ids }) => {
                  return (
                    <div
                      key={id}
                      className="highlight-outer"
                      data-test="movie-highlight-outer"
                      style={{ backgroundImage: `url(${URL + backdrop_path})` }}
                    >
                      <div className="highlight-content">
                        <div className="info-wrapper-highlight">
                          <h3>{title}</h3>
                          <p>{overview}</p>
                          <div className="cta">
                            <button onClick={() => handleGoToMovie(id, title)} data-test="cta-details">
                              Detials
                            </button>
                            <button
                              onClick={() => handleMovieFavs(id, backdrop_path, genre_ids[0], title)}>
                              {haandleFavMovieImg(id)}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                searchSeries.slice(0, 1).map(({ id, backdrop_path, name, overview, genre_ids }) => {
                  return (
                    <div
                      key={id}
                      className="highlight-outer"
                      data-test="serie-highlight-outer"
                      style={{ backgroundImage: `url(${URL + backdrop_path})` }}
                    >
                      <div className="highlight-content">
                        <div className="info-wrapper-highlight">
                          <h3>{name}</h3>
                          <p>{overview}</p>
                          <div className="cta">
                            <button onClick={() => handleGoToSerie(id, name)} data-test="cta-details">
                              Detials
                            </button>
                            <button onClick={() => handleSerieFavs(id, backdrop_path, genre_ids[0], name)}>
                              {haandleFavSerieImg(id)}
                            </button>
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
    searchMovies: state.moviesReducer.searchMovies,
    searchSeries: state.seriesReducer.searchSeries,
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries
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


