import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CustomDatePicker({ label, selectedDate, handleDateChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name="birthday"
                label={label}
                value={selectedDate}
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
