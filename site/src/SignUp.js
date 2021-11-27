import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Image from './UploadImage'
import login from './Css/login.module.css'
import google from './images/google.svg'
import { db, storage } from "./firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"

const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"


const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [url,setUrl]=useState('');

    const usersRef = collection(db, "Users");

    // useEffect(() => {
    //    const getUsers=async()=>{
    //        const data=await getDocs(usersRef);
    //        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    //        console.log(users)
    //    }

    // },[])

    const handleUpload = (e) => {
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Users"), {
                firstName, lastName, email, password, url, "level": 1
            });
            console.log(docRef.id);
        }
        add();
        console.log("Done");

    }

    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Image def={Def_img} imge={url} setUrl={setUrl}/>
                    </div>
                    <div className={login.formControl}>
                        <input
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                        <input
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setLastName(e.target.value)
                            }
                        required
                        />
                        <input
                            type='email'
                            value={email}
                            placeholder='Email'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setPassword(e.target.value)}
                        required
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
