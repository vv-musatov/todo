import React from "react";
import { Link } from "react-router-dom";


function Menu() {
    return (
        <nav class="menu">
            <ul>
                <li><Link to='/'>Пользователи</Link></li>
                <li><Link to='/projects'>Проекты</Link></li>
                <li><Link to='/todos'>Заметки</Link></li>
            </ul>
        </nav>
    )
}

export default Menu;