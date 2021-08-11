import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {pxToRem} from '../utils/theme';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import './Addbtn.css'
import {callAddInvoice} from '../services/services'
import { useSelector, useDispatch } from 'react-redux';
import {getSearch, changeRow, startCount} from '../actions/rowAction';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
    add:{
        height:pxToRem(43),
        width: pxToRem(99),
        fontSize: pxToRem(20),
        border:`${pxToRem(1)} solid #14AFF1`,
        borderRadius: pxToRem(10),
        color:'#FFFFFF',        
        textTransform:'none',
        minWidth:pxToRem(99),
        padding: `${pxToRem(11)} ${pxToRem(18)}`,        
        },
    icon:{
        height:pxToRem(20),
        width:pxToRem(20)               
    },
    startIcon:{
        margin:`0 ${pxToRem(5)} 0 ${pxToRem(-5)}`,
        padding:'0'
    },
    inputFields:{
      direction:'flex'
    },
    addModal:{
        minWidth:pxToRem(1206),
        maxWidth:pxToRem(1206),
        minHeight:pxToRem(509),
        backgroundColor:'#2A3E4C',
        borderRadius:pxToRem(10),
        boxShadow:'none' ,
        margin:0  
    },
    title:{
        borderBottom:`${pxToRem(1)} solid #1A262F`,
        padding:pxToRem(30),
        color:'white'
    },
    left:{
        display:'flex',
        flexDirection:'column'   
    },
    right:{
        display:'flex',        
        flexDirection:'column',
        paddingLeft:pxToRem(80)        
    },
    container:{
        display:'flex',
        flexDirection:'row',
        padding:`${pxToRem(30)} ${pxToRem(30)} 0  ${pxToRem(30)}`,
        borderBottom:`${pxToRem(1)} solid #1A262F`,
        overflow:"hidden"
    },
    fieldContainer:{
        display:'flex',
        flexDirection:'row',      
        paddingBottom:pxToRem(28)
    },
    input: {
        padding:`0 ${pxToRem(15)}`,       
        width:pxToRem(300),
        height:pxToRem(45),
        color:'#FFFFFF',
        fontSize: pxToRem(16),
        letterSpacing: pxToRem(1),
        borderRadius:pxToRem(10),
        backgroundColor:'#283A46',
        border:`${pxToRem(1)} solid #356680`
      },
      textArea:{
        padding:`0 ${pxToRem(15)}`,       
        width:pxToRem(300),
        minHeight:pxToRem(195),
        maxHeight:pxToRem(195),
        color:'#FFFFFF',
        fontSize: pxToRem(20),
        border:`${pxToRem(1)} solid #356680`,
        borderRadius:pxToRem(10),
        backgroundColor:'#283A46',
        
      },  
      multiline:{
          padding:0,
          
      },
    labels:{        
        width:pxToRem(185),
        paddingTop:pxToRem(10),
        paddingRight:pxToRem(15),
        fontSize:pxToRem(20),
        color:'#97A1A9'
    },
    footer:{
        display:'flex',
        justifyContent:'space-between',
        padding:`${pxToRem(25)} ${pxToRem(30)}`
    },
    cancel:{
        padding:0,
        marginLeft:pxToRem(20),
        color:'#14AFF1',
        minWidth:pxToRem(77),
        height:pxToRem(45),
        textTransform:'none',
        fontSize:pxToRem(20),
        border: "none",
    },

    footerAdd:{
        padding:0,
        color:'#FFFFFF',
        backgroundColor:'#14AFF1',
        border:`${pxToRem(1)} solid #14AFF1`,
        borderRadius:pxToRem(10),
        minWidth:pxToRem(77),
        height:pxToRem(45),
        marginLeft:`${pxToRem(30)}`,
        textTransform:'none',
        fontSize:pxToRem(20)
    },
    clear:{
        padding:'0 0',
        border:`${pxToRem(1)} solid #14AFF1`,
        color:'#FFFFFF',
        minWidth:pxToRem(87),
        height:pxToRem(45),
        textTransform:'none',        
        borderRadius:pxToRem(10),
        fontSize:pxToRem(20),
        borderColor:'#14AFF1'
    },
    iconButton: {
        padding:0,
        float:'right'    
      },
    closeIcon: {
          color:'#97A1A9',
          fontSize: pxToRem(24)
      },
    span:{
        color:"#FF5B5B"
    }
})

