import { Suspense } from "react";
import { useCurrentRoute } from "./useCurrentRoute";
import NotFound from "../pages/NotFound";

export default function AppRouter({ routes }: { routes: any[] }) {

  const route = useCurrentRoute(routes);

  if (!route) {
    return <NotFound />;
  }

  const Component = route.component;
  const fallback = route.fallback || null;

  return (
    <Suspense fallback={fallback}>
      <Component params={route.params} />
    </Suspense>
  );
}