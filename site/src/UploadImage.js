import React,{useState} from 'react'
import { db, storage } from "./firebase/config";
import login from './Css/login.module.css'
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"

const UploadImage = (props) => {

    

    
    return (
        <>
            <div>
                
            </div> 
        </>
    )
}

export default UploadImage
