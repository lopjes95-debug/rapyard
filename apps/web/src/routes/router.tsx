import { createBrowserRouter } from "react-router-dom";
import CinematicRoot from "./CinematicRoot";

export const router = createBrowserRouter([
  { path: "/", element: <CinematicRoot /> }
]);
