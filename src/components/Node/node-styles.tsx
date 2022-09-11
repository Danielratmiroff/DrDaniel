import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  square: {
    height: "15px",
    padding: 0,
    margin: 0,
    width: "15px",
    display: "inline-block",
  },
  free: {
    background: "grey",
  },
  pill: {
    background: "black",
  },
  virus: {
    background: "red",
  },
}));
