// import { useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { get } from "../apirest";
import ActionAreaCard from "./card";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
};

export function M2List() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [promArea, setPromArea] = useState(0);
  const handleChange = (event) => {
    if (event.target.id === "inputM2") {
      setSearch(event.target.value);
    }
  };

  const searchM2 = async () => {
    const response = await get(`avm/m2?city=${search}`, headers);
    if (response.status === 200) {
      setData(response.data.data.items);
      setPromArea(response.data.data.mean_m2);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <TextField
        id="inputM2"
        label="Write a city"
        size="small"
        value={search}
        onChange={handleChange}
      />
      <Button
        sx={{ color: "white", backgroundColor: "#ff0081" }}
        variant="contained"
        size="medium"
        onClick={() => searchM2()}
      >
        Search
      </Button>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Card variant="outlined" sx={{ backgroundColor: "#1e73be", mt: 2, mb: 2, alignItems: 'center' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, color: "white" }}
              color="text.secondary"
              gutterBottom
            >
              <strong>Mean area:</strong> {promArea}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="body2" color="text.primary"></Typography>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item key={item.id} xs={6} md={3}>
            <ActionAreaCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
