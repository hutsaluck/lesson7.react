import React, {FC, useEffect, useState} from 'react';
import {IPost} from "../../models/IPost";
import './posts-component.css'
import PostComponent from "../post-component/PostComponent";
import {postService} from "../../services/api.service";
import {useParams, useSearchParams} from "react-router-dom";
import PaginationComponent from "../pagination-component/PaginationComponent";

interface IResponse {
    data: IPost[]
    totalCount: number
}

const PostsComponent: FC = () => {
    const {id} = useParams();

    const [posts, setPosts] = useState<IPost[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)

    const [searchParams] = useSearchParams({page: '1'});
    const page: string | null = searchParams.get('page');
    const limit: number = 8;

    const setParams = (response: IResponse) => {
        const {data, totalCount} = response;

        setTotalPages(Math.ceil( totalCount / limit ))
        setPosts([...data])
    }


    useEffect(() => {
        if (id && page) {
            postService.getPostsOfUserById(+id, +page, limit).then((response: IResponse): void => setParams(response));
        } else if (page) {
            postService.getAllWithPagination(+page, limit).then((response: IResponse): void => setParams(response));
        } else {
            postService.getAllPosts().then((posts: IPost[]) => setPosts([...posts]));
        }
    }, [id, page]);

    return (
        <div>
            <h2>{posts.length ? `Posts` : ``}</h2>
            <div className="wrap-posts">
                {
                    posts.map(post => <PostComponent key={post.id} post={post}/>)
                }
            </div>
            <PaginationComponent totalPages={totalPages}/>
        </div>
    );
};

export default PostsComponent

