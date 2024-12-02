import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewType = 'main' | 'aogEvents' | 'aircraftData';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentData: any;
  setCurrentData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [currentData, setCurrentData] = useState<any>(null);

  return (
    <AppContext.Provider value={{ currentView, setCurrentView, currentData, setCurrentData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

