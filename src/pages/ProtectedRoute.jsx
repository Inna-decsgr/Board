import { useAuthContext } from '../context/AuthContext';
import {Navigate, useParams} from 'react-router-dom';

export default function ProtectedRoute({children, requireUser}) {
  const {user, uid} = useAuthContext();
  const {boardId} = useParams();

  if(!user || requireUser && (boardId !== uid)){
    return <Navigate to='/' replace={true}/>
  }
  return children;

}