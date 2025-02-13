import FirestoreApi from '../utils/FirestoreApi';
import Dto, {Status} from '../dto/Dto';
import User from '@/domain/model/User';
import FirestoreCollection from './Collection';

const RemoteDataSource = (() => {
  const api = FirestoreApi.getInstance();
  return {
    findUserById: async (id: string): Promise<Dto<User | null>> => {
      try {
        const response = await api
          .findById<User>({
            collectionPath: FirestoreCollection.User,
            id,
          })
          .execute();
        return {
          status: Status.OK,
          result: response,
        };
      } catch (error) {
        return {
          status: Status.INTERNAL_SERVER_ERROR,
          result: null,
        };
      }
    },
  };
})();

export default RemoteDataSource;
