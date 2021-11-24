import React , {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import login from './Css/login.module.css'
import google from './images/google.svg'
import {db,storage} from "./firebase/config";
import {collection,getDocs} from "firebase/firestore"
import {ref,uploadBytesResumable,getDownloadURL} from "@firebase/storage"
import {Def_img} from "./images/user-profile.jpg"

const SignUp = () => {

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [url,setUrl]=useState("");
    const [users,setUsers]=useState([]);

    const usersRef=collection(db,"Users");

    useEffect(() => {
       const getUsers=async()=>{
           const data=await getDocs(usersRef);
           setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
           console.log(users)
       }
        
    },[])

    const handleUpload=(e)=>{
        e.preventDefault();
        const file=e.target[0].files[0];
        
        if(file)
        {
            let val=Math.floor(new Date().valueOf() * Math.random());
            const stref=ref(storage,`/files/${val}`);
            const uploadTask=uploadBytesResumable(stref,file);
            uploadTask.on("state_changed",(snap)=>{},(err)=>{},()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((link)=>{
            setUrl(link);
            });})
        }
        
    }

    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handleUpload}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageUploader}
                    style={{display: "none"}}
                    />
                <div style={{height: "100px", width: "100px", borderRadius: "50px",borderColor: "transparent", backgroundColor: "#B8DFD8",cursor:"pointer"}}
                onClick={() => imageUploader.current.click()}>
                {uploadedImage.current&&(<img
                ref={uploadedImage}
                style={{width: "100%",height: "100%",borderRadius: "50px"}}
                />)}
                {!uploadedImage.current&&(<img src="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/files%2Fuser-profile.jpg?alt=media&token=6982b57c-b199-4cf5-881f-b7e820dd1ade"
                style={{width: "100%",height: "100%",borderRadius: "50px"}}
                />)}
                </div> 
                </div>
                    <div className={login.formControl}>
                        <input 
                            type='text'
                            value={firstName}
                            placeholder='First Name'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input 
                            type='text'
                            value={lastName}
                            placeholder='Last Name'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input 
                            type='email'
                            value={email}
                            placeholder='Email'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setPassword(e.target.value)}
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
