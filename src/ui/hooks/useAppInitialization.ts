import {useEffect, useState} from 'react';
import {initializeGoogleSignIn} from '../services/socialLogin/googleSignIn';
import {useUserStore} from '../stores/user';

const useAppInitialization = () => {
  const {user} = useUserStore();

  const isOnboardingCompleted = !!user?.onboarding_completed;
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      // Services
      initializeGoogleSignIn();

      // Initialized
      setIsInitialized(true);
    };
    initialize();
  }, [user?.onboarding_completed]);

  return {
    isInitialized,
    isOnboardingCompleted,
  };
};

export default useAppInitialization;
