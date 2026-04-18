import * as React from 'react';
import {
  TabsListAdapter,
  TabsPanelAdapter,
  TabsRootAdapter,
  TabsTabAdapter,
} from './TabsAdapter';

type TabsKey = string | number;

export interface TabsRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  children: React.ReactNode;
  className?: string;
  selectedKey?: TabsKey;
  defaultSelectedKey?: TabsKey;
  onSelectionChange?: (key: TabsKey) => void;
  orientation?: 'horizontal' | 'vertical';
  keyboardActivation?: 'automatic' | 'manual';
  isDisabled?: boolean;
  disabledKeys?: Iterable<TabsKey>;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_rootProps?: Record<string, unknown>;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_listProps?: Record<string, unknown>;
}

export interface TabsTabProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id?: TabsKey;
  className?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_tabProps?: Record<string, unknown>;
}

export interface TabsPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  id?: TabsKey;
  className?: string;
  children?: React.ReactNode;
  /**
   * @deprecated Migration-only escape hatch for legacy low-level props.
   * Will be removed in the next major release.
   */
  UNSAFE_panelProps?: Record<string, unknown>;
}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ UNSAFE_rootProps, ...props }, ref) => (
    <TabsRootAdapter
      {...UNSAFE_rootProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TabsRoot.displayName = 'Tabs.Root';

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ UNSAFE_listProps, ...props }, ref) => (
    <TabsListAdapter
      {...UNSAFE_listProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TabsList.displayName = 'Tabs.List';

const TabsTab = React.forwardRef<HTMLDivElement, TabsTabProps>(
  ({ UNSAFE_tabProps, ...props }, ref) => (
    <TabsTabAdapter
      {...UNSAFE_tabProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TabsTab.displayName = 'Tabs.Tab';

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ UNSAFE_panelProps, ...props }, ref) => (
    <TabsPanelAdapter
      {...UNSAFE_panelProps}
      {...(props as Record<string, unknown>)}
      ref={ref}
    />
  ),
);
TabsPanel.displayName = 'Tabs.Panel';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
