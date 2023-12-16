import React, { useState } from 'react';
import { uploadImage } from '../api/Uploader';
import { useNavigate, useLocation} from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import useBoards from '../hooks/useBoards';


export default function BoardUpdate() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const {state: {board, board: {id, title, content, image}}} = useLocation();
  const [comment, setComment] = useState(board);
  const {userName} = useAuthContext();
  const {updateBoards} = useBoards();


  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === 'file') {
      setFile(files && files[0])
      return;
    }
    setComment(comment => ({...comment, [name] : value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file)
    .then(url => {
      updateBoards.mutate({comment, url, id, image, userName}, {
        onSuccess: () => {
          alert("성공적으로 수정되었습니다.");
          navigate('/')
        }
      })
    })
  }


  return (
    <section>
      <div className='flex justify-between items-center mb-10 border-b border-gray-300'>
        <h1 className='font-bold text-main pb-6'>게시글 수정하기</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between items-center mb-6'>
          <span className='w-20 text-center'>제목</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none'
          type="text"
          required
          name='title'
          defaultValue={title}
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span className='w-20 text-center'>작성자</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none'
          type="text"
          value={userName}
          readOnly
          name='writer'
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span className='w-20 text-center'>내용</span>
          <textarea 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none h-72'
          type="text"
          required
          name='content'
          defaultValue={content}
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span className='w-20 text-center'>첨부파일</span>
          <input 
          className='text-md border border-gray-400 pl-2 py-1 w-11/12 rounded-sm outline-none '
          type="file"
          name='file'
          onChange={handleChange}
          />
        </div>
        <div className='flex justify-between mt-20'>
          <Button text="목록으로 돌아가기" type="button" onClick={() => {navigate('/')}}/>
          <Button text="수정" type="submit" onSubmit={handleSubmit}/>
        </div>
      </form>
    </section>
  );
}