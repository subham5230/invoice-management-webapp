import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import hrcLogo from "../assets/highRadiuslogo.svg";
import abcLogo from "../assets/companyLogo.svg";
import AddBtn from "../components/AddBtn";
import EditBtn from "../components/EditBtn";
import DeleteBtn from "../components/DeleteBtn";
import PredictBtn from "../components/PredictBtn";
import SearchBar from "../components/SearchBar";
import MainTable from "../components/MainTable";
// import InvoiceTable from "../components/table";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "grid",
    gridTemplateRows: "10vh 90vh",
  },
  abcContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  hrcLogo: {
    width: "23.483rem",
    height: "4.95rem",
  },
  abcLogo: {
    width: "4.4rem",
    height: "4.629rem",
  },
  abcText: {
    fontFamily: "sans-serif",
    fontSize: "3.5rem",
    fontWeight: "bold",
    marginLeft: "0.5rem",
  },

  mainHeader: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#ffffff",
    fontSize: "2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: "2rem 2.5rem",
    // backgroundColor: "#c9099f",
  },
  mainGridPanel: {
    padding: "0rem 2.5rem 2.5rem 2.5rem",
    display: " grid",
    gridTemplateRows: "5% 95%",
    // backgroundColor: "#d38c07",
  },
  gridHeader: {
    fontSize: "2.8rem",
    fontFamily: "Ubuntu",
    padding: "0rem",
    color: "#ffffff",
    // backgroundColor: "#27e751",
  },
  gridPanelArea: {
    borderRadius: "1rem",
    padding: "3rem",
    backgroundColor: "#273D49CC",
    // display: "flex",
    // flexDirection: " column",
    display: "grid",
    gridTemplateRows: "10% 90%",
  },
  gridMenu: {
    display: "flex",
    justifyContent: "space-between",
    // padding: "2.5rem",
  },
  tableContainer: {},
  invoiceTable: {},
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.mainHeader}>
        <div className={classes.abcContainer}>
          <img src={abcLogo} className={classes.abcLogo} />
          <div className={classes.abcText}>ABC Products</div>
        </div>
        <div className={classes.hrcContainer}>
          <img src={hrcLogo} className={classes.hrcLogo} />
        </div>
      </div>
      <div className={classes.mainGridPanel}>
        <div className={classes.gridHeader}>Invoice List</div>

        <Paper className={classes.gridPanelArea} elevation={0}>
          <div className={classes.gridMenu}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Grid item>
                <PredictBtn />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
              className={classes.menuRight}
              spacing={2}
            >
              <Grid item>
                <AddBtn />
              </Grid>
              <Grid item>
                <EditBtn />
              </Grid>
              <Grid item>
                <DeleteBtn />
              </Grid>
              <Grid item>
                <SearchBar />
              </Grid>
            </Grid>
          </div>
          <div className={classes.tableContainer}>
            <MainTable className={classes.invoiceTable} />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default LandingPage;
