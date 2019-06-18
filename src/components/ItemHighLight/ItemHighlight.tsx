import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useSpring, animated as a } from 'react-spring'
import * as INT from '../../helpers/interfaces'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { makeDashesUrl } from '../../helpers/helperFunctions'
import chevron from '../../media/img/chevron.png'


const URL = 'https://image.tmdb.org/t/p/original'

export const UnconnectedItemHighlight: React.FC<INT.IHighlightProps & RouteComponentProps> = ({
  isMovieCatSelected,
  history,
  searchMovies,
  searchSeries
}): JSX.Element => {

  const [toggle, setToggle] = useState<boolean>(true)

  const animateChevron = useSpring<INT.IAnimateChevron>({
    transform: toggle ? 'rotate(90deg)' : 'rotate(270deg)',
  })

  const animateHighlight = useSpring<INT.IAnimateHighlight>({
    height: toggle ? '60vh' : '7vh'
  })

  const animateOpacity = useSpring<INT.IAnimateOpacity>({
    opacity: toggle ? 1 : 0
  })

  const handleGoToMovie = (title: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(title)}`)
  }

  const handleGoToSerie = (name: string, id: number): void => {
    history.push(`/title/${makeDashesUrl(name)}`)
  }

  const handleHighlightToggle = () => {
    setToggle(toggle => !toggle)
  }

  return (
    <div className="item-highlight">
      {
        isMovieCatSelected ?
          searchMovies.slice(0, 1).map(({ id, backdrop_path, title, overview }) => {
            return (
              <a.div
                key={id}
                className="highlight-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})`, ...animateHighlight }}
              >
                <div className="highlight-content">
                  <a.div className="highlight-video" style={animateOpacity}>
                    <img src='http://unsplash.it/600/350?random&gravity=center' alt='' />
                  </a.div>
                  <a.div className="info-wrapper-highlight" style={animateOpacity}>
                    <h3>{title}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => handleGoToMovie(title, id)}>
                        Details
                        </button>
                      <button onClick={() => console.log('added')}>
                        Add to list
                        </button>
                    </div>
                  </a.div>
                </div>
                <div className="chevron" onClick={handleHighlightToggle}>
                  <a.img src={chevron} alt="close" style={animateChevron} />
                </div>
              </a.div>
            )
          })
          :
          searchSeries.slice(0, 1).map(({ id, backdrop_path, name, overview }) => {
            return (
              <a.div
                key={id}
                className="highlight-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})`, ...animateHighlight }}
              >
                <div className="highlight-content">
                  <a.div className="highlight-video" style={animateOpacity}>
                    <img src='http://unsplash.it/600/350?random&gravity=center' alt='' />
                  </a.div>
                  <a.div className="info-wrapper-highlight" style={animateOpacity}>
                    <h3>{name}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => handleGoToSerie(name, id)}>
                        Details
                      </button>
                      <button onClick={() => console.log('added')}>
                        Add to list
                      </button>
                    </div>
                  </a.div>
                </div>
                <div className="chevron" onClick={handleHighlightToggle}>
                  <a.img src={chevron} alt="close" style={animateChevron} />
                </div>
              </a.div>
            )
          })

      }
    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    searchMovies: state.moviesReducer.searchMovies,
    searchSeries: state.seriesReducer.searchSeries
  }
}

export default withRouter(connect(mapStateToProps, null)(UnconnectedItemHighlight))


