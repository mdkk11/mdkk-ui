import { Sidebar, SidebarTrigger as SidebarTriggerComponent } from './Sidebar';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from './SidebarGroup';

export { Sidebar };

// Backward-compatible named exports for gradual migration.
export const SidebarRoot = Sidebar.Root;
export const SidebarPanel = Sidebar.Panel;
export const SidebarHeader = Sidebar.Header;
export const SidebarContent = Sidebar.Content;
export const SidebarFooter = Sidebar.Footer;
export const SidebarTrigger = SidebarTriggerComponent;
export const SidebarResizeHandle = Sidebar.ResizeHandle;
export const SidebarNav = Sidebar.Nav;
export const SidebarList = Sidebar.List;
export const SidebarItem = Sidebar.Item;
export const SidebarItemButton = Sidebar.ItemButton;
export { SidebarGroup, SidebarGroupLabel, SidebarGroupContent };
