import React from 'react';
import {
  RcExpansionPanel,
  RcExpansionPanelDetails,
  RcExpansionPanelSummary,
  RcIconButton,
  RcFormGroup,
} from '@ringcentral/juno';
import arrowDownSvg from '@ringcentral/juno/icon/ArrowDown2';
import styles from './styles.scss';

interface SettingGroupProps {
  dataSign: string;
  summary: string;
  expandable: boolean;
  defaultExpanded?: boolean;
}

export const SettingGroup: React.FunctionComponent<SettingGroupProps> = ({
  dataSign,
  summary,
  expandable,
  defaultExpanded = true,
  children,
}) => {
  return (
    <RcExpansionPanel
      classes={{
        root: styles.expansionPanel,
      }}
      defaultExpanded={defaultExpanded}
      disabled={!expandable}
    >
      <RcExpansionPanelSummary
        classes={{
          root: styles.expansionPanelSummary,
          content: styles.expansionPanelSummaryContent,
          disabled: expandable ? null : styles.expansionPanelSummaryDisabled,
        }}
        expandIcon={
          expandable ? (
            <RcIconButton variant="round" symbol={arrowDownSvg} />
          ) : null
        }
        data-sign={`${dataSign}Summary`}
      >
        {summary}
      </RcExpansionPanelSummary>
      <RcExpansionPanelDetails
        classes={{
          root: styles.expansionPanelDetails,
        }}
        data-sign={`${dataSign}Details`}
        className={styles.expansionPanelDetailsDirection}
      >
        <RcFormGroup
          classes={{
            root: styles.toggleGroup,
          }}
        >
          {children}
        </RcFormGroup>
      </RcExpansionPanelDetails>
    </RcExpansionPanel>
  );
};
