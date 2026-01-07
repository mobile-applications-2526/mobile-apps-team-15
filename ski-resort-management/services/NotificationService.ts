import { 
  scheduleNotificationAsync, 
  setNotificationHandler, 
  getPermissionsAsync, 
  requestPermissionsAsync, 
  setNotificationChannelAsync,
  AndroidImportance,
  SchedulableTriggerInputTypes
} from 'expo-notifications';
import { Platform } from 'react-native';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
    });
  }
  
  const { status: existingStatus } = await getPermissionsAsync();
  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    return status === 'granted';
  }
  return true;
}

export async function scheduleSkiPassExpiryNotification(endDate: Date) {
  const now = new Date();
  const expiryTime = new Date(endDate);
  const oneHourBefore = new Date(expiryTime.getTime() - 60 * 60 * 1000); // 1 hour before expiry
  
  if (oneHourBefore > now) {
    await scheduleNotificationAsync({
      content: {
        title: 'Ski Pass Expiring Soon!',
        body: 'Your ski pass will expire in 1 hour. Don\'t forget to renew it!',
      },
      trigger: { type: SchedulableTriggerInputTypes.DATE , date: oneHourBefore },
    });
  }
}

export default { requestNotificationPermissions, scheduleSkiPassExpiryNotification };