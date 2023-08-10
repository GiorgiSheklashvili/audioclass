import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as routes from './routes';
import { CategoriesScreen } from '../components/categories/CategoriesScreen';
import { ProductListScreen } from '../components/products/ProductListScreen';
import { ProductDetailsScreen } from '../components/products/ProductDetailsScreen';
import { MusicPlayer } from '../sceens/player/MusicPlayer';
import {useAuth} from './auth';
import {Loading} from '../components/common/Loading';
import { HomeScreen } from '../sceens/HomeScreen';
import { SignInScreen } from '../sceens/SignInScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WithSplashScreen } from '../components/WithSplashScreen';
import { ProfileScreen } from '../sceens/ProfileScreen';
import { PaywallScreen } from '../sceens/PaywallScreen';
import { Linking } from 'react-native';

export type RootStackParamList = {
  [routes.NAVIGATION_CATEGORIES_ROUTE]: {
    categoryId: number | undefined;
    title: string;
  };
  [routes.NAVIGATION_PRODUCT_DETAILS_ROUTE]: {
    sku: string;
    title: string;
  };
  [routes.NAVIGATION_PRODUCTS_ROUTE]: {
    categoryId: number;
    title: string;
  };
  [routes.NAVIGATION_AUDIO_PLAYER]: {
    file: string;
    title: string;
    id: string,
    artist: string,
    artwork: string,
  };
  [routes.NAVIGATION_HOME_ROUTE]:
    undefined;
  [routes.NAVIGATION_SIGNIN_ROUTE]:{
    title: string;
  }
  [routes.NAVIGATION_PAWYALL_ROUTE]:{
    title: string;
  }
};

export type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_PRODUCT_DETAILS_ROUTE
>;

export type CategoriesScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_CATEGORIES_ROUTE
>;

export type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof routes.NAVIGATION_CATEGORIES_ROUTE
>;

export type PlayerScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_AUDIO_PLAYER
>;

export type HomeScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_HOME_ROUTE
>;

export type SignInScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_SIGNIN_ROUTE
>;

export type PaywallScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof routes.NAVIGATION_PAWYALL_ROUTE
>;

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={RootStack}
        options={{
          tabBarLabel: 'Categories',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid-large" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = (isAppReady) => {
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Stack.Navigator>
        <Stack.Screen name={routes.NAVIGATION_SIGNIN_ROUTE} component={SignInScreen} options={({ navigation, route }) => ({
          title: route?.params?.title ?? 'Welcome',
        })} />
      </Stack.Navigator>
    </WithSplashScreen>

  );
};
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerBackTitleVisible: false,
    })}
  >
  <Stack.Screen 
      name={routes.NAVIGATION_HOME_ROUTE} 
      component={HomeScreen} 
      options={({ navigation, route }) => ({
        // headerShown: false,
        // presentation: "modal",
        title: "Home"
        // title: route?.params?.title ?? 'Player',
        // file: route?.params?.file,
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_PRODUCT_DETAILS_ROUTE}
      component={ProductDetailsScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Product Details',
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_AUDIO_PLAYER}
      component={MusicPlayer}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Player',
        file: route?.params?.file,
      })}
    />
  <Stack.Screen
      name={routes.NAVIGATION_PAWYALL_ROUTE}
      component={PaywallScreen}
      options={({ navigation, route }) => ({
        headerShown: false,
        presentation: "modal",
        // title: "Paywall"
        // title: route?.params?.title ?? 'Player',
        // file: route?.params?.file,
      })}
    />


  </Stack.Navigator>
);


const RootStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      headerBackTitleVisible: false,
    })}
  >
    <Stack.Screen
      name={routes.NAVIGATION_CATEGORIES_ROUTE}
      component={CategoriesScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Categories',
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_PRODUCTS_ROUTE}
      component={ProductListScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Products',
      })}
    />
     <Stack.Screen
      name={routes.NAVIGATION_PRODUCT_DETAILS_ROUTE}
      component={ProductDetailsScreen}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Product Details',
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_AUDIO_PLAYER}
      component={MusicPlayer}
      options={({ navigation, route }) => ({
        title: route?.params?.title ?? 'Player',
        file: route?.params?.file,
      })}
    />
    <Stack.Screen
      name={routes.NAVIGATION_PAWYALL_ROUTE}
      component={PaywallScreen}
      options={({ navigation, route }) => ({
        headerShown: false,
        presentation: "modal",
        // title: "Paywall"
        // title: route?.params?.title ?? 'Player',
        // file: route?.params?.file,
      })}
    />
  </Stack.Navigator>
);


export const Navigation = (isAppReady) => {
  const {authData, loading} = useAuth();

  const handleUrl = (data) => {
    if (data.url === 'trackplayer://notification.click') {
        navigation.push(routes.NAVIGATION_AUDIO_PLAYER);
    }
  };
  
  React.useEffect(() => {
    // Deep Linking
    Linking.getInitialURL().then(url1 => handleUrl({url: url1}));
    Linking.addEventListener('url', handleUrl);
  }, []);

  if (loading) {
    //You can see the component implementation at the repository
    return <Loading />;
  }
    return (
      <NavigationContainer>
        {authData ? <Tabs /> : <AuthStack isAppReady={isAppReady}/>}
      </NavigationContainer>
    );
  };