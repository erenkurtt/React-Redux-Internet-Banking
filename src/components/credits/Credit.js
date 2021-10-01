import React, { useState } from 'react'
import { Row, Col } from 'antd';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Navigation from '../Navigation';
import './css/Credit.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as creditActions from '../../actions/CreditActions';



const Credit = () => {

    const [duedate, setdueDate] = useState({ time: 0 });
    const [selectCurrency, setSelectCurrency] = useState({ name: '' });
    const [repayment, setrepayment] = useState(0.0);
    const [amount, setamount] = useState(0);

    const dispatch = useDispatch();

    const { SetCredit } =  bindActionCreators( creditActions , dispatch )

    const currency = [
        { name: 'tl' },
        { name: 'dolar' },
        { name: 'euro' }
    ];

    const dueDate = () => {

        let arr = [];
        for (var i = 1; i <= 24; i++) {
            arr.push({ time: i });
        }
        return arr;
    }

    const onDueDate = (e) => {
        setdueDate(e.value);
        // setrepayment(calculateInterest(selectCurrency.name, amount, duedate.time));

    }

    const onCurrencyChange = (e) => {

        setSelectCurrency(e.value);
        // setrepayment( calculateInterest(selectCurrency.name, amount, duedate.time) );

    }

    function fpFix(n) {
        return Math.round(n);
    }

    const onAmount = (e) => {


        setamount(parseFloat(e));

        //console.log(amount);


    }

    //setrepayment( calculateInterest(selectCurrency.name, amount, duedate.time) );


    function calculateInterest(currency, amount, duedate) {

        //console.log( currency, amount , duedate)
        if (currency === 'tl') {
            setrepayment(fpFix(amount + (amount * 1.87 * duedate * 30 / 3650)));
        }
        else if (currency === 'dolar') {
            setrepayment(fpFix(amount + (amount * 2.58 * duedate * 30 / 3650)));
        }
        else if (currency === 'euro') {
            setrepayment(fpFix(amount + (amount * 3.05 * duedate * 30 / 3650)));
        }

    }



    return (
        <Row>
            <Col span={7} >
                <Navigation />
            </Col>

            <Col span={17} >

                <h1>Credit </h1>

                <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="Amount*"
                    onChange={(e) => onAmount(e.target.value)}
                />
                <Dropdown value={selectCurrency} options={currency} onChange={onCurrencyChange}
                    optionLabel="name" placeholder="Currency*" className="form-element-dropdown" />

                <br />

                <Dropdown value={duedate} options={dueDate()} onChange={onDueDate}
                    optionLabel="time" placeholder="Due Date*" className="form-element-dropdown"
                />

                <br />

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => calculateInterest(selectCurrency.name, amount, duedate.time)}
                    className="form-element-dropdown"
                >
                    Calculate
                </Button>



                <h2 style={{ marginTop: '2%' }} >Repayment: {repayment} {selectCurrency.name} </h2>

                {
                   ( selectCurrency.name !== "" &&  amount > 0  && duedate.time !==0 ) &&  
                    <Link to={`credits/chooseAcc/${selectCurrency.name}`} >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => SetCredit( amount, selectCurrency.name , duedate.time , repayment)}
                            className="form-element-dropdown"
                        >
                            GET THE CREDIT
                        </Button>
                    </Link>
                }


            </Col>
        </Row>

    )
}

export default Credit

//SetCredit({amount: amount, currency:  selectCurrency.name, duedate: duedate.time })