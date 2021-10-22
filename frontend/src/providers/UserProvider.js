import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import environment from '../environment/environment';
import {
  deleteToken,
  getToken,
  setToken as setLocalToken,
} from '../lib/localToken';

const LocalStateContext = createContext({});
const LocalStateProvider = LocalStateContext.Provider;

const baseUrl = environment.api;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(() => {
    return getToken();
  });

  const getUsuario = useCallback(async () => {
    try {
      if (!token) {
        setUser(null);
        return;
      }
      const userResponse = await axios.get(`${baseUrl}/user`);
      setUser(userResponse.data);
    } catch (error) {
      console.error({ error });
      deleteToken();
      setToken(null);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    getUsuario();
  }, [token, getUsuario]);

  const login = async (email, password) => {
    try {
      const loginResponse = await axios.post(`${baseUrl}/token`, {
        email,
        password,
      });
      setLocalToken(loginResponse.data.token);
      setToken(loginResponse.data.token);
      return await axios.get(`${baseUrl}/user`);
    } catch (error) {
      throw error.response.data;
    }
  };

  const signup = async (inputs) => {
    try {
      const formData = new FormData();
      Object.entries(inputs).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.post(`${baseUrl}/user`, formData);
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = async () => {
    deleteToken();
    setToken(null);
    setUser(null);
  };

  return (
    <LocalStateProvider value={{ token, user, login, logout, signup }}>
      {children}
    </LocalStateProvider>
  );
};

const useUser = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { UserProvider, useUser };
