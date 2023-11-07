
import {IProduct} from "./Product.type";

type Props={
    list:IProduct[];
    onDeleteClickHnd:(data:IProduct)=>void
    onEdit:(data:IProduct)=>void
};

const ProductList=(props:Props)=>{
    const {list,onDeleteClickHnd,onEdit}=props;


   

    return(
    <div>

<table>
  <tr>
    <th>Name</th>
    <th>Unit Price</th>
    <th>Total Price</th>
    <th>Created Date</th>
    <th>Actions</th>
  </tr>
  {list.map(product=>{
    console.log(product)
    return (
            <tr key={product.id}>
              <td>{`${product.name}`}</td>
              <td>{`${product.price}`}</td>
              <td>{`${product.quantity * product.price}`}</td> {/* Calculate total price */}
              <td>{`${product.created_date}`}</td> {/* Display creation date */}
              <td>
                <div>
                  <input type="button" value="Edit" onClick={()=>onEdit(product)} />
                  <input type="button" value="View" />
                  <input type="button" value="Delete" onClick={()=>onDeleteClickHnd(product)}/>
                </div>
              </td>
            </tr>
          );
        })}
</table>
    </div>
)
}
export default ProductList;