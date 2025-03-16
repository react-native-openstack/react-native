import Entity from '@/domain/model/Entity';

export const USER_FIELDS = {} as const;

type User = Entity & {
  plan?: 'free' | 'admin';
  email?: string;
  password?: string;
  thumbnail_url?: string;
  // Subscription
  subscription_product_id?: number;
  subscription_start_date?: number;
  subscription_expire_date?: number;
  // Onboarding
  onboarding_completed?: boolean;
};

export default User;
