import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { Row, Col, AutoComplete } from 'antd';


import Navigation from '../Navigation';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import OpacityIcon from '@material-ui/icons/Opacity';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RssFeedIcon from '@material-ui/icons/RssFeed';

import {
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },

    emptyTable: {
        margin: theme.spacing(1),
        display: 'inline-block',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: theme.spacing(15),
        height: theme.spacing(20),
        backgroundColor: '#e6eded',
        cursor: 'pointer',
        transitionDuration: '0.5s',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: "rgb(247, 247, 247,0.8)",
            transition: '0.5s',
        },
    },

    paymentIcons: {
        fontSize: theme.spacing(15),

    }
}));


const Payments = () => {

    const classes = useStyles();



    return (
        <Row>
            <Col span={7} >
                <Navigation />
            </Col>

            <Col span={17} >


                <Link to="/payment/Electrik" >
                    <Paper elevation={3} className={classes.emptyTable}
                    >
                        <OfflineBoltIcon className={classes.paymentIcons} />
                        <p style={{ textAlign: 'center' }}>Electrik</p>
                    </Paper>

                </Link>

                <Link to="/payment/Water" >

                    <Paper elevation={3} className={classes.emptyTable}
                    >
                        <OpacityIcon className={classes.paymentIcons} />
                        <p style={{ textAlign: 'center' }}>Water</p>
                    </Paper>
                </Link>

                <Link to="/payment/Energy" >

                    <Paper elevation={3} className={classes.emptyTable}
                    >
                        <WhatshotIcon className={classes.paymentIcons} />
                        <p style={{ textAlign: 'center' }}>Energy</p>
                    </Paper>

                </Link>

                <Link to="/payment/phonebill" >

                    <Paper elevation={3} className={classes.emptyTable}
                    >
                        <PhoneIphoneIcon className={classes.paymentIcons} />
                        <p style={{ textAlign: 'center' }}>Phone bill</p>
                    </Paper>
                </Link>

                <Link to="/payment/internetbill" >

                    <Paper elevation={3} className={classes.emptyTable}
                    >
                        <RssFeedIcon className={classes.paymentIcons} />
                        <p style={{ textAlign: 'center' }}>Internet bill</p>
                    </Paper>

                </Link>

            </Col>
        </Row>


    )
}

export default Payments
