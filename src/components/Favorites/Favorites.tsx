import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import {
  removeFavMovieRequest,
  removeFavSerieRequest,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest
} from '../../redux/actions/apiActions'
import { relatedMovieSelected } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'
import { filterNoImg } from '../../helpers/helperFunctions'
import popcorn from '../../media/img/popcorn.png'
import close from '../../media/img/close.png'
import info from '../../media/img/info.png'

const URL = 'https://image.tmdb.org/t/p/w500'

export const UnconnectedFavorites: React.FC<INT.IFavorites & RouteComponentProps> = ({
  favArrays,
  removeFavMovieRequest,
  removeFavSerieRequest,
  favMovies,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  relatedMovieSelected
}): JSX.Element => {

  const { action_items,
    adventure,
    animation,
    comedy,
    crime,
    documentary,
    drama,
    family,
    fantasy,
    history,
    horror,
    music,
    mystery,
    romance,
    science_fiction,
    tv_movie,
    thriller,
    war,
    western,
    news,
    reality,
    soap,
    talk } = favArrays


  const handleRemoveFavs = (id: number, genreId: number) => {

    const movieIds: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      movieIds.push(item.id)
    })

    if (movieIds.includes(id)) {
      removeFavMovieRequest(id, genreId)
    } else {
      removeFavSerieRequest(id, genreId)
    }
  }


  const handleLocaClick = (id: number, title: string): void => {

    const movieIds: Array<number> = []
    // eslint-disable-next-line array-callback-return
    favMovies.map(item => {
      movieIds.push(item.id)
    })


    if (movieIds.includes(id)) {
      relatedMovieSelected(true)
      getMovieInfoModalRequest(id, title)
    } else {
      relatedMovieSelected(false)
      getSerieInfoModalRequest(id, title)
    }

    //! called from saga instead
    // this.props.history.push(`/title/${makeDashesUrl(title)}`)
  }


  return (
    <div className="favorites-wrapper">

      {action_items.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Action</h2></div>
        <div className="favorites__inner-row">
          {action_items.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {adventure.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Adventure</h2></div>
        <div className="favorites__inner-row">
          {adventure.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {animation.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Animation</h2></div>
        <div className="favorites__inner-row">
          {animation.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {comedy.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Comedies</h2></div>
        <div className="favorites__inner-row">
          {comedy.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {crime.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Crime</h2></div>
        <div className="favorites__inner-row">
          {crime.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {documentary.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Documentaries</h2></div>
        <div className="favorites__inner-row">
          {documentary.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {drama.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Dramas</h2></div>
        <div className="favorites__inner-row">
          {drama.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {family.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Family</h2></div>
        <div className="favorites__inner-row">
          {family.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {fantasy.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Fantasy</h2></div>
        <div className="favorites__inner-row">
          {fantasy.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {history.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>History</h2></div>
        <div className="favorites__inner-row">
          {history.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {horror.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Horror</h2></div>
        <div className="favorites__inner-row">
          {horror.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {music.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Music</h2></div>
        <div className="favorites__inner-row">
          {music.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {mystery.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Mystery</h2></div>
        <div className="favorites__inner-row">
          {mystery.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {romance.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Romance</h2></div>
        <div className="favorites__inner-row">
          {romance.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {science_fiction.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Science Fiction</h2></div>
        <div className="favorites__inner-row">
          {science_fiction.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {tv_movie.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Tv Movies</h2></div>
        <div className="favorites__inner-row">
          {tv_movie.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {thriller.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Thrillers</h2></div>
        <div className="favorites__inner-row">
          {thriller.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {war.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>War</h2></div>
        <div className="favorites__inner-row">
          {war.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {western.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Westerns</h2></div>
        <div className="favorites__inner-row">
          {western.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {news.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>News</h2></div>
        <div className="favorites__inner-row">
          {reality.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {soap.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Soap Operas</h2></div>
        <div className="favorites__inner-row">
          {soap.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

      {talk.length > 0 ? <div className="row-fav">
        <div className="row-fav__title"><h2>Talk Shows</h2></div>
        <div className="favorites__inner-row">
          {talk.map((item: any) => {
            return (
              <div className="favorites__loc-wraper" key={item.id}>
                <div className="favorites__loc-img">
                  <img src={filterNoImg(URL, item.poster, popcorn)} alt="" />
                </div>
                <div className="favorites__heart"
                  onClick={() => handleRemoveFavs(item.id, item.genreId)}>
                  <img src={close} alt="remove to favorites" />
                </div>
                <div className="favorites__info"
                  onClick={() => handleLocaClick(item.id, item.title)}>
                  <img src={info} alt="item info" />
                </div>
              </div>
            )
          })}
        </div>
      </div> : null}

    </div>
  )
}



const mapStateToProps = (state: any) => {
  return {
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    favArrays: state.favoritesReducer,
    isMovieCatSelected: state.uiReducer.isMovieCatSelected
  }
}

export default withRouter(connect(mapStateToProps, {
  removeFavMovieRequest,
  removeFavSerieRequest,
  getMovieInfoModalRequest,
  getSerieInfoModalRequest,
  relatedMovieSelected
})(UnconnectedFavorites))






