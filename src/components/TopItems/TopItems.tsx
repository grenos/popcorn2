import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { openMovieModalRequest } from '../../redux/actions/uiActions'
import { Transition, config, animated as a } from 'react-spring/renderprops.cjs'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import { RouteComponentProps } from "react-router"
import chevron from '../../media/img/chevron.png'
import chunk from 'lodash.chunk'
import MovieModal from '../MovieModal/MovieModal'


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
  isMovieModalOpen,
  openMovieModalRequest,
}): JSX.Element => {

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
    // this needs to be on the return (C.D.U.) otherwise pagination doesnt work
    return () => {
      if (match.url === '/') {
        sessionStorage.setItem('top_movies', JSON.stringify(movieCounter))
        sessionStorage.setItem('top_series', JSON.stringify(serieCounter))
      } else if (match.url === `/genres/${match.params.id}`) {
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
    } else if (match.url === `/genres/${match.params.id}`) {
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
          getMovies!(moviesId, genreMovieCounter, match.params.id.toLowerCase())
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
          getSeries!(seriesId, genreSerieCounter, match.params.id.toLowerCase())
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

  const handleModalStates = (id: number, index: number) => {
    setSelectedId(id)
    setSelectedIndex(index)
    openMovieModalRequest(true)
  }


  const handleModal = (
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    index: number,
  ): JSX.Element | null => {
    if (id === selectedId && index === selectedIndex) {
      return (
        <MovieModal id={id} backdrop_path={backdrop_path} title={title} overview={overview} key={id} />
      )
    } else {
      return null
    }
  }


  const renderMovies = (): JSX.Element[] => {
    return (
      chunk(movies, 7).map((arr: INT.IMovie[], index: number) => (
        <div key={index}>
          <div className="row">
            {
              arr.map((movie: INT.IMovie) => (
                <Transition
                  native
                  items={toggle}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={config.stiff}
                  key={movie.id}
                >
                  {(toggle: boolean) => toggle && (props =>
                    <a.div className="loc-wrapper" onClick={() => handleModalStates(movie.id, index)} style={props}>
                      <div className="locandina-outer" data-test="locandina-movie" >
                        <img src={filterNoImg(URL, movie.poster_path, popcorn)} alt={`${movie.title}`} />
                        <div className="overlay-gallery">
                          <div className="chevron" >
                            <img src={chevron} alt="open modal" />
                          </div>
                        </div>
                      </div>
                    </a.div>
                  )}
                </Transition>
              ))
            }
          </div>
          <div className="modal-wrapper" data-test="component-modal">
            {
              movies!.map(({ id, backdrop_path, title, overview }) => {
                return (
                  handleModal(id, backdrop_path, title, overview, index)
                )
              })
            }
          </div>
        </div>
      )
      )
    )
  }

  const renderSeries = (): JSX.Element[] => {
    return (
      chunk(series, 7).map((arr: INT.ISerie[], index: number) => (
        <div key={index}>
          <div className="row">
            {
              arr.map((serie: INT.ISerie) => (
                <Transition
                  native
                  items={toggle}
                  from={{ opacity: 0 }}
                  enter={{ opacity: 1 }}
                  leave={{ opacity: 0 }}
                  config={config.stiff}
                  key={serie.id}
                >
                  {(toggle: boolean) => toggle && (props =>
                    <a.div className="loc-wrapper" onClick={() => handleModalStates(serie.id, index)} style={props}>
                      <div className="locandina-outer" data-test="locandina-serie" >
                        <img src={filterNoImg(URL, serie.poster_path, popcorn)} alt={`${serie.name}`} />
                        <div className="overlay-gallery">
                          <div className="chevron">
                            <img src={chevron} alt="open modal" />
                          </div>
                        </div>
                      </div>
                    </a.div>
                  )}
                </Transition>
              ))
            }
          </div>
          <div className="modal-wrapper">
            {
              series!.map(({ id, backdrop_path, name, overview }) => {
                return (
                  handleModal(id, backdrop_path, name, overview, index)
                )
              })
            }
          </div>
        </div>
      )
      )
    )
  }

  const renderTitles = isMovieCatSelected ? renderMovies() : renderSeries()


  return (
    <div className="locandine-wrapper" data-test="component-locandine" style={{
      marginTop: TopItemsActive ? '-11%' : '0%'
    }}>
      <div className="render-locandine-inner" >
        {renderTitles}
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
    isMovieModalOpen: state.uiReducer.isMovieModalOpen
  }
}

export default withRouter(connect(mapStateToProps, { openMovieModalRequest })(UnconnectedTopItems))

