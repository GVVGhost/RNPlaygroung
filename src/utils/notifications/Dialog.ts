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
//
// export const updateAvailableDialog = (onUpdate: () => void, onCancel?: () => void) => {
//     dialog(
//         LS.alertTitleUpdateAvailable,
//         LS.alertMessageUpdateAvailable,
//         LS.alertButtonCancel,
//         LS.alertButtonUpdate,
//         onUpdate,
//         onCancel
//     );
// };
//
// export const confirmSetUpCustomUrl = (onConfirm: () => void, onCancel?: () => void) => {
//     dialog(
//         LS.alertTitleConfirmUrlUpdate,
//         LS.alertMessageConfirmUrlUpdate,
//         LS.alertButtonCancel,
//         LS.alertButtonConfirm,
//         onConfirm,
//         onCancel
//     );
// };
//
// export const confirmDeleteCustomUrl = (onConfirm: () => void, onCancel?: () => void) => {
//     dialog(
//         LS.alertTitleConfirmUrlDelete,
//         LS.alertMessageConfirmUrlDelete,
//         LS.alertButtonCancel,
//         LS.alertButtonConfirm,
//         onConfirm,
//         onCancel
//     );
// };
