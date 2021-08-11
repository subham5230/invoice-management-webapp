import React from 'react';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import {pxToRem} from '../utils/theme';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles({
    root:{
        height:pxToRem(43),
        width: pxToRem(123),
        fontSize: pxToRem(20),
        border:`${pxToRem(1)} solid #97A1A9`,
        borderRadius: pxToRem(10),
        color:'#97A1A9',        
        textTransform:'none',
        minWidth:pxToRem(123),
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
    deleteModal:{
        minWidth:pxToRem(620),
        maxWidth:pxToRem(620),
        minHeight:pxToRem(360),
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
        padding:`${pxToRem(30)} ${pxToRem(30)}`,
        borderBottom:`${pxToRem(1)} solid #1A262F`,
        fontSize: pxToRem(18),
        overflow:"hidden",
        color:'#C0C6CA'
    },
    footer:{
        display:'flex',
        justifyContent:'flex-end',
        padding:`${pxToRem(25)} ${pxToRem(30)}`
    },
    delete:{
        padding:0,
        color:'#FFFFFF',
        backgroundColor:'#14AFF1',
        border:`${pxToRem(1)} solid #14AFF1`,
        borderRadius:pxToRem(10),
        minWidth:pxToRem(101),
        height:pxToRem(45),
        marginLeft:`${pxToRem(30)}`,
        textTransform:'none',
        fontSize:pxToRem(20)
    },
    cancel:{
        padding:0,
        border:`${pxToRem(1)} solid #14AFF1`,
        color:'#FFFFFF',
        minWidth:pxToRem(100),
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
          color:'#FF5E5E'
      }

})

function DeleteButton() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
        const handleClose = () => {
        setOpen(false);
      };
    const classes = useStyles();
    return (
        <div className={classes.div}>
            <Button variant="outlined" onClick={handleClickOpen} classes={{root:classes.root,startIcon:classes.startIcon}} startIcon={<RemoveIcon className={classes.icon}/>}>Delete</Button>
            <Dialog                    
            open={open}            
            aria-labelledby="responsive-dialog-title" classes={{paper:classes.deleteModal}}
        >
                <DialogTitle className={classes.title} id="responsive-dialog-title"><span style={{fontSize: pxToRem(24)}}>Delete Record(s)?</span> 
                    <IconButton onClick={handleClose} className={classes.iconButton} >
                        <CloseIcon className={classes.closeIcon}  />
                    </IconButton>
                </DialogTitle>
        <DialogContent className={classes.container} >
            You'll lose your record(s) after this action. We can't recover them once you delete.<br></br><br></br>Are you sure you want to <span className={classes.span}>permanently delete</span> them?  
        </DialogContent> 
        <DialogActions classes={{root:classes.footer}} >
                             
            <div >  
                <Button variant="outlined" onClick={handleClose}  classes={{root:classes.cancel}} >
                    Cancel
                </Button>
                <Button type="submit"  variant="contained" disableElevation classes={{root:classes.delete}} >
                    Delete
                </Button>                    
            </div>    
       </DialogActions>
     </Dialog>
        
        </div>
    )
}

export default DeleteButton
