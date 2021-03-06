import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import isAdmin from '../lib/isAdmin';
import { addToCartRest } from '../services/CartRest';

const Product = ({ product, handleProductEdit, handleProductDelete }) => {
  const history = useHistory();
  const admin = isAdmin();

  const handleClick = () => {
    history.push(`/products/${product._id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    handleProductEdit(id);
  }

  const handleDelete = (e, id) => {
    e.stopPropagation();
    handleProductDelete(id);
  }

  const handleAddToCart = async (e, id) => {
    e.stopPropagation();
    try {
      await addToCartRest(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProductStyles onClick={handleClick}>
      <img src={product.photo} alt={product.name} />
      <div className="details">
        <h3>{product.name}</h3>
        <span className="price">Price: {formatMoney(product.price)}</span>
      </div>
      <div className="buttons">
        {admin && <>
          <button type="button" onClick={(e) => handleEdit(e, product._id)}><i className="far fa-edit"></i></button>
          <button type="button" onClick={(e) => handleDelete(e, product._id)}><i className="fas fa-trash"></i></button>
        </>}
        <button type="button" onClick={(e) => handleAddToCart(e, product._id)}><i className="fas fa-shopping-cart"></i></button>
      </div>
    </ProductStyles>
  );
};

const ProductStyles = styled.div`
  box-shadow: var(--bs);
  display: flex;
  flex-direction: column;
  max-width: 27.5rem;
  background: hsl(0, 0%, 100%);
  border-radius: 7px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 16.5rem;
    object-fit: cover;
  }
  .details {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 3rem;
    color: hsl(200, 15%, 8%);

    h3 {
      font-weight: 900;
      margin-bottom: 1rem;
    }

    span {
      line-height: 2.1rem;
    }

    strong {
      font-weight: 600;
    }
  }

  .buttons {
    border-top: 1px solid black;
    display: flex;

    & > * {
      flex: 1;
    }

    button {
      background: none;
      border: none;
      border-right: 1px solid black;
      padding: 0.5em 1em;

      &:last-child {
        border: none;
      }
    }
  }
`;

export default Product;
