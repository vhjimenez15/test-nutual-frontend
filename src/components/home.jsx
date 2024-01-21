import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ListAllAVM } from "./AVM";
import { M2List } from "./m2";
import { useState } from "react";

export function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!localStorage.getItem("accessToken")) {
    window.location.href = "/login";
  }

  return (
    <main>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{fontFamily: "sans-serif"}}>
          <h1>Prueba técnica </h1>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab value="1" label="Find All" />
              <Tab value="2" label="Mean Meters " />
            </Tabs>
          </Box>
        </Grid>
        {value === "1" && (
          <Grid item xs={12}>
            <ListAllAVM />
          </Grid>
        )}
        {value === "2" && (
          <Grid item xs={12}>
            <M2List />
          </Grid>
        )}
      </Grid>
    </main>
  );
}
