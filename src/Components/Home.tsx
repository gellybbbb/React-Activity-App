import React, { useEffect, useState } from 'react';
import { IProduct, PageEnum } from './Product.type';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './Login';
import axios from 'axios';

interface HomeProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
  const [productList, setProductList] = useState([] as IProduct[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IProduct);
  const [isLogin, setIsLogin] = useState(false as Boolean);

  useEffect(() => {
    const listInString = window.localStorage.getItem("ProductList");
    if (listInString) {
      setProductList(JSON.parse(listInString));
    }
  }, []);

  const onAddProductClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const _setProductList = (list: IProduct[]) => {
    setProductList(list);
    window.localStorage.setItem("ProductList", JSON.stringify(list));
  };

  const addProduct = async (data: IProduct) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/some/endpoint', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      _setProductList([...productList, data]);
      console.log('Added product to list:', data);
      showListPage();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (data: IProduct) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/users/login/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const indexToDelete = productList.indexOf(data);
      const tempList = [...productList];
      tempList.splice(indexToDelete, 1);
      _setProductList(tempList);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const EditProductData = (data: IProduct) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const updateData = async (data: IProduct) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/some/endpoint/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredData = productList.filter((x) => x.id === data.id)[0];
      const indexOfRecord = productList.indexOf(filteredData);
      const tempData = [...productList];
      tempData[indexOfRecord] = data;
      _setProductList(tempData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLogin(false);
    setUser(null); // Clear user information
  };

  return (
    <>
      <section className='container mt-3'>
        {!isLogin && <Login setIsLogin={setIsLogin} setUser={setUser} />}

        {isLogin && (
          <>
            <p>Welcome, {user && user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
            <input
              className="btn btn-primary"
              type="button"
              value="Add Product"
              onClick={onAddProductClickHnd}
            />
            <ProductList
              list={productList}
              onDeleteClickHnd={deleteProduct}
              onEdit={EditProductData}
            />
          </>
        )}
        {shownPage === PageEnum.add && (
          <AddProduct onBackBtnClickedHnd={showListPage} onSubmitClickHnd={addProduct} />
        )}
        {shownPage === PageEnum.edit && (
          <EditProduct
            data={dataToEdit}
            onBackBtnClickHnd={showListPage}
            onUpdateClickHnd={updateData}
          />
        )}
      </section>
    </>
  );
};

export default Home;
