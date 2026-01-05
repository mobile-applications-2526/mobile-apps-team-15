import * as SecureStore from 'expo-secure-store';

export const saveUIDToken = async (token: string) => {
  await SecureStore.setItemAsync('uidToken', token);
};

export const getUIDToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('uidToken');
};

export const saveQRCodeInfo = async (qrInfo: string) => {
  await SecureStore.setItemAsync('qrCodeInfo', qrInfo);
};

export const getQRCodeInfo = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('qrCodeInfo');
};
