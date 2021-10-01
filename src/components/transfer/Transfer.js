import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation';
import { Row, Col } from 'antd';
import SelfAccounts from './components/SelfAccounts';
import TakerAccount from './components/TakerAccount';
import Amount from './components/Amount';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    warning: {
        width: '50%',
        marginBottom: '2%',
        marginTop: '2%'
    },
}));

function getSteps() {
    return ['Select account for withdraw', 'Set outgoing account informations', 'Set transform amount'];
}

function getStepContent(stepIndex, data) {
    switch (stepIndex) {
        case 0:
            return <SelfAccounts />
        case 1:
            return <TakerAccount />;
        case 2:
            return <Amount />;
        default:
            return 'Unknown stepIndex';
    }
}

const Transfer = () => {
    const classes = useStyles();

    const apiUrl = useSelector(state => state.ApiReducer);

    const [totaltransfer, setTotaltransfer] = useState(0);

    const allPost = useSelector(state => state.TransferReducer);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const TransferReducer = useSelector(state => state.TransferReducer);
    const [status, setstatus] = useState(false);
    const [failed, setfailed] = useState(false)


    useEffect(() => {

        axios.get(apiUrl + "/transfer").then((data) => {

            setTotaltransfer(   data.data[data.data.length-1].id );
            console.log(data.data.length)
        })

        return () => { }
    }, [])


    const handleNext = () => {
        setstatus(false);

        if (activeStep === 0 && allPost.sender.length !== 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
        else if (activeStep === 1 && allPost.taker.length !== 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else if (activeStep === 2 && allPost.sender.balance >= allPost.amount && isNaN(allPost.amount) !== true) {
            let setId = totaltransfer + 1;

            PostTransfer({
                from_name: allPost.sender.username,
                from_no: allPost.sender.account_no,
                from_iban: allPost.sender.iban,
                to_name: allPost.taker.username,
                to_no: allPost.taker.account_no,
                to_iban: allPost.taker.iban,
                total: allPost.amount,
                date: new Date()
            });

            PatchAccounts({ balance: allPost.sender.balance - allPost.amount }, allPost.sender.id);
            PatchAccounts({ balance: allPost.taker.balance + allPost.amount }, allPost.taker.id);

            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }



        if (activeStep === 2) {


            console.log(allPost);
        }
    };


    async function PostTransfer(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/transfer", payload, {
                    headers: { Authorization: `Bearer` },
                })
            setstatus(true);
            setTotaltransfer(totaltransfer + 1);
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



    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);

    };

    return (
        <div className={classes.root}>

            <Row>

                <Col span={7}>

                    <Navigation />

                </Col>

                <Col span={17}>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>



                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                {
                                    status &&
                                    <Alert severity="success" className={classes.warning}>
                                        <AlertTitle>Success</AlertTitle>
                                        <strong>The transfer has been success.</strong>
                                    </Alert>


                                }
                                {
                                    failed && 
                                    <Alert severity="error" className={classes.warning}>
                                        <AlertTitle>Error</AlertTitle>
                                        <strong>The transfer has been failed.</strong>
                                    </Alert>
                                }

                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>{getStepContent(activeStep, TransferReducer)}</Typography>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                </Col>

            </Row>

        </div>
    );
}

export default Transfer
