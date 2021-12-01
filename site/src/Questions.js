import React from 'react'
import question from './Css/questions.module.css'

const plus="https://firebasestorage.googleapis.com/v0/b/hackerearth-soln.appspot.com/o/Plus.jpg?alt=media&token=591a5d92-b5e3-4561-949b-8a64b34ab1b6";

const Questions = () => {

    const quesRef = collection(db,"Questions");
    const [ques,setQues] = useState([]);
    const loc=useLocation();
    useEffect(() => {
        const getQues = async() => {
            const data = await getDocs(quesRef);
            setQues(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getQues();
    },[])
    return (
        <div className={question.container}>

        </div>
    )
}

export default Questions
