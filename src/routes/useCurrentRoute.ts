import { useEffect, useState } from "react";

function matchRoute(pathname: string, routePath: string) {
  const pathParts = pathname.split("/").filter(Boolean);
  const routeParts = routePath.split("/").filter(Boolean);

  if (pathParts.length !== routeParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];

    if (routePart.startsWith(":")) {
      params[routePart.slice(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return null;
    }
  }

  return params;
}


export function useCurrentRoute(routes: any[]) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  for (const route of routes) {
    const params = matchRoute(path, route.path);
    if (params) {
      return {
        ...route,
        params,
      };
    }
  }

  return null;
}
