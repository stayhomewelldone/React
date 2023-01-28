import {Outlet, Link} from "react-router-dom";
import "./style.css";
import React from 'react';

export function Layout(){

    return <React.Fragment><header>
        <h1>Hallo, dit is de layout pagina</h1>
    </header>
        <nav>
            <ul>
                <li><Link to="/">All cities</Link></li>
                <li><Link to="create">Add city</Link></li>
            </ul>
        </nav>

       <Outlet />

    </React.Fragment>
}