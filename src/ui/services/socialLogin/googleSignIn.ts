import {FIREBASE_AUTH_WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const initializeGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: FIREBASE_AUTH_WEB_CLIENT_ID,
  });
};

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  const userInfo = await GoogleSignin.signIn();

  if (userInfo.type === 'cancelled') {
    return null;
  } else {
    return userInfo.data;
  }
};

export const signOutOfGoogle = async () => {
  await GoogleSignin.signOut();
};
