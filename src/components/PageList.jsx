import React from 'react';
import { IoIosTimer } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function PageList({board}) {
  const navigate = useNavigate();
  const date = board.date;
  

  return (
    <li className='mb-4 pl-2 md:pl-5 cursor-pointer border-b border-gray-200 pb-2' onClick={() => {navigate(`/board/detail/${board.id}`, {state:{board}})}}>
      <div className='flex justify-between'>
        <div className='flex items-center ml-2'>
          <p className='w-12 text-center'>{board.listNumber}</p>
          <p className='flex-grow mx-4 md:ml-16'>{board.title}</p>
        </div>
        <div className='flex items-center'>
          <p className='mr-8 flex-shrink-0 md:mr-6'>{board.writer}</p>
          <p className='hidden md:flex items-center px-2 truncate'><IoIosTimer />{date}</p>
        </div>
      </div>
    </li>
    
  );
}