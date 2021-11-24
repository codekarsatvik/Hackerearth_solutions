import React from 'react'
import mainHeader from './Css/mainHeader.module.css'
import logo from './images/logo.svg'
import {Link} from 'react-router-dom'

const MainHeader = () => {
    return (
        <div className={mainHeader.wrapper}>
            <img src={logo} alt='img' className={mainHeader.logo}></img>
            <div className={mainHeader.btns}>
                <Link to='/' className={mainHeader.btn}>Home</Link>
                <a href="/about" className={mainHeader.btn}>About</a>
                <a href="/login" className={mainHeader.btn}>Login</a>
            </div>
        </div>
    )
}

export default MainHeader
