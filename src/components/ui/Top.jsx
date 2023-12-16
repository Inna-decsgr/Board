import React from 'react';

export default function Top() {
  return (
    <>
      <div className='flex justify-between mb-4 border-b border-gray-300 pb-2 text-gray-700 bg-gray-100 pt-2 font-bold relative'>
          <div className='ml-6'>
            <span>No</span>
            <span className='ml-14'>제목</span>
          </div>
          <div>
            <span className='mr-16'>작성자</span>
            <span className='mr-4'>작성(수정)일자</span>
          </div>
        </div>
    </>
  );
}

