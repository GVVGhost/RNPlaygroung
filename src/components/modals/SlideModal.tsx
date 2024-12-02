import React from 'react';
import {Modal, ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {BorderWidth, CornerRadius, Indent} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import SecondaryButton from '@components/buttons/SecondaryButton.tsx';
import {CommonStyles} from '@theme/CommonStyles.ts';

interface SlideModalProps {
  visible: boolean;
  onDismiss: {label: string; action: () => void};
  onAccept?: {label: string; action: () => void};
  children: React.ReactNode;
}

const SlideModal: React.FC<SlideModalProps> = ({
  visible,
  onDismiss,
  onAccept,
  children,
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      style={{height: '100%', width: '100%'}}
      animationType="slide"
      transparent={true}
      visible={visible}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableWithoutFeedback onPress={onDismiss.action}>
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>
        <ScrollView
          contentContainerStyle={[
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderTopEndRadius: CornerRadius.XL,
              borderTopStartRadius: CornerRadius.XL,
              borderWidth: BorderWidth.L,
              flex: 1,
              paddingBottom: '20%',
            },
            CommonStyles.shadow,
          ]}>
          <View
            style={{
              flexDirection: 'row',
              gap: 60,
              justifyContent: 'space-between',
              padding: Indent.XL,
            }}>
            <SecondaryButton
              text={onDismiss.label}
              onPress={onDismiss.action}
              flex={1}
            />
            {onAccept && (
              <SecondaryButton
                text={onAccept.label}
                onPress={onAccept.action}
                flex={1}
              />
            )}
          </View>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SlideModal;
