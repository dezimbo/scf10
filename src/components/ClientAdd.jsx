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
  AppBar,
  Toolbar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { PersonAddAltRounded } from '@mui/icons-material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import PhoneMask from './PhoneMask'
import axios from 'axios'
import Viber from './svg/Viber'
import Telegram from './svg/Telegram'
import { green, blue, purple } from '@mui/material/colors'

import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export default function ClientAdd({
  updateOnClose,
  getCurrData,
  printOpen,
  getLastOrder,
}) {
  async function onSubmit(data) {
    getCurrData(data.fieldsArr)
    printOpen()
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
        .then(handleClose)
        .then(updateOnClose)
    } catch (error) {
      console.log('🥵🥵🥵', error)
    }
  }

  const [open, setOpen] = React.useState(false)

  const { register, control, handleSubmit, reset } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fieldsArr',
  })

  const currDate = new Date().toLocaleDateString()

  const currTime = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1')

  const [numberOfField, setNumberOfField] = React.useState(1)
  const [phoneAdd, setPhoneAdd] = React.useState(0)
  const handleClickOpen = () => {
    setOpen(true)
    setPhoneAdd(0)
    setNumberOfField(1)
    reset({
      keepErrors: true,
      keepDirty: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepIsValid: false,
      keepSubmitCount: false,
    })
    getLastOrder()
  }
  const handleClose = () => {
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
  const handleAdd = () => setNumberOfField(numberOfField + 1)

  const handleDel = () => setNumberOfField(numberOfField - 1)

  React.useEffect(() => {
    const newVal = numberOfField

    const oldVal = fields.length
    if (newVal > oldVal) {
      for (let i = oldVal; i < newVal; i++) {
        append({
          model: '',
          fract: '',
          appearance: '',
          equipment: '',
          fio: '',
          phone: '',
        })
      }
    } else {
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1)
      }
    }
  }, [numberOfField, append, remove, fields.length])

  const handlePhoneAdd = () => setPhoneAdd(phoneAdd + 1)

  const handlePhoneDel = () => {
    setPhoneAdd(phoneAdd - 1)
    remove(2)
  }

  let phoneFields = []

  for (let i = 0; i <= phoneAdd; i++) {
    phoneFields.push(
      <React.Fragment key={i}>
        {i >= 1 ? (
          <Grid item md={4} lg={4} />
        ) : (
          <Grid item xs={11} md={4} lg={4}>
            <Controller
              name={`fieldsArr.${i}.fio`}
              control={control}
              render={({ field }) => (
                <TextField
                  autoComplete='off'
                  error={false}
                  label='Имя Фамилия'
                  onChange={(e) => {
                    field.onChange(e.target.value)
                  }}
                  fullWidth
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={11} sm={4} md={4}>
          <Controller
            name={`fieldsArr.${i}.phone`}
            control={control}
            render={({ field }) => (
              <PhoneMask
                mask='{+375}(00)000-00-00'
                label='Телефон'
                placeholder='+375(__)___-__-__'
                onChange={(e) => {
                  field.onChange(e.target.value)
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <Controller
            name={`fieldsArr.${i}.viber`}
            control={control}
            render={({ field }) => (
              <Checkbox
                sx={{ mt: 1 }}
                onChange={(e) => {
                  field.onChange(e.target.checked)
                }}
                icon={<Viber />}
                checkedIcon={<Viber sx={{ color: purple[400] }} />}
              />
            )}
            defaultValue={false}
          />
          <Controller
            name={`fieldsArr.${i}.telegram`}
            control={control}
            render={({ field }) => (
              <Checkbox
                sx={{ mt: 1 }}
                onChange={(e) => {
                  field.onChange(e.target.checked)
                }}
                icon={<Telegram />}
                checkedIcon={<Telegram sx={{ color: blue[500] }} />}
              />
            )}
            defaultValue={false}
          />
          <Controller
            name={`fieldsArr.${i}.whatsApp`}
            control={control}
            render={({ field }) => (
              <Checkbox
                sx={{ mt: 1 }}
                onChange={(e) => {
                  field.onChange(e.target.checked)
                }}
                icon={<WhatsAppIcon />}
                checkedIcon={<WhatsAppIcon sx={{ color: green['A400'] }} />}
              />
            )}
            defaultValue={false}
          />
        </Grid>

        {i >= 1 && (
          <Grid item xs={2} sm={1} md={1}>
            <IconButton onClick={handlePhoneDel}>
              <CloseIcon size='large' sx={{ pt: 1 }} />
            </IconButton>
          </Grid>
        )}
      </React.Fragment>
    )
  }

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
      <Button
        variant='contained'
        startIcon={<PersonAddAltRounded />}
        sx={{ mb: '1rem' }}
        onClick={handleClickOpen}
      >
        Новый
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}
        fullWidth
        scroll='body'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar
              variant='dense'
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography sx={{ ml: 1 }} variant='button' component='div'>
                {`НОВЫЙ ЗАКАЗ`}
              </Typography>
              <Typography variant='button' component='div'>
                {`${currDate} `}
              </Typography>
              <Typography variant='button' component='div'>
                {`${currTime}`}
              </Typography>
              <IconButton
                // edge="end"
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

                {phoneFields}

                <Grid item xs={7} md={8} lg={8} />
                <Grid item xs={2}>
                  {phoneAdd === 0 && (
                    <Button
                      variant='text'
                      size='small'
                      onClick={handlePhoneAdd}
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
                {fields.map((item, i) => (
                  <React.Fragment key={i}>
                    <Grid item xs={12} sx={{ ml: -1, mt: 1 }}>
                      {i >= 1 && <Divider sx={{ mb: 1 }} />}
                    </Grid>
                    <Grid item xs={11} md={4} lg={4}>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        label='Модель устройства'
                        {...register(`fieldsArr.${i}.model`)}
                      />
                    </Grid>
                    <Grid item xs={11} md={6} lg={6}>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        label='Заявленная несправность'
                        {...register(`fieldsArr.${i}.fract`)}
                      />
                    </Grid>

                    <Grid item xs={11} md={5} lg={5}>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
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
                        name={`fieldsArr.${i}.equipment`}
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={11} md={5} lg={5}>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
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
                        name={`fieldsArr.${i}.appearance`}
                        control={control}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ ml: -1, mt: 1 }}>
                      {i >= 1 && (
                        <IconButton onClick={handleDel}>
                          <CloseIcon size='large' />
                        </IconButton>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
                <Grid item xs={7} md={8} lg={8} />
                <Grid item xs={2}>
                  <Button
                    variant='text'
                    size='small'
                    onClick={handleAdd}
                    startIcon={<AddCircleIcon />}
                  >
                    Добавить
                  </Button>
                </Grid>

                <Grid item xs={11} md={10} lg={10}>
                  <Controller
                    name={`fieldsArr.0.note`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        autoComplete='off'
                        margin='dense'
                        label='Примечание'
                        fullWidth
                        variant='standard'
                        onChange={(e) => {
                          field.onChange(e.target.value)
                        }}
                      />
                    )}
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
