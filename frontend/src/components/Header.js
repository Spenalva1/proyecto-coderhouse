/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderStyles>
      <div>
        <Link to="/">
          <button type="button" className="title-wrapper">
            Coder Shop
          </button>
        </Link>
        <span onClick={() => console.log('hola')}>
          <span>Cart</span>
        </span>
      </div>
    </HeaderStyles>
  );
};

const HeaderStyles = styled.header`
  background: hsl(0, 0%, 100%);
  color: hsl(200, 15%, 8%);
  box-shadow: var(--bs);

  & > div {
    font-size: 1.2rem;
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      color: hsl(200, 15%, 8%);
      transition: color var(--themeTransition);
      padding: 0;
      background: none;
      border: none;
      font-size: 1.9rem;
      font-weight: 700;
    }

    & > span {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    i {
      margin-right: 5px;
    }
  }

  @media screen and (min-width: 40rem) {
    div {
      font-size: 1.6rem;

      button {
        font-size: 3rem;
      }
    }
  }
`;

export default Header;
