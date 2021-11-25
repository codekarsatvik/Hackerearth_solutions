import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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


    const handler = (e) => {
        let sel = e.target.files[0];
        console.log(sel);
        if (sel) {
            let val = Math.floor(new Date().valueOf() * Math.random());
            const stref = ref(storage, `/files/${val}`);
            const uploadTask = uploadBytesResumable(stref, sel);
            uploadTask.on("state_changed", (snap) => { }, (err) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((link) => {
                    setUrl(link);
                    console.log(link);
                });
            })
        }
        else {
            
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Users"), {
                firstName, lastName, email, password, url, "level": 1
            });
            console.log(docRef.id);
        }

    }

    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {url?(<img src={url}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />):(<img src={Def_img}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                    <label className={login.btnLogin} style={{height:"30px",cursor:'pointer'}} > Upload<input type="file" accept="image/*" style={{display:"none"}} onChange={(e) => handler(e)}/></label>
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
