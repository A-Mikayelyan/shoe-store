import { createContext, useContext, useState } from "react";

const summaryDrawerContext = createContext();

export const SummaryDrawerProvider = ({ children }) => {
  const [isSummaryDrawerOpen, setIsSummaryDrawerOpen] = useState(false);

  const openSummaryDrawer = () => setIsSummaryDrawerOpen(true);
  const closeSummaryDrawer = () => setIsSummaryDrawerOpen(false);

  return (
    <summaryDrawerContext.Provider
      value={{ isSummaryDrawerOpen, openSummaryDrawer, closeSummaryDrawer }}
    >
      {children}
    </summaryDrawerContext.Provider>
  );
};

export const useSummaryDrawer = () => useContext(summaryDrawerContext);
