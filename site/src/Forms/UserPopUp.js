import React from 'react'
import login from '../Css/login.module.css'
import popup from "../Css/popup.module.css";
import { db} from "../firebase/config";
import {GrFormClose} from "react-icons/gr";
import users from "../Css/users.module.css";
import { updateDoc, doc } from "firebase/firestore"




const UserPopUp = ({setFlag,url,userName,level,setLevel,id}) => {


    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log(id);
        const userdoc=doc(db,"Users",id);
        const newFields={"level":parseInt(level)};
        await updateDoc(userdoc,newFields);
        setFlag(false);
    }

    return (
        <div className={popup.outer} >
             <article className={popup.container}>
                  <form className={login.form} onSubmit={handleUpdate} style={{  height: '300px'}} >
                      <GrFormClose className={popup.close} onClick={()=>{setFlag(false);}} />
                      <span style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:'10px',marginTop:'20px'}} >
                                 <img src={url} className={users.img}></img>
                                 <p className={users.name}>{userName}</p>
                      </span>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'center' }} >

                      <label style={{fontSize:'25px' }} >Level : </label>
                      <input
                            type='number'
                            placeholder={level}
                            style={{marginTop:'20px',borderRadius:'10px'}}
                            value={level}
                            onChange={(e)=>{setLevel(e.target.value)}}
                            required
                            />  
                      </div>
                      <button type='submit' className={login.btnLogin} style={{cursor:'pointer',margin:'auto',width:'auto',marginTop:'20px'}} >Submit</button>
                  </form>
             </article>
            
        </div>
    )
}

export default UserPopUp
