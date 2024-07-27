import React, {FC} from 'react';
import './post-component.css'
import {IPost} from "../../models/IPost";
import {Link} from "react-router-dom";

interface IProps {
    post: IPost
}

const PostComponent: FC<IProps> = ({post}) => {
    const {id, title, body} = post
    const commentLink = window.location.href.includes('posts') ? `${id}/comments` : `/posts/${id}/comments`

    return (
        <div className="post-item">
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="content-link">
                <Link to={`/posts/${id}`} state={post}>
                    <button>post page</button>
                </Link>
                <Link to={commentLink}>
                    <button>show comments of this post</button>
                </Link>
            </div>

        </div>
    );
};

export default PostComponent;