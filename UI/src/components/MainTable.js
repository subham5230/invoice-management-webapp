import React, { useEffect} from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import { callInfiniteScroll } from "../services/services";
import { useSelector, useDispatch } from 'react-redux';
import { formatter } from "../utils/formatter";
import {changeRow, selectRow, startCount, moreData, doSort, orderBy, getData, visited} from '../actions/rowAction';
import "./table.css";

const headCells = [
  { id: 'custName', width: "10%", label: 'Customer Name' },
  { id: 'custID', width: "10%",label: 'Customer #' },
  { id: 'docID',  width: "10%",label: 'Invoice #' },
  { id: 'invoiceAmount', width: "10%",label: 'Invoice Amount' },
  { id: 'dueDate', width: "10%",label: 'Due Date' },
  { id: 'predDate',width: "17%",label: 'Predicted Payment Date'},
  { id: 'agingBucket',width: "16%",label: 'Predicted Aging Bucket'},
  { id: 'Notes',width: "11%",label: 'Notes'},
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount} = props;

  const sortOrder = useSelector((state) => state.sortOrder);
  const sortBy = useSelector((state) => state.sortBy);

  const dispatch = useDispatch();

  const setSortOrder = data => dispatch(doSort(data));
  const setSortBy = data => dispatch(orderBy(data));
  const setRows = data => dispatch(changeRow(data));
  const setCount = data => dispatch(startCount(data));
  
  const onClickInvoiceAmount = () => {

      setRows([])
      setCount(0)

      if (sortBy === "dueDate" && sortOrder===1){
        setSortBy("invoiceAmount")
        console.log("changed")
        console.log("sort order:" + sortOrder)
      }

      else if (sortBy === "dueDate" && sortOrder===2){

        setSortBy("invoiceAmount")
        setSortOrder(1)
        console.log("sort order:" + sortOrder)
      }

      else{

        setSortBy("invoiceAmount")
        console.log("sort order:" + sortOrder)

        if(sortOrder === 0){
          setSortOrder(1)
        }
        else if (sortOrder === 1){
          setSortOrder(2)
        }
        else{
          setSortOrder(0)
          setSortBy("")
        }
    }
    
  }

  const onClickDueDate = () => {

    setRows([])
    setCount(0)

    if (sortBy === "invoiceAmount" && sortOrder===1){
      setSortBy("dueDate")
      console.log("changed")
      console.log("sort order:" + sortOrder)
    }

    else if (sortBy === "invoiceAmount" && sortOrder===2){

      setSortBy("dueDate")
      setSortOrder(1)
      console.log("sort order:" + sortOrder)
    }

    else{

      setSortBy("dueDate")
      console.log("sort order:" + sortOrder)

      if(sortOrder === 0){
        setSortOrder(1)
      }
      else if (sortOrder === 1){
        setSortOrder(2)
      }
      else{
        setSortOrder(0)
        setSortBy("")
      }
    }
  }

  return (

    <TableHead>
      <TableRow id = "titles">
        <TableCell padding="checkbox" style={{width: "3%"}}>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            style={{color:'#97a1a9', padding:'0 0 0 4px', transform: "scale(1.4)"}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            style={(()=>{
              if (headCell.id === 'predDate'){
                return(
                  {padding: '16px 45px 16px 0', width:headCell.width}
                )
              }
              else if (headCell.id === 'agingBucket'){
                return(
                  {padding: '16px 0 16px 45px', width:headCell.width}
                )
              }
              else{
                return(
                  {padding: '16px 0 16px 0', width:headCell.width}
                )
              }
            })()}
           >
           {(() => {
             if (headCell.id === 'invoiceAmount'){
               return(
                  <a style ={{display: "flex", justifyContent:"flex-end"}} onClick={onClickInvoiceAmount}><span style={{paddingTop: "8px"}}>{headCell.label}</span> {
                    (() =>{
                      if(sortOrder === 1 && sortBy === "invoiceAmount"){
                        return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "white"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                          </span>
                        )
                      }
                      else if (sortOrder === 2 && sortBy === "invoiceAmount"){
                        return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "white"}}/></p>
                          </span>
                          )
                      }
                      else{
                        return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                          </span>
                        )
                      }
                    })()
                  }</a>
               )
             }
             else if (headCell.id === 'dueDate'){
               return(
                 <a style ={{display: "flex", justifyContent: "flex-end"}} onClick = {onClickDueDate}><span style={{paddingTop: "8px"}}>{headCell.label}</span> {
                  (() =>{
                     if(sortOrder === 1 && sortBy === "dueDate"){
                       return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "white"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                          </span>
                       )
                     }
                     else if (sortOrder === 2 && sortBy === "dueDate"){
                       return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "white"}}/></p>
                          </span>
                       )
                     }
                     else{
                       return(
                          <span>
                            <p style={{marginTop: "0px", paddingLeft:"2px"}}><ArrowDropUpIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                            <p style={{marginTop: "-16px", paddingLeft:"2px"}}><ArrowDropDownIcon style={{fontSize:"22px", color: "#727a82"}}/></p>
                          </span>
                       )
                     }
                   })()
                 }</a>
               )
             }
             else if(headCell.id === "predDate"){
                 return(
                   <div style={{textAlign: "right"}}>{headCell.label}</div>
                 )
             }
             else{
                return(
                  headCell.label
                )
               }
             }
           )()}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();

  const page =  useSelector((state) => state.count)
  const rows = useSelector((state) => state.rows);
  const selected = useSelector((state) => state.selectedRows);
  const searchVal = useSelector((state) => state.searchVal);
  const hasMore = useSelector((state) => state.hasMore);
  const sortOrder = useSelector((state) => state.sortOrder);
  const sortBy = useSelector((state) => state.sortBy);
  const gotData = useSelector((state) => state.gotData);
  const visit = useSelector((state) => state.visited);

  const dispatch = useDispatch();

  const setRows = data => dispatch(changeRow(data));
  const setSelected = data => dispatch(selectRow(data));
  const setPage = data => dispatch(startCount(data));
  const setHasMore = data => dispatch(moreData(data));
  const setGotData = data =>dispatch(getData(data));
  const setVisited = data => dispatch(visited(data))

  useEffect(() => {
    console.log("starting useEffect()");
    console.log(rows);
    console.log(searchVal)
    callInfiniteScroll(page, searchVal, sortOrder, sortBy)
      .then((res) => {
        setRows([...rows, ...res.data.resData]);
        setHasMore(true)
        setGotData(true)
        if((res.data.resData.length === 0 && visit === false)|| isNaN(searchVal)){
          console.log("No data available!")
          setGotData(false)
        }
        if (res.data.resData.length < 20){
          console.log("rows over!")
          setHasMore(false)
        }
        if(res.data.resData.length > 0){
          setVisited(true)
        }
        console.log(res.data.resData);
        console.log("ending useEffect()");
      })
      .catch((err) => console.log(err));
  }, [page, searchVal, sortOrder, sortBy]);


  const fetchMoreData = () => {
    setPage(page + 20)
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected([...rows]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex(element => element.docID === row.docID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (row) => selected.findIndex(element => element.docID === row.docID) !== -1;

  const defaultTheme = createMuiTheme();

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1.5rem",
          color: "white",
          backgroundColor: "#202020"
        },

        tooltipPlacementRight: {
          margin: "0 50px 0 -50px",
          "@media (min-width: 600px)":{
            margin: "70px 150px 0 -150px"
          }
        },

        tooltipPlacementBottom: {
          margin: "0 50px 0 -50px",
          "@media (min-width: 600px)":{
            margin: "-15px -60px 0 60px"
          }
        },
      }
    }
});

  const theme2 = createMuiTheme({
    overrides: {
      MuiSvgIcon: {
        root: {
          fontSize: "150px",
          color: "#ec3838a6",
          paddingTop:"14rem",
        }
      },

      MuiCircularProgress: {
        colorPrimary: {
          color: "#14AFF1",
        }
      }
    }
  })

  const emptyData = () => {

    if(gotData === false){
      return(
        <MuiThemeProvider theme={theme2}>
        <div style={{textAlign: "center"}}>
          <ErrorOutlineOutlinedIcon />
          <p style={{color: "#c5ced6", fontSize:"2rem", paddingTop:"2rem"}}>No results found for your query!</p>
        </div>
        </MuiThemeProvider>
      );
    }

    else{
      return(
        <MuiThemeProvider theme={defaultTheme}>

          <InfiniteScroll
              dataLength={rows.length}
              scrollableTarget="scrollableTableBody"
              next={fetchMoreData}
              hasMore={hasMore}
              style={{overflow:"unset"}}
              loader={
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <MuiThemeProvider theme={theme2}>
                  <CircularProgress
                    color = "primary"
                    style={{ fontSize: "10px" }}
                  />
                  </MuiThemeProvider>
                </div>
              }
            >
            <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            stickyHeader
            style={{padding: 0}} 
          >
          <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              rowCount = {rows.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {rows.map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      id="data"
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          style = {{color: '#97a1a9', transform: "scale(1.4)" }}
                        />
                      </TableCell>

                      <MuiThemeProvider theme={theme}>
                        <Tooltip title={row.custName} placement="right">
                          <TableCell component="th" id={labelId} scope="row" padding="none" style={{maxWidth:"100px", overflow: "hidden", paddingRight:"48px", margin: "0", whiteSpace: "nowrap", textOverflow:"ellipsis"}}>
                          {row.custName?row.custName:"---"}
                          </TableCell>
                        </Tooltip>
                      </MuiThemeProvider>
                      
                      <TableCell style={{margin: "0"}}>{row.custID?row.custID:"--"}</TableCell>
                      <TableCell style={{margin: "0"}}>{row.docID}</TableCell>
                      <TableCell style={{textAlign:"right", paddingRight: "12px"}}>{formatter(row.invoiceAmount)}</TableCell>
                      <TableCell style={{textAlign:"right", paddingRight: "6px"}}>{row.dueDate?row.dueDate:"--"}</TableCell>
                      <TableCell style={{textAlign:"right", paddingRight:"45px"}}>{row.predDate?row.predDate:"--"}</TableCell>
                      <TableCell style={{paddingLeft: "45px"}}>{row.agingBucket?row.agingBucket:"--"}</TableCell>
                      
                      <MuiThemeProvider theme={theme}>
                        <Tooltip title={row.notes} placement="bottom">
                          <TableCell style={{maxWidth:"150px", overflow: "hidden", paddingRight:"12px", margin: "0", whiteSpace: "nowrap", textOverflow:"ellipsis"}}>{row.notes?row.notes:"--"}</TableCell>
                        </Tooltip>
                      </MuiThemeProvider>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          </InfiniteScroll>


        </MuiThemeProvider>

      );
    }

  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} id="paper">
        <TableContainer id="scrollableTableBody">
          {emptyData()}
        </TableContainer>
      </Paper>
    </div>
  );
}
