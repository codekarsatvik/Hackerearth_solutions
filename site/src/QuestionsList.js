import React,{useState,useEffect} from 'react'
import question from './Css/questions.module.css'
import { db, storage } from "./firebase/config";
import { collection, getDocs, addDoc, updateDoc, doc,deleteDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { useLocation,Link,Redirect } from 'react-router-dom';
import {HiPlusSm} from "react-icons/hi";
import {MdDelete} from "react-icons/md";
import {RiEditBoxLine} from "react-icons/ri";
import QuestionPopup from './Forms/QuestionPopup';


const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3";



const QuestionsList = () => {

    const quesRef = collection(db,"Questions");
    const [ques,setQues] = useState([]);
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState('');
    const [flag,setFlag] =useState(false);

    const [QuestionName,SetQuestionName]=useState('');
    const [QuestionLink,SetQuestionLink]=useState('');
    const [SolutionLink,SetSolutionLink]=useState('');
    const [SolvedBy,SetSolvedBy]=useState('');
    const [Difficulty,SetDifficulty]=useState(''); 
    const [id,setId]=useState('');
    const [d,setD]=useState(1);

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


    },[flag,d])

    if(!loc.state||!loc.state.subName)
    {
        return(
            <Redirect to='/'/>
        )
    }

    const handleDelete=async(i)=>{
        const userDoc=doc(db,"Questions",i);
        await deleteDoc(userDoc);
        let temp=d;
        setD(1-temp);
    }

    return (
        <div className={question.container}>
            {flag&&<QuestionPopup setFlag={setFlag} qn={QuestionName} ql={QuestionLink} sl={SolutionLink} sb={SolvedBy} df={Difficulty} id={id} />}
            <div style={{display:'flex',justifyContent:'center'}}>
            <p className={question.subHead}>{loc.state.subName}</p>
            <div className={question.btn} onClick={()=>{
                setId('')
                SetQuestionName('');
                SetQuestionLink('');
                SetSolutionLink('');
                SetSolvedBy('');
                SetDifficulty('');
                setFlag(true);
                }} >
            <HiPlusSm className={question.icon} />Add a Question</div>
            </div>
            <div className={question.line} ></div>
            <div className={question.itemcon}>
            <input type='search' value={search} className={question.search} placeholder='Question Name' onChange={(e)=>{setSearch(e.target.value)}} />
            <div style={{display:'flex',fontSize:"30px",width:'70vw',backgroundColor:"#301b3f",height:'8vh',marginBottom:'10px',color:'white',paddingLeft:'5px',paddingRight:'5px',borderRadius:"20px 20px 0px 0px"}}>
            <p style={{margin:'auto',marginLeft:"1vw",width:"30vw",textAlign:"left"}} >Question Name</p>
            <p style={{margin:"auto",fontSize:'auto'}}>Difficulty</p>
            <p style={{margin:'auto',textAlign:'right',width:"30vw",textAlign:'right',marginRight:'1vw'}} >SolvedBy</p>
            </div>
            {ques.map((q)=>{
               
                if(q.SubCategoryId===loc.state.subID&&q.QuestionName.toLowerCase().includes(search.toLowerCase())){
                return(
                    <div style={{display:'flex',justifyContent:'center'}} key={q.id} >
                    <Link
                    to={{ 
                        pathname: '/question', 
                        state:{...loc.state,"quesID":q.id,"quesName":q.QuestionName,"quesLink":q.QuestionLink,"solLink":q.SolutionLink} 
                    }} 
                    className={question.item}
                    >
                        <p style={{marginLeft:"1vw",width:"30vw",textAlign:"left"}} >{q.QuestionName}</p>
                        <p style={{margin:"auto",fontSize:'auto'}}>{q.Difficulty}</p>
                        <div style={{width:"auto",height:"5vh",display:'flex',marginRight:'0.5vw',width:"30vw",justifyContent:"right"}} >
                        {users.map((u)=>{
                            if(u.email===q.SolvedBy)
                            {
                                url=u.url;
                            }
                        })}
                        {(url)?(<img src={(url)}  style={{borderRadius: "50px"}} />):(<img src={Def_img}  style={{ width: "40px",height: "40px",borderRadius: "50px"}} />)}
                        {url=""} 
                        <p style={{textAlign:'right'}} >{q.SolvedBy}</p>
                        </div>
                        
                    </Link>
                    <div style={{display:'flex',flexDirection:'row',marginLeft:'1vw',marginTop:'2vh'}} >
                            <div className={question.icons} onClick={()=>{
                                setId(q.id)
                                SetQuestionName(q.QuestionName);
                                SetQuestionLink(q.QuestionLink);
                                SetSolutionLink(q.SolutionLink);
                                SetSolvedBy(q.SolvedBy);
                                SetDifficulty(q.Difficulty);
                                setFlag(true);
                            }} >
                            <RiEditBoxLine/>
                            </div>

                             <div className={question.icons} onClick={()=>handleDelete(q.id)} >
                            <MdDelete  />
                            </div>
                    </div> 
                    </div>)

                    }
                    else
                    {
                        return(<div key={q.id}></div>)
                    }
                
            })}
            </div>


        </div>
    )
}

export default QuestionsList
