import React, { useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
// import { motion } from "framer-motion";
import login from './Css/login.module.css'
import { db, storage } from "./firebase/config";
import { collection, addDoc,getDocs} from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"

const Def_img="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/user-profile.jpg?alt=media&token=0c308286-e24d-4176-a308-2a87901de3e3"


const SignUp = () => {
    let history=useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [progress,setProgress]=useState(0);
    const [url,setUrl]=useState('');
    const [userName,setUserName]=useState('');

    const usersRef = collection(db, "Users");

    useEffect(() => {
       const getUsers=async()=>{
           const data=await getDocs(usersRef);
           setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));           
       }
       getUsers();

    },[])

    const handleUpload = (e) => {
        e.preventDefault();

        console.log(users);
        const add = async () => {
            const docRef = await addDoc(collection(db, "Users"), {
                firstName, lastName,userName, email, password, url, "level": 1
            });
            console.log(docRef.id);
        }

        let flag1=false;
        let flag2=false;
        users.map((u)=>{
            if(u.userName===userName)
            {
                flag1=true;
            }
            if(u.email===email)
            {
                flag2=true;
            }
        })
        if(flag1||flag2)
        {
            if(flag1)
            {
                alert('User Name already exists!');
            }
            if(flag2)
            {
                alert('Email is already registered');
            }
        }
        else
        {
            add();
            history.push("/login");
        }

    }

    const handler = (e) => {
        let sel = e.target.files[0];
        console.log(sel);
        if (sel) {
            let val = Math.floor(new Date().valueOf() * Math.random());
            const stref = ref(storage, `/files/${val}`);
            const uploadTask = uploadBytesResumable(stref, sel);
            uploadTask.on("state_changed", (snap) => {
                let per=(snap.bytesTransferred/snap.totalBytes)*100;
                per=Math.round(per);
                setProgress(per);
                }, (err) => {}, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((link) => {
                    (setUrl(link));
                    console.log(link);
                    setTimeout(()=>{
                        setProgress(0);
                    },2000)
                });
            })
        }
        else {
            
        }
    }


    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                   {/* <motion.div className={login.progressbar}
                       initial={{ width: 0 }}
                       animate={{ width: progress + '%' }}
                  >
                      
                  </motion.div> */}
                    <div style={{ flexDirection: "row", alignItems: "center", justifyContent: "center",textAlign:'center'}}>
                        {/* <Image def={Def_img} imge={url} setUrl={setUrl}/> */}
                         
                {(url)?(<img src={(url)}  style={{width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />):(<img src={Def_img}  style={{ width: "100px",height: "100px",borderRadius: "50px",alignSelf:"center"}} />)}
                </div>
                <label className={login.btnLogin} style={{height:"30px",cursor:'pointer',marginLeft:'42%'}} >
                    Upload
                    <input 
                        type="file" 
                        accept="image/*" 
                        style={{display:"none"}} 
                        onChange={(e) => handler(e)}/>
                </label>
                    <div className={login.formControl}>
                        <input
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                        <input
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setLastName(e.target.value)
                            }
                        required
                        />
                        <input
                            type='email'
                            value={email}
                            placeholder='Email'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setEmail(e.target.value)}
                        required
                        />

                        <input
                            value={userName}
                            placeholder='Username'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setUserName(e.target.value)}
                        required
                        />

                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{ borderStyle: "none" }}
                            onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className={login.wrapper}>
                        <button type='submit' className={login.btnLogin}>Sign up</button>
                        <div className={login.wrap}>
                            <p>Already have an account?</p>
                            <Link to='./login' className={login.link}>Login</Link>
                        </div>
                    </div>
                </form>
            </article>
        </>
    )
}

export default SignUp
