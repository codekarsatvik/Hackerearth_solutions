import React , {useState,useEffect,Redirect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import login from './Css/login.module.css'
import logo from './images/logo.svg'
import google from './images/google.svg'
import { db} from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";


const Login = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [users,setUsers]=useState([]);
    let history=useHistory();

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
        let flag=false;
        let level=0;
        users.map((user)=>{
            if(user.userName==userName&&password==user.password)
            {
                flag=true;
                level=user.level;
            }
        });
        if(flag==false)
        {

        }
        else
        {
           history.push("/",{authorized:true,userName,level});
        }
    }


    return (
        <>
            <article className={login.loginContainer}>
                <form className={login.form} onSubmit={handler} >      
                    <div className={login.formControl}>
                         <img src={logo} className={login.logo} />
                        <input 
                            value={userName}
                            placeholder='UserName'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <input
                            type='password'
                            value={password}
                            placeholder='Password'
                            style={{borderStyle:"none"}}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className={login.pass}>Forgot Password?</p>
                    <div className={login.wrapper}>
                        <button type='submit' className={login.btnLogin}>Log in</button>
                        <div className={login.wrap}>
                            <p>Dont’t have an account?</p>
                            <Link to="./signup" className={login.link}>Sign up</Link>
                        </div>
                    </div>
                    <h5>or</h5>
                    <div className={login.media} >
                        <img src={google} alt='google' className={login.logo_G}></img>
                        <p style={{textShadow: "0.5px 0.5px gray" , alignItems:"center" , marginLeft:"15px"}}>Continue with Google</p>
                    </div>
                </form>
            </article>
        </>
    )
}

export default Login
