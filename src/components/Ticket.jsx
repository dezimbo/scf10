import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import Telegram from "./svg/Telegram";
import Viber from "./svg/Viber";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const currDate = new Date().toLocaleDateString();


export const Ticket = React.forwardRef(({ printRow, currData, lastOrder }, ref) => {
    console.log("🚀 ~ file: Ticket.jsx ~ line 12 ~ Ticket ~ printRow", printRow)
    // console.log("🚀 ~ file: Ticket.jsx ~ line 12 ~ Ticket ~ currData", currData)
    const ticketArr = [];
    const orderData = !!(currData)
        ? currData
        : (printRow) && (printRow.phone.length === 2)
            ? [{
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
            }]
            : (printRow) && [{
                ...printRow,
                phone: printRow.phone[0],
                viber: printRow.viber[0],
                telegram: printRow.telegram[0],
                whatsApp: printRow.whatsApp[0]
            }]
    console.log("🚀 ~ file: Ticket.jsx ~ line 16 ~ Ticket ~ orderData", orderData)
    console.log("🚀 !(typeof orderData[1].phone === 'undefined')",  !(orderData[1]?.phone === 'undefined'))
    for (let i = 0; i < orderData.length; i++) {

        if (!(typeof orderData[i].model === 'undefined')) {

            ticketArr.push(

                <React.Fragment key={i}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ py: 3, px: 5 }}>
                        <Grid item xs={3} />

                        <Grid item xs={6}>
                            <Box sx={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{`Договор-квитанция № ${lastOrder + 1 + i} от ${currDate}`}</Box>
                            <Box sx={{ fontWeight: 'regular', textAlign: 'center' }}>о приёме и ремонте техники</Box>

                        </Grid>
                        <Grid item xs={3} />

                        <Grid item xs={8}>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>ФИО:&nbsp;</span> {orderData[0].fio}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Телефон:&nbsp;</span>
                                {orderData[0]?.phone && orderData[0].phone}&nbsp;
                                {orderData[0]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[0]?.telegram && <Telegram sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[0]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.phone && orderData[1].phone}&nbsp;
                                {orderData[1]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.telegram && <Telegram sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 12, }} />}&nbsp;
                            </Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Модель:&nbsp;</span> {orderData[i].model}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Заявленная неисправность:&nbsp;</span> {orderData[i].fract}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Комплектация:&nbsp;</span> {orderData[i].equipment && orderData[i].equipment.join(', ')}.</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Внешний вид:&nbsp;</span> {orderData[i].appearance && orderData[i].appearance.join(', ')}.</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Примечание:&nbsp;</span> {orderData[i].note}</Box>



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
                                Правила оказания услуг по ремонту и техническому обслуживанию бытовой радиоэлектронной аппаратуры.
                            </Typography>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>1.</span> Данные Правила разработаны в соответствии с законодательными актами Республики Беларусь в частности: Постановление Совета министров РБ № 393 от 28.03.2007 г. «Об утверждении Правил выполнения работ и оказания услуг по ремонту оконечных абонентских устройств» с изменениями от 23.12.2008 г., № 1590 от 14.12.2004 г. «Об утверждении Правил бытового обслуживания потребителей» с изменениями от 29.09.2010 г.</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>2.</span> Степень интеграции компонентов, используемых в сотовых телефонах и ноутбуках (далее — <span style={{ fontWeight: 'bold' }}>Т</span>ехническое <span style={{ fontWeight: 'bold' }}>И</span>зделие, <span style={{ fontWeight: 'bold' }}>ТИ</span>) очень высока, поэтому незначительное повреждение любого из узлов может вызвать тотальный выход ТИ из строя. Исходя из этого,<span style={{ fontWeight: 'bold' }}> сервисный центр (далее – СЦ или Исполнитель) не несет ответственности за возможные ухудшения работы ТИ и/или его последующего выхода из строя (во время и/или после проведения ремонтных работ).</span> </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>3.</span> Ремонт производится только в отношении неисправностей, указанных в сервисной карте со слов Заказчика. При этом Заказчик несет ответственность за незаявленные или неизвестные ему неисправности, которые не были отражены в приемопередаточном акте, и обнаружены в ходе диагностики и ремонта. <span style={{ fontWeight: 'bold' }}>Выявленные незаявленные дефекты устраняются за дополнительную плату с согласия Заказчика.</span></Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>4.</span> <span style={{ fontWeight: 'bold' }}>Техническое изделие принимается в ремонт без СИМ-карт, карт памяти, шнурков, ремешков и прочих аксессуаров. Сервисный центр не несет ответственности за возможное повреждение или утрату данных с карт памяти, СИМ-карт заказчика.</span> </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>5.</span> При оказании услуг по ремонту ТИ дефектация (диагностика) ТИ является неотъемлемой частью оказания таких услуг. Если при оказании услуги по ремонту ТИ на этапе выполнения дефектации ТИ Исполнитель установит, что дальнейшее оказание услуги по техническим или технологическим причинам не представляется возможным, данная услуга считается неоказанной и не подлежит оплате потребителем.</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>6.</span> <span style={{ fontWeight: 'bold' }}>Срок диагностики: от 2 до 14 дней.</span> Сведения о ходе диагностики и ремонта можно получить в рабочее время сервиса не ранее, чем через 2 дня с момента поступления ТИ к исполнителю, если иное не оговорено при приеме. Диагностика выполняется бесплатно.</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>7.</span> В процессе ремонта возможно ухудшение состояния корпуса ТИ, т.к. многие из них неразборные или имеют характерные одноразовые элементы крепежа, выходящие из строя при первой разборке. Также <span style={{ fontWeight: 'bold' }}>Заказчик признает, что на корпусе ТИ после проведения ремонтных работ могут оставаться следы вскрытия.</span></Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>8.</span> <span style={{ fontWeight: 'bold' }}>Без дополнительного соглашения производится малый и средний ремонт стоимостью от 10 до 25 рублей 00 коп.</span></Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>9.</span> Ориентировочная стоимость ремонта ТИ согласовывается с заказчиком при приеме ТИ в ремонт, а также после диагностики и в процессе ремонта, в случае ее превышения.</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>10.</span> <span style={{ fontWeight: 'bold' }}>Срок ремонта: несрочный ремонт – от 7 до 21 дня с момента согласования условий, при наличии необходимых комплектующих на складе.</span> В случае отсутствия необходимых запчастей срок ремонта увеличивается на время, необходимое для поиска и поставки этих запчастей на склад Исполнителя. Срочным считается ремонт, выполненный в течение 48 часов (тарификация при срочном заказе производится с 30% надбавкой).</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>11.</span> <span style={{ fontWeight: 'bold' }}>Исполнитель не несет ответственность за случаи потери, утраты, порчи данных на информационных носителях заказчика.</span> </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>12.</span> <span style={{ fontWeight: 'bold' }}>Исполнитель несет ответственность за сохранность ТИ только в течение 3 месяцев с момента объявления о завершении работ Заказчику.</span> </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>13.</span> Заказчик вправе досрочно отказаться от ремонта, оплатив Исполнителю фактически понесенные расходы на диагностику и дефектацию оборудования, приобретенные в целях ремонта запчасти, подлежащие установке в данное ТИ. После произведения расчетов неотремонтированное ТИ возвращается Заказчику, если это не исключено ввиду характера оказанной услуги. </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>14.</span> Исполнитель вправе привлечь для ремонта сторонние организации.</Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>15.</span> <span style={{ fontWeight: 'bold' }}>Оборудование выдается в течение 1-2 рабочих дня с момента оповещения Заказчика о невозможности выполнения ремонта или отказе Заказчика от ремонта ТИ.</span> </Box>
                            <Box sx={{ fontSize: 8, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>16.</span> На проделанные работы и замененные запчасти Исполнитель устанавливает <span style={{ fontWeight: 'bold' }}>гарантийный срок, который составляет, в зависимости от вида ремонта и замененных запчастей: а) На бытовую электронную аппаратуру, электроинструмент, сотовые телефоны – 1 мес.; б) На цифровые фотоаппараты и видеокамеры, ноутбуки, ЖКИ мониторы – от 3 до 12 мес.</span> </Box>



                        </Grid>

                        {/* <Grid item xs={2}/> */}
                        <Grid item xs={6} sx={{mt: 2}}>
                            <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. в ремонт принял:&nbsp;</span> ________________ (подпись)</Box>
                        </Grid>
                        <Grid item xs={6} sx={{mt: 2}}>
                            <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. в ремонт сдал:&nbsp;</span>{orderData[0].fio} _____________ (подпись)</Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', py: 3 }}> <ContentCutIcon fontSize='small' />---------------------------------------------------------------------------------------------------------------------------------------------</Box>
                        </Grid>

                        <Grid item xs={3} />

                        <Grid item xs={6}>
                            <Box sx={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>{`Заказ-наряд № ${lastOrder + 1 + i} от ${currDate}`}</Box>


                        </Grid>
                        <Grid item xs={3} />


                        <Grid item xs={8}>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>ФИО:&nbsp;</span> {orderData[0].fio}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Телефон:&nbsp;</span>
                                {orderData[0]?.phone && orderData[0].phone}&nbsp;
                                {orderData[0]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[0]?.telegram && <Telegram sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[0]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.phone && orderData[1].phone}&nbsp;
                                {orderData[1]?.viber && <Viber sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.telegram && <Telegram sx={{ fontSize: 12, }} />}&nbsp;
                                {orderData[1]?.whatsApp && <WhatsAppIcon sx={{ fontSize: 12, }} />}&nbsp;
                            </Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Модель:&nbsp;</span> {orderData[i].model}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Заявленная неисправность:&nbsp;</span> {orderData[i].fract}</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Комплектация:&nbsp;</span> {orderData[i].equipment && orderData[i].equipment.join(', ')}.</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Внешний вид:&nbsp;</span> {orderData[i].appearance && orderData[i].appearance.join(', ')}.</Box>
                            <Box sx={{ fontSize: 12, my: 0.3 }}><span style={{ fontWeight: 'bold' }}>Примечание:&nbsp;</span> {orderData[i].note}</Box>



                        </Grid>

                        <Grid item xs={6} sx={{ mt: 2 }}>
                            <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. в ремонт принял:&nbsp;</span> ________________ (подпись)</Box>
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 2 }}>
                            <Box sx={{ fontSize: 12, }}><span style={{ fontWeight: 'bold' }}>Т.И. в ремонт сдал:&nbsp;</span>{orderData[0].fio} _____________ (подпись)</Box>
                        </Grid>

                    </Grid>





                    <div style={{ pageBreakAfter: 'always' }} >
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', fontWeight: 'bold', displayPrint: 'none', my: 5, border: 1, }}></Box>
                        </Grid>
                    </div>
                </React.Fragment>

            )
        }
    }


    return (
        <Paper sx={{ m: 3, }} elevation={5}>


            < Box ref={ref} >




                {ticketArr}



            </Box >




        </Paper>


    )
})




