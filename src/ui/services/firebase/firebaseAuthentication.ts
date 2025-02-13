import {signInWithApple} from '../socialLogin/appleSignIn';
import {signInWithGoogle, signOutOfGoogle} from '../socialLogin/googleSignIn';
import auth from '@react-native-firebase/auth';

export enum AuthenticationProvider {
  Google = 'google',
  Apple = 'apple',
  EmailPassword = 'EmailPassword',
}

export const signIn = async ({
  provider,
}: {
  provider: AuthenticationProvider;
}) => {
  try {
    if (AuthenticationProvider.Google === provider) {
      const signedUser = await signInWithGoogle();

      if (!signedUser) {
        throw Error('Fail sign in');
      }

      const userCredential = await auth().signInWithCredential(
        auth.GoogleAuthProvider.credential(signedUser.idToken),
      );

      return userCredential;
    } else if (AuthenticationProvider.Apple === provider) {
      const signedUser = await signInWithApple();

      if (!signedUser.identityToken) {
        throw Error('Fail sign in');
      }

      const userCredential = await auth().signInWithCredential(
        auth.AppleAuthProvider.credential(
          signedUser.identityToken,
          signedUser.nonce,
        ),
      );

      return userCredential;
    } else {
      // TODO 이메알/패스워드 로그인 기능 추가
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async ({
  provider,
}: {
  provider: AuthenticationProvider;
}) => {
  try {
    if (AuthenticationProvider.Google === provider) {
      await Promise.all([signOutOfGoogle(), auth().signOut()]);
    } else if (AuthenticationProvider.Apple === provider) {
      await auth().signOut();
    } else {
      await auth().signOut();
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
