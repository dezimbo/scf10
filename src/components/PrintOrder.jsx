import * as React from 'react'
import { Dialog } from '@mui/material'
import { useReactToPrint } from 'react-to-print'
import { Ticket } from './Ticket'
import { Warranty } from './Warranty'

export default function PrintOrder({
  handleClose,
  open,
  printRow,
  ready,
  currData,
  lastOrder,
}) {
  const componentRef = React.useRef(null)
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    removeAfterPrint: true,
    onAfterPrint: handleClose,
  })

  return (
    <>
      <Dialog
        maxWidth={'md'}
        fullWidth
        open={open}
        onClose={handleClose}
        scroll='body'
      >
        <div style={{ display: 'none' }}>
          {open &&
            (ready ? (
              <Warranty
                print={handlePrint}
                printRow={printRow}
                ref={componentRef}
                currData={currData}
              />
            ) : (
              <Ticket
                print={handlePrint}
                printRow={printRow}
                ref={componentRef}
                currData={currData}
                lastOrder={lastOrder}
              />
            ))}
        </div>
      </Dialog>
    </>
  )
}
