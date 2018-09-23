import axios from 'axios';
import Router from 'next/router';

const DO_LOGIN = 'DO_LOGIN';
const DO_LOGOUT = 'DO_LOGOUT';
const SET_LOADING = 'SET_LOADING';

const initialState = {
  login: false,
  loading: false,
  info: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      const { info, login } = action.user;
      return { ...state, loading: false, info, login };

    case DO_LOGOUT:
      return initialState;

    case SET_LOADING:
      return { ...state, loading: action.value };

    default:
      return state;
  }
};

export default reducer;

export const doLogin = (username, password) => {
  return (dispatch) =>
    axios
      .post('/api/auth', { username, password })
      .then(({ data }) => data)
      .then((user) => {
        dispatch({ type: DO_LOGIN, user });
        Router.replace('/dashboard');
      })
      .catch(() => dispatch({ type: DO_LOGIN, user: { info: {}, login: false } }));
};

export const doLogout = () => {
  return (dispatch) =>
    axios
      .post('/api/auth/logout')
      .then(({ data }) => data)
      .then(() => {
        dispatch({ type: DO_LOGOUT });
        Router.push('/login');
      });
};

export const checkLogin = (host) => {
  return (dispatch) =>
    axios
      .get('/api/auth')
      .then(({ data }) => data)
      .then((data) => {
        if (!data.login) {
          dispatch({ type: DO_LOGOUT });
          Router.push('/login');
        }
      });
};

export const setLoading = (value) => ({
  type: SET_LOADING,
  value
});
