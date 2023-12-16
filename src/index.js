import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import BoardDetail from './pages/BoardDetail';
import NewBoard from './pages/NewBoard';
import BoardUpdate from './pages/BoardUpdate';
import FilteredBoard from './components/FilteredBoard';
import ProtectedRoute from './pages/ProtectedRoute';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement:<NotFound />,
    children:[
      {
        index:true, path:'/', element : <Home />
      },
      {
        path:'/board/detail/:postNumber',
        element:<BoardDetail />
      },
      {
        path:'/board/create',
        element: <ProtectedRoute>
          <NewBoard />
        </ProtectedRoute>
      },
      {
        path:'/board/update/:postNumber/:boardId',
        element:<ProtectedRoute requireUser={true}>
          <BoardUpdate />
        </ProtectedRoute>
      },
      {
        path:'/board/search/:keyword',
        element:<FilteredBoard />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
