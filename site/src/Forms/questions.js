import React,{useState,useEffect} from 'react'
import logo from '../images/logo.svg'
import login from '../Css/login.module.css'
import Image from '../UploadImage'
import { db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation } from 'react-router-dom';

const Questions = () => {

    const loc=useLocation();
    const [QuestionName,SetQuestionName]=useState('');
    const [QuestionLink,SetQuestionLink]=useState('');
    const [SolutionLink,SetSolutionLink]=useState('');
    const [SolvedBy,SetSolvedBy]=useState('');
    const [Difficulty,SetDifficulty]=useState(''); 
    const [Users,setUsers]=useState([]);    
    useEffect(() => {
        
        const usersRef = collection(db, "Users");
        const getUsers=async()=>{
        const data=await getDocs(usersRef);
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getUsers();

    }, [])

    const handler=(e)=>{
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
        console.log("Done");

    }

    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handler} >
                    <div className={login.formControl} style={{marginTop:"45px"}}> 
                        <input
                            type='text'
                            placeholder='Enter Question Name'
                            style={{marginTop:'20px'}}
                            value={QuestionName}
                            
                            onChange={(e)=>{
                                SetQuestionName(e.target.value);
                            }}
                        />  

                        <input
                            type='text'
                            placeholder='Enter Question Link'
                            style={{marginTop:'20px'}}
                            value={QuestionLink}
                            onChange={(e)=>{
                                SetQuestionLink(e.target.value);
                            }}
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solution Link'
                            style={{marginTop:'20px'}}
                            value={SolutionLink}
                            onChange={(e)=>{
                                SetSolutionLink(e.target.value);
                            }}
                        />  

                        <input
                            type='text'
                            placeholder='Enter Solved by(Username)'
                            style={{marginTop:'20px'}}
                            value={SolvedBy}
                            onChange={(e)=>{
                                SetSolvedBy(e.target.value);
                            }}
                        />  

                        <input
                            type='text'
                            placeholder='Enter the Difficulty of Question'
                            style={{marginTop:'20px'}}
                            value={Difficulty}
                            onChange={(e)=>{
                                SetDifficulty(e.target.value);
                            }}
                        />  

                        <button type='submit' className={login.btnLogin} style={{alignSelf:'center',width:"auto"}} >Add a Question</button>
                    </div>
                </form>
            </article>    
        </>
    )
}

export default Questions
