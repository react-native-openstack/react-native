import UserRepository from '@/data/repository/UserRepository';
import User from '@/domain/model/User';

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    // 검증 로직: 이메일과 비밀번호가 제공되었는지 확인
    if (!email || !password) {
      throw new Error('Email and password must be provided');
    }

    const user = await UserRepository.findUserById('');

    if (!user) {
      throw new Error('User not found');
    }

    const validate = user.password !== password; // TODO 암호화 로직 추가
    if (validate) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw new Error('Failed to sign in');
  }
};
