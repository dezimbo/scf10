import * as React from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment,
    AppBar,
    Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import axios from 'axios';
import Viber from './svg/Viber';
import Telegram from './svg/Telegram';
import { green, teal, blue, purple } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// 

export default function ClientEdit({ updateOnClose, openClientEdit, handleCloseClientEdit, printRow, isReady, getCurrData }) {



    const [open, setOpen] = React.useState(false);

    const { control, handleSubmit, reset, watch, register } = useForm(

    );
    const { fields, append, remove, replace } = useFieldArray({ control, name: 'fieldsArr', });

    const hasReady = watch('fieldsArr.0.hasReady')

    async function onSubmit(data) {


        try {
            // console.log("🛫~🚀~🛫 DATA_ClientEdit", data.fieldsArr)

            await axios.put('https://scf10.herokuapp.com/api/order/update', { ...data },
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((res) => console.log(res))
                .then(getCurrData(data.fieldsArr))
                .then(updateOnClose)
                .then(handleClose)
                .then(hasReady && isReady(true))




        } catch (error) {
            console.log('🥵🥵🥵', error)
        }

    }

    const handleClickOpen = React.useCallback(() => {
        setOpen(true);
        replace((printRow.phone.length === 2) ? [{
            ...printRow,
            phone: printRow.phone[0],
            viber: printRow.viber[0],
            telegram: printRow.telegram[0],
            whatsApp: printRow.whatsApp[0]
        }, {
            phone: printRow.phone[1],
            viber: printRow.viber[1],
            telegram: printRow.telegram[1],
            whatsApp: printRow.whatsApp[1]
        }] : [{
            ...printRow,
            phone: printRow.phone[0],
            viber: printRow.viber[0],
            telegram: printRow.telegram[0],
            whatsApp: printRow.whatsApp[0]
        }])



    }, [printRow, replace])


    const handleClose = () => {
        handleCloseClientEdit();
        setOpen(false);
        reset({
            keepErrors: true,
            keepDirty: false,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
        });



    };


    React.useEffect(() => {

        openClientEdit && handleClickOpen();

    }, [openClientEdit, handleClickOpen]);



    const appearanceData = [
        'Потёртости',
        'Царапины',
        'Мех. повреждения',
        'Разбит экран',
        'Трещины на стекле'
    ];

    const equipmentData = [
        'Зарядное устройство',
        'Сумка',
        'Чехол',
        'АКБ',
        'Кабель'

    ];
    return (
        <>

            <Dialog
                open={open}
                // onClose={handleCloseClientEdit}
                maxWidth={'md'}
                fullWidth
                scroll='body'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AppBar sx={{ position: 'relative', }} color={hasReady ? 'success' : 'secondary'}>
                        <Toolbar variant='dense' sx={{
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{ ml: 1, }} variant="button" component="div">
                                {`ЗАКАЗ № ${printRow.order}`}
                            </Typography>

                            <Typography variant="button" component="div" >
                                {`от ${printRow.date}`}
                            </Typography>
                            <IconButton
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                size="large"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent >

                        <Box sx={{ width: '100%', m: 1, }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={5} sx={{}}>

                                </Grid>

                                <Grid item xs={12}>

                                    <Typography variant="button" gutterBottom component="div" sx={{ textAlign: 'left', }}>
                                        Информация о клиенте:
                                    </Typography>
                                </Grid>
                                <Grid item xs={11} md={4} lg={4}>

                                    <TextField
                                        // autoFocus
                                        sx={{ mt: 1 }}
                                        autoComplete="off"
                                        error={false}
                                        label="Имя Фамилия"
                                        {...register(`fieldsArr.0.fio`)}
                                        fullWidth
                                    />

                                </Grid>

                                {fields.map((item, index) => (

                                    <React.Fragment key={item.id}>
                                        {(index >= 1) &&
                                            <Grid item md={4} lg={4} />
                                        }

                                        <Grid item xs={11} md={4} lg={4}>

                                            <TextField
                                                sx={{ mt: 1 }}
                                                fullWidth
                                                autoComplete="off"
                                                label="Телефон"
                                                defaultChecked={item.phone}
                                                {...register(`fieldsArr.${index}.phone`)}
                                            />

                                        </Grid>
                                        <Grid item xs={10} md={3} lg={3} >

                                            <Checkbox
                                                defaultChecked={!!(item.viber)}
                                                sx={{ mt: 1 }}
                                                {...register(`fieldsArr.${index}.viber`)}
                                                icon={<Viber />}
                                                checkedIcon={<Viber sx={{ color: purple[400] }} />}
                                            />


                                            <Checkbox
                                                defaultChecked={!!(item.telegram)}
                                                sx={{ mt: 1 }}
                                                {...register(`fieldsArr.${index}.telegram`)}
                                                icon={<Telegram />}
                                                checkedIcon={<Telegram sx={{ color: blue[500] }} />}
                                            />



                                            <Checkbox
                                                defaultChecked={!!(item.whatsApp)}
                                                sx={{ mt: 1 }}
                                                {...register(`fieldsArr.${index}.whatsApp`)}
                                                icon={<WhatsAppIcon />}
                                                checkedIcon={<WhatsAppIcon sx={{ color: green['A400'] }} />}
                                            />

                                        </Grid>

                                        {(index >= 1) &&
                                            <Grid item xs={2} sm={1} md={1} sx={{ mt: 1 }}>
                                                <IconButton onClick={() => remove(index)} >
                                                    <CloseIcon size="large" />
                                                </IconButton>
                                                <Grid item xs={4} />
                                            </Grid>
                                        }
                                    </React.Fragment>
                                ))}

                                < Grid item xs={7} md={8} lg={8} />
                                <Grid item xs={2}>
                                    {(fields.length === 1) &&
                                        <Button variant="text" size="small" onClick={() => append({ phone: "", viber: "", telegram: "", whatsApp: "" })} startIcon={<AddCircleIcon />}>
                                            Добавить
                                        </Button>
                                    }

                                </Grid>

                                <Grid item xs={12}>

                                    <Divider sx={{ mb: 1 }} />
                                    <Typography variant="button" gutterBottom component="div" sx={{ textAlign: 'left', }}>
                                        Информация о устройстве:
                                    </Typography>
                                </Grid>
                                <Grid item xs={11} md={4} lg={4}>

                                    <TextField
                                        sx={{ mt: 1 }}
                                        autoComplete="off"
                                        error={false}
                                        label="Модель устройства"
                                        {...register(`fieldsArr.0.model`)}
                                        fullWidth
                                        defaultValue={printRow.model}
                                    />

                                </Grid>
                                <Grid item xs={11} md={6} lg={6}>

                                    <TextField
                                        sx={{ mt: 1 }}
                                        autoComplete="off"
                                        error={false}
                                        label="Заявленная несправность"
                                        {...register(`fieldsArr.0.fract`)}
                                        fullWidth
                                        defaultValue={printRow.fract}
                                    />

                                </Grid>
                                <Grid item xs={11} md={5} lg={5} >
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
                                                sx={{ width: '100%', }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Комплектация" />
                                                )}
                                                onChange={(_, data) => field.onChange(data)}
                                            />
                                        )}
                                        name="fieldsArr.0.equipment"
                                        control={control}
                                    />

                                </Grid>
                                <Grid item xs={11} md={5} lg={5} >

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
                                                sx={{ width: '100%', }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Внешний вид" />
                                                )}
                                                onChange={(_, data) => field.onChange(data)}
                                            />
                                        )}
                                        name="fieldsArr.0.appearance"
                                        control={control}
                                    />

                                </Grid>

                                <Grid item xs={12}>

                                    <Divider sx={{ mb: 1, mt: 2 }} />
                                    <Typography variant="button" gutterBottom component="div" sx={{ textAlign: 'left', }}>
                                        Запасные Части:
                                    </Typography>
                                </Grid>
                                <Grid item xs={11} md={6} lg={6}>

                                    <TextField
                                        multiline
                                        rows={2}
                                        autoComplete="off"
                                        error={false}
                                        label="Необходимые з.ч."
                                        {...register(`fieldsArr.0.parts`)}
                                        fullWidth
                                        defaultValue={printRow.parts}
                                    />

                                </Grid>

                                <Grid item xs={11} md={10} lg={10}>

                                    <TextField
                                        multiline
                                        autoComplete="off"
                                        margin="dense"
                                        label="Примечание"
                                        fullWidth
                                        variant="standard"
                                        {...register(`fieldsArr.0.note`)}
                                        defaultValue={printRow.note}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <Divider sx={{ my: 2 }} />
                                </Grid>
                                <Grid item xs={6} md={7} lg={7}>
                                    <Typography variant="button" gutterBottom component="div" sx={{ textAlign: 'left', }}>
                                        Готовность Заказа:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={3} lg={3} sx={{}}>

                                    <Typography variant="button" gutterBottom component="div" sx={{ textAlign: 'right', color: hasReady && teal[500] }}>
                                        {hasReady ? 'Готов:' : 'Не готов'}<Switch color='success' {...register(`fieldsArr.0.hasReady`)} defaultChecked={printRow.hasReady} />
                                    </Typography>

                                </Grid>
                                {(hasReady) &&
                                    <React.Fragment>


                                        <Grid item xs={11} md={4.5} lg={4.5}>

                                            <TextField
                                                // autoFocus

                                                autoComplete="off"
                                                error={false}
                                                label="Выполненная работа"
                                                {...register(`fieldsArr.0.completedWork`)}
                                                fullWidth
                                            />

                                        </Grid>
                                        <Grid item xs={11} md={3} lg={3}>

                                            <FormControl fullWidth>
                                                <InputLabel >Срок гарантии</InputLabel>
                                                <Select
                                                    defaultValue={printRow.warrPeriod || ''}
                                                    fullWidth
                                                    label="Срок гарантии"
                                                    {...register(`fieldsArr.0.warrPeriod`)}
                                                >
                                                    <MenuItem value={1}>Без гарантии</MenuItem>
                                                    <MenuItem value={7}>Неделя</MenuItem>
                                                    <MenuItem value={30}>Месяц</MenuItem>
                                                    <MenuItem value={120}>4 месяца</MenuItem>
                                                    <MenuItem value={180}>6 месяцев</MenuItem>
                                                    <MenuItem value={365}>12 месяцев</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </Grid>
                                        <Grid item xs={6} md={2.5} lg={2.5}>

                                            <TextField
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">руб.</InputAdornment>,
                                                }}
                                                autoComplete="off"
                                                error={false}
                                                label="Стоимость"
                                                {...register(`fieldsArr.0.price`)}
                                                fullWidth
                                            />

                                        </Grid>


                                    </React.Fragment>
                                }
                            </Grid>
                        </Box>

                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button color={hasReady ? 'success' : 'secondary'} onClick={handleClose}>Отмена</Button>
                        <Button variant="outlined" color={hasReady ? 'success' : 'secondary'} type="submit">{hasReady ? 'Печать' : 'Сохранить'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
