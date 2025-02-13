import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';
import {Trigger} from '@notifee/react-native';
import {Notification} from '@notifee/react-native';

export const NotificationChannels = {
  Default: {
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  },
};

const requestPermission = async (): Promise<boolean> => {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    await notifee.createChannels([NotificationChannels.Default]);
  }
  return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
};

const hasPermission = async (): Promise<boolean> => {
  const settings = await notifee.getNotificationSettings();
  switch (settings.authorizationStatus) {
    case AuthorizationStatus.AUTHORIZED:
      console.log('푸시 알림 권한이 이미 허용되었습니다.');
      return true;
    case AuthorizationStatus.DENIED:
    case AuthorizationStatus.NOT_DETERMINED:
    default:
      console.log('알림 권한이 필요합니다. 설정에서 권한을 변경하세요.');
      return false;
  }
};

const sendNotification = ({
  notification,
  trigger,
}: {
  notification: Notification;
  trigger?: Trigger;
}) => {
  if (trigger) {
    notifee.createTriggerNotification(notification, trigger);
  } else {
    notifee.displayNotification(notification);
  }
};

const NotificationService = {
  requestPermission,
  hasPermission,
  sendNotification,
};

export default NotificationService;
