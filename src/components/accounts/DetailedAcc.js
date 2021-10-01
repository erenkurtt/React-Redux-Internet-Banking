import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import Navigation from '../Navigation';
import {Row,Col} from 'antd';

const DetailedAcc = () => {


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
                    <Navigation/>
                </Col>

                <Col span={17}>

                    <p>{accountInfos.account_name}</p>
                    <p>{accountInfos.account_type}</p>
                    <p>{accountInfos.whereIs}</p>
                    <p>{accountInfos.account_no}</p>
                    <p>{accountInfos.iban}</p>
                    <p>{accountInfos.currency}</p>


                    {accountInfos.account_name}
                    {accountInfos.account_type}
                    {accountInfos.whereIs}
                    {accountInfos.account_no}
                    {accountInfos.iban}
                    {accountInfos.currency}


                    {
                        transfers.map((data) => data.from_no === accountInfos.account_no ?
                            <div key={data.id}> <span>{data.from_no}</span> <span>{data.to_no}</span> - <span>{data.total}</span></div>
                            :
                            <div key={data.id}> <span>{data.from_no}</span> <span>{data.to_no}</span> + <span>{data.total}</span></div>)
                    }

                </Col>
            </Row>



        </div>
    )
}

export default DetailedAcc
