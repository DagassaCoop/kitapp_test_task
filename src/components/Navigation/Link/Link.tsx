import React from "react";
import './Link.scss'
import { NavLink } from 'react-router-dom'

interface IProps {
    to: string;
    title: string;
    icon: string;
}

const Link: React.FC<IProps> = ({ title, to, icon}) => {

    const activeLinkCheck = (isActive: boolean) => {
        return isActive
            ? 'Link Link_active'
            : 'Link'
    }

    return (
        <NavLink  className={ ({isActive}) => activeLinkCheck(isActive) } to={to}>
            <img src={icon} alt="icon"/>
            <span>{title}</span>
        </NavLink>
    )
}

export default Link;