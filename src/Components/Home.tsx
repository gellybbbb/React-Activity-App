
import React, { useEffect, useState } from 'react';
import { IProduct, PageEnum } from './Product.type';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const Home = () => {
  const [productList, setProductList] = useState([] as IProduct[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const[dataToEdit,setDataToEdit]=useState({}as|IProduct);

 useEffect(()=>{
  const listInString=window.localStorage.getItem("ProductList");
  if(listInString){
    _setProductList(JSON.parse(listInString));
  }
},[]);


  const onAddProductClickHnd = () => {
    setShownPage(PageEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageEnum.list);
  };

  const _setProductList=(list:IProduct[])=>{
    setProductList(list);
    window.localStorage.setItem("ProductList",JSON.stringify(list))
  };

 


  const addProduct = (data: IProduct) => {
    _setProductList([...productList, data]);
    console.log('Added product to list:', data);
    showListPage();
  };

  const deleteProduct=(data:IProduct)=>{


    const indexToDelete =productList.indexOf(data);
    const tempList=[...productList]

    tempList.splice(indexToDelete,1);
    _setProductList(tempList)
  };
  
  const EditProductData=(data:IProduct)=>{
    setShownPage(PageEnum.edit)
    setDataToEdit(data)
  }

const updateData=(data:IProduct)=>{
  const filteredData=productList.filter(x=> x.id===data.id)[0]
  const indexOfRecord=productList.indexOf(filteredData);
  const tempData=[...productList]
  tempData[indexOfRecord]=data;
  _setProductList(tempData)
}

  return (
    <>
      <section>
        {shownPage === PageEnum.list && (
          <>
            <input type="button" value="Add Product" onClick={onAddProductClickHnd} />
            <ProductList list={productList} onDeleteClickHnd={deleteProduct} onEdit={EditProductData}/>
          </>
        )}
        {shownPage === PageEnum.add && <AddProduct onBackBtnClickedHnd={showListPage} onSubmitClickHnd={addProduct} />}
        {shownPage===PageEnum.edit&&<EditProduct data={dataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateData}/>}
      </section>
    </>
  );
};

export default Home;