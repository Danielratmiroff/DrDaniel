import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: "lightblue",
    display: "inline-block",
    margin: "auto",
  },
  row: {
    display: "inline-block",
    width: "20px",
    height: "20px",
  },
  column: {},
}));
