import FirestoreApi, {FirestoreCollection} from '@/data/FirestoreApi';
import User from '@/domain/model/User';

const api = FirestoreApi.getInstance();

const createUser = ({user}: {user: User}): Promise<User> => {
  return api
    .create({
      collectionPath: FirestoreCollection.User,
      data: user,
      id: user.email ?? user.id,
    })
    .execute();
};

export default createUser;
