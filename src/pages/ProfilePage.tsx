import { Navigate, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Grid,
} from "@mui/material";

import axios from "axios";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const baseAPIPath = process.env.API_BASE_PATH || 'http://localhost:4000';
  const { user, loading, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/account/updateProfile");
  };

  async function logout() {
    await axios.post(`${baseAPIPath}/logout`);
    setUser(null);
    navigate("/");
  }

  if (!loading) {
    return "Loading";
  }

  if (loading && !user) return <Navigate to="/login" />;

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          py: 4,
          px: 3,
          backgroundColor: "#f7f9fc",
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        {/* Profile Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            textAlign: "center",
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          <Avatar
            src={user?.name || undefined}
            alt={user?.name || "User"}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 3,
              bgcolor: "#3f51b5",
              fontSize: 32,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {user?.name || "Guest User"}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {user?.role === "host" || user?.role === "admin" ? "Host" : "Guest"}
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* My Bookings Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  textAlign: "center",
                }}
              >
                My Bookings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Add booking list component here */}
              <Typography color="text.secondary" textAlign="center">
                No bookings found. Start exploring places to stay!
              </Typography>
            </Paper>
          </Grid>

          {/* Conditionally render My Accommodations Section for admin users */}
          {(user?.role === "host" || user?.role === "admin") && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                    textAlign: "center",
                  }}
                >
                  My Accommodations
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Add accommodations list component here */}
                <Typography color="text.secondary" textAlign="center">
                  No Hostings!!
                  <br />
                  <button className="bg-purple-600 text-white px-6 py-2 mt-4 rounded-md hover:bg-purple-700 transition duration-200">
                    <Link
                      to="/account/places/new"
                      className="no-underline text-white"
                    >
                      Add new place
                    </Link>
                  </button>
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Logout Button at the end */}
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
            }}
          >
            Update Profile
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={logout}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
