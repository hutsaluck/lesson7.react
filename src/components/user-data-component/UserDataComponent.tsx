import React, {FC, useEffect, useState} from 'react';
import {Location, useLocation, useParams} from "react-router-dom";
import {IUser} from "../../models/IUser";
import './user-data-component.css'
import user_image from '../../assets/images/user.svg';
import PostsComponent from "../posts-component/PostsComponent";
import {userService} from "../../services/api.service";


const UserDataComponent: FC = () => {
    let {id} = useParams();
    const location: Location<IUser> = useLocation()
    const checkUser: IUser = location.state

    const [user, setUser] = useState<IUser>(checkUser)

    useEffect(() => {
        if(id && !checkUser){
            userService.getUserById(+id).then((user: IUser): void => setUser(user));
        }
    }, []);

    return (
        <div>
            <div className="content-user">
                <img src={user_image} alt="user"/>
                <div className="info-user">
                    <h1>{user?.name}</h1>
                    <p className="username">@{user?.username}</p>
                    <p><a href={'mailto:' + user?.email}>{user?.email}</a></p>
                    <p><a href={'tel:' + user?.phone}>{user?.phone}</a></p>
                    <p><a href={user?.website}>{user?.website}</a></p>
                    <div className="wrap-additional-info">
                        <div className="address">
                            <h2>Address:</h2>
                            <p className="street">{user?.address.street}</p>
                            <p className="suite">{user?.address.suite}</p>
                            <p className="city">{user?.address.city}</p>
                            <p className="zipcode">{user?.address.zipcode}</p>
                            <p className="geo">{user?.address.geo.lat} {user?.address.geo.lng}</p>
                        </div>
                        <div className="company">
                            <h2>Company:</h2>
                            <p className="name">{user?.company.name}</p>
                            <p className="catchPhrase">{user?.company.catchPhrase}</p>
                            <p className="bs">{user?.company.bs}</p>
                        </div>
                    </div>
                </div>
            </div>
            <PostsComponent/>
        </div>
    );
};

export default UserDataComponent;