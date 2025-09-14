import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  List,
  ListItem,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import API from '../../utils/api';
import { showToast } from '../../utils/toast-Components';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FinanceTracker() {
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    type: "",
    amount: "",
    date: ""
  });

  useEffect(() => {
    getAllIncomeDetails();
  }, []);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // trigger hidden input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // 👉 here you can handle uploading the file to backend
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (entry) => {
    const income = await getIncomeById(entry._id);
    if (income) {
      setFormData(income);
      setEditId(entry._id);   // ✅ keep track of which entry is being edited
      setOpenAdd(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`incomes/deleteIncomeById/${id}`);
      showToast("success", "Income deleted successfully");
      getAllIncomeDetails(); // refresh list
    } catch (error) {
      showToast("error", "Failed to delete income");
      console.error(error);
    }
  };

  const getIncomeById = async (id) => {
    try {
      const result = await API.get(`incomes/getIncomeById/${id}`);
      console.log("Income details:", result.data);
      return result.data;
    } catch (error) {
      showToast("error", "Failed to fetch income by ID");
      console.error(error);
    }
  };

  const getAllIncomeDetails = async () => {
    try {
      const result = await API.get("incomes/getAllIncome");
      setEntries(result.data);
    } catch (error) {
      console.error("Failed to fetch incomes", error);
      showToast("error", "Failed to load incomes");
    }
  };

  const handleAddIncome = async () => {
    try {
      const payload = {
        label: formData.label,
        type: formData.type,
        amount: parseFloat(formData.amount),
        date: formData.date,
      };

      let result;
      if (editId) {
        result = await API.put(`incomes/updateIncomeById/${editId}`, payload);
        showToast("success", "Income updated successfully");
      } else {
        result = await API.post("incomes/createIncome", payload);
        showToast("success", "Income added successfully");
      }

      getAllIncomeDetails();
      setOpenAdd(false);
      setEditId(null); // reset edit mode
      console.log("Save successful:", result);
    } catch (error) {
      console.error("Save failed", error);
      showToast("error", "Failed to save income");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <Box sx={{ bgcolor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(229,231,235,0.8)", py: 1, position: "sticky", top: 0, zIndex: 40 }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
            {/* Left Side: Income Title */}
            <Grid item>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "#dbeafe",
                    borderRadius: 2,
                    fontSize: "1.75rem",
                    color: "#2563eb",
                  }}
                >
                  💼
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#111827">
                    Income
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track your income
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Side: Buttons */}
            <Grid item>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "#2563eb",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.2)",
                    "&:hover": {
                      bgcolor: "#1e40af",
                      boxShadow: "0 6px 16px rgba(37,99,235,0.3)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  onClick={() => setOpenAdd(true)}
                >
                  Add Income
                </Button>

                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    bgcolor: "#16a34a", // ✅ green
                    color: "white",
                    boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
                    "&:hover": {
                      bgcolor: "#15803d", // darker green on hover
                      boxShadow: "0 6px 16px rgba(22,163,74,0.3)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  onClick={handleUploadClick}
                >
                  Upload Income
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Box component="main" py={2}>
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={3} direction="column">
            {/* Summary Cards */}
            <Grid item xs={12}>
              <Box display="flex" width="100%">
                {/* Total Income */}
                <Paper
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 4,
                    color: "white",
                    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                    boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mr: 1, // horizontal gap only
                    mb: 0, // remove bottom margin
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}>💰</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Total Income</Typography>
                      <Typography variant="h6" fontWeight={600}>$9,000</Typography>
                    </Box>
                  </Box>
                  <Chip label="+12.5%" sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 700 }} />
                </Paper>

                {/* Last Month Income */}
                <Paper
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 4,
                    color: "white",
                    background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                    boxShadow: "0 8px 24px rgba(22,163,52,0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mx: 1, // horizontal gap only
                    mb: 0, // remove bottom margin
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}>📅</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Last Month</Typography>
                      <Typography variant="h6" fontWeight={600}>$4,500</Typography>
                    </Box>
                  </Box>
                  <Chip label="+8.2%" sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 700 }} />
                </Paper>

                {/* This Month Income */}
                <Paper
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 4,
                    color: "white",
                    background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                    boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    ml: 1, // horizontal gap only
                    mb: 0, // remove bottom margin
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}>🗓️</Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>This Month</Typography>
                      <Typography variant="h6" fontWeight={600}>$4,500</Typography>
                    </Box>
                  </Box>
                  <Chip label="+4.3%" sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "white", fontWeight: 700 }} />
                </Paper>
              </Box>
            </Grid>

            {/* Income Entries */}
            <Grid item xs={12}>
              <Paper sx={{ p: 0, borderRadius: 2, width: "100%", mt: -2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                  <Typography variant="h6" fontWeight={600} sx={{ ml: 2 }}>Recent Income Entries</Typography>
                  <Button variant="contained" color="primary" onClick={() => setOpenView(true)} sx={{ borderRadius: 3, mr: 2 }}>View More</Button>
                </Box>
                <List>
                  {entries.slice(0, 4).map((entry, idx) => (
                    <ListItem
                      key={entry._id || idx}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        bgcolor: "white",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center" width="100%">
                        {/* Left Section: Avatar + Text */}
                        <Box display="flex" alignItems="center" flex={1} gap={2}>
                          <Avatar sx={{ bgcolor: "#e0f2fe", color: "#0369a1" }}>
                            {entry.label[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600}>{entry.label}</Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {entry.type}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Middle Section: Amount + Date */}
                        <Box textAlign="right" flex={1}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                              color: entry.amount > 0 ? "#16a34a" : "#dc2626",
                            }}
                          >
                            ${entry.amount}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            {new Date(entry.date).toLocaleDateString()}
                          </Typography>
                        </Box>

                        {/* Right Section: Colorful Action Icons */}
                        <Box display="flex" gap={1} flexShrink={0} ml={2}>
                          <IconButton
                            sx={{ color: "#2563eb" }} // blue
                            onClick={() => handleEdit(entry)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            sx={{ color: "#dc2626" }} // red
                            onClick={() => handleDelete(entry._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* View More Popup */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="md" PaperProps={{ sx: { borderRadius: 3, p: 2 } }}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6" fontWeight={600}>All Income Transactions</Typography>
          <IconButton aria-label="close" onClick={() => setOpenView(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {entries.map((entry, idx) => (
              <ListItem
                key={entry._id || idx}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  bgcolor: "white",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box display="flex" alignItems="center" width="100%">
                  {/* Left Section: Avatar + Label/Type */}
                  <Box display="flex" alignItems="center" flex={1} gap={2}>
                    <Avatar sx={{ bgcolor: "#e0f2fe", color: "#0369a1" }}>
                      {entry.label[0]}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={600}>{entry.label}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {entry.type}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Middle Section: Amount + Date */}
                  <Box textAlign="right" flex={1}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: entry.amount > 0 ? "#16a34a" : "#dc2626",
                      }}
                    >
                      ${entry.amount}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {new Date(entry.date).toLocaleDateString()}
                    </Typography>
                  </Box>

                  {/* Right Section: Colorful Icons */}
                  <Box display="flex" gap={1} flexShrink={0} ml={2}>
                    <IconButton
                      sx={{ color: "#2563eb" }} // blue for edit
                      onClick={() => handleEdit(entry)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#dc2626" }} // red for delete
                      onClick={() => handleDelete(entry._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Add Income Popup */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 3 } }}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6" fontWeight={600}>Add New Income</Typography>
          <IconButton aria-label="close" onClick={() => setOpenAdd(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Income Label" name="label" fullWidth value={formData.label} onChange={handleChange} />
            <TextField select label="Type" name="type" fullWidth value={formData.type} onChange={handleChange}>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </TextField>
            <TextField label="Amount" name="amount" type="number" fullWidth value={formData.amount} onChange={handleChange} />
            <TextField label="Date" name="date" type="date" fullWidth value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <Button variant="contained" sx={{ mt: 1, borderRadius: 3, py: 1.5 }} onClick={handleAddIncome}>Add Income</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}