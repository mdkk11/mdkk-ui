import {
  Tab as RACTab,
  TabList as RACTabList,
  type TabListProps as RACTabListProps,
  TabPanel as RACTabPanel,
  type TabPanelProps as RACTabPanelProps,
  type TabProps as RACTabProps,
  Tabs as RACTabs,
  type TabsProps as RACTabsProps,
} from 'react-aria-components';

export type TabsRootPrimitiveProps = RACTabsProps;
export type TabsListPrimitiveProps = RACTabListProps<object>;
export type TabsTabPrimitiveProps = RACTabProps;
export type TabsPanelPrimitiveProps = RACTabPanelProps;

export const TabsRootPrimitive = RACTabs;
export const TabsListPrimitive = RACTabList;
export const TabsTabPrimitive = RACTab;
export const TabsPanelPrimitive = RACTabPanel;
