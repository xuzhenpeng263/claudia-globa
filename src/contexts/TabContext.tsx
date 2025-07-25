import React, { useState, useCallback, useEffect } from "react";
import { generateTabId, MAX_TABS } from "./tabUtils";
import { Tab, TabContext } from "./contexts";

interface TabContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Omit<Tab, "id" | "order" | "createdAt" | "updatedAt">) => string;
  removeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
  getTabById: (id: string) => Tab | undefined;
  closeAllTabs: () => void;
  getTabsByType: (type: "chat" | "agent") => Tab[];
}

// const STORAGE_KEY = 'claudia_tabs'; // No longer needed - persistence disabled

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  // Always start with a fresh CC Projects tab
  useEffect(() => {
    // Create default projects tab
    const defaultTab: Tab = {
      id: generateTabId(),
      type: "projects",
      title: "CC Projects", // Will be updated by component with translation
      status: "idle",
      hasUnsavedChanges: false,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTabs([defaultTab]);
    setActiveTabId(defaultTab.id);
  }, []);

  // Tab persistence disabled - no longer saving to localStorage
  // useEffect(() => {
  //   if (tabs.length > 0) {
  //     const tabsToSave = tabs.map(tab => ({
  //       ...tab,
  //       createdAt: tab.createdAt.toISOString(),
  //       updatedAt: tab.updatedAt.toISOString()
  //     }));
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsToSave));
  //   }
  // }, [tabs]);

  const addTab = useCallback(
    (tabData: Omit<Tab, "id" | "order" | "createdAt" | "updatedAt">): string => {
      if (tabs.length >= MAX_TABS) {
        throw new Error(`Maximum number of tabs (${MAX_TABS}) reached`);
      }

      const newTab: Tab = {
        ...tabData,
        id: generateTabId(),
        order: tabs.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveTabId(newTab.id);
      return newTab.id;
    },
    [tabs.length]
  );

  const removeTab = useCallback(
    (id: string) => {
      setTabs((prevTabs) => {
        const filteredTabs = prevTabs.filter((tab) => tab.id !== id);

        // Reorder remaining tabs
        const reorderedTabs = filteredTabs.map((tab, index) => ({
          ...tab,
          order: index,
        }));

        // Update active tab if necessary
        if (activeTabId === id && reorderedTabs.length > 0) {
          const removedTabIndex = prevTabs.findIndex((tab) => tab.id === id);
          const newActiveIndex = Math.min(removedTabIndex, reorderedTabs.length - 1);
          setActiveTabId(reorderedTabs[newActiveIndex].id);
        } else if (reorderedTabs.length === 0) {
          setActiveTabId(null);
        }

        return reorderedTabs;
      });
    },
    [activeTabId]
  );

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, ...updates, updatedAt: new Date() } : tab))
    );
  }, []);

  const setActiveTab = useCallback(
    (id: string) => {
      if (tabs.find((tab) => tab.id === id)) {
        setActiveTabId(id);
      }
    },
    [tabs]
  );

  const reorderTabs = useCallback((startIndex: number, endIndex: number) => {
    setTabs((prevTabs) => {
      const newTabs = [...prevTabs];
      const [removed] = newTabs.splice(startIndex, 1);
      newTabs.splice(endIndex, 0, removed);

      // Update order property
      return newTabs.map((tab, index) => ({
        ...tab,
        order: index,
      }));
    });
  }, []);

  const getTabById = useCallback(
    (id: string): Tab | undefined => {
      return tabs.find((tab) => tab.id === id);
    },
    [tabs]
  );

  const closeAllTabs = useCallback(() => {
    setTabs([]);
    setActiveTabId(null);
    // localStorage.removeItem(STORAGE_KEY); // Persistence disabled
  }, []);

  const getTabsByType = useCallback(
    (type: "chat" | "agent"): Tab[] => {
      return tabs.filter((tab) => tab.type === type);
    },
    [tabs]
  );

  const value: TabContextType = {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    updateTab,
    setActiveTab,
    reorderTabs,
    getTabById,
    closeAllTabs,
    getTabsByType,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};
