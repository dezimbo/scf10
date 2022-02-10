import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import Telegram from "./svg/Telegram";
import Viber from "./svg/Viber";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/system';
const currDate = new Date().toLocaleDateString();

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    font-size: small;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #000;
    text-align: left;
    padding: 8px;
  }

`;


export const Warranty = React.forwardRef(({ printRow, currData }, ref) => {
    console.log(" currData[0]", currData[0])
    const [warrantyDate, setWarrantyDate] = React.useState()
    React.useEffect(() => {
        if (currData[0].warrPeriod || 0) {
            const date = new Date()
            date.setDate(date.getDate() + currData[0].warrPeriod);
            setWarrantyDate(date.toLocaleDateString());
        }
    }, [currData])

    return (
        <Paper sx={{ m: 3, }} elevation={5}>
            <Box ref={ref} sx={{ py: 3, px:5 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Box sx={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{`Гарантийный талон № ${printRow.order}`}</Box>
                        <Box sx={{ fontWeight: 'regular', textAlign: 'center' }}> {`действителен до: ${warrantyDate}`} </Box>

                    </Grid>
                    <Grid item xs={3} />

                    <Grid item xs={8}>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>ФИО:&nbsp;</span> {currData[0].fio}</Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Телефон:&nbsp;</span>
                            {currData[0]?.phone && currData[0].phone}&nbsp;
                            {currData[0]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                            {currData[0]?.telegram && <Telegram sx={{ fontSize: 14, }} />}&nbsp;
                            {currData[0]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 14, }} />}&nbsp;
                            {currData[1]?.phone && currData[1].phone}&nbsp;
                            {currData[1]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                            {currData[1]?.telegram && <Telegram sx={{ fontSize: 14, }} />}&nbsp;
                            {currData[1]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 14, }} />}&nbsp;
                        </Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Модель:&nbsp;</span> {currData[0].model}</Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Заявленная неисправность:&nbsp;</span> {currData[0].fract}</Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Комплектация:&nbsp;</span> {currData[0].equipment && currData[0].equipment.join(', ')}.</Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Выполненная работа:&nbsp;</span> {currData[0].completedWork}</Box>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Стоимость:&nbsp;</span> {currData[0].price}&nbsp;руб.</Box>



                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{ fontSize: 14, my: 1, fontWeight: 'bold', textAlign: 'right' }}>Сервисный центр F10.BY </Box>
                        <Box sx={{ fontSize: 12, my: 1, fontWeight: 'bold', textAlign: 'right' }}>Телефон: +37529 606-72-85 &nbsp; <Viber sx={{ fontSize: 15, }} /> <Telegram sx={{ fontSize: 15, }} /></Box>
                        <Box sx={{ fontSize: 12, my: 1, fontWeight: 'bold', textAlign: 'right' }}>Адрес: г.Минск ул. Заславская 27</Box>
                        <Box sx={{ fontSize: 12, my: 1, fontWeight: 'bold', textAlign: 'right' }}>Время работы: пн-пт: 11:00-19:00 </Box>
                        <Box sx={{ fontSize: 12, my: 1, fontWeight: 'bold', textAlign: 'right' }}>сб-вс: 12:00-16:00</Box>

                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: 'bold', my: 1, fontSize: 12 }} >
                            Правила гарантийного обслуживания.
                        </Typography>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Данные Правила разработаны в соответствии с законодательными актами Республики Беларусь в частности: Постановление Совета министров РБ № 393 от 28.03.2007 г. «Об утверждении Правил выполнения работ и оказания услуг по ремонту оконечных абонентских устройств» с изменениями от 23.12.2008 г., № 1590 от 14.12.2004 г. «Об утверждении Правил бытового обслуживания потребителей» с изменениями от 29.09.2010 г.</span> </Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>1.</span>  На проделанные работы и замененные запчасти Исполнитель устанавливает <span style={{ fontWeight: 'bold' }}>гарантийный срок, который составляет, в зависимости от вида ремонта и замененных запчастей: а) На бытовую электронную аппаратуру, электроинструмент, сотовые телефоны – 1 мес.; б) На цифровые фотоаппараты и видеокамеры, ноутбуки, ЖКИ мониторы – от 3 до 12 мес.</span></Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>2.</span> Не принимаются рекламации, связанные с механическими, термическими и другими повреждениями, возникшими по вине заказчика, вызванными неправильной эксплуатацией, транспортировкой, хранением ТИ, а также при наличии следов самостоятельного ремонта, в том числе: а) При изменении геометрии изделия, помятостей, сколов, глубоких царапин, изгиба или перелома контактных ножек, крепежных мест; б) С поврежденными или отсутствующими гарантийными «стикерами»; в) Со стертой или поврежденной маркировкой изделия; г) При наличии следов жизнедеятельности насекомых (тараканов, муравьев и т.п.), а также сильно запыленные изделия, изделия со следами окисления; д) При наличии исправлений или помарок в гарантийном документе, повреждений или следов переклеивания гарантийных «стикеров». </Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>3.</span> Гарантийное обслуживание не распространяется на: а) Материнские платы, имеющие признаки высокого температурного воздействия; б)  Корпуса ноутбуков, сменные панели для мобильных телефонов.; в) Оборудование, восстановленное после попадания влаги; г) Вышедшее из строя оборудование, работающее в сопряжении с изделием, обслуживаемым по гарантии; д) Программное обеспечение, установленное на компьютере.</Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>4.</span> Гарантийное обслуживание производится в течение гарантийного срока в случае обнаружения неисправности изделия, возникшей по вине сервисного центра. При этом срок гарантийного ремонта не превышает 14 дней. В случае отсутствия необходимых запчастей срок ремонта увеличивается на время, необходимое для поиска и поставки этих запчастей на склад Исполнителя. Исполнитель не несет расходы, связанные с доставкой ТИ к месту ремонта.</Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>5.</span> Гарантийное обслуживание производится только при наличии одного из следующих документов: а) Кассового чека или квитанции, подтверждающего внесение стоимости ремонта; б) Сервисной карты клиента с отметкой «Дата выдачи» и сроком гарантии; в) Гарантийного талона с серийным номером при совпадении его с серийным номером на самом товаре. Если серийные номера не предусмотрены для данного типа товара, то гарантийное обслуживание осуществляется при наличии гарантийного талона и неповрежденного фирменного «стикера» на техническом устройстве.</Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>6.</span> В процессе ремонта возможно ухудшение состояния корпуса ТИ, т.к. многие из них неразборные или имеют характерные одноразовые элементы крепежа, выходящие из строя при первой разборке. Также <span style={{ fontWeight: 'bold' }}>Заказчик признает, что на корпусе ТИ после проведения ремонтных работ могут оставаться следы вскрытия.</span></Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>7.</span> <span style={{ fontWeight: 'bold' }}>Исполнитель не несет ответственность за случаи потери, утраты, порчи данных на информационных носителях заказчика.</span> </Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>8.</span> Заказчик вправе досрочно отказаться от ремонта, оплатив Исполнителю фактически понесенные расходы на диагностику и дефектацию оборудования, приобретенные в целях ремонта запчасти, подлежащие установке в данное ТИ. После произведения расчетов неотремонтированное ТИ возвращается Заказчику, если это не исключено ввиду характера оказанной услуги. </Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>9.</span> Все вопросы, по которым не было достигнуто соглашение сторон, решаются в рамках законодательства Республики Беларусь.</Box>
                        <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>10.</span> <span style={{ fontWeight: 'bold' }}>Ремонт производится в соответствии с СТБ 1365-2002, СТБ 1880-2008, СТБ 1881-2008, СТБ МЭК 60950.</span> </Box>

                    </Grid>

                    <Grid item xs={5} sx={{ mt: 2 }}>
                        <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. из ремонта выдал:&nbsp;</span> ________________ (подпись, м.п.)</Box>
                    </Grid>
                    <Grid item xs={7} sx={{ mt: 2 }}>
                        <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. из ремонта получил, претензий нет:&nbsp;</span> _____________ ({printRow.fio})</Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', py:3 }}> <ContentCutIcon fontSize='small'/>---------------------------------------------------------------------------------------------------------------------------------------------</Box>
                    </Grid>


                    {/* <Grid item xs={1} /> */}
                    <Grid item xs={11}>
                        <Box sx={{ fontSize: 12 }}><span style={{ fontWeight: 'bold' }}>ЧТУП "Микстел"&nbsp;</span> </Box>
                        <Box sx={{ fontSize: 12, textAlign: 'left' }}> {`220004 г. Минск ул. Заславская 27`} </Box>
                        <Box sx={{ fontSize: 12, textAlign: 'left' }}> {`УНП 190917279`} </Box>

                    </Grid>
                    <Grid item xs={11}>
                        <Box sx={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{`Квитанция на оплату услуг № ${printRow.order}`}</Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>ФИО заказчика:&nbsp;</span> {currData[0].fio}</Box>
                    </Grid>
                    {/* <Grid item xs={1} /> */}
                    <Grid item xs={12} >
                        <Root sx={{ maxWidth: '100%',  }}>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Наименование работ (услуги)</th>
                                        <th>Сумма </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td  >Ремонт ноутбука </td>
                                        <td style={{ textAlign: 'right' }}>{printRow.price} руб. </td>
                                    </tr>
                                    {/* <tr >
                                        <td style={{ padding: '1rem' }}> </td>
                                        <td style={{ textAlign: 'right' }}> </td>                    
                                    </tr> */}

                                    <tr >
                                        <td colSpan={1} style={{ textAlign: 'right', fontWeight: 'bold', border: 0, width: '75%'}}>Всего по квитанции:</ td>
                                        <td colSpan={1} style={{ textAlign: 'right', fontWeight: 'bold' }}>{printRow.price} руб.</td>
                                    </tr>

                                </tbody>

                            </table>

                        </Root>
                    </Grid>
                    <Grid item xs={6} sx={{mt: 5}}>
                        <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Оплатил заказчик:&nbsp;</span> _____________________(подпись)</Box>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 5 }}>
                        <Box sx={{ fontSize: 12, textAlign: 'right' }}><span style={{ fontWeight: 'bold' }}>Получил:&nbsp;</span> ________________(Подписть М.П.)</Box>
                    </Grid>
                                        <Grid item xs={6}>
                        <Box sx={{ fontSize: 12, textAlign: 'left' }}><span style={{ fontWeight: 'bold' }}>Дата оплаты:&nbsp;</span>{currDate}</Box>
                    </Grid>

                </Grid>

            </Box>
        </Paper>


    )
})