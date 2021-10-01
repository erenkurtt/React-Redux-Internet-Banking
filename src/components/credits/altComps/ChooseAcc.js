

import React, { useState, useEffect } from 'react'
import Navigation from '../../Navigation'
import { Row, Col } from 'antd';
import {
    useParams,
    Link
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
    }
}));



const ChooseAcc = () => {

    let { currency_type } = useParams();
    const apiUrl = useSelector(state => state.ApiReducer);


    const [accounts, setaccounts] = useState([]);

    const [accountCss, setAccountCss] = useState([]);

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const CreditReducer = useSelector(state => state.CreditReducer);

    const [choosed, setchoosed] = useState([])
    const [success, setsuccess] = useState(false);
    const [failed, setfailed] = useState(false);
    const [failText, setfailText] = useState("");

    const [totalCredits, settotalCredits] = useState(0);

    useEffect(() => {

        axios.get(apiUrl + "/accounts").then((data) => {
            if (accounts) {
                setaccounts(data.data);
                let arr = Array(data.data.length).fill(classes.emptyTable);
                setAccountCss(arr);

            }
        });


        axios.get(apiUrl + "/credits").then((data) => {
            settotalCredits(data.data[data.data.length-1].id);
        });


        return () => { }
    }, [])





    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };


    function selectAccount(data) {
        let temp = [];
        for (var i = 0; i < accountCss.length; i++) {
            temp[i] = classes.emptyTable;
        }
        let index = accounts.indexOf(data);
        temp[index] = classes.ActiveTables;
        setAccountCss(temp);
        setchoosed(data);

        //SetSender(data);
    }

    function PatchCredit() {

       

        if (choosed !== []) {
            PatchAccounts({ balance: choosed.balance + CreditReducer.amount }, choosed.id)
            
        }
        else {
            setsuccess(false);
            setfailText("Please select a account");
            setfailed(true);
        }
    }


    async function PatchAccounts(payload, id) {

        try {
            let result =
                await axios.patch(apiUrl + "/accounts/" + id, payload, {
                    headers: { Authorization: `Bearer` },
                })
                setfailed(false);
            setsuccess(true);

        }
        catch (e) {
            console.log(e);
            setsuccess(false);
            setfailText("Purchase has been failed")
            setfailed(true);
        }
    }


    async function PostCredit(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/credits", payload, {
                    headers: { Authorization: `Bearer` },
                })
                setfailed(false);
            setsuccess(true);

        }
        catch (e) {
            console.log(e);
            setsuccess(false);
            setfailText("Purchase has been failed")
            setfailed(true);
        }
    }



    const Accounts = () => {
        return (
            <Row  >
                {
                    accounts && accountCss &&
                    accounts.map(data =>
                        data.currency === currency_type &&
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




                <br />
                {


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

                            </Tabs>


                        </Paper>




                        <div>

                            {value === 0 &&
                                <Accounts />
                            }

                            {
                                failed &&
                                <Alert severity="error" className={classes.warning}   >{failText}</Alert>

                            }

                            {
                                success &&
                                <Alert severity="success" className={classes.warning}   >Purchase has been completed</Alert>

                            }


                        </div>


                        <p style={{ marginBottom: '2%' }} > </p>

                        <Link to="/credits" >
                            <Button variant="contained" color="secondary">
                                BACK
                            </Button>
                        </Link>

                        <Button variant="contained" color="secondary"  onClick={() => PatchCredit()}>
                            PURCHASE
                        </Button>

                    </div>
                }


            </Col>
        </Row>
    )
}

export default ChooseAcc;