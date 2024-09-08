import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  getBoards,
  getTemplates,
} from "../services/feature/boards/boardsSlice";
import { getBackgroundOptions } from "../services/feature/modal/modalSlice";
import { useAppDispatch } from "./providers/StoreProvider";
import { router } from "./providers/router";
import { checkUserAuth } from "../entities/user/api/userApi";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getBoards());
    dispatch(getTemplates());
    dispatch(getBackgroundOptions());
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;
