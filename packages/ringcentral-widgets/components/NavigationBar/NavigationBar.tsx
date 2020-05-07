import classnames from 'classnames';
import React, { Component } from 'react';

import {
  NavigationBarProps,
  NavigationBarState,
} from './NavigationBar.interface';
import styles from './styles.scss';

export default class NavigationBar extends Component<
  NavigationBarProps,
  NavigationBarState
> {
  static defaultProps: Partial<NavigationBarProps> = {
    className: undefined,
    childNavigationView: undefined,
    currentVirtualPath: undefined,
    tabWidth: undefined,
    tabHeight: undefined,
    tabs: [],
    fullSizeInk: true,
    direction: 'horizonal',
  };

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
    this._mounted = false;
    this.state = {
      currentVirtualPath: this.props.currentVirtualPath,
    };
  }

  private _mounted: boolean;

  componentDidMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentVirtualPath && this._mounted) {
      this.setState({
        currentVirtualPath: nextProps.currentVirtualPath,
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  goTo(tab) {
    this.props.goTo(tab.path, tab.virtualPath);
    // seems like the goTo is asynchronous
    // so here set timeout for resolving menu looks flash issue
    setTimeout(() => {
      if (this._mounted) {
        this.setState({
          currentVirtualPath: tab.virtualPath,
        });
      }
    }, 10);
  }

  render() {
    const {
      className,
      button,
      childNavigationView,
      currentPath,
      tabWidth,
      tabHeight,
      tabs,
      fullSizeInk,
      direction,
    } = this.props;

    const NavigationButton = button;
    const ChildNavigationView = childNavigationView;
    const isVertical = direction === 'vertical';
    const directionClass = isVertical ? styles.vertical : undefined;

    const { currentVirtualPath } = this.state;

    let _tabWidth = '0';
    const _tabHeight = isVertical ? tabHeight || '50px' : '100%';
    if (tabWidth) {
      _tabWidth = tabWidth;
    } else {
      // Align equally fully
      _tabWidth = tabs.length > 0 ? `${(1 / tabs.length) * 100}%` : '0';
    }
    const dropdownMenuTab = tabs.find(
      (tab) =>
        tab.childTabs &&
        tab.isActive &&
        tab.isActive(currentPath, currentVirtualPath),
    );
    const dropdownMenu = dropdownMenuTab && dropdownMenuTab.childTabs;
    return (
      <nav className={classnames(styles.root, className, directionClass)}>
        {tabs.map((tab, index) => {
          let { icon, activeIcon } = tab;
          if (typeof icon === 'function') {
            const Icon = icon;
            icon = tab.childTabs ? (
              <Icon currentPath={currentPath} />
            ) : (
              <Icon />
            );
          }
          if (typeof activeIcon === 'function') {
            const ActiveIcon = activeIcon;
            activeIcon = tab.childTabs ? (
              <ActiveIcon currentPath={currentPath} />
            ) : (
              <ActiveIcon />
            );
          }
          return (
            <NavigationButton
              {...tab}
              fullSizeInk={fullSizeInk}
              key={index}
              onClick={() => {
                this.goTo(tab);
              }}
              active={
                (tab.isActive &&
                  tab.isActive(currentPath, currentVirtualPath)) ||
                (tab.path && tab.path === currentPath) ||
                (tab.virtualPath && tab.virtualPath === currentVirtualPath) ||
                (tab.childTabs &&
                  tab.childTabs.some(
                    (childTab) =>
                      childTab.path === currentPath ||
                      childTab.path === currentPath.slice(0, 9),
                  ))
              }
              width={_tabWidth}
              height={_tabHeight}
              icon={icon}
              activeIcon={activeIcon}
            />
          );
        })}
        {ChildNavigationView && dropdownMenu && dropdownMenu.length ? (
          <ChildNavigationView
            tabs={dropdownMenu}
            goTo={this.goTo}
            currentPath={currentPath}
            currentVirtualPath={currentVirtualPath}
          />
        ) : null}
      </nav>
    );
  }
}