import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { CallLogMenu } from 'ringcentral-integration/interfaces/CallLog.interface';

import { ActionButton } from './ActionButton';
import { MenuButton } from './MenuButton';
import styles from './styles.scss';

export type CallHistoryActionProps = {
  actionMenu?: CallLogMenu;
  isWide?: boolean;
};

export const CallHistoryActions: FunctionComponent<CallHistoryActionProps> = ({
  actionMenu = [],
  isWide = true,
}) => {
  // only show first 3 buttons
  const displayedButtons = actionMenu.slice(0, 3);

  return (
    <div className={classnames([styles.actions, !isWide && styles.classic])}>
      {displayedButtons.map(
        ({ icon, label, disabled, action, subMenu }, index) => {
          if (action) {
            return (
              <ActionButton
                icon={icon}
                label={label}
                disabled={disabled}
                action={action}
                key={index}
              />
            );
          }
          if (subMenu) {
            return (
              <MenuButton
                icon={icon}
                label={label}
                disabled={disabled}
                subMenu={subMenu}
                key={index}
              />
            );
          }
          return null;
        },
      )}
    </div>
  );
};
