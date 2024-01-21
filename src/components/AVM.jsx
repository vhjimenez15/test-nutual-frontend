import { useEffect, useState } from "react";
import ActionAreaCard from "./card";
import Grid from "@mui/material/Grid";
import { get } from "../apirest";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  "Content-Type": "application/json",
};

/* eslint-disable react/prop-types */
function ListAllAVMResults({ avms }) {
  return (
    <Grid container spacing={2}>
      {avms.map((item) => (
        <Grid item key={item.id} xs={6} md={3}>
          <ActionAreaCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

function NoListAllAVMResults() {
  return <p>No se encontraron resultados</p>;
}

export function ListAllAVM() {
  const [data, setData] = useState([]);

  const searchAVM = async () => {
    const response = await get("avm/list", headers);
    if (response.status === 200) {
      setData(response.data.data);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    searchAVM();
  }, []);

  const hastData = data?.length > 0;
  return hastData ? <ListAllAVMResults avms={data} /> : <NoListAllAVMResults />;
}
