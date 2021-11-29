import React,{useEffect,Redirect} from 'react'
import { useLocation,Link } from 'react-router-dom'
import mainpage from './Css/mainpage.module.css';
import { db, storage } from "./firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useState } from 'react/cjs/react.development';

const def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/images.png?alt=media&token=5dd85123-c1f2-4a6a-8bec-2c80d56b751c";
const plus="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/Plus.jpg?alt=media&token=591a5d92-b5e3-4561-949b-8a64b34ab1b6";

const MainPage = () => {
    const CatRef = collection(db, "Category");
    const [cat,setCat]=useState([]);
    const loc=useLocation();

    useEffect(() => {
       const getCat=async()=>{
           const data=await getDocs(CatRef);
           setCat(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
       }
       getCat();
    },[])

    return (
        <div className={mainpage.container}>
            <div>
            <p className={mainpage.catHead}>Categories</p>
            </div>
            <div className={mainpage.line} ></div>
            <div className={mainpage.itemCon} >
             {cat.map((p)=>{
                return(
                    <div className={mainpage.item} key={p.id} >
                        <img src={p.CategoryImg?p.CategoryImg:def_img} className={mainpage.itemImg} ></img>
                        <p className={mainpage.itemName}>{p.CategoryName}</p>
                    </div>
                )
             })}
             {/* <div className={mainpage.item}>  */}
                <Link to={{ 
                            pathname: '/category', 
                            state:loc.state 
                            }} className={mainpage.item} > 
                            <img src={plus} className={mainpage.plus} />
                            <p className={mainpage.itemName}>Add</p>
                            </Link>
             {/* </div> */}
            
            </div>
        </div>
    )
}

export default MainPage
