import React, {FC, useEffect, useState} from 'react';
import './comments-component.css'
import {commentService} from "../../services/api.service";
import {IComment} from "../../models/IComment";
import CommentComponent from "../comment-component/CommentComponent";
import {useParams, useSearchParams} from "react-router-dom";
import PaginationComponent from "../pagination-component/PaginationComponent";

interface IResponse {
    data: IComment[]
    totalCount: number
}

const CommentsComponent: FC = () => {
    const {id} = useParams();

    const [comments, setComments] = useState<IComment[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)

    const [searchParams] = useSearchParams({page: '1'});
    const page: string | null = searchParams.get('page');
    const limit: number = 8

    const setParams = (response: IResponse) => {
        const {data, totalCount} = response;

        setTotalPages(Math.ceil( totalCount / limit ))
        setComments([...data])
    }

    useEffect(() => {
        if (id && page) {
            commentService.getCommentsOfPostById(+id, +page, limit).then((response: IResponse): void => setParams(response));
        } else if (page) {
            commentService.getAllWithPagination(+page, limit).then((response: IResponse): void => setParams(response));
        } else {
            commentService.getAllComments().then((comments: IComment[]) => setComments([...comments]));
        }
    }, [id, page]);

    return (
        <div>
            <h2>{comments.length ? `Comments` : ``}</h2>
            <div className="wrap-comments">
                {
                    comments.map(comment => <CommentComponent key={comment.id} comment={comment}/>)
                }
            </div>
            <PaginationComponent totalPages={totalPages}/>
        </div>
    );
};

export default CommentsComponent

