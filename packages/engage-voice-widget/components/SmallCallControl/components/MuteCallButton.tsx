import micOffSvg from '@ringcentral/juno/icon/MicOff';
import micSvg from '@ringcentral/juno/icon/Mic';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';

export type MuteCallButtonProps = CallButtonsProps & {
  isOnMute: boolean;
  onUnmute?(): void | Promise<void>;
  onMute?(): void | Promise<void>;
  disableMute?: boolean;
};
export const MuteCallButton: FunctionComponent<MuteCallButtonProps> = ({
  isOnMute,
  currentLocale,
  onUnmute,
  onMute,
  size,
  className,
  disableMute,
  dataSign,
}) => {
  const { muteTitle } = getCircleIconButtonTitle({
    isOnMute,
  });
  return (
    <CircleIconButton
      dataSign={dataSign}
      data-icon={isOnMute ? 'mic-off' : 'mic'}
      symbol={isOnMute ? micOffSvg : micSvg}
      title={i18n.getString(muteTitle, currentLocale)}
      active={isOnMute}
      onClick={isOnMute ? onUnmute : onMute}
      disabled={disableMute}
      size={size}
      className={className}
      normal
    />
  );
};

MuteCallButton.defaultProps = {
  onMute() {},
  onUnmute() {},
  disableMute: false,
  currentLocale: 'en-US',
  dataSign: 'muteCall',
};
