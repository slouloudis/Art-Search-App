import React, { Component } from 'react'
import './landingPage.css'
import splashDesktop from '../asset/landingPage_Splash_2880.png'
import splashMobile from '../asset/landingPage_Splash_mobile_800.png'
import { Link } from 'react-router-dom';

export class landingPage extends Component {
  render() {
    return (
      <div>
        <h1 className="lp--header--title">Ja, Nee</h1>
          <p className="lp--p--subtitle">Art Board</p>
        <div className="lp--parent--container">
          <img className="lp--splash--img"
            src={splashMobile}
            srcSet={`${splashMobile} 800w, ${splashDesktop} 2880w`}
            sizes="(max-width: 600px) 100vw, (max-width: 2560px) 100vw"
            alt="A painting of a woman from Alma Tadema"
          />
          <div className="lp--buttons">
            <Link to="/signup">
              <button>Sign In | Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default landingPage