import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const params = useParams();
  const localStorageSortBy = JSON.parse(localStorage.getItem("sortBy"));
  const localStorageOrderBy = JSON.parse(localStorage.getItem("order"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [page, setPage] = useState(params?.posts ? parseInt(params?.posts) : 1);
  const [sortBy, setSortBy] = useState(localStorageSortBy ?? 'Date Created');
  const [order, setOrder] = useState(localStorageOrderBy ?? 'Descending');
  const [sideBar, setSideBar] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');

  const changeSortBy = (x) => {
    setSortBy(x);
    localStorage.setItem('sortBy', JSON.stringify(x));
  }

  const changeOrder = (x) => {
    setOrder(x);
    localStorage.setItem('order', JSON.stringify(x));
  }

  return (
    <div>
      <Navbar 
        user={user} 
        setUser={setUser} 
        page={page} 
        setPage={setPage} 
        setSelectedTag={setSelectedTag}
      />
      <Outlet context={{ 
        user, setUser, 
        page, setPage, 
        sortBy, setSortBy, 
        order, setOrder, 
        changeSortBy, changeOrder,
        sideBar, setSideBar,
        selectedTag, setSelectedTag
      }} />
    </div>
  );
}

export default App;
