import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useAuth} from '../navigation/auth';

export const SignInScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.signIn();
  };

  return (
    <View style={style.container}>
      <Text>Sign In Screen</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        // <Button title="Sign In" onPress={signIn} />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          // disabled={this.state.isSigninInProgress}
        />
      )}
    </View>
  );
};


const style = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#3d5a80',
      alignItems: "center",
      justifyContent: "center",
    }
  });