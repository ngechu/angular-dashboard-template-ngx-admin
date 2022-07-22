import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "/pages/dashboard",
    home: true,
    data: {
      permission: "view",
      resource: "guest",
    },
  },

  {
    title: "Device Management",
    icon: "sync-outline",
    expanded: true,
    data: {
      permission: "view",
      resource: "guest",
    },
    children: [
      {
        title: "Onboarded Models",
        link: "/pages/device-model-table",
      },
      {
        title: "Supplier Requisitions",
        link: "/pages/view-requisition",
      },
      {
        title: "Consignments",
        link: "/pages/view-consignments",
      },
      {
        title: "Dead On Arrival Devices",
        link: "/pages/dead-on-arrival",
      },
    ],
  },
];
