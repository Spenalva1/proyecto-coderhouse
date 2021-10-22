/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import environment from '../environment/environment';
import { useUser } from '../providers/UserProvider';

const Header = () => {
  const { logout, user, token } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast(`Hasta luego ${user?.firstName || ''}`, {
        type: 'info',
        autoClose: 2000,
        position: 'top-center',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeaderStyles>
      <div>
        <Link to="/">
          <button type="button" className="title-wrapper">
            Coder Shop
          </button>
        </Link>
        {token ? (
          <nav>
            {user?.photo && (
              <img
                className="profile-photo"
                width="30"
                height="30"
                src={`${environment.api}/profile_photos/${user.photo}`}
                alt={user.firstName}
              />
            )}
            <Link to="/cart">Carrito</Link>
            <Link to="/order">Órdenes</Link>
            <span onClick={handleLogout}>Cerrar sesión</span>
          </nav>
        ) : (
          <nav>
            <Link to="/login">
              <span>Login</span>
            </Link>
            <Link to="/signup">
              <span>Registrarme</span>
            </Link>
          </nav>
        )}
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

    nav {
      display: flex;
      gap: 2rem;
    }

    nav > * {
      cursor: pointer;
      flex-direction: row;
      align-items: center;
      font-weight: 600;
    }

    i {
      margin-right: 5px;
    }
  }

  a {
    color: #000000;
  }

  .profile-photo {
    border-radius: 50%;
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
