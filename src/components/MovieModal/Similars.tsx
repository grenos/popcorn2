import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router";
import Carousel from 'nuka-carousel';
import { filterNoImg } from '../../helpers/helperFunctions'
import * as INT from '../../helpers/interfaces'
import { getMovieInfoRequest, getSerieInfoRequest } from '../../redux/actions/apiActions'
import { openSimilarSectionRequest } from '../../redux/actions/uiActions'
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
    }));
  }

  handleLocaClick(id: number): void {
    if (this.props.isMovieCatSelected) {
      this.props.getMovieInfoRequest(id)
    } else {
      this.props.getSerieInfoRequest(id)
    }
    this.props.history.push('/title')
    this.props.openSimilarSectionRequest(false)
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
              videos.results.map(({ id, title, poster_path }) => (
                <div key={id} className="similar-item" onClick={() => this.handleLocaClick(id)}>
                  <div
                    className={
                      activeHover === id
                        && toggleHover
                        ? 'similar-inner-item active'
                        : 'similar-inner-item'
                    }
                    onMouseEnter={() => this.handleHover(id)}
                    onMouseLeave={() => this.handleHover(id)}
                  >
                    <div className="img-overlay"></div>
                    <img src={filterNoImg(URL, poster_path, popcorn)} alt={`${title}`} />
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
    isSerieCatSelected: state.uiReducer.isSerieCatSelected
  }
}


export default withRouter(connect(
  mapStateToProps,
  {
    getMovieInfoRequest,
    getSerieInfoRequest,
    openSimilarSectionRequest,
  }
)(UnconnectedSimilarItems))











