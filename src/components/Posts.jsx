import React  from 'react';
import AllBoards from './AllBoards';
import useBoards from '../hooks/useBoards';


export default function Posts() {
  const {boardsQuery: {isLoading, error, data:boards}} = useBoards();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong...</p>}
      {boards && <AllBoards boards={boards}/>}
    </>
  );
}