import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'
import { openMoreInfoRequest } from '../../redux/actions/uiActions'
import close from '../../media/img/close.png'



interface LocalState { activeHover: number, toggleHover: boolean }

interface Companies {id: number, name: string}
interface Countries {index: number, name: string}

class MoreInfo extends Component<INT.IMoreInfoProps, LocalState>{

  constructor(props: INT.IMoreInfoProps) {
    super(props)

    this.state = {
      activeHover: 0,
      toggleHover: false
    }

    this.handleCloseVideo = this.handleCloseVideo.bind(this)
  }


  handleCloseVideo(): void {
    this.props.openMoreInfoRequest(false)
  }

  render() {

    let { id, budget, homepage, original_language, original_title, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status } = this.props.info


    if (this.props.info === undefined) {
      return null
    } else {
      return (
        <div className="more-info-wrapper" style={this.props.animation}>
          <div className="more-info-title">
            <h3>{original_title}</h3>
          </div>
          <div className="more-info-wrapper_inner">
            <div className="more-info-wrapper__col">
              <ul>
                <li><a href={homepage}>Website</a></li>
                <li>Original language{original_language}</li>
                <li>Status {status}</li>
                <li>Release date {release_date}</li>
                <li>Total Budget {budget}</li>
                <li>Total Revenue {revenue}</li>
                <li>Run Time {runtime} min.</li>
              </ul>
            </div>
            <div className="more-info-wrapper__col">
              <ul>
                {production_companies.map(({id, name,}: Companies) => <li key={id}>{name}</li>)}
              </ul>
            </div>
            <div className="more-info-wrapper__col">
              <ul>
                {production_countries.map(({index, name,}: Countries) => <li key={index}>{name}</li>)}
              </ul>
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


export default connect(null, {
  openMoreInfoRequest
})(MoreInfo)










