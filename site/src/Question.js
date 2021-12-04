import React from 'react';
import question from './Css/questions.module.css'
import { useLocation } from 'react-router-dom';

const Question = () => {
    const loc=useLocation();
    console.log(loc);
    return (
        <div className={question.container} >
             <p className={question.quesHead}>{loc.state.quesName}</p>
                <div className={question.line} ></div>
            <div style={{display:'inline-block',justifyContent:"center"}}>
                <div style={{display:'flex'}}>
                <p className={question.questionLink}>Question Link</p>
                <p className={question.Link} >{loc.state.quesLink}</p>
                </div>

                <div style={{display:'flex'}}>
                <p className={question.questionLink}>Solution Link</p>
                <p className={question.Link} >{loc.state.solLink}</p>
                </div>
            </div>
            
        </div>
    )
}

export default Question
