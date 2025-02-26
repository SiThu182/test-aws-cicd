import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "../../redux/slice/UserSlice";

function Currency() {
  const { country } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    localStorage.setItem("country_status", 1);

 
    //   dispatch(setCountry(country));
    // setAge(event.target.value);
    dispatch(setCountry(event.target.value));
  };
const menuItems = ['MMK', 'USD', 'AUD',,"THB","SGD","NZD"];

  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="h6"
        sx={{
          color: "black",
          my: "auto",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        Currency
        {/* {country !== "Myanmar" ? country : 'MMK'} */}
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        {/* <InputLabel id="demo-simple-select-autowidth-label">Currency</InputLabel> */}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={country}
          onChange={handleChange}
          autoWidth
          // label="currency"
          size="sm"
        >
          {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
          {/* <MenuItem value="Myanmar">MMK</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="AUD">AUD</MenuItem> */}
          {menuItems.map((item, index) => (
                          <MenuItem key={index} value={item.split(' ')[0]}>
                            {item}
                          </MenuItem>
                        ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Currency;
