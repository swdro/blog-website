import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg';
import { ReactComponent as ArrowRight } from '../assets/chevron-right.svg';

const Pagination = ({ page, setPage }) => {
    const navigate = useNavigate();
    let totalPages = useSelector((store) => store.posts.totalPages);
    const isFirstPage = (page === 1);
    const isLastPage = (page === totalPages);

    const numberedPageLinks = () => {
        let currPage = page;
        let pages = [];
        if (totalPages <= 5) { // show all pages less than 5
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        // -1,0,1,2,3
        if (currPage > totalPages || currPage <= 0) {
            currPage = 1;
            setPage(currPage);
            navigate(`/posts/${1}`);
        }
        pages = [currPage - 2, currPage - 1, currPage, currPage + 1, currPage + 2];
        console.log("pages before manipulation: ", pages);
        // take out pages less than 1
        while (pages[0] < 1) {
            pages.push(pages[pages.length - 1] + 1);
            pages.splice(0,1);
            console.log("first while loop: ", pages);
        }
        // take out pages greater than total pages
        while (pages[pages.length - 1] > totalPages) {
            pages.splice(0,0,pages[0] - 1);
            pages.splice(5,1);
            console.log("second while loop: ", pages);
        }
        return pages;
    }

    const changePage = (p) => {
        if (p < 1) {
            setPage(1);
            navigate(`/posts/${1}`);
        } else if (p > totalPages) {
            setPage(totalPages);
            navigate(`/posts/${totalPages}`);
        } else {
            setPage(p);
            navigate(`/posts/${p}`);
        }
    }

    const pageNumbers = numberedPageLinks();
    console.log(pageNumbers);

    return (
        <div className='flex justify-center py-8'>
            <button onClick={() => changePage(page - 1)} disabled={isFirstPage} className={"opacity-" + ( isFirstPage ? "50" : "100" )} >
                <ArrowLeft/>
            </button>
            { pageNumbers.map((num) => {
                const isCurrPage = (num == page);
                console.log("num: ", num);
                return (
                    <button onClick={() => changePage(num)} disabled={isCurrPage} className={"mx-2 opacity-" + ( isCurrPage ? "50" : "100" ) + " text-" + (isCurrPage ? "black" : "primary")} key={num}>
                        {`${num}`}
                    </button>
                )
            }) }
            <button onClick={() => changePage(page + 1)} disabled={isLastPage} className={"opacity-" + ( isLastPage ? "50" : "100" )} >
                <ArrowRight/>
            </button>
        </div>
    )
}

export default Pagination;