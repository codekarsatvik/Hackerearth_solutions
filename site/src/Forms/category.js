import React,{useEffect,useState} from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"


const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"


const Category = () => {

    const [url,setUrl]=useState('');
    const [catName,setName]=useState('');

    const handleUpload = (e) => {
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Category"), {
                "CategoryName":catName,"CategoryImg":url
            });
            console.log(docRef.id);
        }
        add();
        console.log("Done");

    }

    const handler = (e) => {
        let sel = e.target.files[0];
        console.log(sel);
        if (sel) {
            let val = Math.floor(new Date().valueOf() * Math.random());
            const stref = ref(storage, `/files/${val}`);
            const uploadTask = uploadBytesResumable(stref, sel);
            uploadTask.on("state_changed", (snap) => {
                }, (err) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((link) => {
                    setUrl(link);
                    console.log(link);
                });
            })
        }
        else {
            
        }
    }


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
                            placeholder='Enter category name'
                            style={{marginTop:'20px'}}
                            value={catName}
                            onChange={(e)=>{
                                setName(e.target.value);
                            }}
                        />  
                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center'}} >Submit</button>
                    </div>
                </form>
            </article>    
        </>
    )
}

export default Category
