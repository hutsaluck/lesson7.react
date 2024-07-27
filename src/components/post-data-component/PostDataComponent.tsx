import React, {FC, useEffect, useState} from 'react';
import {Location, useLocation, useParams} from "react-router-dom";
import './post-data-component.css'
import {postService} from "../../services/api.service";
import {IPost} from "../../models/IPost";
import CommentsComponent from "../comments-component/CommentsComponent";


const PostDataComponent: FC = () => {
    let {id} = useParams();
    const location: Location<IPost> = useLocation()
    const checkPost: IPost = location.state

    const [post, setPost] = useState<IPost>(checkPost)

    useEffect(() => {
        if (id && !checkPost) {
            postService.getPostById(+id).then((post: IPost): void => setPost(post));
        }
    }, []);

    return (
        <div className="content-post">
            <h3>{post?.title}</h3>
            <p>{post?.body}</p>
            <CommentsComponent/>
        </div>
    );
};

export default PostDataComponent;