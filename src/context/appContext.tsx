import { createContext, useContext, useState } from 'react';
import { dataType } from '../Types';

export const AppContext = createContext({
  setSelectedId: (_id: string) => {},
  selectedId: '',
  setSelectedType: (_type: dataType) => {},
  selectedType: dataType.FILM,
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedType, setSelectedType] = useState<dataType>(dataType.FILM);
  return (
    <AppContext.Provider
      value={{
        selectedId,
        setSelectedId,
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
