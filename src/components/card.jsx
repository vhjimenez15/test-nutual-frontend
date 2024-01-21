/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import house from "../../public/casa-bonita.jpg";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Modal from "./modal";
import { DialogContent } from "@mui/material";

export default function ActionAreaCard({ item }) {
  const [open, setOpen] = useState("");
  return (
    <>
      <Card sx={{ maxWidth: "100%" }} onClick={() => setOpen(true)}>
        <CardActionArea>
          <CardMedia component="img" height="400" image={house} alt="house" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Address:</strong> {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>City:</strong> {item.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total price:</strong> {item.total_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total area:</strong> {item.total_area}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && (
        <Modal
          title="Visualizar"
          title_accion="Cerrar"
          open={open}
          setOpen={setOpen}
          accion={() => setOpen(false)}
          size="sm"
        >
          <DialogContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  height="400"
                  image={house}
                  alt="house"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {item.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>City:</strong> {item.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Total price:</strong> {item.total_price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Has elevator:</strong>{" "}
                    {item.has_elevator ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Latitude:</strong> {item.latitude}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Longitude:</strong> {item.longitude}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price m2:</strong> {item.price_m2}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Total area:</strong> {item.total_area}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Valuation date:</strong> {item.valuation_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Year of construction:</strong>{" "}
                    {item.year_of_construction}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Year of renovation:</strong>{" "}
                    {item.year_of_renovation}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </DialogContent>
        </Modal>
      )}
    </>
  );
}
