import {Alert} from 'react-native';

const dialog = (
  title: string,
  message: string,
  textBtnCancel: string,
  textBtnConfirm: string,
  onConfirm: () => void,
  onCancel?: () => void,
) => {
  Alert.alert(title, message, [
    {text: textBtnCancel, style: 'cancel', onPress: onCancel},
    {text: textBtnConfirm, style: 'destructive', onPress: onConfirm},
  ]);
};

export const logOutDialog = (onLogOut: () => void, onStay?: () => void) => {
  dialog(
    'Log out?',
    'Are you sure you want to log out?',
    'Cancel',
    'Log out',
    onLogOut,
    onStay,
  );
};
