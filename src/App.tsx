import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, useColorScheme, View, Linking, Platform} from 'react-native';
// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {apolloClient} from './apollo/client';
import {Navigation, Tabs} from './navigation/Navigation';
import {AuthProvider} from './navigation/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import Purchases from 'react-native-purchases';
import TrackPlayer from 'react-native-track-player';
import crashlytics from '@react-native-firebase/crashlytics';
import {firebase} from '@react-native-firebase/analytics';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [isAppReady, setIsAppReady] = useState(false);
  const APIKeys = {
    apple: 'appl_uRHu0KbySNJDCbnEqdhNxDkMFo',
    google: 'goog_COqTiYcFnojfUtsHSHjXWsNxIhb',
  };

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBb-fnkiviWPZPhV7upUGXRPfJZo5Haq5M",
  //   authDomain: "audioclass.firebaseapp.com",
  //   projectId: "audioclass",
  //   storageBucket: "audioclass.appspot.com",
  //   messagingSenderId: "589109811308",
  //   appId: "1:589109811308:web:c83e2f0c458d9bdf052049",
  //   measurementId: "G-CGK2SR20ZM"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const db = getFirestore(app);

  async function initialize() {
    // crashlytics().log('App mounted.');
    // crashlytics().crash();

    //if consent was given
    try {
      await TrackPlayer.setupPlayer();
    } catch (error) {
      console.log(error);
    }
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
    Purchases.setDebugLogsEnabled(true);
    // Purchases.configure({apiKey: "goog_COqTiYcFnojfUtsHSHjXWsNxIhb"})
    if (Platform.OS == 'android') {
      await Purchases.configure({apiKey: APIKeys.google});
    } else {
      await Purchases.configure({apiKey: APIKeys.apple});
    }
    Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE);
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/userinfo.profile',], // what API you want to access on behalf of the user, default is email and profile
      webClientId: 'REMOVED', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }

  useEffect(() => {
    initialize().then(context => {
      // store.current = context.store;
      // queryClient.current = context.queryClient;

      setIsAppReady(true);
    });
  }, []);

  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Navigation isAppReady={isAppReady} />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
