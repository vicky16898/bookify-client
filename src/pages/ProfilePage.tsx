import { Navigate, useNavigate } from "react-router";
import { ReactNode, useContext, useEffect, useState } from "react";
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
import PlacesPage from "./PlacesPage";

interface User {
  name: string;
  email: string;
  _id: string;
  role: string;
}

export default function ProfilePage() {
  interface Place {
    extraInfo: ReactNode;
    price: ReactNode;
    maxGuests: ReactNode;
    checkOut: ReactNode;
    checkIn: ReactNode;
    title: string;
    address: string;
    description: string;
    photos: string[];
    owner: string;
    _id: string;
  }

  const { user, loading, setUser } = useContext(UserContext);
  const [bookings, setBookings] = useState<Place[]>([]);
  const [showBookings, setShowBookings] = useState(false);
  const [accommodations, setAccommodations] = useState([]);

  const [places, setPlaces] = useState<Place[]>([]);
  const baseAPIPath =
    process.env.REACT_APP_API_BASE_PATH || "http://localhost:4000";
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
    getAccommodations();

  }, []);

  useEffect(() => {
    console.log(bookings);
    console.log(accommodations);
  }, [bookings, accommodations]);

  const handleUpdateProfile = () => {
    navigate("/account/updateProfile");
  };

  const getBookings = async () => {
    const response = await axios.get("/bookings");
    const booking = response.data.filter(
      (booking: any) => booking.place !== null
    );
    if (booking.length > 0) {
      setBookings([booking[0]]);
    }
  };

  const getAccommodations = async () => {
    axios
      .get("/user-places", {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.length > 0) {
          setPlaces([data[0]]);
        }
      });
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
            <b>Role:</b>{" "}
            {user?.role &&
              user?.role?.charAt(0).toUpperCase() + user?.role?.substring(1)}
            <br />
            <b>Email:</b> {user?.email}
          </Typography>
        </Paper>

        <Grid container spacing={3}>
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
              {bookings && bookings.length > 0 ? (
                bookings.map((booking: any) => (
                  <Box
                    key={booking._id}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      "&:hover": {
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <img
                          src={`${baseAPIPath}/uploads/${booking.place.photos[0]}`}
                          alt={booking.place.title}
                          style={{
                            width: "100%",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {booking.place.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {booking.place.address}
                        </Typography>
                        <Typography variant="body2">
                          <b>Check-in:</b>{" "}
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          <b>Check-out:</b>{" "}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "primary.main", fontWeight: "bold" }}
                        >
                          Total price: ${booking.price}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Link
                      to={`/account/bookings/${booking._id}`}
                      style={{
                        display: "block",
                        textAlign: "center",
                        textDecoration: "none",
                        color: "#3f51b5",
                        marginTop: "12px",
                        padding: "8px",
                        borderRadius: "4px",
                        backgroundColor: "#f0f2ff",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#e3e7ff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f2ff";
                      }}
                    >
                      View all bookings
                    </Link>
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary" textAlign="center">
                  No bookings found. Start exploring places to stay!
                </Typography>
              )}
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
                {places.length > 0 ? (
                  places.map((place) => (
                    <Box
                      key={place._id}
                      sx={{
                        mb: 2,
                        p: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <img
                            src={`${baseAPIPath}/uploads/${place.photos[0]}`}
                            alt={place.title}
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {place.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {place.description}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Link
                        to={`/account/accommodations`}
                        style={{
                          display: "block",
                          textAlign: "center",
                          textDecoration: "none",
                          color: "#3f51b5",
                          marginTop: "12px",
                          padding: "8px",
                          borderRadius: "4px",
                          backgroundColor: "#f0f2ff",
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#e3e7ff";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#f0f2ff";
                        }}
                      >
                        View all accommodations
                      </Link>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary" textAlign="center">
                    No Hostings!!
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/account/places/new"
                      sx={{ mt: 2 }}
                    >
                      Add new place
                    </Button>
                  </Typography>
                )}
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
