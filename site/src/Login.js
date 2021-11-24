import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import login from './Css/login.module.css'
import logo from './images/logo.svg'
import google from './images/google.svg'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form}>      
                    <div className={login.formControl}>
                         <img src={logo} className={login.logo} />
                        <input 
                            type='email'
                            value={email}
                            placeholder='Email'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className={login.pass}>Forgot Password?</p>
                    <div className={login.wrapper}>
                        <button type='submit' className={login.btnLogin}>Log in</button>
                        <div className={login.wrap}>
                            <p>Dont’t have an account?</p>
                            <Link to="./signup" className={login.link}>Sign up</Link>
                        </div>
                    </div>
                    <h5>or</h5>
                    <div className={login.media} >
                        <img src={google} alt='google' className={login.logo_G}></img>
                        <p style={{textShadow: "0.5px 0.5px gray" , alignItems:"center" , marginLeft:"15px"}}>Continue with Google</p>
                    </div>
                </form>
            </article>
        </>
    )
}

export default Login