function AddButton() {
    
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState({});
    const [nameCustomer, setNameCustomer] = React.useState("");
    const [numberCustomer, setNumberCustomer] = React.useState("");
    const [invoiceNumber, setInvoiceNumber] = React.useState("");
    const [openAmount, setOpenAmount] = React.useState("");
    const [dueInDate, setDueInDate] = React.useState("");
    const [note, setNote] = React.useState("");
    const [snackOpen, setSnackOpen] = React.useState(false);

    const dispatch = useDispatch();  

    const setPage = data => dispatch(startCount(data))
    const setRows = data => dispatch(changeRow(data));
    const setSearch = data => dispatch(getSearch(data));

    const defaultTheme = createMuiTheme();

    const theme = createMuiTheme({
      overrides: {
        MuiInput: {
            input: {
                padding:`0 ${pxToRem(15)}`,       
                width:pxToRem(300),
                height:pxToRem(45),
                color:'#FFFFFF',
                fontSize: pxToRem(16),
                letterSpacing: pxToRem(1),
                borderRadius:pxToRem(10),
                backgroundColor:'#283A46',
                border:`${pxToRem(1)} solid #356680`
            },
            inputMultiline: {
                padding:`15px ${pxToRem(15)}`,       
                width:pxToRem(300),
                height:pxToRem(125),
                color:'#FFFFFF',
                fontSize: pxToRem(16),
                letterSpacing: pxToRem(1),
                borderRadius:pxToRem(10),
                backgroundColor:'#283A46',
                border:`${pxToRem(1)} solid #356680`
            },
            underline: {
                "&&&:before": {
                  borderBottom: "none"
                },
                "&&:after": {
                  borderBottom: "none"
                }
            }
        }
      }
    });


    const handleSubmit = () => {
        

        var result = Object.keys(details).find(key=> (details[key] === '' ||
        details[key] === null))

        if( Object.keys(details).length < 5 || result !== undefined){
                console.log("add has problems")
                setSnackOpen(true);
            }
        
        else{

            var today = new Date()
            const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            console.log(date)

            details.docCreateDate = `${date}`
            console.log(details)

            callAddInvoice(details)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })

            setPage(0)
            setRows([])
            setSearch(details.docID)
            setDetails({})
            setOpen(false)
            setSnackOpen(false)
        }
        
    }    


    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);

    };

    const handleClear = () =>{
        setDetails({})
        setDueInDate("")
        setInvoiceNumber("")
        setNameCustomer("")
        setNote("")
        setNumberCustomer("")
        setOpenAmount("")
    }

    const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
      };
  
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={defaultTheme}>
        <div>
            <Button variant="outlined" classes={{root:classes.add,startIcon:classes.startIcon}} onClick={handleClickOpen} startIcon={<AddIcon className={classes.icon}/>}>                Add
            </Button>
                <Dialog                    
                    open={open}            
                    aria-labelledby="responsive-dialog-title" classes={{paper:classes.addModal}}
                >
                <DialogTitle className={classes.title} id="responsive-dialog-title"><span style={{fontSize: pxToRem(20)}}>Add Invoice</span> 
                <IconButton onClick={handleClose} className={classes.iconButton} aria-label="search">
                    <CloseIcon className={classes.closeIcon}  />
                </IconButton>
                </DialogTitle>
                <DialogContent className={classes.container} >                    
                    <div className={classes.left}>
                        <div className={classes.fieldContainer}>
                            <InputLabel className={classes.labels}>Customer Name <span className={classes.span}>*</span></InputLabel>
                           <MuiThemeProvider theme={theme}>
                            <TextField  id = "custName" value={nameCustomer}
                                onChange={e => {setDetails({...details,custName:e.target.value})
                                                setNameCustomer(e.target.value)}}
                                required
                                />
                            </MuiThemeProvider>
                        </div>

                        <div className={classes.fieldContainer}>
                            <InputLabel className={classes.labels}>Customer No. <span className={classes.span}>*</span></InputLabel>
                            <MuiThemeProvider theme={theme}>
                            <TextField value={numberCustomer}
                                onChange={e => {setDetails({...details,custID:e.target.value})
                                                setNumberCustomer(e.target.value)}} 
                                required/>
                            </MuiThemeProvider>
                        </div>

                        <div className={classes.fieldContainer}>
                            <InputLabel className={classes.labels}>Invoice No. <span className={classes.span}>*</span></InputLabel>
                            <MuiThemeProvider theme={theme}>
                            <TextField value={invoiceNumber}
                                onChange={e => {setDetails({...details,docID:e.target.value})
                                                setInvoiceNumber(e.target.value)}}
                                required />
                            </MuiThemeProvider>
                        </div>

                        <div className={classes.fieldContainer}>
                            <InputLabel className={classes.labels}>Invoice Amount <span className={classes.span}>*</span></InputLabel>
                            <MuiThemeProvider theme={theme}>
                            <TextField value={openAmount}
                                onChange={e => {setDetails({...details,invoiceAmount:e.target.value})
                                                setOpenAmount(e.target.value)}}
                                required
                                />
                            </MuiThemeProvider>
                        </div>
                        
                    </div>
                    <div className={classes.right}>
                    <div className={classes.fieldContainer}>
                        <InputLabel  className={classes.labels}>Due Date <span className={classes.span}>*</span></InputLabel>
                        <MuiThemeProvider theme={theme}>
                        <TextField type="date" value={dueInDate}
                            onChange={e => {setDetails({...details,dueDate:e.target.value})                        
                                            setDueInDate(e.target.value)}}
                            required />
                        </MuiThemeProvider>
                    </div>
                    
                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.labels}>Notes</InputLabel>
                        <MuiThemeProvider theme={theme}>
                        <TextField multiline rows={25} value={note}
                            onChange={e => {setDetails({...details,notes:e.target.value})
                                            setNote(e.target.value)}}/>
                        </MuiThemeProvider>
                        </div>
                    </div>  
                                 
                                            
                </DialogContent> 
                <DialogActions classes={{root:classes.footer}} >
                    <Button  variant="outlined" classes={{root:classes.cancel}} onClick={handleClose}>
                        Cancel
                    </Button>                    
                <div >  
                <Button variant="outlined"   classes={{root:classes.clear}} onClick={handleClear}>
                        Clear
                    </Button>
                    <Button type="submit" variant="contained" disableElevation onClick={handleSubmit} classes={{root:classes.footerAdd}} >
                        Add
                    </Button>
                    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={closeSnack}>
                        hello!
                    </Snackbar>                    
                </div>    
                </DialogActions>
            </Dialog>
            
    </div>
    </MuiThemeProvider>
    )
}

export default AddButton
