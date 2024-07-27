import React, {FC} from 'react';
import {IUser} from "../../models/IUser";
import './user-component.css'
import {Link} from "react-router-dom";

interface IProps {
    user: IUser
}

const UserComponent: FC<IProps> = ({user}) => {
    const {id, name} = user

    return (
        <div className="user-item">
            <h3>{id}. {name}</h3>
            <div className="content-link">
                <Link to={`${id}`} state={user}>
                    <button>user page</button>
                </Link>
                <Link to={`${id}/posts`}>
                    <button>show posts of this user</button>
                </Link>
            </div>
        </div>
    );
};

export default UserComponent;