import User from '@/domain/model/User';
import storage, {StorageKey} from '../services/storage';
import {useState} from 'react';
import {initializeGoogleSignIn} from '../services/socialLogin/googleSignIn';

const useAppInitialization = () => {
  const user = storage.get<User>(StorageKey.USER);

  const isOnboardingCompleted = !!user?.onboarding_completed;
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const initialize = async () => {
    // Services
    initializeGoogleSignIn();

    // Initialized
    setIsInitialized(true);
  };
  initialize();

  return {
    isInitialized,
    isOnboardingCompleted,
  };
};

export default useAppInitialization;
