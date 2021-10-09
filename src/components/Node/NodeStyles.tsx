import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  free: {
    background: "grey",
  },
  taken: {
    background: "black",
  },
}));
