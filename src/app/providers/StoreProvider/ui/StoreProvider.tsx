import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../config/appStore";

interface StoreProviderProps {
  /**
   * Default state for redux, including optional reducers
   */
  children?: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
