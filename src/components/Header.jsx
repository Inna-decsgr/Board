import React from 'react';
import { FaRegClipboard } from "react-icons/fa6";
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';


export default function Header() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = `${year}-${month}-${day}`;
  const {user, login, logout} = useAuthContext();


  return (
    <header className='flex flex-col md:flex-row justify-between mt-20 pb-3 mb-3 text-main'>
      <div className='flex flex-row items-center text-2xl'>
        <FaRegClipboard />
        <h1 className='ml-2 font-bold'>게시판</h1>
      </div>
      <div className='flex items-center'>
        <p className='text-lg text-gray-600 mr-6'>Today : {dateString}</p>
        {user && <p className='mr-2'><span className='font-bold text-main'>{user.displayName}</span>님</p>}
        {!user && <Button text="login" onClick={login}/>}
        {user && <Button text="logout" onClick={logout}/>}
      </div>
    </header>
  );
}