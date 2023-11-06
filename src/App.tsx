import React, { useState } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from '../src/Components/Dashboard'
import { IUser } from '../src/interface/User';
import AddProd, { IProduct } from '../src/Components/AddProd'; // Adjust the import path based on your project structure

function App() {
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login
          userList={userList}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          handlePageChange={handlePageChange}
        />
      )}
      {currentPage === 'create' && (
        <Register userList={userList} setUserList={setUserList} handlePageChange={handlePageChange} />
      )}
      {currentPage === 'dashboard' && <Dashboard loggedUser={loggedUser} />}
      <AddProd
  submitProd={(productData) => {
    // Handle the submission of a new product here
    console.log('Submitting product:', productData);
    // You can call an API or update your state with the new product data
  }}
  loggedUser={loggedUser}
/>
    </div>
  );
}
export default App;
