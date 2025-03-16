import FirestoreApi, {FirestoreCollection} from '@/data/FirestoreApi';
import storage, {StorageData, StorageKey} from '@/data/storage';
import User from '@/domain/model/User';

const api = FirestoreApi.getInstance();

const removeUser = async ({user}: {user: User}): Promise<void> => {
  const cachedKey = `${StorageKey.USER}`;

  await api
    .remove({
      collectionPath: FirestoreCollection.User,
      id: user.id ?? '',
    })
    .execute();

  storage.set<StorageData[StorageKey.USER]>(cachedKey, {});
};

export default removeUser;
