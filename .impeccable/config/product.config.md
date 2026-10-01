# Product Configuration

This file is the single source of truth for product-specific configuration.

Do not hardcode these values inside UI components.

```ts
export const productConfig = {
  product: {
    name: "HomeOS",
    shortName: "HomeOS",
    tagline: "Your Home, One Intelligent Space",
    description:
      "A shared digital space for managing everyday family and household activities.",
    logo: "/assets/logo.svg",
  },

  theme: {
    mode: "dark",

    colors: {
      background: "#111315",

      surface: "#15191B",
      surfaceElevated: "#192024",
      surfaceStrong: "#20272A",

      primary: "#F4B860",
      primaryForeground: "#161616",

      secondary: "#8FD8C0",

      text: "#F2EEE7",
      textSecondary: "#9DA5A5",
      textMuted: "#687174",

      border: "rgba(255,255,255,0.08)",

      success: "#8FD8C0",
      warning: "#F4B860",
      danger: "#E88C8C",
    },

    typography: {
      primary: "Manrope",
      numeric: "DM Mono",
    },

    radius: {
      small: "10px",
      medium: "16px",
      large: "20px",
      extraLarge: "24px",
    },

    spacing: {
      page: "24px",
      section: "24px",
      card: "20px",
    },
  },

  navigation: [
    {
      id: "home",
      label: "Home",
      icon: "Home",
      route: "/",
      enabled: true,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: "CalendarDays",
      route: "/calendar",
      enabled: true,
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: "CheckSquare",
      route: "/tasks",
      enabled: true,
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: "ShoppingCart",
      route: "/shopping",
      enabled: true,
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: "Wallet",
      route: "/expenses",
      enabled: true,
    },
    {
      id: "digital-house",
      label: "Digital House",
      icon: "House",
      route: "/digital-house",
      enabled: true,
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: "Wrench",
      route: "/maintenance",
      enabled: true,
    },
    {
      id: "family",
      label: "Family",
      icon: "Users",
      route: "/family",
      enabled: true,
    },
  ],

  settings: {
    enabled: true,
    label: "Settings",
    icon: "Settings",
    route: "/settings",
  },

  screens: {
    home: {
      title: "Home Dashboard",
      description: "Here's what's happening at home today.",
      primaryAction: "View All",
    },

    calendar: {
      title: "Family Calendar",
      description: "Keep everyone in sync.",
      primaryAction: "Add Event",
    },

    tasks: {
      title: "Tasks",
      description: "Stay on top of household responsibilities.",
      primaryAction: "Add Task",
    },

    shopping: {
      title: "Shopping List",
      description: "Keep your shared shopping list organized.",
      primaryAction: "Add Item",
    },

    expenses: {
      title: "Expenses",
      description: "Track your household spending.",
      primaryAction: "Add Expense",
    },

    digitalHouse: {
      title: "Digital House",
      description: "Explore your home.",
    },

    maintenance: {
      title: "Maintenance",
      description: "Keep your home and assets running smoothly.",
      primaryAction: "Add Maintenance",
    },

    family: {
      title: "Family",
      description: "Your household members and activity.",
      primaryAction: "Invite Member",
    },
  },

  dashboard: {
    greeting: "Good morning, Arun",

    stats: {
      todayEvents: 5,
      pendingTasks: 4,
      shoppingItems: 7,
      monthlyExpenses: "₹12,689",
      maintenanceItems: 2,
    },
  },

  family: [
    {
      id: "member-1",
      name: "Arun",
      relationship: "Dad",
      avatar: "/assets/avatars/arun.png",
    },
    {
      id: "member-2",
      name: "Priya",
      relationship: "Mom",
      avatar: "/assets/avatars/priya.png",
    },
    {
      id: "member-3",
      name: "Anu",
      relationship: "Daughter",
      avatar: "/assets/avatars/anu.png",
    },
    {
      id: "member-4",
      name: "Rahul",
      relationship: "Son",
      avatar: "/assets/avatars/rahul.png",
    },
  ],

  rooms: [
    {
      id: "living-room",
      name: "Living Room",
      status: "active",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      status: "active",
    },
    {
      id: "bedroom",
      name: "Bedroom",
      status: "normal",
    },
    {
      id: "bathroom",
      name: "Bathroom",
      status: "normal",
    },
    {
      id: "study",
      name: "Study",
      status: "active",
    },
    {
      id: "garage",
      name: "Garage",
      status: "alert",
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Clean kitchen",
      assignee: "Priya",
      due: "Today",
      priority: "High",
      completed: false,
    },
    {
      id: "task-2",
      title: "Pay electricity bill",
      assignee: "Arun",
      due: "Tomorrow",
      priority: "Medium",
      completed: false,
    },
    {
      id: "task-3",
      title: "Buy groceries",
      assignee: "Anu",
      due: "Tomorrow",
      priority: "Medium",
      completed: false,
    },
  ],

  shopping: [
    {
      id: "item-1",
      name: "Milk",
      quantity: "2 L",
      category: "Groceries",
      addedBy: "Priya",
      completed: false,
    },
    {
      id: "item-2",
      name: "Rice",
      quantity: "5 kg",
      category: "Groceries",
      addedBy: "Arun",
      completed: false,
    },
    {
      id: "item-3",
      name: "Dish wash liquid",
      quantity: "1 pc",
      category: "Household",
      addedBy: "Anu",
      completed: false,
    },
  ],

  expenses: {
    currency: "₹",
    monthlyTotal: "₹12,689",
    todayTotal: "₹840",
    pendingTotal: "₹2,450",

    categories: [
      {
        name: "Groceries",
        percentage: 38,
        amount: "₹4,650",
      },
      {
        name: "Bills",
        percentage: 17,
        amount: "₹2,130",
      },
      {
        name: "Transport",
        percentage: 25,
        amount: "₹3,200",
      },
      {
        name: "Other",
        percentage: 8,
        amount: "₹1,009",
      },
    ],
  },

  maintenance: [
    {
      id: "maintenance-1",
      title: "AC Service",
      location: "Living Room",
      due: "Due in 2 days",
      status: "due-soon",
    },
    {
      id: "maintenance-2",
      title: "Water Purifier",
      location: "Kitchen",
      due: "Due in 5 days",
      status: "upcoming",
    },
  ],

  events: [
    {
      id: "event-1",
      title: "Doctor appointment",
      time: "09:00",
      member: "Priya",
    },
    {
      id: "event-2",
      title: "AC service",
      time: "11:30",
      member: "Arun",
    },
    {
      id: "event-3",
      title: "School pickup",
      time: "17:00",
      member: "Anu",
    },
    {
      id: "event-4",
      title: "Family dinner",
      time: "19:00",
      member: "Family",
    },
  ],

  activity: [
    {
      id: "activity-1",
      member: "Priya",
      action: "added Milk to Shopping",
      time: "2h ago",
    },
    {
      id: "activity-2",
      member: "Anu",
      action: "completed Kitchen cleanup",
      time: "4h ago",
    },
    {
      id: "activity-3",
      member: "Rahul",
      action: "added Book appointment",
      time: "5h ago",
    },
  ],

  assets: {
    house: {
      main: "/assets/3d/home-house.png",
      dashboard: "/assets/3d/home-house.png",
      digitalHouse: "/assets/3d/home-house.png",
    },
  },
};
```

## Configuration Rule

If the product needs to be changed, modify this configuration first.

Do not modify reusable components simply to change:

* Product name
* Menu
* Theme
* Screen names
* Demo data
* Labels
* Categories
* 3D asset references

The application should automatically reflect the new configuration.
