import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type Entity = {
  id?: string;
  created_at_ms?: number;
  updated_at_ms?: number;
} & FirebaseFirestoreTypes.DocumentData;

export default Entity;
