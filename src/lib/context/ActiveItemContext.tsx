import { ReactNode, createContext, useContext, useState } from "react";

type ActiveItemContextProps = {
  activeItemId: string;
  setActiveItemId: React.Dispatch<React.SetStateAction<string>>;
};

export const ActiveItemContext = createContext<
  ActiveItemContextProps | undefined
>(undefined);

type ActiveItemContextProviderProps = {
  children: ReactNode;
};

export function ActiveItemContextProvider({
  children
}: ActiveItemContextProviderProps) {
  const [activeItemId, setActiveItemId] = useState("");

  return (
    <ActiveItemContext.Provider
      value={{ activeItemId: activeItemId, setActiveItemId: setActiveItemId }}
    >
      {children}
    </ActiveItemContext.Provider>
  );
}

export function useActiveItemContext(): ActiveItemContextProps {
  const context = useContext(ActiveItemContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
}
