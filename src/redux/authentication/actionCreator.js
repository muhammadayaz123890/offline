import Cookies from 'js-cookie';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onIdTokenChanged,
} from 'firebase/auth';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { firebaseAuth } from '../../config/api/firebase';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, loginSetData } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      //  await DataService.post('/login', values); // REPLACE FOR REQUEST DIRECT TO FIREBASE
      const firebaseUser = await signInWithEmailAndPassword(firebaseAuth, values.email, values.password);
      const userData = DataService.get(`/UserData/${firebaseUser.user.uid}`);

      console.log('data from endpoint', userData);
      if (false) {
        dispatch(loginErr(false));
      } else {
        Cookies.set('access_token', await firebaseUser.user.getIdToken());
        Cookies.set('logedIn', true);
        dispatch(loginSuccess(true));
        dispatch(loginSetData(userData.data));
        callback();
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/register', values);
      if (response.data.errors) {
        dispatch(loginErr('Registration failed!'));
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, register };
