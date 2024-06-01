export * from './DashboardRoot'


export const dashboardRootWrap = (inject: any) => ({
    name: "root",
    type: "void",
    "x-component": "DashboardRoot",
    "x-settings": "settings:root",
    "x-settings-props": {},
    ...inject
});