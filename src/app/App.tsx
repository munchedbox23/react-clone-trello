import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { checkUserAuth } from "../services/feature/user/auth";
import { useAppDispatch } from "./appStore";
import { AnimatePresence } from "framer-motion";
import {
  getBoards,
  getTemplates,
} from "../services/feature/boards/boardsSlice";
import { getBackgroundOptions } from "../services/feature/modal/modalSlice";
import { router } from "./router/appRouter";

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
