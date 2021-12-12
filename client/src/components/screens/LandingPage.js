import React, { useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import dp from '../img/dinesh.jpg'
import dp2 from '../img/vinay.jpg'
import dp3 from '../img/prabhpreet.jpg'
import dp4 from '../img/rohit.jpeg'
import './index.css';
// import dp4 from ''
import Typewriter from 'typewriter-effect';
import aos from 'aos'
import 'aos/dist/aos.css';

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © Chatroom '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function LandingPage() {
  useEffect(() => {
    aos.init();
  }, [])
  return (
    <>
      <div >
        <div id="section_top" className="container-fluid"></div>
        <div className="Main-Heading">

          <Typewriter id="welcom" onInit={(typewriter) => {
            typewriter
              .typeString('Welcome to Chatroom.....')
              .pauseFor(1000)
              .deleteAll()
              .typeString('A place where you can chat with others')
              .pauseFor(1000)
              .start()
          }}

            options={
              {
                loop: true
              }
            }
          >
          </Typewriter>
        </div>
      </div>
      {/* About Us */}
      <section id="about" className="about section-bg" data-aos='zoom-in'>
        <div className="section-title">
          <h4 className="about-head" data-aos='fade-left'>About Chatroom</h4>
          <p>
            Chatroom is a social media website where a user can chat with others. A user can make account through <Link to='/signup'><span style={{ color: "blue" }}>Sign Up </span></Link>
            and can <Link to='/signin'><span style={{ color: "blue" }}>Sign In</span></Link> to their account,
            where he/she can do group chat as well as one-to-one chat.
            <br /><br /><p data-aos='fade-left'>This project is made only for learning purpose and technologies that are used
              for developing this website are React, Flask, Postgres and for Authentication
              and Authorization Json Web Token (JWT) is used.</p>
          </p>
        </div>
      </section>

      <section id="team" className="team section-bg">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h4 className="team-head" >Meet our Developer</h4>
          </div>

          <div className="row d-flex justify-content-between">
            <div className="card text-center" style={{width: '13rem'}} data-aos="zoom-in" data-aos-delay="100">
              <img src={dp} className="card-img-top" id="dp" alt="..."/>
              <div className ="card-body">
              <h5 className ="card-title">Dinesh Kumar</h5>
              <p className ="card-text">Full Stack Developer</p>
              <div className="social d-flex justify-content-around">
                    <a className="zoom"  href="https://twitter.com/DineshK36886483"><TwitterIcon /></a>
                    <a className="zoom" href="https://www.facebook.com/profile.php?id=100004240934379"><FacebookIcon /></a>
                    <a className="zoom" href="https://github.com/dk-dinesh"><GitHubIcon /></a>
                    <a className="zoom" href="https://www.linkedin.com/in/dinesh-kumar-743990167/"> <LinkedInIcon /> </a>
                  </div>
              </div>
            </div>
            <div className="card text-center" style={{width: '13rem'}} data-aos="zoom-in" data-aos-delay="100">
              <img src={dp2} className="card-img-top" id="dp" alt="..."/>
              <div className ="card-body">
              <h5 className ="card-title">Vinay Chauhan</h5>
              <p className ="card-text">Full Stack Developer</p>
              <div className="social d-flex justify-content-around">
                    <a className="zoom"  href="https://twitter.com"><TwitterIcon /></a>
                    <a className="zoom" href="https://www.facebook.com"><FacebookIcon /></a>
                    <a className="zoom" href="https://github.com/"><GitHubIcon /></a>
                    <a className="zoom" href="https://www.linkedin.com"> <LinkedInIcon /> </a>
                  </div>
              </div>
            </div>
            <div className="card text-center" style={{width: '13rem'}} data-aos="zoom-in" data-aos-delay="100">
              <img src={dp3} className="card-img-top" id="dp" alt="..."/>
              <div className ="card-body">
              <h5 className ="card-title">Prabhpreet Singh</h5>
              <p className ="card-text">Full Stack Developer</p>
              <div className="social d-flex justify-content-around">
                    <a className="zoom"  href="https://twitter.com"><TwitterIcon /></a>
                    <a className="zoom" href="https://www.facebook.com"><FacebookIcon /></a>
                    <a className="zoom" href="https://github.com/"><GitHubIcon /></a>
                    <a className="zoom" href="https://www.linkedin.com"> <LinkedInIcon /> </a>
                  </div>
              </div>
            </div>
            <div className="card text-center" style={{width: '13rem'}} data-aos="zoom-in" data-aos-delay="100">
              <img src={dp4} className="card-img-top" id="dp" alt="..."/>
              <div className ="card-body">
              <h5 className ="card-title">Rohit Kashyap</h5>
              <p className ="card-text">Full Stack Developer</p>
              <div className="social d-flex justify-content-around">
                    <a className="zoom"  href="https://twitter.com"><TwitterIcon /></a>
                    <a className="zoom" href="https://www.facebook.com"><FacebookIcon /></a>
                    <a className="zoom" href="https://github.com/"><GitHubIcon /></a>
                    <a className="zoom" href="https://www.linkedin.com"> <LinkedInIcon /> </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="footer" >
        <Copyright />
      </section>

    </>
  )
}