import React, { useState } from 'react';
import { MdSearch } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import {useNavigate} from 'react-router-dom';
import Top from './ui/Top';
import { useAuthContext } from '../context/AuthContext';
import useBoards from '../hooks/useBoards';

export default function Search() {
  const {boardsQuery: {data:board}} = useBoards();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const {user} = useAuthContext();

  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/board/search/${text}`)
  }


  return (
    <>
      <p>총 <span className='font-bold text-main'>{board && board.length}건</span>의 글이 있습니다</p>
      <>
        <div className='flex items-center justify-between'>
          <form className='flex items-center' onSubmit={handleSubmit}>
            <input
              className='p-0 border border-gray-500 h-8 my-4 sm:w-64 md:w-72 lg:w-96 pl-5 outline-none rounded-sm'
              type="text"
              placeholder='검색어를 입력하세요'
              onChange={handleChange}
            />
            <button className='text-3xl h-8 ml-2 '><MdSearch /></button>
          </form>
          {user &&
            <button className='text-3xl h-8 mr-2 transition ease-in hover:bg-gray-200 duration-200 rounded-md' onClick={() => {navigate('/board/create')}}><LuPencilLine /></button>
          }
        </div>
        {!user && 
          <p className='mb-4 text-sm text-gray-400'>*글쓰기는 로그인 후 이용 가능합니다*</p>
        }
        <Top />
      </>
    </>
  );
}