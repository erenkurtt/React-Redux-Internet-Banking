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


const Cards = () => {

    const apiUrl = useSelector(state => state.ApiReducer);

    const [cards, setcards] = useState([]);

    useEffect(() => {

        axios.get(apiUrl + "/cards").then((data) => {
            if (cards)
                setcards(data.data);
        })

        return () => { }
    }, [])

    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    // const handleChange = (_event, newValue) => {
    //     setValue(newValue);
    // };

    const DisplayCards = () => {
        return (
            <Row  >
                {
                    cards &&
                    cards.map(data =>

                        <Col span={10} key={data.card_no} style={{ margin: "1%" }}>
                            <Link to={`/cards/${data.card_no}`} >
                                <Paper elevation={3}>

                                    <h2>{data.card_no}</h2>
                                    <span>{data.bank_id}</span>
                                    <p>{data.last_month} - {data.last_year}</p>
                                    <h4>{data.limit} {data.currency}</h4>

                                </Paper>
                            </Link>
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
                <h1>Cards</h1>

                <Link to="/create-new-card" >
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                    >
                        Create New Card
                    </Button>
                </Link>

                <DisplayCards />
            </Col>



        </Row>


    )
}

export default Cards
