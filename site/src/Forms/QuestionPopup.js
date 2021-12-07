import React,{useState,useEffect} from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation } from 'react-router-dom';
import popup from "../Css/popup.module.css";
import {GrFormClose} from "react-icons/gr"


const QuestionPopup = ({setFlag,qn,ql,sl,sb,df,id}) => {
    const loc=useLocation();
    const [QuestionName,SetQuestionName]=useState(qn);
    const [QuestionLink,SetQuestionLink]=useState(ql);
    const [SolutionLink,SetSolutionLink]=useState(sl);
    const [SolvedBy,SetSolvedBy]=useState(sb);
    const [Difficulty,SetDifficulty]=useState(df); 
    const [Users,setUsers]=useState([]);    
    
    useEffect(() => {
        const usersRef = collection(db, "Users");
        const getUsers=async()=>{
        const data=await getDocs(usersRef);
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getUsers();

    }, [])

    const handleAdd=(e)=>{
        e.preventDefault();
        const add = async () => {
            const docRef = await addDoc(collection(db, "Questions"), {
                QuestionName,QuestionLink,SolutionLink,SolvedBy,Difficulty,"SubCategoryId":loc.state.subID
            });
            console.log(docRef.id);
        }
        let flag=false;
        Users.map((u)=>{
            if(u.email===SolvedBy)
            {
                console.log(u.url);
                flag=true;
                add();
            }})
        if(flag===false)
        {

        }
        setFlag(false);
        console.log("Done");

    }

    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log('done');
        const userDoc=doc(db,"Questions",id);
        const newField={QuestionName,QuestionLink,SolutionLink,SolvedBy,Difficulty};
        await updateDoc(userDoc,newField);
        setFlag(false);
    }

    if(id)
    {
        return (
        <div className={popup.outer} >
            <article className={popup.container}>
                <form className={login.form} onSubmit={handleUpdate} >
                    <GrFormClose className={popup.close} onClick={()=>{setFlag(false);}} />
                    <div className={popup.control}> 
                        <input
                            type='text'
                            placeholder='Enter Question Name'
                            style={{marginTop:'20px'}}
                            value={QuestionName}
                            
                            onChange={(e)=>{
                                SetQuestionName(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Question Link'
                            style={{marginTop:'20px'}}
                            value={QuestionLink}
                            onChange={(e)=>{
                                SetQuestionLink(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solution Link'
                            style={{marginTop:'20px'}}
                            value={SolutionLink}
                            onChange={(e)=>{
                                SetSolutionLink(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solved by(Username)'
                            style={{marginTop:'20px'}}
                            value={SolvedBy}
                            onChange={(e)=>{
                                SetSolvedBy(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter the Difficulty of Question'
                            style={{marginTop:'20px'}}
                            value={Difficulty}
                            onChange={(e)=>{
                                SetDifficulty(e.target.value);
                            }}
                            required
                        />  

                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center',width:"auto"}} >{(id)?("Update a Question"):("Add a Question")}</button>
                    </div>
                </form>
            </article>    
        </div>
    )
    }
    else
    {
        return (
        <div className={popup.outer} >
            <article className={popup.container}>
                <form className={login.form} onSubmit={handleAdd} >
                    <GrFormClose className={popup.close} onClick={()=>{setFlag(false);}} />
                    <div className={popup.control}> 
                        <input
                            type='text'
                            placeholder='Enter Question Name'
                            style={{marginTop:'20px'}}
                            value={QuestionName}
                            
                            onChange={(e)=>{
                                SetQuestionName(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Question Link'
                            style={{marginTop:'20px'}}
                            value={QuestionLink}
                            onChange={(e)=>{
                                SetQuestionLink(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solution Link'
                            style={{marginTop:'20px'}}
                            value={SolutionLink}
                            onChange={(e)=>{
                                SetSolutionLink(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solved by(Username)'
                            style={{marginTop:'20px'}}
                            value={SolvedBy}
                            onChange={(e)=>{
                                SetSolvedBy(e.target.value);
                            }}
                            required
                        />  

                        <input
                            type='text'
                            placeholder='Enter the Difficulty of Question'
                            style={{marginTop:'20px'}}
                            value={Difficulty}
                            onChange={(e)=>{
                                SetDifficulty(e.target.value);
                            }}
                            required
                        />  

                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center',width:"auto"}} >{(id)?("Update a Question"):("Add a Question")}</button>
                    </div>
                </form>
            </article>    
        </div>
    )
    }
}

export default QuestionPopup
