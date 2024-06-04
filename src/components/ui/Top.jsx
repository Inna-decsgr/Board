import React from 'react';

export default function Top() {
  return (
    <>
      <div className='flex justify-between mb-4 border-b border-gray-300 pb-2 text-gray-700 bg-gray-100 pt-2 font-bold relative'>
          <div className='flex ml-2 md:ml-6'>
            <span className='ml-2 md:ml-4'>No.</span>
            <span className='ml-4 md:ml-[70px] flex-shrink-0'>제목</span>
          </div>
          <div>
            <span className='mr-2 md:mr-10'>작성자</span>
            <span className='hidden md:inline-block md:mr-10'>작성(수정)일자</span>
          </div>
        </div>
    </>
  );
}

