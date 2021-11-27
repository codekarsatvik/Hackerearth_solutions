import React from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'

const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"


const category = () => {
    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form}>
                    <div className={login.formControl}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <Image def={Def_img}/>  
                        </div>    
                        <input
                            type='text'
                            placeholder='Enter category name'
                            style={{marginTop:'20px'}}
                        />  
                    </div>
                </form>
            </article>    
        </>
    )
}

export default category
