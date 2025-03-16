import FirestoreApi, {FirestoreCollection} from '@/data/FirestoreApi';
import Deck, {DECK_FIELDS} from '@/domain/model/Deck';
import User from '@/domain/model/User';

const api = FirestoreApi.getInstance();

const syncSocialAccountWithUser = ({
  currentUser,
  socialUser,
}: {
  currentUser: User;
  socialUser: User;
}): Promise<User> => {
  return api.db.runTransaction(async transaction => {
    const deckList = await api
      .findAll<Deck>({
        collectionPath: FirestoreCollection.Deck,
        queryBuilder: collection =>
          collection
            .where(DECK_FIELDS.USER_ID, '==', currentUser.id)
            .limit(100),
      })
      .withTransaction(transaction)
      .execute();
    await Promise.all(
      deckList.map(async deck => {
        return await api
          .update({
            collectionPath: FirestoreCollection.Deck,
            id: deck.id ?? '',
            data: {user_id: socialUser.id},
          })
          .withTransaction(transaction)
          .execute();
      }),
    );
    return await api
      .create({
        collectionPath: FirestoreCollection.User,
        data: socialUser,
        id: socialUser.email ?? socialUser.id,
      })
      .withTransaction(transaction)
      .execute();
  });
};

export default syncSocialAccountWithUser;
