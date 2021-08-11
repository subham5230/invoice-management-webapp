import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core";
import { callInfiniteScroll } from "../services/services";
import { useSelector, useDispatch } from 'react-redux';
import {getSearch, moreData, changeRow, startCount, visited} from '../actions/rowAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputHolder: {
    color: "#FFFFFF",
    textTransform: "capitalize",
    fontSize: "20px",
    backgroundColor: "#283A46",
    textTransform: "capitalize",
    border: "0.1rem solid #356680",
    borderRadius: "1rem",
    padding: "0.2rem 1.5rem 0.2rem 1.5rem"
  },
  search: {
    fontSize: "2.5rem",
    color: "#c6ced4",
    padding: "0rem",
  },
  input: {
    fontSize: "20px",
    color: "#c6ced4",
    padding: "0rem",
    fontFamily: "Ubuntu",
  },
}));

const SearchBar = (props) => {
    const classes = useStyles();
    const searchVal = useSelector((state) => state.searchVal)
    const page =  useSelector((state) => state.count)
    const rows = useSelector((state) => state.rows);
    const sortOrder = useSelector((state) => state.sortOrder);
    const sortBy = useSelector((state) => state.sortBy);
    
    const dispatch = useDispatch();  

    const setPage = data => dispatch(startCount(data))
    const setRows = data => dispatch(changeRow(data));
    const setSearch = data => dispatch(getSearch(data));
    const setHasMore = data => dispatch(moreData(data))
    const setVisited = data => dispatch(visited(data))

    const { disabled } = props;

    useEffect(() => {
      console.log("starting useEffect()");
      console.log(rows);
      console.log(searchVal)
      callInfiniteScroll(page, searchVal, sortOrder, sortBy)
        .then((res) => {
          setRows([...rows, ...res.data.resData]);
          setHasMore(true);
          console.log(res.data.resData);
          console.log("ending useEffect()");
        })
        .catch((err) => console.log(err));
    }, [page, searchVal, sortOrder, sortBy]);

    const onChange = (event) => {
      setSearch(event.target.value)
      setRows([])
      setPage(0)
      setVisited(false)
      console.log(event.target.value);
    };

  return (
    <div className={classes.root}>
      <Paper component="form" className={classes.inputHolder} elevation={0}>
        <div style={{display: "flex"}}>
          <InputBase
            className={classes.input}
            placeholder="Search by Invoice Number"
            disabled={disabled}
            onChange={onChange}
            value={searchVal}
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            style={{paddingTop: "0"}}
          />
          <SearchIcon className={classes.search} style={{marginTop: "6px"}}/>
        </div>
          
      </Paper>
    </div>
  );
};

export default SearchBar;
