import axios from "axios";

export const menu = [
  {
    id: 1,
    title: "main",
    listItem: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: <i class="fa-solid fa-house"></i>,
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: <i class="fa-solid fa-user"></i>,
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItem: [
      {
        id: 1,
        title: "users",
        url: "/users",
        icon: <i class="fa-solid fa-users"></i>,
      },
      {
        id: 2,
        title: "products",
        url: "/products",
        icon: <i class="fa-solid fa-cart-shopping"></i>,
      },
      {
        id: 3,
        title: "Orders",
        url: "/orders",
        icon: <i class="fa-solid fa-arrow-up-wide-short"></i>,
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: <i class="fa-solid fa-book"></i>,
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItem: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: <i class="fa-solid fa-border-all"></i>,
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: <i class="fa-solid fa-pen-to-square"></i>,
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: <i class="fa-brands fa-figma"></i>,
      },
      {
        id: 4,
        title: "Calender",
        url: "/",
        icon: <i class="fa-solid fa-calendar-days"></i>,
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItem: [
      {
        id: 1,
        title: "Setting",
        url: "/",
        icon: <i class="fa-solid fa-gear"></i>,
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: <i class="fa-solid fa-cloud-arrow-up"></i>,
      },
    ],
  },
  {
    id: 5,
    title: "Analytics",
    listItem: [
      {
        id: 1,
        title: "Cahrt",
        url: "/",
        icon: <i class="fa-solid fa-chart-simple"></i>,
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: <i class="fa-solid fa-power-off"></i>,
      },
    ],
  },
];
let userData = 4;
const fetchUserData = async () => {
  try {
    const res = await axios.get("http://localhost:3500/api/auth/");
    return (userData = res.data.length);
  } catch (err) {
    console.log(err);
  }
};
fetchUserData();
export const chartDataUser = {
  color: "#8884d8",
  title: "المستخدمين",
  number: userData,
  dataKey: "users",
  percentage: 50,
  data: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "tue", users: 300 },
    { name: "wed", users: 900 },
    { name: "thu", users: 400 },
    { name: "fri", users: 300 },
    { name: "sat", users: 100 },
  ],
};
export const chartDataRenvue = {
  color: "teal",
  title: "Total Renvue",
  number: "$21,6",
  dataKey: "renvue",
  percentage: -12,
  data: [
    { name: "Sun", renvue: 100 },
    { name: "Mon", renvue: 900 },
    { name: "tue", renvue: 300 },
    { name: "wed", renvue: 300 },
    { name: "thu", renvue: 700 },
    { name: "fri", renvue: 400 },
    { name: "sat", renvue: 100 },
  ],
};
export const chartDataProduct = {
  color: "skyblue",
  title: "Total Products",
  number: "238",
  dataKey: "products",
  percentage: 21,
  data: [
    { name: "Sun", produc: 400 },
    { name: "Mon", produc: 600 },
    { name: "tue", produc: 300 },
    { name: "wed", produc: 900 },
    { name: "thu", produc: 400 },
    { name: "fri", produc: 300 },
    { name: "sat", produc: 100 },
  ],
};
export const chartDataConvension = {
  color: "gold",
  title: "Total Ratio",
  number: "2.6",
  dataKey: "ratio",
  percentage: 12,
  data: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "tue", ratio: 300 },
    { name: "wed", ratio: 900 },
    { name: "thu", ratio: 400 },
    { name: "fri", ratio: 300 },
    { name: "sat", ratio: 100 },
  ],
};
export const barChartDataVisit = {
  color: "#FF8042",
  title: "Total Visits",
  dataKey: "visit",
  data: [
    {
      name: "Page A",
      visit: 1000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      visit: 9000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      visit: 1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      visit: 5780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      visit: 3490,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      visit: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      visit: 9490,
      pv: 4300,
      amt: 2100,
    },
  ],
};
export const barChartDataRevnue = {
  color: "#8884d8",
  title: "Profit Earned",
  dataKey: "uv",
  data: [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ],
};
