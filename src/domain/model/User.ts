import Entity from './Entity';

type User = Entity & {
  email?: string;
  password?: string;
};

export default User;
