import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type Entity = {
  id?: string;
} & FirebaseFirestoreTypes.DocumentData;

export default Entity;
