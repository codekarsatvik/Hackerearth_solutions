import React from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation } from 'react-router-dom';

const questions = () => {
    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                    <div className={login.formControl}>
                        <div style={{ flexDirection: "row", alignItems: "center", justifyContent: "center",marginTop:'40px'}}>
                            {(url)?(<img src={(url)}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />):(<img src={Def_img}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                            <label className={login.btnLogin} style={{height:"30px",cursor:'pointer',marginLeft:'42%'}} >
                             Upload
                            <input 
                            type="file" 
                            accept="image/*" 
                            style={{display:"none"}} 
                            onChange={(e) => handler(e)}/>
                            </label>
                        </div>    
                        <input
                            type='text'
                            placeholder='Enter Sub Category name'
                            style={{marginTop:'20px'}}
                            value={subName}
                            onChange={(e)=>{
                                setName(e.target.value);
                            }}
                        />  
                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center',width:"auto"}} >Add Sub Category</button>
                    </div>
                </form>
            </article>    
        </>
    )
}

export default questions
