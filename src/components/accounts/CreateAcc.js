import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import "./css/CreateAcc.css";
import { Row, Col } from 'antd';
import Navigation from '../Navigation';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    warning: {
        width: '50%',
        marginBottom: '2%'
    },
}));

const CreateAcc = () => {
    const classes = useStyles();

    const currency = [
        { name: 'tl' },
        { name: 'dolar' },
        { name: 'euro' }
    ];

    const accountType = [
        { name: 'DRAWING' },
        { name: 'DEPOSIT' }
    ]

    const dueDate = () => {

        let arr = [];
        for (var i = 1; i <= 24; i++) {
            arr.push({ time: i });
        }
        return arr;
    }

    const [accName, setaccName] = useState(null);
    const [selectCurrency, setSelectCurrency] = useState({ name: '' });
    const [selectType, setSelectType] = useState({ name: '' });

    const [duedate, setdueDate] = useState(null);

    const [accounts, setaccounts] = useState([]);
    const apiUrl = useSelector(state => state.ApiReducer);

    const [alerted, setalerted] = useState(false);
    const [totalAcc, settotalAcc] = useState(0)

    const [succpost, setsuccpost] = useState(false);

    useEffect(() => {

        axios.get(apiUrl + "/accounts/"+ localStorage.getItem("bankId") ).then((data) => {
            if (accounts)
                setaccounts(data.data);
                console.log(data.data);
        })

        axios.get(apiUrl + "/accounts").then((data) => {
         
            settotalAcc( data.data[ data.data.length -1 ].id );
        })

        return () => { }
    }, [])


    const onCurrencyChange = (e) => {
        setSelectCurrency(e.value);
        console.log(selectCurrency);
    }

    const onTypeChange = (e) => {
        setSelectType(e.value);
        console.log(e.value);
    }


    const onDueDate = (e) => {
        setdueDate(e.value);
        console.log(e.value);
    }

    async function PostNewAccount(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/accounts", payload, {
                    headers: { Authorization: `Bearer` },
                }).then( result => setsuccpost(true) )
                
        }
        catch (e) {
            console.log(e);
        }
    }

    function PostAccount() {

        if (accName !== null && selectType.name !== '' && selectCurrency.name !== '') {

            let setId = totalAcc + 1

            let postAcc = {
                username: "Eren Kurt",
                bank_id: 123567,
                account_name: accName,
                account_type: selectType.name === "DRAWING" ? "drawing" : "deposit",
                due_date: duedate === null ? 0 : duedate.time,
                account_no: "ACC-" + accounts[accounts.length - 1].bank_id + "-" +
                    "Eren".toUpperCase() + "-" + setId,
                whereIs: "NY US",
                balance: 0,
                currency: selectCurrency.name,
                iban: "IBAN-" + accounts[accounts.length - 1].bank_id + "-" +
                    "Eren".toUpperCase() + "-" + setId
            }

            PostNewAccount(postAcc);

        }
        else {
            setalerted(true)
          
        }



    }


    return (
        <div>
            <Row>
                <Col span={7}>
                    <Navigation />
                </Col>

                <Col span={17} >
                    <Typography variant="h4" gutterBottom>
                        Create Account
                    </Typography>

                    <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="ACCOUNT NAME*"
                        onBlur={(e) => setaccName(e.target.value)} />

                    <Dropdown value={selectCurrency} options={currency} onChange={onCurrencyChange}
                        optionLabel="name" placeholder="Currency*" // className="form-element"
                    />

                    <p style={{ marginBottom: '2%' }} > </p>

                    <Dropdown value={selectType} options={accountType} onChange={onTypeChange}
                        optionLabel="name" placeholder="Type*" //className="form-element"
                    />

                    {
                        selectType.name === 'DEPOSIT' &&

                        <div style={{ marginTop: '2%', marginBottom: '2%' }} >

                            <Dropdown value={duedate} options={dueDate()} onChange={onDueDate}
                                optionLabel="time" placeholder="Due Date*" // className="form-element"
                            />

                        </div>

                    }

                    <p style={{ marginBottom: '2%' }} > </p>

                    {
                        alerted &&
                        <Alert severity="error" className={classes.warning}   >Please fill all inputs</Alert>
                        
                    }

                    {
                        succpost && 
                        <Alert severity="success"  className={classes.warning}  >New Account Has been Created!</Alert> 
                    }


                    <Button variant="contained" color="secondary" onClick={() => PostAccount()} >
                        Create Account
                    </Button>
                </Col>
            </Row>


        </div>
    )
}

export default CreateAcc;
