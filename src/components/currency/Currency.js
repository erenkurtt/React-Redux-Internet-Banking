
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation';
import { Select } from 'antd';
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
    warning: {
        width: '50%',
        marginBottom: '2%',
        marginTop: '2%'
    },

    setMargin:{
        marginBottom: '2%',
    }
}));


const Currency = () => {
    const classes = useStyles();

    const apiUrl = useSelector(state => state.ApiReducer);


    useEffect(() => {

        axios.get(apiUrl + "/accounts/" + localStorage.getItem("bankId")).then((data) => {
            if (accounts) {
                //setaccounts(data.data);
                setaccounts(data.data);
                console.log(data.data)
            }
        });

        return () => { }
    }, [])

    const currency = [
        { name: 'tl' },
        { name: 'dolar' },
        { name: 'euro' }
    ];

    const [selectGo, setselectGo] = useState({ name: '' });
    const [selectCome, setselectCome] = useState({ name: '' });
    const [count, setcount] = useState(0);
    const [gonecount, setgonecount] = useState(0)
    const [accounts, setaccounts] = useState([]);

    const [accountsOne, setaccountsOne] = useState(null);
    const [accountsTwo, setaccountsTwo] = useState(null);

    const [success, setsuccess] = useState(false);
    const [failed, setfailed] = useState(false);
    const [failedText, setfailedText] = useState("")

    const onCurrencyGo = (e) => {
        setselectGo(e.value);

    }

    const onCurrencyCome = (e) => {
        setselectCome(e.value);

    }

    function CalculateBalance(count, selectGo, selectCome) {
        if (selectGo === 'tl' && selectCome === 'dolar') {

            setgonecount(count / 8)
        }
        else if (selectGo === 'tl' && selectCome === 'euro') {

            setgonecount(count / 9)
        }
        else if (selectGo === 'dolar' && selectCome === 'tl') {

            setgonecount(count * 8)

        }
        else if (selectGo === 'euro' && selectCome === 'tl') {

            setgonecount(count * 9)

        }
        else if (selectGo === 'dolar' && selectCome === 'euro') {

            setgonecount(count * 1.2)
        }
        else if (selectGo === 'euro' && selectCome === 'dolar') {

            setgonecount(count / 1.2)

        }
        else {

            setgonecount(count)
        }


    }

    function setBalance(e) {

        setcount(parseFloat(e));
        // console.log(count)


    }

    async function PatchAccounts(payload, id) {

        try {
            let result =
                await axios.patch(apiUrl + "/accounts/" + id, payload, {
                    headers: { Authorization: `Bearer` },
                }).then( (results) => {
                    setfailed(false);
                    setsuccess(true);
                })
                

        }
        catch (e) {
            setsuccess(false);
            setfailedText("Exchange has been failed.")
            setfailed(true);
            console.log(e);
        }
    }

    function CompleteExchange(accountsOne, accountsTwo) {


        if (gonecount > accountsOne.balance) {
            setsuccess(false);
            setfailedText("Balance is not enough for exchange.");
            setfailed(true);
        }
        else{

            PatchAccounts(  { balance: accountsOne.balance - count} , accountsOne.id );
            PatchAccounts( {balance: accountsTwo.balance + gonecount} , accountsTwo.id );
        }

    }


    return (
        <Row>
            <Col span={7} >
                <Navigation />
            </Col>

            <Col span={17} >

                <h1 >Currency Exchange </h1>

                <Dropdown value={selectGo} options={currency} onChange={onCurrencyGo}
                    optionLabel="name" placeholder="Select Currency To Receive"  className={classes.setMargin}
                />

                <br />

                <Dropdown value={selectCome} options={currency} onChange={onCurrencyCome}
                    optionLabel="name" placeholder="Select Currency To Disposal" className={classes.setMargin}
                />

                <br />

                <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="Set Count"
                    onChange={(e) => setBalance(e.target.value)} className={classes.setMargin} />


                <br/>
                {
                    selectGo.name !== '' && selectCome.name !== '' && count !== 0 &&


                    <Button variant="contained" color="secondary" className={classes.setMargin}
                        onClick={() => CalculateBalance(count, selectGo.name, selectCome.name)}>
                        Calculate
                    </Button>



                }
                {
                    gonecount !== 0 &&
                    <h2 className={classes.setMargin}  > {gonecount + " " + selectCome.name}  </h2>
                }



                <br />
                {
                    selectGo.name !== '' && accounts &&
                    <Select

                        showSearch
                        style={{ width: 400 }}
                        className="form-element"
                        size={"large"}
                        placeholder="Select Receive Account"
                        optionFilterProp="children"
                        onChange={(e) =>
                            setaccountsOne(accounts.filter(data => data.account_name === e))
                        }
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >

                        {
                            accounts.map((data) =>
                                data.currency === selectGo.name &&
                                <Option key={data.account_name} value={data.account_name}> {data.account_no} - {data.currency} - {data.balance}</Option>)
                        }

                    </Select>

                }

                {
                    selectCome.name !== '' && accounts &&
                    <Select

                        showSearch
                        style={{ width: 400 }}
                        className="form-element"
                        size={"large"}
                        placeholder="Select Disposal Account"
                        optionFilterProp="children"
                        onChange={(e) =>
                            setaccountsTwo(accounts.filter(data => data.account_name === e))
                        }
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >

                        {
                            accounts.map((data) =>
                                data.currency === selectCome.name &&
                                <Option key={data.account_name} value={data.account_name}> {data.account_no} - {data.currency} - {data.balance}</Option>)
                        }

                    </Select>

                }


                {
                    accountsOne && accountsTwo &&


                    <Button variant="contained" color="secondary" className={classes.setMargin}
                        onClick={() => CompleteExchange(accountsOne[0] , accountsTwo[0])}>
                        Purchase
                    </Button>



                }

                {
                    failed &&
                    <Alert severity="error" className={classes.warning}   >{failedText}</Alert>

                }

                {
                    success &&
                    <Alert severity="success" className={classes.warning}  >Exchange has been completed.</Alert>
                }



            </Col>
        </Row>
    )
}

export default Currency
