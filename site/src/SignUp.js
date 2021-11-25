import React , {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import login from './Css/login.module.css'
import google from './images/google.svg'
import {db,storage} from "./firebase/config";
import {collection,getDocs,addDoc,updateDoc,doc} from "firebase/firestore"
import {ref,uploadBytesResumable,getDownloadURL} from "@firebase/storage"
import {Def_img} from "./images/user-profile.jpg"

const SignUp = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [users,setUsers]=useState([]);
    const [file,setFile]=useState(null);

    const usersRef=collection(db,"Users");

    // useEffect(() => {
    //    const getUsers=async()=>{
    //        const data=await getDocs(usersRef);
    //        setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    //        console.log(users)
    //    }
        
    // },[])


    const handler=(e)=>{
        let sel=e.target.files;
        console.log(sel);
        if(sel)
        {
            setFile(sel);
        }
        else
        {
            setFile(null);
        }
    }

    const getUrl= async (file)=>{
        
    }


    const handleUpload=(e)=>{
        e.preventDefault();
        console.log(file);
        let url="";
        if(file)
        {
            let val=Math.floor(new Date().valueOf() * Math.random());
            const stref=ref(storage,`/files/${val}`);
            const uploadTask=uploadBytesResumable(stref,file);
            uploadTask.on("state_changed",(snap)=>{},(err)=>{},()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((link)=>{
                url=link;
                add(link);
                console.log(link);
            });})
        }
        //console.log(url);

        const add=async(url)=>{        
            const docRef = await addDoc(collection(db, "Users"), {
            firstName,lastName,email,password,url,"level":1
            });
            console.log(docRef.id);
        }
        // add();
        
    }

    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                    <input
                    type="file"
                    accept="image/*"
                     onChange={(e)=>handler(e)}
                    />
                    <div className={login.formControl}>
                        <input 
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            style={{borderStyle:"none"}}
                            // required
                        />
                        <input 
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setLastName(e.target.value)
                            }
                            // required
                        />
                        <input 
                            type='email'
                            value={email}
                            placeholder='Email'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setEmail(e.target.value)}
                            // required
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setPassword(e.target.value)}
                            // required
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
