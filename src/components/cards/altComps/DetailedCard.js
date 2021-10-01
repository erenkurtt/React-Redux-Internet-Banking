import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import Navigation from '../../Navigation';
import { Row, Col } from 'antd';

// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     button: {
//         margin: theme.spacing(1),
//     },
// }));

const DetailedCard = () => {
    

    let { card_no } = useParams();

    const apiUrl = useSelector(state => state.ApiReducer);

    const [cardInfos, setcardInfos] = useState([]);
    // const [transferFrom, setTransferFrom] = useState([]);
    // const [transferTo, setTransferTo] = useState([]);
    const [cardPayments, setcardPayments] = useState([]);

    useEffect(() => {
        

        async function GetFromTransfer(apiUrl, card_no) {
            const results = await axios(
                `${apiUrl}/cardpayments/${card_no}`,
            );

                
                setcardPayments(results.data);
 

        }

        async function GetcardInfos(apiUrl, card_no) {
            const result = await axios(
                `${apiUrl}/cards/${card_no}`,
            );

            setcardInfos(result.data);
        }

        //axios.get(`${apiUrl}/accounts?account_no=${acc_no}`).then((data) => { setcardInfos(data.data[0]) });

        //axios.get(`${apiUrl}/transfer?from_no=${acc_no}`).then((data) => { settransferInfos(data.data) });

        GetFromTransfer(apiUrl, card_no);
        GetcardInfos(apiUrl, card_no);

        return () => { }

    }, [])
    // hesap adı
    // vade türü
    // hesap yeri
    // hesap no 
    // iban


    // bakiye
    // hesap açılış tarihi
    // son işlem 

    // hesap hareketleri
    // hesabı kapat



    return (
        <div>
            <Row>
                <Col span={7}>
                    <Navigation />
                </Col>

                <Col span={17}>

                    <Row  >
                        {
                            cardInfos &&
                            cardInfos.map(data =>

                                <Col span={10} key={data.id} style={{ margin: "1%" }}>
                                    
                                        <Paper elevation={3} component="div"  >

                                            <h2>{data.card_no}</h2>
                                            <span>{data.bank_id}</span>
                                            <p>{data.last_month} - {data.last_year}</p>
                                            <h4>{data.limit - data.debt} {data.currency}</h4>

                                        </Paper>
                               
                                </Col>
                            )
                        }
                    </Row>


                    {
                        cardPayments.map((data) =>
                            <div key={data.id}>
                                <span>{data.date}</span>
                                <span>{data.to_where}</span> -
                                <span>{data.cost}</span>
                            </div>
                        )
                    }

                </Col>
            </Row>



        </div>
    )
}

export default DetailedCard