import type { RouteRecordRaw } from "vue-router";

interface RouteModuleType {
  routes: RouteRecordRaw[];
}
export function mergeRouteModules(
  routeModules: Record<string, unknown>
): RouteRecordRaw[] {
  const mergedRoutes: RouteRecordRaw[] = [];

  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.routes ?? [];
    mergedRoutes.push(...moduleRoutes);
  }

  return mergedRoutes;
}
