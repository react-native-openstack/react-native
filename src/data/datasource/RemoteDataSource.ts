import Entity from '@/domain/model/Entity';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type QueryBuilder = (
  ref: FirebaseFirestoreTypes.CollectionReference,
) => FirebaseFirestoreTypes.Query;

export type FindAllResult<T extends Entity> = T[];
export type FindAllOptions = {
  collectionPath: string;
  queryBuilder?: QueryBuilder;
};

export type FindByIdResult<T extends Entity> = T | null;
export type FindByIdOptions = {
  collectionPath: string;
  id: string;
};

export type CreateResult = string;
export type CreateOptions<T> = {
  collectionPath: string;
  data: T;
  id?: string;
};

export type UpdateResult = void;
export type UpdateOptions<T> = {
  collectionPath: string;
  id: string;
  data: Partial<T>;
};

export type RemoveResult = void;
export type RemoveOptions = {
  collectionPath: string;
  id: string;
};

export type FirestoreFetchOperation<T> = {
  withTransaction: (
    transaction: FirebaseFirestoreTypes.Transaction,
  ) => FirestoreFetchOperation<T>;
  execute: () => Promise<T>;
};

export type FirestoreWriteOperation<T> = FirestoreFetchOperation<T> & {
  withBatch: (
    batch: FirebaseFirestoreTypes.WriteBatch,
  ) => FirestoreWriteOperation<T>;
};

type RemoteDataSourceInstance = {
  findAll: <T extends Entity>(
    options: FindAllOptions,
  ) => FirestoreFetchOperation<FindAllResult<T>>;
  findById: <T extends Entity>(
    options: FindByIdOptions,
  ) => FirestoreFetchOperation<FindByIdResult<T>>;
  create: <T extends Entity>(
    options: CreateOptions<T>,
  ) => FirestoreWriteOperation<CreateResult>;
  update: <T extends Entity>(
    options: UpdateOptions<T>,
  ) => FirestoreWriteOperation<UpdateResult>;
  remove: (options: RemoveOptions) => FirestoreWriteOperation<RemoveResult>;
};

const RemoteDataSource = (function () {
  let instance: RemoteDataSourceInstance;

  function initialize(): RemoteDataSourceInstance {
    const db = firestore();

    const findAll = <T extends Entity>({
      collectionPath,
      queryBuilder,
    }: FindAllOptions): FirestoreFetchOperation<FindAllResult<T>> => {
      let _transaction: FirebaseFirestoreTypes.Transaction;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api; // 체이닝을 위해 반환
      };

      const execute = async (): Promise<T[]> => {
        try {
          const collectionRef = db.collection(collectionPath);
          const query = queryBuilder
            ? queryBuilder(collectionRef)
            : collectionRef;

          let docs: FirebaseFirestoreTypes.DocumentSnapshot[] = [];

          if (_transaction) {
            const querySnapshot = await query.get();
            const getPromises = querySnapshot.docs.map(doc =>
              _transaction.get(doc.ref),
            );
            docs = await Promise.all(getPromises);
          } else {
            const querySnapshot = await query.get();
            docs = querySnapshot.docs;
          }

          return docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          })) as T[];
        } catch (error) {
          console.error('Error fetching documents:', error);
          throw error;
        }
      };

      const api = {
        withTransaction,
        execute,
      };

      return api;
    };

    const findById = <T extends Entity>({
      collectionPath,
      id,
    }: FindByIdOptions): FirestoreFetchOperation<FindByIdResult<T>> => {
      let _transaction: FirebaseFirestoreTypes.Transaction | null = null;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api;
      };

      const execute = async (): Promise<T | null> => {
        const docRef = db.collection(collectionPath).doc(id);
        try {
          let docSnapshot;

          if (_transaction) {
            docSnapshot = await _transaction.get(docRef);
          } else {
            docSnapshot = await docRef.get();
          }

          if (docSnapshot.exists) {
            return {...docSnapshot.data(), id: docSnapshot.id} as T;
          } else {
            console.error(`Document with id ${id} does not exist.`);
            return null;
          }
        } catch (error) {
          console.error('Error fetching document:', error);
          throw error;
        }
      };

      const api = {
        withTransaction,
        execute,
      };

      return api;
    };

    const create = <T extends Entity>({
      collectionPath,
      data,
      id,
    }: CreateOptions<T>): FirestoreWriteOperation<CreateResult> => {
      let _transaction: FirebaseFirestoreTypes.Transaction | null = null;
      let _batch: FirebaseFirestoreTypes.WriteBatch | null = null;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api;
      };

      const withBatch = (batch: FirebaseFirestoreTypes.WriteBatch) => {
        _batch = batch;
        return api;
      };

      const execute = async (): Promise<string> => {
        try {
          const collectionRef = db.collection(collectionPath);
          const docRef = id ? collectionRef.doc(id) : collectionRef.doc(); // ID가 있으면 지정, 없으면 자동 생성

          if (_transaction) {
            _transaction.set(docRef, data);
          } else if (_batch) {
            _batch.set(docRef, data);
          } else {
            await docRef.set(data);
          }

          return docRef.id;
        } catch (error) {
          console.error('Error creating document:', error);
          throw error;
        }
      };

      const api = {
        withTransaction,
        withBatch,
        execute,
      };

      return api;
    };

    const update = <T extends Entity>({
      collectionPath,
      id,
      data,
    }: UpdateOptions<T>): FirestoreWriteOperation<UpdateResult> => {
      let _transaction: FirebaseFirestoreTypes.Transaction | null = null;
      let _batch: FirebaseFirestoreTypes.WriteBatch | null = null;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api;
      };

      const withBatch = (batch: FirebaseFirestoreTypes.WriteBatch) => {
        _batch = batch;
        return api;
      };

      const execute = async (): Promise<void> => {
        try {
          const docRef = db.collection(collectionPath).doc(id);

          if (_transaction) {
            _transaction.update(docRef, data);
          } else if (_batch) {
            _batch.update(docRef, data);
          } else {
            await docRef.update(data);
          }
        } catch (error) {
          console.error(`Error updating document with ID ${id}:`, error);
          throw error;
        }
      };

      const api = {
        withTransaction,
        withBatch,
        execute,
      };

      return api;
    };

    const remove = ({
      collectionPath,
      id,
    }: RemoveOptions): FirestoreWriteOperation<RemoveResult> => {
      let _transaction: FirebaseFirestoreTypes.Transaction | null = null;
      let _batch: FirebaseFirestoreTypes.WriteBatch | null = null;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api;
      };

      const withBatch = (batch: FirebaseFirestoreTypes.WriteBatch) => {
        _batch = batch;
        return api;
      };

      const execute = async (): Promise<void> => {
        try {
          const docRef = db.collection(collectionPath).doc(id);

          if (_transaction) {
            _transaction.delete(docRef);
          } else if (_batch) {
            _batch.delete(docRef);
          } else {
            await docRef.delete();
          }
        } catch (error) {
          console.error(`Error deleting document with ID ${id}:`, error);
          throw error;
        }
      };

      const api = {
        withTransaction,
        withBatch,
        execute,
      };

      return api;
    };

    return {
      findAll,
      findById,
      create,
      update,
      remove,
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    },
  };
})();

export default RemoteDataSource;
