import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import "../../accounts/css/CreateAcc.css";
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from '../../Navigation';


const useStyles = makeStyles((theme) => ({
    warning: {
        width: '50%',
        marginBottom: '2%',
        marginTop: '2%'
    },
}));


const CreateCard = () => {

    const classes = useStyles();

    const currency = [
        { name: 'tl' },
        { name: 'dolar' },
        { name: 'euro' }
    ];

    const apiUrl = useSelector(state => state.ApiReducer);


    const [limit, setlimit] = useState(0);
    const [selectCurrency, setSelectCurrency] = useState({ name: '' });

    const [cards, setcards] = useState([]);
    const [TotalCard, setTotalCard] = useState(0);

    const [success, setsuccess] = useState(false);
    const [failed, setfailed] = useState(false);
    const [failedText, setfailedText] = useState("")

    useEffect(() => {

        axios.get(apiUrl + "/cards").then((data) => {
            if (cards)
                setcards(data.data);
        })

        axios.get(apiUrl + "/cards").then((data) => {

            setTotalCard( data.data[data.data.length -1].id);
        })

        return () => { }
    }, [])





    const onCurrencyChange = (e) => {
        setSelectCurrency(e.value);
        console.log(selectCurrency);
    }


    async function PostCard(payload) {

        try {
            let result =
                await axios.post(apiUrl + "/cards", payload, {
                    headers: { Authorization: `Bearer` },
                }).then((result) => {
                    setfailed(false);
                    setsuccess(true);
                } )

        }
        catch (e) {
            console.log(e);
            setfailed(true);
            setsuccess(false);
        }
    }


    function PostNewCard() {

        let setId = TotalCard + 1;
        var d = new Date();

        if (limit >= 500 && selectCurrency.name !== '') {
            PostCard({
                username: cards[0].username,
                bank_id: 312456,
                card_no: "CARD-" + cards[0].bank_id + "-" + "Eren".toUpperCase() + "-" + setId,
                last_month: d.getMonth(),
                last_year: d.getFullYear() + 4,
                ccv: Math.floor(Math.random() * 1000) + 100,
                limit: limit,
                debt: 0,
                currency: selectCurrency.name
            });
        }
        else if(limit < 500  &&  selectCurrency.name !== ''){
            setsuccess(false);
            setfailedText("Limit cannot be below 500")
            setfailed(true);
            

        }
        else{
            setsuccess(false);
            setfailedText("Please fill all inputs")
            setfailed(true);
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
                        Create Card
                    </Typography>

                    <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="SET LIMIT"
                        onBlur={(e) => setlimit(parseInt(e.target.value))} />

                    <Dropdown value={selectCurrency} options={currency} onChange={onCurrencyChange}
                        optionLabel="name" placeholder="Currency" // className="form-element"
                    />


                    {
                        failed &&
                        <Alert severity="error" className={classes.warning}   >{failedText}</Alert>

                    }

                    {
                        success &&
                        <Alert severity="success" className={classes.warning}  >New Card Has been Created!</Alert>
                    }


                    <p style={{ marginBottom: '2%' }} > </p>

                    <Button variant="contained" color="secondary" onClick={() => PostNewCard()}>
                        Create Card
                    </Button>
                </Col>
            </Row>


        </div>
    )
}

export default CreateCard;
