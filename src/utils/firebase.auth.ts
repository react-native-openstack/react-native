import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {FIREBASE_AUTH_WEB_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: FIREBASE_AUTH_WEB_CLIENT_ID,
});

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  const userInfo = await GoogleSignin.signIn();

  if (userInfo.data?.idToken) {
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data.idToken,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);
    return userCredential.user;
  }

  return null;
};

export const signOutOfGoogle = async () => {
  try {
    await Promise.all([GoogleSignin.signOut(), auth().signOut()]);
    console.log('Successfully signed out of Google and Firebase.');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const signInWithApple = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const {identityToken, nonce} = appleAuthRequestResponse;

  if (identityToken) {
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    const userCredential = await auth().signInWithCredential(appleCredential);
    return userCredential.user;
  }

  return null;
};

export const signOutOfApple = async () => {
  try {
    await Promise.all([auth().signOut()]);
    console.log('Successfully signed out of Google and Firebase.');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
