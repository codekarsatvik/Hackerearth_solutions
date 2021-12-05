import React from 'react';
import {FiUsers} from "react-icons/fi";
import sidebar from "./Css/sidebar.module.css";
import { Link } from 'react-router-dom';
import {CgProfile} from "react-icons/cg";
import {FiSettings} from "react-icons/fi";


const Sidebar = () => {
    return (
        <div className={sidebar.container}>
            <div className={sidebar.line} ></div>
            <Link className={sidebar.item}>
            <CgProfile className={sidebar.icons}/>
            <p className={sidebar.iconText} >Profile</p>
            </Link>

            <Link className={sidebar.item}>
            <FiUsers className={sidebar.icons}/>
            <p className={sidebar.iconText} >Users</p>
            </Link>

             <Link className={sidebar.item}>
            <FiSettings className={sidebar.icons}/>
            <p className={sidebar.iconText} >Settings</p>
            </Link>
        </div>
    )
}

export default Sidebar
