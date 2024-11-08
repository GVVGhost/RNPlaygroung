import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {FontSize} from '@theme/DimensionValues.ts';

export const toastShow = (
  title: string,
  type: ALERT_TYPE = ALERT_TYPE.INFO,
) => {
  Toast.show({
    type: type,
    title: title,
    titleStyle: {fontSize: FontSize.M},
  });
};
