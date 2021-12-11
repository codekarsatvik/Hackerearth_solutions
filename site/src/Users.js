import React,{useEffect, useState} from 'react'
import users from "./Css/users.module.css";
import { collection, getDocs, doc,deleteDoc } from "firebase/firestore"
import { db } from "./firebase/config";
import {RiEditBoxLine} from "react-icons/ri";
import UserPopUp from './Forms/UserPopUp';



const Users = () => {
    const [search,setSearch]=useState('');
    const [Users,setUsers]=useState([]);
    const [flag,setFlag]=useState(false);
    const [userName,setUserName]=useState('');
    const [url,setUrl]=useState('');
    const [level,setLevel]=useState(1);
    const [id,setId]=useState('');

    useEffect(()=>{
        const usersRef = collection(db, "Users");
        const getUsers=async()=>{
        const data=await getDocs(usersRef);
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getUsers();
    },[flag])

    return (
        <div className={users.container} >
             <input type='search' value={search} className={users.search} placeholder='UserName' onChange={(e)=>{setSearch(e.target.value)}} />
             <p className={users.Head}>Users</p>
             <div className={users.line} ></div>
             <div className={users.itemCon}>
             {
                 Users.map((u)=>{

                    if(u.userName.toLowerCase().includes(search.toLowerCase()))
                     {
                         return(
                         <div className={users.item} key={u.id} >
                             {flag&&<UserPopUp setFlag={setFlag} url={url} userName={userName} level={level} setLevel={setLevel} id={id} />}
                             <span style={{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'10px',marginTop:'20px'}} >
                                 <img src={u.url} className={users.img}></img>
                                 <p className={users.name}>{u.firstName}</p>
                             </span>
                             <div>
                             <p className={users.username}>UserName :- {u.userName}</p>
                             </div>
                             <RiEditBoxLine className={users.icon} onClick={()=>{
                                 setId(u.id);
                                 setLevel(u.level);
                                 setUserName(u.userName);
                                 setUrl(u.url);
                                 setFlag(true);
                             }} />

                         </div>)
                        }
                     
                })
            }
            </div>
        </div>
    )
}

export default Users
