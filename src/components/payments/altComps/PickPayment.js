

import React, { useState, useEffect } from 'react'
import Navigation from '../../Navigation'
import { Row, Col } from 'antd';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {
    useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import axios from 'axios';

import '../../credits/css/Credit.css';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },

    ActiveTables: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        //height: theme.spacing(20),
        backgroundColor: '#dfe362',
        cursor: 'pointer',
        transitionDuration: '0.5s',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: "rgb(229, 235, 122)",
            transition: '0.5s',
        },
    },
    emptyTable: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        height: '100%',
        backgroundColor: '#e6eded',
        cursor: 'pointer',
        transitionDuration: '0.5s',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: "rgb(247, 247, 247,0.8)",
            transition: '0.5s',
        },
    },
    warning: {
        width: '50%',
        marginBottom: '2%'
    },
}));



const PickPayment = () => {

    let { payment_type } = useParams();
    const apiUrl = useSelector(state => state.ApiReducer);

    const [selectCurrency, setSelectCurrency] = useState({ name: '' });
    const [companyName, setcompanyName] = useState("");
    const [amount, setamount] = useState(0);

    const [accounts, setaccounts] = useState([]);
    const [cards, setcards] = useState([]);

    const [selectedAcc, setselecedtAcc] = useState(null);
    const [selectedCard, setselectedCard] = useState(null);


    const [accountCss, setAccountCss] = useState([]);

    const classes = useStyles();
    const [cardCss, setcardCss] = useState([]);

    const [value, setValue] = React.useState(0);

    const [succeed, setsucceed] = useState(false);
    const [failed, setfailed] = useState(false);
    const [failedText, setfailedText] = useState("Purchase has been failed")

    useEffect(() => {

        axios.get(apiUrl + "/accounts/" + localStorage.getItem("bankId") ).then((data) => {
            if (accounts) {
                setaccounts(data.data);
                let arr = Array(data.data.length).fill(classes.emptyTable);
                setAccountCss(arr);

            }
        });

        axios.get(apiUrl + "cards/privCard/" + localStorage.getItem("bankId") ).then((data) => {
            if (cards)
                setcards(data.data);
            let arr = Array(data.data.length).fill(classes.emptyTable);
            setcardCss(arr);
        })

        return () => { }
    }, [])

    const currency = [
        { name: 'tl' },
        { name: 'dolar' },
        { name: 'euro' }
    ];

    const onCurrencyChange = (e) => {

        setSelectCurrency(e.value);

    }

    const onCompanyName = (e) => {

        setcompanyName(e);

    }

    const onAmount = (e) => {


        setamount(parseFloat(e));

    }

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };


    function selectAccount(data) {

        let tempEx = [];
        for (var i = 0; i < cardCss.length; i++) {
            tempEx[i] = classes.emptyTable;
        }
        setcardCss(tempEx);
        setselectedCard(null);


        let temp = [];
        for (var i = 0; i < accountCss.length; i++) {
            temp[i] = classes.emptyTable;
        }
        let index = accounts.indexOf(data);
        temp[index] = classes.ActiveTables;
        setAccountCss(temp);
        setselecedtAcc(data);


        //SetSender(data);
    }

    function selectCard(data) {

        let tempEx = [];
        for (var i = 0; i < accountCss.length; i++) {
            tempEx[i] = classes.emptyTable;
        }
        setAccountCss(tempEx);
        setselecedtAcc(null);


        let temp = [];
        for (var i = 0; i < cardCss.length; i++) {
            temp[i] = classes.emptyTable;
        }
        let index = cards.indexOf(data);
        temp[index] = classes.ActiveTables;
        setcardCss(temp);
        setselectedCard(data);


        //SetSender(data);
    }


    function CompletePayment() {


        if (selectedAcc !== null && selectedCard === null && selectedAcc.balance >= amount) {
            setfailed(false);

            PostTransfer({
                from_name: selectedAcc.account_name,
                from_no: selectedAcc.account_no , 
                from_iban: selectedAcc.iban , 
                to_name: companyName , 
                to_no: companyName +  ' -  ' + payment_type,
                to_iban: ' - ' + payment_type,
                total: amount,
                date: (new Date()).toString()
            });

            PatchAccounts({balance: selectedAcc.balance - amount} , selectedAcc.id )


        }
        else if (selectedCard !== null && selectedAcc === null && selectedCard.limit >= amount ) {
            setfailed(false);

            PostCardPayment({
                username: selectedCard.username,
                bank_id: selectedCard.bank_id,
                card_no: selectedCard.card_no,
                cost: amount,
                to_where: companyName + " - "  + payment_type,
                date: (new Date()).toString()
            });

            PatchCard({limit: selectedCard.limit -amount , debt: selectedCard.debt + amount} , selectedCard.id);
        }
        else if( selectedAcc.balance < amount ||  selectedCard.limit < amount){
            setfailedText("Amount is higher than balance or limit")
            setfailed(true);
        }
    }

    async function PostTransfer(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/transfer", payload, {
                    headers: { Authorization: `Bearer` },
                })
            setsucceed(true);
        }
        catch (e) {
            console.log(e);
            setfailed(true);
        }
    }

    async function PatchAccounts(payload, id) {

        try {
            let result =
                await axios.patch(apiUrl + "/accounts/" + id, payload, {
                    headers: { Authorization: `Bearer` },
                })

        }
        catch (e) {
            console.log(e);
        }
    }


    async function PostCardPayment(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/cardpayments", payload, {
                    headers: { Authorization: `Bearer` },
                })
            setsucceed(true);
        }
        catch (e) {
            console.log(e);
            setfailed(true);
        }
    }

    async function PatchCard(payload, id) {

        try {
            let result =
                await axios.patch(apiUrl + "/cards/" + id, payload, {
                    headers: { Authorization: `Bearer` },
                })

        }
        catch (e) {
            console.log(e);
        }
    }



    const Cards = () => {
        return (
            <Row  >
                {
                    cards &&
                    cards.map(data =>
                        data.currency === selectCurrency.name &&
                        <Col span={10} key={data.card_no} style={{ margin: "1%" }}>

                            <Paper elevation={3} className={cardCss[cards.indexOf(data)]}
                                onClick={() => selectCard(data)} >

                                <h2>{data.card_no}</h2>
                                <span>{data.bank_id}</span>
                                <p>{data.last_month} - {data.last_year}</p>
                                <h4>{data.limit} {data.currency}</h4>

                            </Paper>

                        </Col>
                    )
                }
            </Row>

        )
    }

    const Accounts = () => {
        return (
            <Row  >
                {
                    accounts && accountCss &&
                    accounts.map(data =>
                        data.currency === selectCurrency.name &&
                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}
                        >

                            <Paper elevation={3} className={accountCss[accounts.indexOf(data)]}
                                onClick={() => selectAccount(data)} component={"div"}
                            >


                                <h2>{data.account_name}</h2>
                                <span>{data.account_type}</span>
                                <p>{data.account_no}</p>
                                <h4>{data.balance}</h4>

                            </Paper>

                        </Col>

                    )
                }
            </Row>

        )
    }


    return (
        <Row>
            <Col span={7} >
                <Navigation />
            </Col>

            <Col span={17} >

                <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="Company Name"
                    onChange={(e) => onCompanyName(e.target.value)}
                />

                <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="Amount"
                    onChange={(e) => onAmount(e.target.value)}
                />

                <Dropdown value={selectCurrency} options={currency} onChange={onCurrencyChange}
                    optionLabel="name" placeholder="Currency" className="form-element-dropdown" />

                <br />
                {

                  (  selectCurrency.name !== '' &&  companyName !=='' && amount > 0 ) &&
                    <div>

                        <Paper className={classes.root}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Accounts" />
                                <Tab label="Credit Cards" />

                            </Tabs>


                        </Paper>




                        <div>

                            {value === 0 &&
                                <Accounts />
                            }
                            {
                                value === 1 &&
                                <Cards />
                            }

                        </div>


                        <p style={{ marginBottom: '2%' }} > </p>

                        {
                            failed &&
                            <Alert severity="error" className={classes.warning}   >{failedText}</Alert>
                        }

                        {
                            succeed &&
                            <Alert severity="success" className={classes.warning}  >Purchase has been succeed</Alert>
                        }

                        <Button variant="contained" color="secondary" onClick={() => CompletePayment()}>
                            PURCHASE
                        </Button>

                    </div>
                }


            </Col>
        </Row>
    )
}

export default PickPayment
