import React, { useState, useEffect } from "react";
// import { Calendar } from "@mui/material";
import { TextField } from "@mui/material";

const TimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
    setTime(new Date());
  }, []);

  const handleChangeDate = (date) => {
    setDate(date);
  };

  const handleChangeTime = (time) => {
    setTime(time);
  };

  return (
    <div>
      <h1>This is time picker</h1>
      {/* <Calendar
        value={date}
        onChange={handleChangeDate}
        showTodayButton={false}
        disableKeyboardNavigation={true}
      /> */}
      <TextField
        label="Time"
        value={time}
        type="time"
        onChange={handleChangeTime}
      />
    </div>
  );
};

export default TimePicker;