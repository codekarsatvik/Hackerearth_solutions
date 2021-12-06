import React,{useEffect,useState} from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation } from 'react-router-dom';


const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"



const Subcategoryform = () => {
    const [url,setUrl]=useState('');
    const [subName,setName]=useState('');
    const loc=useLocation();

    const handleUpload = (e) => {
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Sub-category"), {
                "CategoryId":loc.state.catID,"SubCategoryName":subName,"SubCategoryImg":url
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
                            onChange={(e) => handler(e)} required />
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
                            required
                        />  
                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center',width:"auto"}} >Add Sub Category</button>
                    </div>
                </form>
            </article>    
        </>
    )
}

export default Subcategoryform
