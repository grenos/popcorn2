import React, { useEffect } from 'react'
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux'
// import remove from 'lodash.remove';

const URL = 'https://image.tmdb.org/t/p/original'

const params = {
  autoplay: true,
  autoplayInterval: 6000,
  dragging: false,
  slideWidth: 1,
  speed: 1000,
  swiping: false,
  width: '100%',
  height: '100%',
  wrapAround: true,
  pauseOnHover: false
}

const VisoreSlider = ({ isMovieCatSelected, topMovies, topSeries }) => {

  console.log(topMovies);
  // original_language = ja

  return (
    <Carousel {...params}
      renderCenterLeftControls={() => (
        null
      )}
      renderCenterRightControls={() => (
        null
      )}
    >
      {
        topMovies.slice(0, 7).map(movie => {
          return (
            <div
              key={movie.id}
              className="slide-outer"
              style={{ backgroundImage: `url(${URL + movie.backdrop_path})` }}
            >
              <div className="overlay-gallery-1">
                <div className="overlay-gallery-2">
                  <div className="info-wrapper">
                    <h3>{movie.title}</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro adipisci fugiat dolorum maiores non qui sequi aliquid aspernatur, rerum neque dolores iusto excepturi nesciunt possimus nemo quidem velit dignissimos reprehenderit?
                    </p>
                    <div className="cta">
                      <button onClick={() => console.log('clicked')}>
                        Details
                      </button>
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

const mapStateToProps = (state) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries
  }
}

export default connect(mapStateToProps, null)(VisoreSlider)


