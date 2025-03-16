import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const initializeGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '394237640809-cqimf86b43i1l4kb7aog683tniphb2en.apps.googleusercontent.com',
    scopes: [],
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn({});

    if (userInfo.type === 'cancelled') {
      return null;
    } else {
      return userInfo.data;
    }
  } catch (error) {
    console.log('signInWithGoogle', error);
  }
};

export const signOutOfGoogle = async () => {
  await GoogleSignin.signOut();
};
