import React,{useState} from 'react'
import { db, storage } from "./firebase/config";
import login from './Css/login.module.css'
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"

const UploadImage = (props) => {
    const handler = (e) => {
        let sel = e.target.files[0];
        console.log(sel);
        if (sel) {
            let val = Math.floor(new Date().valueOf() * Math.random());
            const stref = ref(storage, `/files/${val}`);
            const uploadTask = uploadBytesResumable(stref, sel);
            uploadTask.on("state_changed", (snap) => { }, (err) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((link) => {
                    (props.setUrl(link));
                    console.log(link);
                });
            })
        }
        else {
            
        }
    }
    return (
        <>
            <div>
                {(props.imge)?(<img src={(props.imge)}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />):(<img src={props.def}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                <label className={login.btnLogin} style={{height:"30px",cursor:'pointer'}} >
                    Upload
                    <input 
                        type="file" 
                        accept="image/*" 
                        style={{display:"none"}} 
                        onChange={(e) => handler(e)}/>
                </label>
            </div> 
        </>
    )
}

export default UploadImage
