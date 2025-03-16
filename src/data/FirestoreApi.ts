import Entity from '@/domain/model/Entity';
import {
  FirebaseFirestoreTypes,
  collection,
  getFirestore,
} from '@react-native-firebase/firestore';

export enum FirestoreCollection {
  User = 'user',
}

export type QueryBuilder = (
  ref: FirebaseFirestoreTypes.CollectionReference,
) => FirebaseFirestoreTypes.Query;

export type FindAllOptions = {
  collectionPath: string;
  queryBuilder?: QueryBuilder;
};

export type FindByIdOptions = {
  collectionPath: string;
  id: string;
};

export type CreateOptions<T> = {
  collectionPath: string;
  data: T;
  id?: string;
};

export type UpdateOptions<T> = {
  collectionPath: string;
  id: string;
  data: Partial<T>;
};

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

type FirestoreApiInstance = {
  db: FirebaseFirestoreTypes.Module;
  findAll: <T extends Entity>(
    options: FindAllOptions,
  ) => FirestoreFetchOperation<T[]>;
  findById: <T extends Entity>(
    options: FindByIdOptions,
  ) => FirestoreFetchOperation<T | null>;
  create: <T extends Entity>(
    options: CreateOptions<T>,
  ) => FirestoreWriteOperation<T>;
  update: <T extends Entity>(
    options: UpdateOptions<T>,
  ) => FirestoreWriteOperation<T>;
  remove: (options: RemoveOptions) => FirestoreWriteOperation<void>;
};

const FirestoreApi = (function () {
  let instance: FirestoreApiInstance;

  function initialize(): FirestoreApiInstance {
    const db = getFirestore();

    const findAll = <T extends Entity>({
      collectionPath,
      queryBuilder,
    }: FindAllOptions): FirestoreFetchOperation<T[]> => {
      let _transaction: FirebaseFirestoreTypes.Transaction;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api; // 체이닝을 위해 반환
      };

      const execute = async (): Promise<T[]> => {
        try {
          const collectionRef = collection(db, collectionPath);
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
    }: FindByIdOptions): FirestoreFetchOperation<T | null> => {
      let _transaction: FirebaseFirestoreTypes.Transaction | null = null;

      const withTransaction = (
        transaction: FirebaseFirestoreTypes.Transaction,
      ) => {
        _transaction = transaction;
        return api;
      };

      const execute = async (): Promise<T | null> => {
        const docRef = collection(db, collectionPath).doc(id);
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
    }: CreateOptions<T>): FirestoreWriteOperation<T> => {
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

      const execute = async (): Promise<T> => {
        try {
          const collectionRef = collection(db, collectionPath);
          const docRef = id ? collectionRef.doc(id) : collectionRef.doc(); // ID가 있으면 지정, 없으면 자동 생성
          const newData: Entity = {
            ...data,
            updated_at_millis: Date.now(),
            created_at_millis: Date.now(),
          };

          if (_transaction) {
            _transaction.set(docRef, newData);
          } else if (_batch) {
            _batch.set(docRef, newData);
          } else {
            await docRef.set(newData);
          }

          return {...data, id: docRef.id} as T;
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
    }: UpdateOptions<T>): FirestoreWriteOperation<T> => {
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

      const execute = async (): Promise<T> => {
        try {
          const docRef = collection(db, collectionPath).doc(id);
          const newData: Entity = {...data, updated_at_millis: Date.now()};

          if (_transaction) {
            _transaction.update(docRef, newData);
          } else if (_batch) {
            _batch.update(docRef, newData);
          } else {
            await docRef.update(newData);
          }

          return {...data, id: docRef.id} as T;
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
    }: RemoveOptions): FirestoreWriteOperation<void> => {
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
          const docRef = collection(db, collectionPath).doc(id);

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
      db,
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

export default FirestoreApi;
