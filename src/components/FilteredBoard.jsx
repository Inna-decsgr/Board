import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Top from './ui/Top';
import Button from './ui/Button';
import useBoards from '../hooks/useBoards';
import FilteredPageList from './FilteredPageList';


export default function FilteredBoard() {
  const {boardsQuery: {data:boards}} = useBoards();
  const {keyword} = useParams();
  const items = boards && boards.filter(board => board.title.includes(keyword));
  const navigate = useNavigate();


  return (
    <>
      <div className='my-4 pb-4'>
        {
          <p><span className='font-bold text-main text-lg'>'{keyword}'</span>(으)로 검색한
            {items?.length === 0 ? " 결과가 없습니다" : <span> 총 <span className='font-bold text-main text-lg'>{items && items.length}건</span>의 글이 있습니다`</span>}
          </p>
        }
      </div>
      <Top />
      <ul>
        {items && items.map((item, index) => <FilteredPageList key={item.id} index={index + 1} board={item}/>)}
      </ul>
      { items?.length === 0 && 
        <p className='text-center mt-10 text-gray-600'>검색 키워드와 일치하는 게시글이 없습니다.</p>
      }
      <div className='my-20'>
        <Button text="홈으로" type="button" onClick={() => {navigate('/')}}/>
      </div>
    </>
  );
}

