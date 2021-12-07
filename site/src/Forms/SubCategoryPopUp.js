import React,{useEffect,useState} from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import popup from "../Css/popup.module.css";
import {GrFormClose} from "react-icons/gr"


const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"



const SubCategoryPopUp = ({setFlag,id,flag,name,img,catID}) => {
    const [url,setUrl]=useState(img);
    const [subName,setsub]=useState(name);

    const handleAdd = (e) => {
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Sub-category"), {
                "CategoryId":catID,"SubCategoryName":subName,"SubCategoryImg":url
            });
            console.log(docRef.id);
        }
        add();
        setFlag(false);
    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log(id);
        const userdoc=doc(db,"Sub-category",id);
        const newFields={SubCategoryName:subName,SubCategoryImg:url};
        await updateDoc(userdoc,newFields);
        setFlag(false);
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

    if(!id)
    {
    return (
        <div  className={popup.outer}>
            <article className={popup.container}>
                <form className={login.form} onSubmit={handleAdd}>
                    <GrFormClose className={popup.close} onClick={()=>{setFlag(false);}} />
                    <div className={popup.control}>
                            {(url)?(<img src={(url)}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:'center'}} />):(<img src={Def_img}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                            <label className={login.btnLogin} style={{height:"30px",cursor:'pointer',fontSize:'18px',margin:'auto',marginTop:'5px',marginLeft:'auto',marginRight:'auto'}} >
                             Upload
                            <input 
                            type="file" 
                            accept="image/*" 
                            style={{display:"none",width:'0px'}} 
                            onChange={(e) => handler(e)} required />
                            </label>
                        <input
                            type='text'
                            placeholder='Enter Sub category name'
                            style={{marginTop:'20px'}}
                            value={subName}
                            onChange={(e)=>{
                                setsub(e.target.value);
                            }}
                            required
                        />  
                        <button type='submit' className={login.btnLogin} style={{cursor:'pointer',margin:'auto',width:'auto'}} >Add Sub Category</button>
                    </div>
                </form>
            </article>    
        </div>
    )
                        }
    else
    {
        return (
        <div  className={popup.outer}>
            <article className={popup.container}>
                <form className={login.form} onSubmit={handleUpdate} >
                    <GrFormClose className={popup.close} onClick={()=>{setFlag(false);}} />
                    <div className={popup.control}>
                            {(url)?(<img src={(url)}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:'center'}} />):(<img src={Def_img}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                            <label className={login.btnLogin} style={{height:"30px",cursor:'pointer',fontSize:'18px',margin:'auto',marginTop:'5px',marginLeft:'auto',marginRight:'auto'}} >
                             Upload
                            <input 
                            type="file" 
                            accept="image/*" 
                            style={{display:"none",width:'0px'}} 
                            onChange={(e) => handler(e)} />
                            </label>
                        <input
                            type='text'
                            placeholder={subName}
                            style={{marginTop:'20px'}}
                            value={subName}
                            onChange={(e)=>{
                                setsub(e.target.value);
                            }}
                            required
                        />  
                        <button type='submit' className={login.btnLogin} style={{cursor:'pointer',margin:'auto',width:'auto'}} >Update Sub Category</button>
                    </div>
                </form>
            </article>    
        </div>
    )
    }
}

export default SubCategoryPopUp
