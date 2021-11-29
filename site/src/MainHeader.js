import React from 'react'
import mainHeader from './Css/mainHeader.module.css'
import logo from './images/logo.svg'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const MainHeader = () => {
    const loc=useLocation();
    console.log(loc);
    return (
        <div className={mainHeader.wrapper}>
            <img src={logo} alt='img' className={mainHeader.logo}></img>
            <div className={mainHeader.btns}>
                <Link to={{ 
                            pathname: '/', 
                            state:loc.state 
                            }} className={mainHeader.btn}>Home</Link>
                <Link to={{ 
                            pathname: '/about', 
                            state:loc.state 
                            }} className={mainHeader.btn}>About</Link>
                {(loc.state&&loc.state.authorized===true)?(<a href="/login" className={mainHeader.btn} onClick={()=>{
                    loc.state.authorized=false;
                }} >Logout</a>):(<a href="/login" className={mainHeader.btn} >Login</a>)}
            </div>
        </div>
    )
}

export default MainHeader
