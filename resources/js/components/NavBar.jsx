import React from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function NavBar(){

    const history = useHistory();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("ログアウトしました", res.data.message, "success");
                history.push('/');
                location.reload();
            } 
        });
    }

    var AuthButtons = '';

    if (!localStorage.getItem('auth_token')){
        AuthButtons = (
            <div>
                <Link to="/register">
                    <span>Register</span>
                </Link>
                <Link to="/login">
                    <span>Login</span>
                </Link>
            </div>
        );
    } else {
        AuthButtons = (
            <div onClick={logoutSubmit}>
                <span>{localStorage.getItem("auth_name")}さん</span>
                <span className="">ログアウト</span>
            </div>
        );
    }

    return(
        <header>
            <ul>
                <li>
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/top">
                        <span>Top</span>
                    </Link>
                </li>
                
            </ul>

            <div>
                {AuthButtons}
            </div>
        </header>
    )
}

export default NavBar;