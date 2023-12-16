import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { getBoardLists, addNewBoard, removeBoard, updateBoard } from '../api/firebase';

export default function useBoards() {
  const queryClient = useQueryClient();

  const boardsQuery = useQuery({queryKey:['boards'], queryFn:() => getBoardLists(), ...{staleTime: 1000 * 60}})

  const addBoard = useMutation({mutationFn: ({user, board, url, userName, number}) => addNewBoard(user, board, url, userName, number), onSuccess: () => queryClient.invalidateQueries('boards')})

  const updateBoards = useMutation({mutationFn:({comment, url, id, image, userName}) => updateBoard(comment, url, id, image, userName), onSuccess:() => queryClient.invalidateQueries('boards')})

  const deleteBoard = useMutation({mutationFn: ({id}) => removeBoard(id), onSuccess: () => queryClient.invalidateQueries('boards')})

  return {boardsQuery, addBoard, updateBoards, deleteBoard};
}

