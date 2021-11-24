import React from 'react'
import footer from './Css/footer.module.css'
import logo1 from './images/facebook.svg'
import logo2 from './images/insta.svg'
import logo3 from './images/twitter.svg'
import logo4 from './images/publish.svg'

const Footer = () => {
    return (
        <div className={footer.wrapper}>
            <div className={footer.logos}>
                <img src={logo1} alt='facebook' className={footer.logo}></img>
                <img src={logo2} alt='insta' className={footer.logo}></img>
                <img src={logo3} alt='twitter' className={footer.logo}></img>
            </div>
            <div className={footer.wrap1}>
                <p>Powered by</p>
                <img src={logo4}></img>
            </div>
            <div className={footer.wrap2}>
                <p>Contact:-</p>
                <p>Email :-abc@gmail.com</p>
                <p>Phone :-0123456789</p>
            </div>
        </div>
    )
}

export default Footer

