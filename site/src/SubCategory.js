import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation,Link } from 'react-router-dom'
import mainpage from './Css/mainpage.module.css'
import { db, storage } from "./firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import {HiPlusSm} from "react-icons/hi"


const def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/images.png?alt=media&token=5dd85123-c1f2-4a6a-8bec-2c80d56b751c";
const plus="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/Plus.jpg?alt=media&token=591a5d92-b5e3-4561-949b-8a64b34ab1b6";


const SubCategory = () => {

    const subRef = collection(db, "Sub-category");
    const [sub,setsub]=useState([]);
    const loc=useLocation();
    console.log(loc);
    useEffect(() => {
       const getSub=async()=>{
           const data=await getDocs(subRef);
           const temp=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
           temp.sort((a, b) => a.SubCategoryName.localeCompare(b.SubCategoryName));
           setsub(temp);
       }
       getSub();

    },[])

    
    return (
        <div className={mainpage.container}>
            <div>
            <p className={mainpage.catHead}>{loc.state.catName}</p>
            </div>
            <div className={mainpage.line} ></div>
            <div className={mainpage.itemCon} >
             {sub.map((p)=>{
                if(p.CategoryId===loc.state.catID)
                {
                    return(
                        <Link to={{ 
                            pathname: '/questionsList', 
                            state:{...loc.state,"subID":p.id,"subName":p.SubCategoryName} 
                            }} 
                            key={p.id}
                            className={mainpage.item} > 
                            <img src={p.SubCategoryImg?p.SubCategoryImg:def_img} className={mainpage.itemImg} />
                            <p className={mainpage.itemName}>{p.SubCategoryName}</p>
                            </Link>
                    )
                }
                else
                {
                    return(
                        <>
                        </>
                    )
                }
             })}
             {/* <div className={mainpage.item}>  */}
                <Link to={{ 
                            pathname: '/subcategoryform', 
                            state:loc.state 
                            }} className={mainpage.item} > 
                             <HiPlusSm className={mainpage.plus}/>
                            </Link>
             {/* </div> */}
            
            </div>
        </div>
    )
}

export default SubCategory
