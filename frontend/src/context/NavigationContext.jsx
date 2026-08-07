import { createContext, useContext, useState } from "react";

// Page union (informal, JS): "landing" | "login" | "register" | "dashboard"
// | "editor" | "ai-chat" | "profile" | "settings"

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [page, setPage] = useState("landing");
  const [params, setParams] = useState({});

  const navigate = (nextPage, nextParams = {}) => {
    setPage(nextPage);
    setParams(nextParams);
  };

  return (
    <NavigationContext.Provider value={{ page, params, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Internal accessor — components should prefer the useNavigation hook
// in src/hooks, which re-exports this with a stable, testable surface.
export function useNavigationContext() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return ctx;
}
