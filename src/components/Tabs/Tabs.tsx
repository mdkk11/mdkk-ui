import * as React from 'react';
import {
  TabsListAdapter,
  type TabsListAdapterProps,
  TabsPanelAdapter,
  type TabsPanelAdapterProps,
  TabsRootAdapter,
  type TabsRootAdapterProps,
  TabsTabAdapter,
  type TabsTabAdapterProps,
} from './TabsAdapter';

export interface TabsRootProps extends TabsRootAdapterProps {}
export interface TabsListProps extends TabsListAdapterProps {}
export interface TabsTabProps extends TabsTabAdapterProps {}
export interface TabsPanelProps extends TabsPanelAdapterProps {}

const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (props, ref) => <TabsRootAdapter {...props} ref={ref} />,
);
TabsRoot.displayName = 'Tabs.Root';

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => <TabsListAdapter {...props} ref={ref} />,
);
TabsList.displayName = 'Tabs.List';

const TabsTab = React.forwardRef<HTMLDivElement, TabsTabProps>((props, ref) => (
  <TabsTabAdapter {...props} ref={ref} />
));
TabsTab.displayName = 'Tabs.Tab';

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  (props, ref) => <TabsPanelAdapter {...props} ref={ref} />,
);
TabsPanel.displayName = 'Tabs.Panel';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
