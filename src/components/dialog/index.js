import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({openText, question, description, handleConfirm}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{marginTop: '1rem'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        {openText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {question}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
                !!description ?
                description:
                null
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
                handleConfirm()
                handleClose()
          }} autoFocus>
            Sim
          </Button>
          <Button onClick={()=>{
                handleClose()
          }} autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}