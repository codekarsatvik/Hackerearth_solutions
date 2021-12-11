import React, { useEffect } from 'react'
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation,Link } from 'react-router-dom'
import mainpage from './Css/mainpage.module.css'
import { db } from "./firebase/config";
import { collection, getDocs, doc,deleteDoc } from "firebase/firestore"
import {HiPlusSm} from "react-icons/hi";
import {MdDelete} from "react-icons/md";
import {RiEditBoxLine} from "react-icons/ri";
import SubCategoryPopUp from './Forms/SubCategoryPopUp';


const def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/images.png?alt=media&token=5dd85123-c1f2-4a6a-8bec-2c80d56b751c";
const plus="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/Plus.jpg?alt=media&token=591a5d92-b5e3-4561-949b-8a64b34ab1b6";


const SubCategory = () => {

    const subRef = collection(db, "Sub-category");
    const [sub,setsub]=useState([]);
    const [flag,setFlag]=useState(false);
    const [id,setId]=useState('');
    const [name,setName]=useState('');
    const [url,setUrl]=useState('');
    const [d,setD]=useState(0);

    const loc=useLocation();
    useEffect(() => {
       const getSub=async()=>{
           const data=await getDocs(subRef);
           const temp=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
           temp.sort((a, b) => a.SubCategoryName.localeCompare(b.SubCategoryName));
           setsub(temp);
       }
       getSub();

    },[flag,d])

    const handleDelete=async(i)=>{
        const userDoc=doc(db,"Sub-category",i);
        await deleteDoc(userDoc);
        let temp=d;
        setD(1-temp);
    }
    
    if(!loc.state||!loc.state.catName)
    {
        return (
            <Redirect to='/'/>
        )
    }

    
    return (
        <div className={mainpage.container}>
            {flag&&<SubCategoryPopUp setFlag={setFlag} id={id} flag={flag} name={name} img={url} catID={loc.state.catID} />}
            <div>
            <p className={mainpage.catHead}>{loc.state.catName}</p>
            </div>
            <div className={mainpage.line} ></div>
            <div className={mainpage.itemCon} >
             {sub.map((p)=>{
                if(p.CategoryId===loc.state.catID)
                {
                    return(
                        <div className={mainpage.item} key={p.id}>
                        <Link to={{ 
                            pathname: '/questionsList', 
                            state:{...loc.state,"subID":p.id,"subName":p.SubCategoryName} 
                            }} 
                             style={{textDecoration:'none'}}
                             > 
                            <img src={p.SubCategoryImg?p.SubCategoryImg:def_img} className={mainpage.itemImg} />
                            <p className={mainpage.itemName}>{p.SubCategoryName}</p>
                            </Link>

                            <div style={{display:'flex',justifyContent:'right',margin:"0px",marginTop:'auto',marginBottom:'0px',alignContent:'flex-end'}} >
                            
                            <div className={mainpage.icons} onClick={()=>{
                                setId(p.id);
                                setName(p.SubCategoryName);
                                setUrl(p.SubCategoryImg);
                                setFlag(true);
                            }} >
                            <RiEditBoxLine/>
                            </div>

                             <div className={mainpage.icons} onClick={()=>{handleDelete(p.id)}} >
                            <MdDelete  />
                            </div>
                            </div>
                            </div>
                    )
                }
                else
                {
                    return(
                        <div key={p.id}>
                        </div>
                    )
                }
             })}
             <div className={mainpage.item} onClick={()=>{
                 setUrl('');
                 setName('')
                 setId('');
                 setFlag(true);
                 
             }}> 
                <HiPlusSm className={mainpage.plus}/>
             </div>
            
            </div>
        </div>
    )
}

export default SubCategory
