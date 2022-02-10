import * as React from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogActions} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useReactToPrint } from "react-to-print";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { Ticket } from "./Ticket";
import { Warranty } from './Warranty';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrintOrder({ handleClose, open, printRow, ready, currData, lastOrder}) {
    
    const componentRef = React.useRef(null);
    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        removeAfterPrint: true,
        onBeforePrint: handleClose
    });



    return (
        <>

            <Dialog
                maxWidth={'md'}
                fullWidth
                // fullScreen
                // maxWidth='lg'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                scroll='body'
                
            >
                
                
                
                <AppBar sx={{ position: 'relative' }} color={ready ? 'success' : 'secondary'}>
                    <Toolbar variant='dense' sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                        {/* <IconButton onClick={handlePrint}>
                            <LocalPrintshopIcon />
                        </IconButton> */}
                        
                        

                        {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography> */}

                        <IconButton
                            // edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                
                
                
                {ready
                    ? <Warranty printRow={printRow} ref={componentRef} currData={currData}/>
                    : <Ticket printRow={printRow} ref={componentRef} currData={currData} lastOrder={lastOrder} />

                }
                
                    
                
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color={ready ? 'success' : 'secondary'}>
                        Отмена
                    </Button>
                    <Button
                        color={ready ? 'success' : 'secondary'}
                        autoFocus
                        // color="inherit"
                        onClick={handlePrint}
                        variant="contained"
                        // size='small'
                        startIcon={<LocalPrintshopIcon />}
                    >
                        Печать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
