import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Row, Col } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transferActions from '../../../actions/TransferActions';


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
}));



const SelfAccounts = () => {


    const apiUrl = useSelector(state => state.ApiReducer);
    const dispatch = useDispatch();
    const { SetSender } = bindActionCreators(transferActions, dispatch);


    const [accounts, setaccounts] = useState([]);
    const [accountCss, setAccountCss] = useState([]);


    useEffect(() => {

        axios.get(apiUrl + "/accounts/" + localStorage.getItem("bankId") ).then((data) => {
            if (accounts) {
                setaccounts(data.data);
                let arr = Array(data.data.length).fill(classes.emptyTable);
                setAccountCss(arr);

            }
        });



        return () => { }
    }, [])

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

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
        console.log("i worked");

        SetSender(data);
    }

    const DrawAcconts = () => {
        return (
            <Row  >
                {
                    accounts && accountCss &&
                    accounts.map(data =>
                        data.account_type === "drawing" &&

                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}>

                            <Paper elevation={3} className={accountCss[accounts.indexOf(data)]}
                                onClick={() => selectAccount(data)} component={"div"}
                            >

                                <h2>{data.account_name}</h2>
                                <span>{data.account_type}</span>
                                <p>{data.account_no}</p>
                                <h4>{data.balance + " " + data.currency }</h4>


                            </Paper>

                        </Col>


                    )
                }
            </Row>

        )
    }

    const DepositAccounts = () => {
        return (
            <Row  >
                {
                    accounts && accountCss &&
                    accounts.map(data =>
                        data.account_type === "deposit" &&
                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}
                        >

                            <Paper elevation={3} className={accountCss[accounts.indexOf(data)]}
                                onClick={() => selectAccount(data)} component={"div"}
                            >


                                <h2>{data.account_name}</h2>
                                <span>{data.account_type}</span>
                                <p>{data.account_no}</p>
                                <h4>{data.balance + " " + data.currency}</h4>

                            </Paper>

                        </Col>

                    )
                }
            </Row>

        )
    }

    const AllAccounts = () => {
        return (
            <Row  >
                {
                    accounts && accountCss &&
                    accounts.map(data =>

                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}>

                            <Paper elevation={3} className={accountCss[accounts.indexOf(data)]}
                                onClick={() => selectAccount(data)} component={"div"}
                            >


                                <h2>{data.account_name}</h2>
                                <span>{data.account_type}</span>
                                <p>{data.account_no}</p>
                                <h4>{data.balance + " " + data.currency}</h4>


                            </Paper>

                        </Col>

                    )
                }
            </Row>

        )
    }


    return (
        <div>

            <Row>

                <Col span={24}>


                    <Paper className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="All" />
                            <Tab label="Drawing Accounts" />
                            <Tab label="Deposit Accounts" />

                        </Tabs>


                    </Paper>

                    {
                        value === 0 &&
                        <AllAccounts />
                    }

                    {
                        value === 1 &&
                        <DrawAcconts />
                    }

                    {
                        value === 2 &&
                        <DepositAccounts />
                    }

                </Col>

            </Row>


        </div>
    )
}

export default SelfAccounts;
