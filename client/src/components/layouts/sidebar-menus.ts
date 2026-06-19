import {
  AiMagicFreeIcons,
  BookOpen01FreeIcons,
  CalendarAdd01Icon,
  CalendarIcon,
  ClockIcon,
  Coins01FreeIcons,
  HelpCircleIcon,
  PlugIcon,
  Settings,
  WorkflowCircleIcon,
} from "@hugeicons/core-free-icons"

export const sidebarMenus = [
  {
    title: "Events",
    icon: CalendarAdd01Icon,
    path: "/events",
    heading: "Events",
    description: "Manage events and events.",
  },
  {
    title: "Bookings",
    icon: CalendarIcon,
    path: "/bookings",
    heading: "Bookings",
    description: "Manage bookings and bookings.",
  },
  {
    title: "Workflows",
    icon: WorkflowCircleIcon,
    path: "/workflows",
    heading: "Workflows",
    description: "Manage workflows and workflows.",
  },
  {
    title: "Integrations & Apps",
    icon: PlugIcon,
    path: "/integrations-apps",
    heading: "Documents",
    description: "Manage documents and documents.",
  },
  {
    title: "Availablity",
    icon: ClockIcon ,
    path: "/availability",
    heading: "Availability",
    description: "Manage availability and availability.",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    heading: "Settings",
    description: "Manage the settings for your account and workspace.",
  },
] as const


export const sidebarFooterMenus = [
  {
    title: "API Usage",
    icon: Coins01FreeIcons,
    path: "/api-usage",
  },
  {
    title: "Ask Mimo",
    icon: AiMagicFreeIcons,
    path: "/ask-mimo",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Documentations",
    icon: BookOpen01FreeIcons,
    path: "https://docs.openai.com/api-reference/",
  },
  {
    title: "Support",
    icon: HelpCircleIcon,
    path: "/support",
  },
] as const