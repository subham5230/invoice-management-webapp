import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import {changeRow, selectRow} from '../actions/rowAction'
import {callPredict} from '../services/services'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    fontSize: "2rem",
    padding: "0.3rem 1.5rem",
    color: "#FFFFFF",
    backgroundColor: "#14AFF1",
    textTransform: "capitalize",
    border: "0.1rem solid #14AFF1",
    borderRadius: "1rem",
    fontFamily: "Ubuntu",

    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#14AFF1",
    },
  },

  btnDisabled: {
    fontSize: "2rem",
    padding: "0.3rem 1.5rem",
    color: "#FFFFFF",
    backgroundColor: "#97A1A9",
    textTransform: "capitalize",
    border: "0.1rem solid #97A1A9",
    borderRadius: "1rem",
    fontFamily: "Ubuntu",
  }
}));
const PredictBtn = () => {
  const [isActive, setIsActive] = React.useState(false);
  const selected = useSelector((state) => state.selectedRows);
  const row = useSelector((state) => state.rows)

  const dispatch = useDispatch();

  const setRow = (data) => dispatch(changeRow(data))
  const setSelected = (data) => dispatch(selectRow(data))

  React.useEffect(()=>{
    if (selected !== []){
      setIsActive(true);
    }
  }, [selected])

  const onClick = () => {
    callPredict(selected)
    .then((res) => {
      console.log(res.data.resData);

      let newRow = row.map(rowElement  => { 
        let idx = res.data.resData.findIndex(resElement => resElement.docID === rowElement.docID) 
        console.log(idx)
        if(idx!=-1){
          rowElement.predDate = res.data.resData[idx].predictedDate
          rowElement.agingBucket = res.data.resData[idx].predAgingBucket
        }

        return rowElement
      });

      setRow(newRow)
      setSelected([])
    })
    .catch((err) => console.log(err));
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained" className={isActive===true? classes.btn: classes.btnDisabled} disableElevation onClick={onClick}>
        Predict
      </Button>
    </div>
  );
};

export default PredictBtn;
