import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';

export default function ClientDel({ openClientDel, setOpenClientDel, printRow, updateOnClose}) {

    async function delOrder(order) {


        try {
            // console.log("🛫~🚀~🛫 DATA_ClientEdit", printRow)

            await axios.post('https://scf10.herokuapp.com/api/order/delete',  {...printRow } ,
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((res) => console.log(res))                
                .then(updateOnClose)
                .then(setOpenClientDel(false))
                
                




        } catch (error) {
            console.log('🥵🥵🥵', error)
        }

    }


    return (
        <div>

            <Dialog
                open={openClientDel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Точно удалить заказ № ${printRow.order}?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenClientDel(false)}>Отмена</Button>
                    <Button onClick={() => delOrder(printRow.order)} autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}