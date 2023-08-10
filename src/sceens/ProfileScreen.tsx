import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import { Text, View } from 'react-native-markup-kit';
// import {styles} from './styles';
import {useAuth} from '../navigation/auth';

export const ProfileScreen = () => {
  const auth1 = useAuth();
  const signOut = () => {
    auth1.signOut();
  };
  const deleteAccount = () => {
    auth1.deleteAccount();
  };

  return (
    <View style={style.container}>
       <View
          flexS
          bg-white
          // br40
          margin-s7
          // shadow70
          >
            <Text style={style.textTitle}>Name: {auth1.authData?.user.name} </Text>
            <Text style={style.textTitle}>Email: {auth1.authData?.user.email} </Text>
          </View>
          {/* <View
          flexS
          bg-white
          center
          // br40
          // margin-s2
          // shadow70
          ></View> */}
      <Pressable style={style.button} onPress={signOut}>
        <Text style={style.text}>Sign Out</Text>
      </Pressable>
      <Pressable style={style.button} onPress={deleteAccount}>
        <Text style={style.text}>Delete Account</Text>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#3d5a80',
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#FFF7D6',
      margin: 20
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
    textTitle: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      backgroundColor: '#3d5a80',
    },
  });