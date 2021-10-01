import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation';
import { Row, Col } from 'antd';
import axios from 'axios';
import {
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Accounts = () => {

    const apiUrl = useSelector(state => state.ApiReducer);

    const [accounts, setaccounts] = useState([]);

    useEffect(() => {

        axios.get(apiUrl + "/accounts").then((data) => {
            if (accounts)
                setaccounts(data.data);
        })

        return () => { }
    }, [])

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event, newValue) => {
        setValue(newValue);
    };

    const DrawAcconts = () => {
        return (
            <Row  >
                {
                    accounts &&
                    accounts.map(data =>
                        data.account_type === "drawing" &&

                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}>
                            <Link to={`/accounts/${data.account_no}`} >
                                <Paper elevation={3} component="div">

                                    <h2>{data.account_name}</h2>
                                    <span>{data.account_type}</span>
                                    <p>{data.account_no}</p>
                                    <h4>{data.balance}</h4>

                                </Paper>
                            </Link>
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
                    accounts &&
                    accounts.map(data =>
                        data.account_type === "deposit" &&
                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}>
                            <Link to={`/accounts/${data.account_no}`} >
                                <Paper elevation={3} component="div">

                                    <h2>{data.account_name}</h2>
                                    <span>{data.account_type}</span>
                                    <p>{data.account_no}</p>
                                    <h4>{data.balance}</h4>

                                </Paper>
                            </Link>
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
                    accounts &&
                    accounts.map(data =>

                        <Col span={10} key={data.account_no} style={{ margin: "1%" }}>
                            <Link to={`/accounts/${data.account_no}`} >
                                <Paper elevation={3} component="div">

                                    <h2>{data.account_name}</h2>
                                    <span>{data.account_type}</span>
                                    <p>{data.account_no}</p>
                                    <h4>{data.balance}</h4>

                                </Paper>
                            </Link>
                        </Col>

                    )
                }
            </Row>

        )
    }


    return (
        <div>

            <Row>

                <Col span={7}>
                    <Navigation />
                </Col>

                <Col span={17}>
                    <Typography variant="h4" gutterBottom>
                        Accounts
                    </Typography>
                    <Link to="/create-account" >
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                        >
                            Create New Account
                        </Button>
                    </Link>

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

export default Accounts
