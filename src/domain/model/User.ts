import Entity from '@/domain/model/Entity';

type User = Entity & {
  email?: string;
  password?: string;
  // Subscription
  subscription_product_id?: number;
  subscription_start_date?: number;
  subscription_expire_date?: number;
  // Onboarding
  onboarding_completed?: boolean;
};

export default User;
