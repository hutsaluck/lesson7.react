import React, {FC} from 'react';
import {useSearchParams} from "react-router-dom";
import './pagination-component.css'

interface IProps {
    totalPages: number
}

const PaginationComponent: FC<IProps> = ({totalPages}) => {
    let [searchParams, setSearchParams] = useSearchParams({page: '1'});

    let currentPage: number = +(searchParams.get('page') || '1');
    let prevPage: string = (currentPage - 1).toString();
    let nextPage: string = (currentPage + 1).toString();

    const paginationItems = [];

    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            page === currentPage
                ? <span key={page}>{page}</span>
                : <button key={page} onClick={() => setSearchParams({page: page.toString()})}>{page}</button>
        );
    }

    return (
        <div className={totalPages > 30 ? 'pagination large' : 'pagination'}>
            {currentPage > 1 && <button key="prev" onClick={() => setSearchParams({page: prevPage})}>
                &#10094;
            </button>}
            {paginationItems}
            {currentPage < totalPages && <button key="next" onClick={() => setSearchParams({page: nextPage})}>
                &#10095;
            </button>}
        </div>
    );
};

export default PaginationComponent;