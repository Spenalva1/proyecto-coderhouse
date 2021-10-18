import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const AddToCartModal = ({
  isOpen,
  onClose,
  type = 'add',
  onSubmit,
  productId,
  defaultValue = 1,
}) => {
  const quantityRef = useRef();

  if (!isOpen) return null;

  return createPortal(
    <OverlayStyles onClick={() => onClose()}>
      <ModalStyles
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(productId, quantityRef.current.value);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <label htmlFor="quantity">Cantidad: </label>
        <input
          ref={quantityRef}
          id="quantity"
          type="number"
          defaultValue={defaultValue}
          autoFocus
        />
        <input
          type="submit"
          value={type === 'add' ? 'Agregar al carrito' : 'Actualizar carrito'}
        />
      </ModalStyles>
    </OverlayStyles>,
    document.getElementById('portal')
  );
};

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalStyles = styled.form`
  max-width: 450px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
`;

export default AddToCartModal;
