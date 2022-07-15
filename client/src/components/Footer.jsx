import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import React from 'react'

export default function Footer() {
    return (
        <div style={{
            textAlign: "center", padding: "15px", width: '75%', backgroundColor: '#212121',
            position: "fixed", bottom: 0
        }}>
            <div className='footer container'>

                <p className="cp-text" style={{ fontSize: 12 }}>
                    Developed by: Suman Jaiswal © 2021 Ninja Worklist.
                </p>

                <div className="social" >
                    <a rel="noreferrer" href="https://github.com/Suman-Jaiswal" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                    <a rel="noreferrer" href="https://www.linkedin.com/in/skj9436/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a rel="noreferrer" href="https://www.instagram.com/suman__jaiswal_/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a rel="noreferrer" href="https://www.facebook.com/sumanj631" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
                </div>

            </div>
        </div>

    )
}
