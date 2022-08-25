import * as React from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  Paper,
  Stack,
  TextField,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material'
import { useGetData } from '../hooks/GetData.hooks'
import ClientAdd from './ClientAdd'
import Button from '@mui/material/Button'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import PrintOrder from './PrintOrder'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import ReplayIcon from '@mui/icons-material/Replay'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import ClientEdit from './ClientEdit'
import ClientCopy from './ClientCopy'
import ClientDel from './ClientDel'

function CustomToolbar() {
  const { updateOnClose } = useGetData()
  return (
    <GridToolbarContainer>
      <Button
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        startIcon={<ReplayIcon />}
        size='small'
        onClick={updateOnClose}
      >
        обновить
      </Button>
      <GridToolbarColumnsButton sx={{ display: { xs: 'none', sm: 'flex' } }} />
      <GridToolbarDensitySelector
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      />
    </GridToolbarContainer>
  )
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function QuickSearchToolbar(props) {
  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent='space-between'
      sx={{ p: '1rem' }}
    >
      <TextField
        variant='standard'
        value={props.value}
        onChange={props.onChange}
        placeholder='Поиск...'
        InputProps={{
          startAdornment: <SearchIcon fontSize='small' />,
          endAdornment: (
            <IconButton
              title='Clear'
              aria-label='Clear'
              size='small'
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize='small' />
            </IconButton>
          ),
        }}
      />

      <CustomToolbar />
    </Stack>
  )
}

export default function TableData() {
  const { data: dataRows, isLoaded, updateOnClose } = useGetData()

  const [rows, setRows] = React.useState(dataRows)

  React.useEffect(() => {
    setRows(dataRows)
  }, [dataRows])

  const [pageSize, setPageSize] = React.useState(50)

  const [searchText, setSearchText] = React.useState('')

  const [printRow, setPrintRow] = React.useState('')

  const [currData, setCurrData] = React.useState()

  const [ready, setReady] = React.useState(false)

  const [open, setOpen] = React.useState(false)

  const [openClientEdit, setOpenClientEdit] = React.useState(false)
  const [openClientCopy, setOpenClientCopy] = React.useState(false)
  const [openClientDel, setOpenClientDel] = React.useState(false)

  const [lastOrder, setLastOrder] = React.useState('')

  const getCurrData = (data) => setCurrData(data)

  const isReady = (printReady) => setReady(printReady)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setReady(false)
    setCurrData()
  }

  const handleOpenClientDel = () => setOpenClientDel(true)
  const handleOpenClientEdit = () => setOpenClientEdit(true)
  const handleCloseClientEdit = () => setOpenClientEdit(false)
  const handleOpenClientCopy = () => setOpenClientCopy(true)
  const handleCloseClientCopy = () => setOpenClientCopy(false)
  const getLastOrder = () => setLastOrder(rows[rows.length - 1].order)
  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = dataRows.filter((row) => {
      return Object.keys(row).some((field) => {
        if (row[field] === null) {
          row[field] = ''
        }
        return searchRegex.test(row[field].toString())
      })
    })
    setRows(filteredRows)
  }

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'order',
      sort: 'desc',
    },
  ])

  const columns = [
    {
      field: 'order',
      headerName: '№',
      width: 70,
      editable: false,
    },
    {
      field: 'model',
      headerName: 'Модель',
      width: 170,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      width: 200,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Дата',
      width: 100,
      // type: 'dateTime',
      editable: false,
    },
    {
      field: 'fio',
      headerName: 'ФИО',
      width: 200,
      editable: false,
    },
    {
      field: 'fract',
      headerName: 'Неисправность',
      width: 200,
      editable: false,
    },
    {
      field: 'appearance',
      headerName: 'Внешний вид',
      width: 200,
      editable: false,
      hide: true,
    },
    {
      field: 'equipment',
      headerName: 'Комплектация',
      width: 200,
      editable: false,
      hide: true,
    },
    {
      field: 'note',
      headerName: 'Примечание',
      width: 200,
      editable: false,
      hide: true,
    },
    {
      field: 'telegram',
      headerName: 'telegram',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'viber',
      headerName: 'viber',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'whatsApp',
      headerName: 'whatsApp',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'hasReady',
      headerName: 'Готов',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'warrPeriod',
      headerName: 'Гарантия',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'completedWork',
      headerName: 'Выполненная работа',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'price',
      headerName: 'Стоимость',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'parts',
      headerName: 'Запчасти',
      width: 70,
      editable: false,
      hide: true,
    },
    {
      field: 'print',
      type: 'actions',
      headerName: '',
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e, props) => {
          e.stopPropagation() // don't select this row after clicking
          if (props === 'print') {
            handleClickOpen()
          }
          if (props === 'edit') {
            handleOpenClientEdit()
          }
          if (props === 'copy') {
            handleOpenClientCopy()
          }
          if (props === 'delete') {
            handleOpenClientDel()
          }
          const api = params.api
          const thisRow = {}
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            )

          return setPrintRow(thisRow)
        }

        return (
          <>
            <IconButton
              onClick={(e) => onClick(e, 'print')}
              size='large'
              color='primary'
            >
              <LocalPrintshopIcon />
            </IconButton>
            <IconButton
              onClick={(e) => onClick(e, 'edit')}
              size='large'
              color={params.row.hasReady ? 'success' : 'secondary'}
            >
              <NoteAltIcon />
            </IconButton>
            <IconButton
              onClick={(e) => onClick(e, 'copy')}
              size='large'
              color='primary'
            >
              <FileCopyIcon />
            </IconButton>
            <IconButton
              onClick={(e) => onClick(e, 'delete')}
              size='large'
              color='primary'
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        )
      },
    },
  ]
  React.useEffect(() => {
    ready && handleClickOpen()
  }, [ready])

  return (
    <>
      <PrintOrder
        handleClose={handleClose}
        open={open}
        printRow={printRow}
        ready={ready}
        currData={currData}
        lastOrder={lastOrder}
      />
      <Box
        sx={{
          m: '1rem',
          height: '80vh',
        }}
      >
        <ClientAdd
          updateOnClose={updateOnClose}
          isReady={isReady}
          getCurrData={getCurrData}
          printOpen={handleClickOpen}
          getLastOrder={getLastOrder}
        />

        <ClientEdit
          printRow={printRow}
          openClientEdit={openClientEdit}
          handleCloseClientEdit={handleCloseClientEdit}
          updateOnClose={updateOnClose}
          isReady={isReady}
          getCurrData={getCurrData}
        />
        <ClientCopy
          printRow={printRow}
          openClientCopy={openClientCopy}
          handleCloseClientCopy={handleCloseClientCopy}
          updateOnClose={updateOnClose}
          printOpen={handleClickOpen}
          getLastOrder={getLastOrder}
          getCurrData={getCurrData}
        />
        <ClientDel
          printRow={printRow}
          openClientDel={openClientDel}
          setOpenClientDel={setOpenClientDel}
          updateOnClose={updateOnClose}
        />
        <Paper elevation={3}>
          {!isLoaded ? (
            <Box
              sx={{
                display: 'flex',
                height: '80vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div style={{ height: '80vh', width: '100%' }}>
              <DataGrid
                sx={{}}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                getRowId={(row) => row._id}
                components={{ Toolbar: QuickSearchToolbar }}
                rows={rows}
                columns={columns}
                componentsProps={{
                  toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => requestSearch(''),
                  },
                }}
                pagination
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50, 100]}
              />
            </div>
          )}
        </Paper>
      </Box>
    </>
  )
}
