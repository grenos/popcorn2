import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg, makeDashesUrl } from '../../helpers/helperFunctions'
import { RouteComponentProps } from "react-router"
import MovieModal from '../MovieModal/MovieModal'
import chevron from '../../media/img/chevron.png'
import chunk from 'lodash.chunk'


const URL = 'https://image.tmdb.org/t/p/w500/'
interface RouteParams { id: string, param2?: string }

export const UnconnectedTopItems: React.FC<INT.ITopResultsProps & RouteComponentProps<RouteParams>> = ({
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
  isMovieModalOpen,
  openMovieModalRequest,
  SearchItemsActive,
  genreItemsActive
}): JSX.Element => {

  const [movieCounter, setMovieCounter] = useState<number>(1)
  const [serieCounter, setSerieCounter] = useState<number>(1)

  const [genreMovieCounter, setGenreMovieCounter] = useState<number>(1)
  const [genreSerieCounter, setGenreSerieCounter] = useState<number>(1)

  // const [toggleModal, setToggleModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    // return () => {
    if (match.url === '/') {
      sessionStorage.setItem('top_movies', JSON.stringify(movieCounter))
      sessionStorage.setItem('top_series', JSON.stringify(serieCounter))
    } else if (match.url === `/genres/${match.params.id}`) {
      sessionStorage.setItem('genre_movies', JSON.stringify(genreMovieCounter))
      sessionStorage.setItem('genre_series', JSON.stringify(genreSerieCounter))
    } else if (match.url === '/results') {
      return
    }
    // }
  }, [movieCounter, serieCounter, genreMovieCounter, genreSerieCounter, match.url])

  useEffect(() => {
    if (match.url === '/') {
      setMovieCounter(parseInt(sessionStorage.getItem('top_movies') || `1`))
      setSerieCounter(parseInt(sessionStorage.getItem('top_series') || `1`))
    } else if (match.url === `/genres/${match.params.id}`) {
      setGenreMovieCounter(parseInt(sessionStorage.getItem('genre_movies') || `1`))
      setGenreSerieCounter(parseInt(sessionStorage.getItem('genre_series') || `1`))
    } else if (match.url === '/results') {
      return
    }
  }, [])


  const handlePagination = (): void => {
    if (isMovieCatSelected) {

      if (match.url === '/') {
        setMovieCounter(movieCounter => movieCounter + 1)
        getMovies(movieCounter)
      } else if (match.url === `/genres/${match.params.id}`) {
        if (location.pathname === location.state.from) {
          setGenreMovieCounter(genreMovieCounter => genreMovieCounter + 1)
          getMovies(moviesId, genreMovieCounter)
        } else {
          // resets parameters on category change
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
        getSeries(serieCounter)
      } else if (match.url === `/genres/${match.params.id}`) {
        if (location.pathname === location.state.from) {
          setGenreSerieCounter(genreSerieCounter => genreSerieCounter + 1)
          getSeries(seriesId, genreSerieCounter)
        } else {
          // resets parameters on category change
          history.push({ state: { from: location.pathname } })
          setGenreSerieCounter(1)
          setGenreSerieCounter(genreSerieCounter => genreSerieCounter + 1)
        }
      } else if (match.url === 'results') {
        return
      }
    }
  }

  const handleModalStates = (id: number, index: number) => {
    setSelectedId(id)
    setSelectedIndex(index)
    openMovieModalRequest(true)
    // setToggleModal(toggleModal => !toggleModal)
  }


  const handleModal = (
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    index: number,
  ) => {
    if (id === selectedId && index === selectedIndex) {
      return <MovieModal
        id={id} backdrop_path={backdrop_path} title={title} overview={overview} />
    }
  }



  const renderMovies = (): JSX.Element[] => {
    return (
      chunk(movies, 7).map((arr: any, index: number) => {
        return (
          <div key={index}>
            <div className="row">
              {
                arr.map((movie: any) => (
                  <div className="loc-wrapper" key={movie.id}>
                    <div className="locandina-outer" data-test="locandina-movie" >
                      {/* <Link to={`/title/${makeDashesUrl(movie.title)}`}> */}
                      <img src={filterNoImg(URL, movie.poster_path, popcorn)} alt={`${movie.title}`} />
                      <div className="overlay-gallery">
                        <div className="chevron" onClick={() => handleModalStates(movie.id, index)}>
                          <img src={chevron} alt="open modal" />
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="modal-wrapper">
              {
                movies.map(({ id, backdrop_path, title, overview }) => {
                  return (
                    isMovieModalOpen && handleModal(id, backdrop_path, title, overview, index)
                  )
                })
              }
            </div>
          </div>
        )
      })
    )
  }

  const renderSeries = (): JSX.Element[] => {
    return (
      chunk(series, 7).map((arr: any, index: number) => {
        return (
          <div key={index}>
            <div className="row">
              {
                arr.map((serie: any) => (
                  <div className="loc-wrapper" key={serie.id}>
                    <div className="locandina-outer" data-test="locandina-movie" >
                      {/* <Link to={`/title/${makeDashesUrl(movie.title)}`}> */}
                      <img src={filterNoImg(URL, serie.poster_path, popcorn)} alt={`${serie.name}`} />
                      <div className="overlay-gallery">
                        <div className="chevron" onClick={() => handleModalStates(serie.id, index)}>
                          <img src={chevron} alt="open modal" />
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="modal-wrapper">
              {
                series.map(({ id, backdrop_path, name, overview }) => {
                  return (
                    isMovieModalOpen && handleModal(id, backdrop_path, name, overview, index)
                  )
                })
              }
            </div>
          </div>
        )
      })
    )
  }

  const renderTitles = isMovieCatSelected ? renderMovies() : renderSeries()

  return (
    <div className="locandine-wrapper" data-test="component-locandine" style={{ marginTop: TopItemsActive ? '-11%' : 0 }}>
      <div className="render-locandine-inner" >
        {renderTitles}
      </div>
      <Waypoint onEnter={handlePagination} fireOnRapidScroll={true} topOffset="-50%" />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    TopItemsActive: state.uiReducer.TopItemsActive,
    SearchItemsActive: state.uiReducer.SearchItemsActive,
    genreItemsActive: state.uiReducer.genreItemsActive,
    isMovieModalOpen: state.uiReducer.isMovieModalOpen
  }
}

export default withRouter(connect(mapStateToProps, { openMovieModalRequest })(UnconnectedTopItems))

