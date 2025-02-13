import appleAuth from '@invertase/react-native-apple-authentication';

export const signInWithApple = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const {identityToken, nonce} = appleAuthRequestResponse;

  return {
    identityToken,
    nonce,
  };
};

export const signOutOfApple = async () => {
  // 할게없음...
};
