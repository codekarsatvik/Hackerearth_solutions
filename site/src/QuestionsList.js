import React,{useState,useEffect} from 'react'
import question from './Css/questions.module.css'
import { db, storage } from "./firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation,Link } from 'react-router-dom';
import {HiPlusSm} from "react-icons/hi"


const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3";



const QuestionsList = () => {

    const quesRef = collection(db,"Questions");
    const [ques,setQues] = useState([]);
    const [users,setUsers]=useState([]);
    const loc=useLocation();
    let url='';
    useEffect(() => {
        const getQues = async() => {
            const data = await getDocs(quesRef);
            const temp=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
            temp.sort((a, b) => a.QuestionName.localeCompare(b.QuestionName));
            setQues(temp);
        }
        
        const usersRef = collection(db, "Users");
        const getUsers=async()=>{
        const data=await getDocs(usersRef);
        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }

        getQues();
        getUsers();


    },[])
    return (
        <div className={question.container}>
            <div style={{display:'flex',justifyContent:'center'}}>
            <p className={question.subHead}>{loc.state.subName}</p>
            <Link  to={{ 
                pathname: '/questionform', 
                state:loc.state 
            }} 
            className={question.btn}
            ><HiPlusSm className={question.icon} />Add a Question</Link>
            </div>
            <div className={question.line} ></div>

            {/* search bar */}

            <div className={question.itemcon}>
            {ques.map((q)=>{
                return(
                    <Link
                    to={{ 
                        pathname: '/question', 
                        state:{...loc.state,"quesID":q.id,"quesName":q.QuestionName,"quesLink":q.QuestionLink,"solLink":q.SolutionLink} 
                    }} 
                    key={q.id}
                    className={question.item}
                    >
                        <p style={{marginLeft:"15px"}} >{q.QuestionName}</p>
                        <p style={{margin:"auto"}}>{q.Difficulty}</p>
                        <p >Solved by : </p>
                        {users.map((u)=>{
                            if(u.email===q.SolvedBy)
                            {
                                url=u.url;
                            }
                        })}
                        {(url)?(<img src={(url)}  style={{width: "40px",height: "40px",borderRadius: "50px"}} />):(<img src={Def_img}  style={{ width: "40px",height: "40px",borderRadius: "50px"}} />)}
                        {url=""} 
                        <p style={{marginRight:"15px"}}>{q.SolvedBy}</p>
                    </Link>
                )
                
            })}
            </div>


        </div>
    )
}

export default QuestionsList
