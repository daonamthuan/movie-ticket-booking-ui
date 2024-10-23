import React from "react";
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";

const bookingData = [
    {
        movie: "Avengers: Endgame",
        showtime: "2024-10-25 18:00",
        date: "2024-10-22",
        status: "Confirmed",
    },
    {
        movie: "The Matrix Resurrections",
        showtime: "2024-10-28 21:00",
        date: "2024-10-20",
        status: "Cancelled",
    },
    {
        movie: "Spider-Man: No Way Home",
        showtime: "2024-10-29 20:30",
        date: "2024-10-23",
        status: "Confirmed",
    },
];

function BookingHistory() {
    return (
        <Box sx={{ bgcolor: "#f8f8f8" }}>
            <Navbar />

            <Container sx={{ my: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Booking History
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie</TableCell>
                                <TableCell>Showtime</TableCell>
                                <TableCell>Booking Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {bookingData.map((booking, index) => (
                                <TableRow key={index}>
                                    <TableCell>{booking.movie}</TableCell>
                                    <TableCell>{booking.showtime}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Footer />
        </Box>
    );
}

export default BookingHistory;
