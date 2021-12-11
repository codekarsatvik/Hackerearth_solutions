import React,{useEffect,Redirect} from 'react';
import { useLocation,Link } from 'react-router-dom';
import mainpage from './Css/mainpage.module.css';
import { db } from "./firebase/config";
import { collection, getDocs, doc,deleteDoc } from "firebase/firestore";
import { useState } from 'react/cjs/react.development';
import {HiPlusSm} from "react-icons/hi";
import {MdDelete} from "react-icons/md";
import {RiEditBoxLine} from "react-icons/ri";
import CategoryPopUp from './Forms/CategoryPopUp';



const def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/images.png?alt=media&token=5dd85123-c1f2-4a6a-8bec-2c80d56b751c";
const plus="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/Plus.jpg?alt=media&token=591a5d92-b5e3-4561-949b-8a64b34ab1b6";

const MainPage = () => {
    const CatRef = collection(db, "Category");
    const [cat,setCat]=useState([]);
    const [flag,setFlag]=useState(false);
    const [id,setId]=useState('');
    const [url,SetUrl]=useState('');
    const [name,setName]=useState('');
    const [d,setD]=useState(0);

    const loc=useLocation();

    useEffect(() => {
           const getCat=async()=>{
           const data=await getDocs(CatRef);
           const temp=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
            temp.sort((a, b) => a.CategoryName.localeCompare(b.CategoryName));
           setCat(temp);
       }
       getCat();
    },[flag,d])

    const handleDelete=async(i)=>{
        const userDoc=doc(db,"Category",i);
        await deleteDoc(userDoc);
        let temp=d;
        setD(1-temp);
    }

    return (
        <div className={mainpage.container}>
            <div>
            <p className={mainpage.catHead}>Categories</p>
            </div>
            <div className={mainpage.line} ></div>
            <div className={mainpage.itemCon} >
             {cat.map((p)=>{
                return(
                    <div className={mainpage.item}  key={p.id}>
                    <Link to={{ 
                            pathname: '/subCategory', 
                            state:{...loc.state,"catID":p.id,"catName":p.CategoryName} 
                            }} 
                            style={{textDecoration:'none'}}
                             > 
                            <img src={p.CategoryImg?p.CategoryImg:def_img} className={mainpage.itemImg} />
                            <p className={mainpage.itemName}>{p.CategoryName}</p>
                            </Link>
                            <div style={{display:'flex',justifyContent:'right',margin:"0px",marginTop:'auto',marginBottom:'0px',alignContent:'flex-end'}} >
                            <div className={mainpage.icons} onClick={()=>{setName(p.CategoryName);SetUrl(p.CategoryImg);setId(p.id); setFlag(true)}} >
                            <RiEditBoxLine/>
                            </div>

                             <div className={mainpage.icons} onClick={()=>{handleDelete(p.id)}} >
                            <MdDelete  />
                            </div>
                            </div>
                            </div>

                            
                )
             })}
             {flag&&<CategoryPopUp setFlag={setFlag} id={id} flag={flag}  img={url} name={name}  />}
             <div className={mainpage.item} style={{cursor:'pointer'}} onClick={()=>{
                 SetUrl('');
                 setName('')
                 setId('');
                 setFlag(true);
                 
             }} > 
                <HiPlusSm className={mainpage.plus}/>
             </div>
            
            </div>
        </div>
    )
}

export default MainPage
