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

  return (
    <div className="item-highlight">
      {
        isMovieCatSelected ?
          searchMovies.slice(0, 1).map(({ id, backdrop_path, title, overview }) => {
            return (
              <a.div
                key={id}
                className="highlight-outer"
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="highlight-content">
                  <a.div className="highlight-video">
                    <img src='http://unsplash.it/600/350?random&gravity=center' alt='' />
                  </a.div>
                  <a.div className="info-wrapper-highlight">
                    <h3>{title}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => console.log('added')}>
                        Add to list
                        </button>
                    </div>
                  </a.div>
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
                style={{ backgroundImage: `url(${URL + backdrop_path})` }}
              >
                <div className="highlight-content">
                  <a.div className="highlight-video">
                    <img src='http://unsplash.it/600/350?random&gravity=center' alt='' />
                  </a.div>
                  <a.div className="info-wrapper-highlight">
                    <h3>{name}</h3>
                    <p>{overview}</p>
                    <div className="cta">
                      <button onClick={() => console.log('added')}>
                        Add to list
                      </button>
                    </div>
                  </a.div>
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


