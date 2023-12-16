import React, { useState } from 'react';
import { uploadImage } from '../api/Uploader';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useBoards from '../hooks/useBoards';

export default function NewBoard() {
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [file, setFile] = useState();
  const {user, userName} = useAuthContext();
  const {addBoard} = useBoards();

  const {boardsQuery: {data:boards}} = useBoards()
  const order = boards?.length - boards?.length
  const number = boards[order].listNumber;


  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file') {
      setFile(files && files[0])
      return;
    }
    setBoard(board => ({
      ...board, 
      [name] : value
    }))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file)
    .then(url => {
      addBoard.mutate({user, board, url, userName, number},
        {onSuccess: () => {
            alert("성공적으로 저장되었습니다.")
            window.location.href = '/'
          } 
        })
    })
  }

  return (
    <section>
      <div className='flex justify-between items-center mb-10 border-b border-gray-300'>
        <h1 className='font-bold text-main pb-6'>게시글 작성하기</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-center mb-6'>
          <span className=''>제목</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none '
          type="text"
          required
          placeholder='제목을 입력해주세요'
          name='title'
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span className=''>작성자</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none '
          type="text"
          value={userName}
          readOnly
          name='writer'
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span>내용</span>
          <textarea 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none h-72'
          type="text"
          required
          placeholder='내용을 입력해주세요'
          name='content'
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span>첨부파일</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none'
          type="file"
          placeholder='파일을 선택해 주세요.'
          name='file'
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between mt-20'>
          <Button text="목록으로 돌아가기" type="button" onClick={() => {navigate('/')}}/>
          <Button text="저장" type="submit" onSubmit={handleSubmit}/>
        </div>
      </form>
    </section>
  );
}
