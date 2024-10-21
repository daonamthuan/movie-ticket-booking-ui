import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "~/utils/helper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/vi";

dayjs.extend(localizedFormat);
dayjs.locale("vi");

const ScheduleShowing = React.memo(({ cinema, schedules }) => {
    const navigate = useNavigate();
    const [timestampNow, setTimestampNow] = useState(dayjs().valueOf());
    const [selectedDate, setSelectedDate] = useState(timestampNow);
    const [dateSelectMenu, setDateSelectMenu] = useState();

    useEffect(() => {
        let dateSelectMenu = getNextThreeDays();
        setDateSelectMenu(dateSelectMenu);
    }, []);

    useEffect(() => {
        console.log("Change selected date");
    }, [selectedDate]);

    const getNextThreeDays = () => {
        let days = [];
        days.push({
            timestamp: timestampNow,
            text: `Hôm nay - ${dayjs(timestampNow).format("DD/MM")}`,
        });

        for (let i = 0; i < 3; i++) {
            let timestamp = dayjs()
                .add(i + 1, "day")
                .startOf("day")
                .valueOf();
            days.push({
                timestamp: timestamp,
                text: formatDate(timestamp),
            });
        }
        return days;
    };

    const formatDate = (timestamp) => {
        return capitalizeFirstLetter(dayjs(timestamp).format("dddd - DD/MM"));
    };

    const handleChangeDate = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleClickSchedule = (scheduleId) => {
        navigate(`/select-seat?scheduleId=${scheduleId}`);
    };

    return (
        <Box
            sx={{
                width: "100%",
                p: 3,
                mb: 3,
                borderRadius: "15px",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
        >
            <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontFamily: "Be Vietnam Pro", color: "#337ab7" }}
            >
                <PlaceOutlinedIcon
                    sx={{
                        position: "relative",
                        bottom: "-5px",
                        color: "#337ab7",
                        mr: "5px",
                    }}
                />
                {cinema.cinemaName}
            </Typography>
            <Typography
                sx={{
                    fontSize: "16px",
                    mb: "6px",
                    fontFamily: "Be Vietnam Pro",
                    mb: 2,
                }}
            >
                {cinema.address}
            </Typography>
            <Box>
                <FormControl sx={{ maxWidth: "180px", mb: 1 }}>
                    <InputLabel id="schedule-date-select-label">Chọn ngày</InputLabel>
                    <Select
                        labelId="schedule-date-select-label"
                        id="schedule-date-select"
                        value={selectedDate}
                        label="Chọn ngày"
                        onChange={handleChangeDate}
                        size="small"
                    >
                        {dateSelectMenu &&
                            dateSelectMenu.length > 0 &&
                            dateSelectMenu.map((item, index) => (
                                <MenuItem key={index} value={item.timestamp}>
                                    {item.text}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: "flex", columnGap: 2, rowGap: 1, flexWrap: "wrap" }}>
                    {schedules && schedules.length > 0 ? (
                        (() => {
                            const filteredSchedules = schedules.filter(
                                (schedule) =>
                                    schedule.startTime >
                                        dayjs(selectedDate).startOf("day").valueOf() &&
                                    schedule.startTime < dayjs(selectedDate).endOf("day").valueOf()
                            );

                            return filteredSchedules.length > 0 ? (
                                filteredSchedules.map((schedule, index) =>
                                    schedule.startTime > dayjs().valueOf() ? (
                                        <Button
                                            key={index}
                                            variant="contained"
                                            size="large"
                                            sx={{ width: "165px", backgroundColor: "#337ab7" }}
                                            onClick={() => handleClickSchedule(schedule.id)}
                                        >
                                            {`${dayjs(schedule.startTime).format(
                                                "HH:mm"
                                            )} - ${dayjs(schedule.endTime).format("HH:mm")}`}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled
                                            key={index}
                                            variant="contained"
                                            size="large"
                                            sx={{ width: "165px", backgroundColor: "#337ab7" }}
                                        >
                                            {`${dayjs(schedule.startTime).format(
                                                "HH:mm"
                                            )} - ${dayjs(schedule.endTime).format("HH:mm")}`}
                                        </Button>
                                    )
                                )
                            ) : (
                                <Typography>Hiện không có lịch chiếu</Typography>
                            );
                        })()
                    ) : (
                        <Typography>Hiện tại không có lịch chiếu</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default ScheduleShowing;
