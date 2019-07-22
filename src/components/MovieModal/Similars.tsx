import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
import Carousel from 'nuka-carousel';
import { filterNoImg } from '../../helpers/helperFunctions'
import * as INT from '../../helpers/interfaces'
import { getMovieInfoModalRequest, getSerieInfoModalRequest } from '../../redux/actions/apiActions'
import { openSimilarSectionRequest, relatedMovieSelected } from '../../redux/actions/uiActions'
import close from '../../media/img/close.png'
import popcorn from '../../media/img/popcorn.png'

const URL = 'https://image.tmdb.org/t/p/w500/'

const params = {
  dragging: false,
  swiping: false,
  slidesToShow: 7,
  slidesToScroll: 7,
  height: '100%',
  width: '100%',
}

interface LocalState { activeHover: number, toggleHover: boolean }

export class UnconnectedSimilarItems extends Component<INT.ISimilarProps & RouteComponentProps, LocalState>{

  constructor(props: INT.ISimilarProps) {
    super(props)

    this.state = {
      activeHover: 0,
      toggleHover: false
    }

    this.handleCloseVideo = this.handleCloseVideo.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  handleCloseVideo(): void {
    this.props.openSimilarSectionRequest(false)
  }

  handleHover(id: number): void {
    this.setState({ activeHover: id, })
    this.setState(prevState => ({
      toggleHover: !prevState.toggleHover
    }))
  }

  handleLocaClick(id: number, title: string): void {
    if (this.props.isMovieCatSelected) {
      this.props.relatedMovieSelected(true)
      this.props.getMovieInfoModalRequest(id, title)
    } else {
      this.props.relatedMovieSelected(false)
      this.props.getSerieInfoModalRequest(id, title)
    }
    //! called from saga instead
    // this.props.history.push(`/title/${makeDashesUrl(title)}`)
    // this.props.openSimilarSectionRequest(false)
  }

  render() {
    let { videos, animation } = this.props
    let { toggleHover, activeHover } = this.state

    if (videos === undefined) {
      return null
    } else {
      return (
        <div className="similar-wrapper" style={animation} data-test="component-similars">
          <Carousel {...params}>
            {
              videos.results.map((video) => (
                <div key={video.id} className="similar-item" onClick={() =>
                  this.handleLocaClick(video.id, this.props.isMovieCatSelected ? video.title : video.name)}>
                  <div
                    className={
                      activeHover === video.id
                        && toggleHover
                        ? 'similar-inner-item active'
                        : 'similar-inner-item'
                    }
                    onMouseEnter={() => this.handleHover(video.id)}
                    onMouseLeave={() => this.handleHover(video.id)}
                  >
                    <div className="img-overlay"></div>
                    <img src={filterNoImg(URL, video.poster_path, popcorn)}
                      alt={`${this.props.isMovieCatSelected ? video.title : video.name}`} />
                  </div>
                </div>
              ))
            }
          </Carousel>
          <div className="close" onClick={this.handleCloseVideo}>
            <img src={close} alt="close" />
          </div>
        </div>
      )
    }
  }
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    isSerieCatSelected: state.uiReducer.isSerieCatSelected,
    isRelatedMovieSelected: state.uiReducer.isRelatedMovieSelected
  }
}


export default withRouter(connect(
  mapStateToProps,
  {
    getMovieInfoModalRequest,
    getSerieInfoModalRequest,
    openSimilarSectionRequest,
    relatedMovieSelected
  }
)(UnconnectedSimilarItems))











