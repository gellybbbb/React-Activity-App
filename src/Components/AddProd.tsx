import React, { useState } from 'react';
import { IUser } from '../interface/User';

type Props = {
  submitProd: (data: IProduct) => void;
  loggedUser: IUser;
};

export default function AddProd(props: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const { submitProd, loggedUser } = props;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value));
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value));

  const submitBtnProd = () => {
    const data: IProduct = {
      id: new Date().toJSON().toString(),
      name: name,
      quantity: quantity,
      price: price,
      created_date: new Date(),
      updated_date: new Date(),
      user_id: loggedUser.id,
    };

    submitProd(data);

    // Reset the form fields
    setName('');
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            value={quantity}
            onChange={onQuantityChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="productPrice"
            value={price}
            onChange={onPriceChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={submitBtnProd}>
          Save
        </button>
      </form>
    </div>
  );
}

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  created_date: Date;
  updated_date: Date;
  user_id: string;
}
