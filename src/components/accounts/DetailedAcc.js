import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import Navigation from '../Navigation';
import { Row, Col } from 'antd';
import Display from './Display';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    emptyTable: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        height: '100%',
        backgroundColor: '#e6eded',
        transitionDuration: '0.5s',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: "rgb(247, 247, 247,0.8)",
            transition: '0.5s',
        },
        
        padding:'2%'
    }
}));

const DetailedAcc = () => {
    const classes = useStyles();


    let { acc_no } = useParams();

    const apiUrl = useSelector(state => state.ApiReducer);

    const [accountInfos, setaccountInfos] = useState({});
    // const [transferFrom, setTransferFrom] = useState([]);
    // const [transferTo, setTransferTo] = useState([]);
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {


        async function GetFromTransfer(apiUrl, acc_no) {
            const resultFrom = await axios(
                `${apiUrl}/transfer/getFrom/${acc_no}`,
            );

            const resultTo = await axios(
                `${apiUrl}/transfer/getTo/${acc_no}`,
            );

            if (resultFrom.data.length > 0 && resultTo.data.length > 0) {
                setTransfers([...resultFrom.data, ...resultTo.data]);
            }
            else if (resultFrom.data.length === 0 && resultTo.data.length > 0) {
                setTransfers([...resultTo.data]);
            }
            else if (resultFrom.data.length > 0 && resultTo.data.length === 0) {
                setTransfers([...resultFrom.data]);
            }

        }

        async function GetAccountInfos(apiUrl, acc_no) {
            const result = await axios(
                `${apiUrl}/accounts/getAcc/${acc_no}`,
            );

            setaccountInfos(result.data[0]);
        }

        //axios.get(`${apiUrl}/accounts?account_no=${acc_no}`).then((data) => { setaccountInfos(data.data[0]) });

        //axios.get(`${apiUrl}/transfer?from_no=${acc_no}`).then((data) => { settransferInfos(data.data) });

        GetFromTransfer(apiUrl, acc_no);
        GetAccountInfos(apiUrl, acc_no);

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

                    <Col span={10} style={{ margin: "1%" }} >
                     
                            <Paper elevation={3} component="div" className={classes.emptyTable}>

                                <h2>{accountInfos.account_name}</h2>
                                <span>{accountInfos.account_type}</span>
                                <p>{accountInfos.account_no}</p>
                                <p>{accountInfos.iban}</p>
                                <p>{accountInfos.whereIs}</p>
                                <h4>{accountInfos.balance + " " + accountInfos.currency }</h4>

                            </Paper>
                      
                    </Col>





                    {
                        transfers &&
                        <Display transfers={transfers} accountInfos={accountInfos} />
                    }



                    {/* {
                        transfers.map((data) => data.from_no === accountInfos.account_no ?
                            <div key={data.id}> <span>{data.from_no}</span> <span>{data.to_no}</span> - <span>{data.total}</span></div>
                            :
                            <div key={data.id}> <span>{data.from_no}</span> <span>{data.to_no}</span> + <span>{data.total}</span></div>)
                    } */}

                </Col>
            </Row>



        </div>
    )
}

export default DetailedAcc
