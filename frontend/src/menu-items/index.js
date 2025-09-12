import { Paid, ReceiptLong, BarChart, Settings } from "@mui/icons-material";

const menuItems = [
  { text: "Income", icon: <Paid sx={{ color: "green" }} />, path: "/income" },
  { text: "Expenses", icon: <ReceiptLong sx={{ color: "red" }} />, path: "/expenses" },
  { text: "Reports", icon: <BarChart />, path: "/reports" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

export default menuItems;
