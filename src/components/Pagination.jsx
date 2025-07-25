import React, { useLayoutEffect } from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

const Pagination = ({pageNumber,setPageNumber,totalItems,parPage,showItem}) => {

    let totalPages = Math.ceil(totalItems / parPage)
    let startPage = pageNumber

    let dif = totalPages - pageNumber
    if (dif <= showItem) {
        startPage = totalPages - showItem  
    }

    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <=0) {
        startPage = 1
    }

    const createBtn = () => {

        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={() => setPageNumber(i)} className={` ${pageNumber === i ? 'bg-green-700 shadow-lg shadow-indigo-300/50 text-white' : 
                'bg-slate-600 hover:bg-green-400 shadow-lg hover:shadow-green-500/50 hover:text-white text-[#d0d2d6]'} 
                w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}>
                    {i}

                </li>
            )
            
        }
        return btns

    }
    return(
        <ul className='flex gap-3'>

            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber -1)} className='w-[33px] h-[33px] rounded-full 
                flex justify-center items-center bg-slate-300 
                text-[#000000] cursor-pointer'>
                    <MdKeyboardDoubleArrowLeft/>
                </li>
            }
            
            {
                createBtn()
            }
                        {
                pageNumber < totalPages && <li onClick={() => setPageNumber(pageNumber +1)} className='w-[33px] h-[33px] rounded-full 
                flex justify-center items-center bg-slate-300 
                text-[#000000] cursor-pointer'>
                    <MdKeyboardDoubleArrowRight/>
                </li>
            }

        </ul>
    )
};

export default Pagination;