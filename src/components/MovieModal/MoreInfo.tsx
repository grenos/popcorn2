import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openMoreInfoRequest } from '../../redux/actions/uiActions'
import close from '../../media/img/close.png'
import Scrollbar from "react-scrollbars-custom"


interface Companies { id: number, name: string }
interface Countries { index: number, name: string }

export class UnconnectedMoreInfo extends Component<INT.IMoreInfoProps>{

  constructor(props: INT.IMoreInfoProps) {
    super(props)
    this.handleCloseVideo = this.handleCloseVideo.bind(this)
  }

  handleCloseVideo(): void {
    this.props.openMoreInfoRequest(false)
  }

  render() {

    let { budget, homepage, original_language, original_title, production_companies, production_countries, release_date, revenue, runtime, status } = this.props.info

    if (this.props.info === undefined) {
      return null
    } else {
      return (
        <div className="more-info-wrapper" style={this.props.animation} data-test="component-moreInfo">
          <div className="more-info-title">
            <h3>{original_title}</h3>
          </div>
          <div className="more-info-wrapper_inner">
            <div className="more-info-wrapper__col">
              <ul>
                <li><a href={homepage}>Website</a></li>
                <li><span>Original language:</span>
                  {original_language}
                </li>
                <li><span>Status:</span>
                  {status}
                </li>
                <li><span>Release date:</span>
                  {release_date}
                </li>
                <li><span>Total Budget:</span>
                  {budget}
                </li>
                <li><span>Total Revenue:</span>
                  {revenue}
                </li>
                <li><span>Run Time:</span>
                  {runtime}
                  <span>min.</span>
                </li>
              </ul>
            </div>
            <div className="more-info-wrapper__col">
              <ul>
                <h5>Production Companies</h5>
                {production_companies.map(({ id, name, }: Companies) => <li key={id}>{name}</li>)}
              </ul>

              <ul>
                <h5>Production Countries</h5>
                {production_countries && production_countries.map(({ name, }: Countries) => <li key={name}>{name}</li>)}
              </ul>
            </div>

            <div className="more-info-wrapper__col--cast">
              <h5>Cast</h5>
              <Scrollbar noDefaultStyles style={{ height: 200 }}>
                {this.props.cast.map(({ name }) => <span key={name}>{name}, </span>)}
              </Scrollbar>
            </div>
          </div>
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
    cast: state.moviesReducer.cast
  }
}


export default connect(mapStateToProps, {
  openMoreInfoRequest
})(UnconnectedMoreInfo)










