import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type Entity = {
  id?: string;
  created_at_millis?: number;
  updated_at_millis?: number;
} & FirebaseFirestoreTypes.DocumentData;

export default Entity;
