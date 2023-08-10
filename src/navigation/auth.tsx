import React, {createContext, useState, useContext, useEffect} from 'react';
import {AuthData, authService} from '../services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Purchases from 'react-native-purchases';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  Platform,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
    deleteAccount(): void;
  };

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [authenticated, setAuthenticated] = useState(false);
  const APIKeys = { apple: "appl_uRHu0KbySNJDCbnEqdhNxDkMFo", google: "goog_COqTiYcFnojfUtsHSHjXWsNxIhb" }; 

  useEffect(()=> {
    if(!authenticated){
      TrackPlayer.reset();
    }
  }, [authenticated])

  auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        if (Platform.OS == "android") { 
          await Purchases.configure({ apiKey: APIKeys.google})
        } else {
          await Purchases.configure({ apiKey: APIKeys.apple })
        }
        if(await Purchases.isConfigured()){
          console.log('shemovida loginshi?');
          Purchases.logIn(user.uid);
        }
      } catch (e) {
        console.log('Error identifying user');
      }
        setAuthenticated(true);
    } else {
        setAuthenticated(false);
    }
  });
  
   //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async () => {
     try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const _authData: AuthData = userInfo;
      setAuthData(_authData);
      AsyncStorage.setItem('@AuthData', JSON.stringify(userInfo));
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      auth().signInWithCredential(googleCredential);
      console.log("success login");
      crashlytics().log('User signed in.');
      await Promise.all([
        crashlytics().setUserId(userInfo.user.id),
      ]);
    } catch (error) {
      console.log(error);
      crashlytics().log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("SIGN_IN_CANCELLED");
      crashlytics().log("SIGN_IN_CANCELLED");

        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("in progress");
      crashlytics().log("in progress");
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("not available");
        // play services not available or outdated
      crashlytics().log("not available");

      } else {
      console.log("some other");
      crashlytics().log("some other");
      crashlytics().log(error.code)
        // some other error happened
      }
    }
    //Persist the data in the Async Storage
    //to be recovered in the next user session.
  };

  const deleteAccount = () => {
    const user = auth().currentUser;
    user?.delete();
    console.log('movida aqamde?');
    signOut();
  }

  const signOut = async () => {
    setAuthData(undefined);
    try {
      auth().signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('@AuthData');
    } catch (error) {
      console.error(error);
    }
    //Remove the data from Async Storage
    //to NOT be recovered in next session.

  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut, deleteAccount}}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }

export {AuthContext, AuthProvider, useAuth};