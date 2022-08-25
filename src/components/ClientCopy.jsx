import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Button,
  Grid,
  TextField,
  IconButton,
  Box,
  Checkbox,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Autocomplete,
  AppBar,
  Toolbar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import axios from 'axios'
import Viber from './svg/Viber'
import Telegram from './svg/Telegram'
import { green, blue, purple } from '@mui/material/colors'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
//

export default function ClientCopy({
  updateOnClose,
  openClientCopy,
  handleCloseClientCopy,
  printRow,
  printOpen,
  getLastOrder,
  getCurrData,
}) {
  const [open, setOpen] = React.useState(false)

  const { control, handleSubmit, reset, register } = useForm()
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'fieldsArr',
  })

  async function onSubmit(data) {
    try {
      await axios
        .post(
          'https://scf10.herokuapp.com/api/order/add',
          { ...data },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        )
        .then(getCurrData(data.fieldsArr))
        .then(updateOnClose)
        .then(handleClose)
        .then(printOpen)
    } catch (error) {
      console.log('🥵🥵🥵', error)
    }
  }

  const handleClickOpen = React.useCallback(() => {
    setOpen(true)
    getLastOrder()
    replace(
      printRow.phone.length === 2
        ? [
            {
              ...printRow,
              phone: printRow.phone[0],
              viber: printRow.viber[0],
              telegram: printRow.telegram[0],
              whatsApp: printRow.whatsApp[0],
            },
            {
              phone: printRow.phone[1],
              viber: printRow.viber[1],
              telegram: printRow.telegram[1],
              whatsApp: printRow.whatsApp[1],
            },
          ]
        : [
            {
              ...printRow,
              phone: printRow.phone[0],
              viber: printRow.viber[0],
              telegram: printRow.telegram[0],
              whatsApp: printRow.whatsApp[0],
            },
          ]
    )
  }, [printRow, replace, getLastOrder])

  const handleClose = () => {
    handleCloseClientCopy()
    setOpen(false)
    reset({
      keepErrors: true,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    })
  }

  React.useEffect(() => {
    openClientCopy && handleClickOpen()
  }, [openClientCopy, handleClickOpen])

  const appearanceData = [
    'Потёртости',
    'Царапины',
    'Мех. повреждения',
    'Разбит экран',
    'Трещины на стекле',
    'Cостояние б.у.',
  ]

  const equipmentData = [
    'Зарядное устройство',
    'Сумка',
    'Чехол',
    'АКБ',
    'Кабель',
  ]
  return (
    <>
      <Dialog open={open} maxWidth={'md'} fullWidth scroll='body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar
              variant='dense'
              sx={{
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{ ml: 1 }} variant='button' component='div'>
                {`НОВЫЙ ЗАКАЗ`}
              </Typography>

              <Typography variant='button' component='div'>
                {`от ${printRow.date}`}
              </Typography>
              <IconButton
                color='inherit'
                onClick={handleClose}
                aria-label='close'
                size='large'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Box sx={{ width: '100%', m: 1 }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={5} sx={{}}></Grid>

                <Grid item xs={12}>
                  <Typography
                    variant='button'
                    gutterBottom
                    component='div'
                    sx={{ textAlign: 'left' }}
                  >
                    Информация о клиенте:
                  </Typography>
                </Grid>
                <Grid item xs={11} md={4} lg={4}>
                  <TextField
                    sx={{ mt: 1 }}
                    autoComplete='off'
                    error={false}
                    label='Имя Фамилия'
                    {...register(`fieldsArr.0.fio`)}
                    fullWidth
                  />
                </Grid>

                {fields.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index >= 1 && <Grid item md={4} lg={4} />}

                    <Grid item xs={11} md={4} lg={4}>
                      <TextField
                        sx={{ mt: 1 }}
                        fullWidth
                        autoComplete='off'
                        label='Телефон'
                        defaultChecked={item.phone}
                        {...register(`fieldsArr.${index}.phone`)}
                      />
                    </Grid>
                    <Grid item xs={10} md={3} lg={3}>
                      <Checkbox
                        defaultChecked={!!item.viber}
                        sx={{ mt: 1 }}
                        {...register(`fieldsArr.${index}.viber`)}
                        icon={<Viber />}
                        checkedIcon={<Viber sx={{ color: purple[400] }} />}
                      />

                      <Checkbox
                        defaultChecked={!!item.telegram}
                        sx={{ mt: 1 }}
                        {...register(`fieldsArr.${index}.telegram`)}
                        icon={<Telegram />}
                        checkedIcon={<Telegram sx={{ color: blue[500] }} />}
                      />

                      <Checkbox
                        defaultChecked={!!item.whatsApp}
                        sx={{ mt: 1 }}
                        {...register(`fieldsArr.${index}.whatsApp`)}
                        icon={<WhatsAppIcon />}
                        checkedIcon={
                          <WhatsAppIcon sx={{ color: green['A400'] }} />
                        }
                      />
                    </Grid>

                    {index >= 1 && (
                      <Grid item xs={2} sm={1} md={1} sx={{ mt: 1 }}>
                        <IconButton onClick={() => remove(index)}>
                          <CloseIcon size='large' />
                        </IconButton>
                        <Grid item xs={4} />
                      </Grid>
                    )}
                  </React.Fragment>
                ))}

                <Grid item xs={7} md={8} lg={8} />
                <Grid item xs={2}>
                  {fields.length === 1 && (
                    <Button
                      variant='text'
                      size='small'
                      onClick={() =>
                        append({
                          phone: '',
                          viber: '',
                          telegram: '',
                          whatsApp: '',
                        })
                      }
                      startIcon={<AddCircleIcon />}
                    >
                      Добавить
                    </Button>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mb: 1 }} />
                  <Typography
                    variant='button'
                    gutterBottom
                    component='div'
                    sx={{ textAlign: 'left' }}
                  >
                    Информация о устройстве:
                  </Typography>
                </Grid>
                <Grid item xs={11} md={4} lg={4}>
                  <TextField
                    sx={{ mt: 1 }}
                    autoComplete='off'
                    error={false}
                    label='Модель устройства'
                    {...register(`fieldsArr.0.model`)}
                    fullWidth
                    defaultValue={printRow.model}
                  />
                </Grid>
                <Grid item xs={11} md={6} lg={6}>
                  <TextField
                    sx={{ mt: 1 }}
                    autoComplete='off'
                    error={false}
                    label='Заявленная несправность'
                    {...register(`fieldsArr.0.fract`)}
                    fullWidth
                    defaultValue={printRow.fract}
                  />
                </Grid>
                <Grid item xs={11} md={5} lg={5}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        defaultValue={printRow.equipment || []}
                        multiple
                        options={equipmentData}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              sx={{ py: 0 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        sx={{ width: '100%' }}
                        renderInput={(params) => (
                          <TextField {...params} label='Комплектация' />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                    name='fieldsArr.0.equipment'
                    control={control}
                  />
                </Grid>
                <Grid item xs={11} md={5} lg={5}>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        defaultValue={printRow.appearance || []}
                        multiple
                        options={appearanceData}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              sx={{ py: 0 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        sx={{ width: '100%' }}
                        renderInput={(params) => (
                          <TextField {...params} label='Внешний вид' />
                        )}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                    name='fieldsArr.0.appearance'
                    control={control}
                  />
                </Grid>

                <Grid item xs={11} md={10} lg={10}>
                  <TextField
                    multiline
                    autoComplete='off'
                    margin='dense'
                    label='Примечание'
                    fullWidth
                    variant='standard'
                    {...register(`fieldsArr.0.note`)}
                    defaultValue={printRow.note}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button variant='outlined' type='submit'>
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
