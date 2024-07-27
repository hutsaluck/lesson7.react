import React, {FC} from 'react';
import './post-component.css'
import {IPost} from "../../models/IPost";
import {Link} from "react-router-dom";

interface IProps {
    post: IPost
}

const PostComponent: FC<IProps> = ({post}) => {
    const {id, title, body} = post
    return (
        <div className="post-item">
            <h3>{title}</h3>
            <p>{body}</p>
            <Link to={`${id}/comments`}>
                <button>show comments of this post</button>
            </Link>
        </div>
    );
};

export default PostComponent;