import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {pxToRem} from '../utils/theme';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputBase, InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'; 
const useStyles = makeStyles({
    root:{
        height:pxToRem(43),
        width: pxToRem(102),
        fontSize: pxToRem(20),
        border:`${pxToRem(1)} solid #97A1A9`,
        borderRadius: pxToRem(10),
        color:'#97A1A9',        
        textTransform:'none',
        minWidth:pxToRem(102),
        padding: `${pxToRem(11)} ${pxToRem(10)}`,
        marginLeft:pxToRem(18)
        },
    icon:{
        height:pxToRem(20),
        width:pxToRem(20)               
    },
    startIcon:{
        margin:`0 ${pxToRem(10)} 0 ${pxToRem(0)}`,
        padding:'0'
    },
    inputFields:{
        direction:'flex'
      },
      editModal:{
          minWidth:pxToRem(600),
          maxWidth:pxToRem(600),
          minHeight:pxToRem(520),
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
      
      container:{         
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
          width:pxToRem(310),
          height:pxToRem(45),
          color:'#FFFFFF',
          fontSize: pxToRem(20),
          borderRadius:pxToRem(10),
          backgroundColor:'#283A46',
          border:`${pxToRem(1)} solid #356680`
        },
        textArea:{
          padding:`0 ${pxToRem(15)}`,       
          width:pxToRem(310),
          minHeight:pxToRem(190),
          maxHeight:pxToRem(190),
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
          width:pxToRem(180),
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
  
      save:{
          padding:0,
          color:'#FFFFFF',
          backgroundColor:'#14AFF1',
          border:`${pxToRem(1)} solid #14AFF1`,
          borderRadius:pxToRem(10),
          minWidth:pxToRem(82),
          height:pxToRem(45),
          marginLeft:`${pxToRem(30)}`,
          textTransform:'none',
          fontSize:pxToRem(20)
      },
      reset:{
          padding:'0 0',
          border:`${pxToRem(1)} solid #14AFF1`,
          color:'#FFFFFF',
          minWidth:pxToRem(92),
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
        }
  })


function EditButton() {

    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState({docId:'',totalOpenAmount:'',notes:''});

    const handleClickOpen = () => {
        setOpen(true);
      };
    
        const handleClose = () => {
        setOpen(false);
      };

      const handleSubmit = (e) => {
        console.log(details)
        axios.post('http://localhost:8080/1806341/editData', details)
          .then(function (response) {
              console.log(response)
          })
          .catch(function (error) {
              console.log(error)
          })
          setOpen(false);
        };    
    const classes = useStyles();
    return (
        <div className={classes.div}>
            <Button variant="outlined" onClick={handleClickOpen} classes={{root:classes.root,startIcon:classes.startIcon}} startIcon={<EditIcon  className={classes.icon}/>}>Edit</Button>
        
        <Dialog                    
            open={open}            
            aria-labelledby="responsive-dialog-title" classes={{paper:classes.editModal}}
        >
        <DialogTitle className={classes.title} id="responsive-dialog-title"><span style={{fontSize: pxToRem(20)}}>Edit Invoice</span>
        <IconButton onClick={handleClose} className={classes.iconButton} >
            <CloseIcon className={classes.closeIcon}  />
        </IconButton>
        </DialogTitle>
        <DialogContent className={classes.container} >                    
           

                <div className={classes.fieldContainer}>
                    <InputLabel className={classes.labels}>Invoice Amount</InputLabel>
                    <InputBase  classes={{input:classes.input}} value={details.totalOpenAmount}
                        onChange={e => setDetails({...details,totalOpenAmount:e.target.value})}/>
                </div>           
            
            <div className={classes.fieldContainer}>
                <InputLabel className={classes.labels}>Notes</InputLabel>
                <InputBase multiline classes={{input:classes.textArea,multiline:classes.multiline}} value={details.notes}
                    onChange={e => setDetails({...details,notes:e.target.value})}/>
                </div>                      
                                    
        </DialogContent> 
        <DialogActions classes={{root:classes.footer}} >
            <Button  variant="outlined" classes={{root:classes.cancel}} onClick={handleClose}>
                Cancel
            </Button>                    
        <div >  
        <Button variant="outlined"   classes={{root:classes.reset}} >
                Reset
            </Button>
            <Button type="submit" onSubmit={handleSubmit} variant="contained" disableElevation classes={{root:classes.save}} >
                Save
            </Button>                    
        </div>    
       </DialogActions>
     </Dialog>
     
    </div>

)
}

export default EditButton
