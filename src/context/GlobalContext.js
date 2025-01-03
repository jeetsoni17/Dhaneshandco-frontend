import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a provider component
export const GlobalContextProvider = ({ children }) => {
  const [Products, setProducts] = useState(null);
  const [Categories, setCategories] = useState(null);
  const [SubCategories, setSubCategories] = useState(null);
  const [SubSubCategories, setSubSubCategories] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        Products,
        setProducts,
        Categories,
        setCategories,
        SubCategories,
        setSubCategories,
        SubSubCategories,
        setSubSubCategories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook to use context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within an GlobalContextProvider"
    );
  }
  return context;
};
