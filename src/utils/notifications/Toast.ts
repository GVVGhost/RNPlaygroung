import Toast, {ToastOptions} from 'react-native-root-toast';
import {ToastColors} from '@theme/Colors.ts';

export const toastInfoOptions: ToastOptions = {
  backgroundColor: ToastColors.Info,
  position: Toast.positions.BOTTOM,
};

export const toastSuccessOptions: ToastOptions = {
  backgroundColor: ToastColors.Success,
  position: Toast.positions.BOTTOM,
};

export const toastWarningOptions: ToastOptions = {
  backgroundColor: ToastColors.Warning,
  position: Toast.positions.BOTTOM,
};

export const toastErrorOptions: ToastOptions = {
  backgroundColor: ToastColors.Error,
  position: Toast.positions.BOTTOM,
};
