import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useBoards from '../hooks/useBoards';

export default function BoardDetail() {
  const {state: {board, board: {id, title, writer, content, date, image, modify, boardId}}} = useLocation();
  const navigate = useNavigate();
  const {uid} = useAuthContext();
  const {deleteBoard} = useBoards();
  

  const handleDelete = () => {
    if(window.confirm("게시물을 삭제하시겠습니까?") === true) {
      deleteBoard.mutate({id},
        {onSuccess: () => {
          alert("게시물이 삭제되었습니다.")
          navigate('/')
        }})
    }else {
      return
    }
  }


  return (
    <>
      <div className='flex items-center mt-8 md:mt-16 border-t-2 border-gray-900'>
        <h1 className='text-main font-semibold text-2xl border-b border-gray-300 my-4 pb-4 w-full'> {title}</h1>
      </div>
      <div className='md:flex items-center border-b pb-2'>
        <div className='flex items-center'>
          <p className='py-2 text-gray-500'>작성자 : </p>
          <span className='pl-2 mr-6'>{writer}</span>
        </div>
        <div className='flex items-center'>
          <p className='py-2 text-gray-500'>{modify ? "수정" : "작성"} 일자 :</p>
          <span className='pl-2'>{date}</span>
        </div>
      </div>
      <div className='flex items-center mt-4'>
        <p className='pl-2'>{content}</p>
      </div>
      {image && 
        <img className='mt-6 w-10/12' src={image} alt="사진" />
      }
      <div className='flex justify-between my-20'>
        <Button text="목록으로 돌아가기" type="button" onClick={() => {navigate('/')}}/>
        {board.boardId === uid &&
          <div className='flex whitespace-nowrap h-10'>
          <Button text="수정" onClick={() => {navigate(`/board/update/${id}/${boardId}`, {state:{board}})}}/>
          <Button text="삭제" onClick={handleDelete}/>
        </div>
        }
      </div>
      
    </>
  );
}