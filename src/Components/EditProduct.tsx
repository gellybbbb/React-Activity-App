import { useState } from "react";
import {IProduct} from "./Product.type"

type Props={
    data:IProduct
    onBackBtnClickHnd:()=>void;
    onUpdateClickHnd:(data:IProduct)=>void
}

const EditProduct=(props:Props)=>{
 const{data,onBackBtnClickHnd,onUpdateClickHnd}=props;

 const [productName, setProductName] = useState(data.name);
  const [quantity, setQuantity] = useState(data.quantity);
  const [unitPrice, setUnitPrice] = useState(data.price);

  
  const onProductNameChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const onQuantityChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const onUnitPriceChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value));
  };


  const onSubmitBtnClickHnd = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: IProduct = {
      id:data.id,
      name: productName,
      quantity: quantity,
      price: unitPrice,
      created_date: new Date(),
      updated_date: new Date(),
      user_id: '1', // Replace with a valid user ID
    };
    console.log('Adding product:', data);
    onUpdateClickHnd(updatedData);
    onBackBtnClickHnd()
  };

 return(
    <form onSubmit={onSubmitBtnClickHnd}>
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={productName}
        onChange={onProductNameChangeHnd}
      />
    </div>
    <div>
      <label>Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={onQuantityChangeHnd}
      />
    </div>
    <div>
      <label>Unit Price:</label>
      <input
        type="number"
        value={unitPrice}
        onChange={onUnitPriceChangeHnd}
      />
    </div>
    <div>
      <input type="button" value="Back" onClick={onBackBtnClickHnd} />
      <input type="submit" value="Update" />
    </div>
  </form>
 )
}

export default EditProduct;