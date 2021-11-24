import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import login from './Css/login.module.css'
import google from './images/google.svg'
import ImageUpload from './ImageUpload'

const SignUp = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form}>   
                    <ImageUpload/>   
                    <div className={login.formControl}>
                        <input 
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input 
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setLastName(e.target.value)}
                        />
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
                    <div className={login.wrapper}>
                        <button type='submit' className={login.btnLogin}>Sign up</button>
                        <div className={login.wrap}>
                            <p>Already have an account?</p>
                            <Link to='./login' className={login.link}>Login</Link>
                        </div>
                    </div>
                </form>
            </article>
        </>
    )    
}

export default SignUp
