import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

export const signInWithApple = async () => {
  if (appleAuth.isSupported) {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const {identityToken, nonce} = appleAuthRequestResponse;

    return {
      identityToken,
      nonce,
    };
  } else {
    console.log('signInWithAppleAndroid');
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.zucchini.flipcard',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://flipcard-a8663.firebaseapp.com/__/auth/handler',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const {id_token, nonce} = await appleAuthAndroid.signIn();

    return {
      identityToken: id_token,
      nonce,
    };
  }
};

export const signOutOfApple = async () => {
  // 할게없음...
};
