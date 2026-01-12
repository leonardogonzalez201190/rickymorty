import { lazy } from "react";
import Home from "../pages/Home";
import DetailsSkeleton from "../components/DetailsSkeleton";

const Details = lazy(() => import("../pages/Details"));


export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/details/:id",
    component: Details,
    fallback: <DetailsSkeleton />,
  },
];
