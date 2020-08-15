import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDonate,
  faPlay,
  faEnvelopeSquare,
  
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitterSquare,
  faFacebookSquare,
  faLinkedin, 
  faInstagram,
} from '@fortawesome/fontawesome-free-brands';
import './Samaritans.css';
import Screenshot from './Video_Screenshot.png';
import Outside from './2045IT-B7-008.jpg';
import Inside from './2045IT-B5-241.jpg';
import ClipBoard from './2046US-C7-203.jpg';
import Logo from './samaritans-logo.jpg';
export default class Samaritans extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //     };
  // }
  render() {
    return (
      <div>
        <header>
          <div>
            <img className='logo' src={Logo}></img>
          </div>

          <h1>Responding to Coronavirus</h1>
        </header>
        <main className='main-sam'>
          <div>
            <div className='footer-icons top-icons'>
            <FontAwesomeIcon id='foooter-icon' icon={faFacebookSquare} />
            <FontAwesomeIcon id='foooter-icon' icon={faTwitterSquare} />
            <FontAwesomeIcon id='foooter-icon' icon={faLinkedin} />
            <FontAwesomeIcon id='foooter-icon' icon={faInstagram} />

            <FontAwesomeIcon id='foooter-icon' icon={faEnvelopeSquare} />
            </div>
            <h2 className='intro'>
              Samaritan’s Purse continues to help alleviate suffering during the
              COVID-19 crisis.
            </h2>
            <div className='container'>
              <div className='cont-pic'>
              <div className='video-container'>
                <FontAwesomeIcon
                  id='play-icon'
                  className='play-button'
                  icon={faPlay}
                />
                <img src={Screenshot} />
              </div>
              <button>
                <FontAwesomeIcon
                  id='donate-icon'
                  className='donate'
                  icon={faDonate}
                />
                Emergency Medicine - 013759
              </button>
              </div>
              <p className='text'>
                {' '}
                Each of our 16 field offices around the world, as well as our
                four affiliate offices, have launched new efforts or adapted
                projects to support people who are suffering during this global
                pandemic. Among our efforts we are providing food to mothers in
                Iraq, hygiene training in Cambodia, and medical care for migrant
                communities along the Colombia-Venezuela border.{' '} <br></br><br></br>
              {/* </p>
              <p> */}
                Earlier in the year, Samaritan’s Purse deployed Emergency Field
                Hospitals to New York City and Italy in order to provide
                critical care for people seriously ill with COVID-19.
              </p>
            </div>
            <div className='big-container'>
            <div className='container'>
              <div className='cont-pic'>
              <img className='outside-pic' src={Outside}></img>
              </div>
              <p className='text'>
                We operated our respiratory care unit in Central Park from April
                1 to May 5. Through our partnership with the Mount Sinai Health
                System, we treated more than 300 coronavirus patients in New
                York, including 190 at the park site. More than 240 relief
                specialists served at various times on the Disaster Assistance
                Response Team there.<br></br><br></br>
              {/* </p>
              <p> */}
                We ran a similar medical facility outside of Milan, Italy, that
                opened on March 20 and closed May 7. The 14-tent unit was set up
                adjacent to the Cremona Hospital in order to treat an overflow
                of coronavirus patients. Our DC-8 aircraft made two airlifts to
                Italy in order to deliver the hospital, 20 tons of supplies, and
                a large Disaster Assistance Response Team.
              </p>
            </div>
            <div className='container'>
              <div className='cont-pic'>
              <img className='inside-pic' src={ClipBoard}></img>
              <a href='https://www.charitynavigator.org/index.cfm?bay=search.history&orgid=4423'>
                  Learn More
                </a>
              {/* [Learn More Link] */}
              </div>
              <p className='text'>
                Samaritan's Purse stands ready to respond to a medical crisis
                anywhere in the world. We have deployed our Emergency Feld
                Hospital in the aftermath of disasters in Ecuador, Mozambique,
                and the Bahamas. During the battle to liberate Mosul from ISIS
                terror, we set up our mobile medical facility on the Plains of
                Nineveh in Iraq. We have operated Ebola Treatment Centers in
                both Liberia and the Democratic Republic of the Congo. Our
                medical teams also mounted significant deployments in Bangladesh
                to care for people with diphtheria and in Haiti during a cholera
                epidemic following Hurricane Matthew.
              </p>
            </div>
            <div className='bottom-container'>
              <div className='cont-pic'>
              <img className='inside-pic' src={Inside}></img>
              </div>
              <div className='star-section'>
              <p className='rating-p'>4 Star Rating</p>
              <div className='four-stars'>
                <span role='img' aria-label='star'>
                  {' '}
                  ⭐{' '}
                </span>
                <span role='img' aria-label='star'>
                  {' '}
                  ⭐{' '}
                </span>
                <span role='img' aria-label='star'>
                  {' '}
                  ⭐{' '}
                </span>
                <span role='img' aria-label='star'>
                  {' '}
                  ⭐{' '}
                </span>
              </div>
              
              <p>
                Highest rating from{' '}
                <a href='https://www.charitynavigator.org/index.cfm?bay=search.history&orgid=4423'>
                  Charity Navigator
                </a>
                .
              </p>
              </div>
            </div>
          </div>
          </div>
        </main>
        <footer>
          <div className='footer-icons'>
            <FontAwesomeIcon id='foooter-icon' icon={faFacebookSquare} />
            <FontAwesomeIcon id='foooter-icon' icon={faTwitterSquare} />
            <FontAwesomeIcon id='foooter-icon' icon={faLinkedin} />
            <FontAwesomeIcon id='foooter-icon' icon={faInstagram} />

            <FontAwesomeIcon id='foooter-icon' icon={faEnvelopeSquare} />



          </div>
          <p style={{ 'font-size': '12px' }}>
            Samaritan's Purse is a 501(c)(3) tax-exempt charity. You can also
            make a donation by mail. Send to: Samaritan’s Purse, PO Box 3000,
            Boone, NC 28607
          </p>
        </footer>
      </div>
    );
  }
}
