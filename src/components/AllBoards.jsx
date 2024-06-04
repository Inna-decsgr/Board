import React, { useEffect, useState } from 'react';
import PageList from './PageList';
import Pagination from "react-js-pagination";


export default function AllBoards({boards}) {
  const [page, setPage] = useState(1); 
  const limit = 10; 
  const [currentPost, setCurrentPost] = useState(boards)
  const indexOfLastPost = page * limit
  const indexOfFirstPost = indexOfLastPost - limit;


  useEffect(() => {
    setCurrentPost(boards.slice(indexOfFirstPost, indexOfLastPost))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards, page])

  return (
    <section>
      {currentPost && <ul className='h-full'>
        {currentPost && currentPost.map((board, index) => <PageList key={board.id} index={index} board={board}/>)}
      </ul>}
      <section className='mt-8 mb-48'>
        <Pagination
          activePage={page}  
          itemsCountPerPage={10}
          totalItemsCount={boards?.length}  
          pageRangeDisplayed={5}  
          onChange={(page) => setPage(page)} 
        />
      </section>
    </section>
  );
}
