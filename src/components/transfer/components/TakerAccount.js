import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { InputText } from 'primereact/inputtext';
import { Row, Col } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transferActions from '../../../actions/TransferActions';
import '../css/TakerAccount.css';

import { Select } from 'antd';
import { Input } from 'antd';
const { Option } = Select;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },

    // ActiveTables: {
    //     paddingTop: theme.spacing(1),
    //     paddingBottom: theme.spacing(1),
    //     //height: theme.spacing(20),
    //     backgroundColor: '#dfe362',
    //     cursor: 'pointer',
    //     transitionDuration: '0.5s',
    //     transition: '0.5s',
    //     '&:hover': {
    //         backgroundColor: "rgb(229, 235, 122)",
    //         transition: '0.5s',
    //     },
    // },
    // emptyTable: {
    //     paddingTop: theme.spacing(1),
    //     paddingBottom: theme.spacing(1),
    //     height: '100%',
    //     backgroundColor: '#e6eded',
    //     cursor: 'pointer',
    //     transitionDuration: '0.5s',
    //     transition: '0.5s',
    //     '&:hover': {
    //         backgroundColor: "rgb(247, 247, 247,0.8)",
    //         transition: '0.5s',
    //     },
    // },
}));



const TakerAccount = () => {


    const apiUrl = useSelector(state => state.ApiReducer);
    const [accounts, setaccounts] = useState([]);


    const [selectedAccounts, setselectedAccounts] = useState([]);

    const dispatch = useDispatch();

    const { SetTaker } = bindActionCreators(transferActions, dispatch);





    useEffect(() => {

        axios.get(apiUrl + "/accounts").then((data) => {
            if (selectedAccounts) {
                //setaccounts(data.data);
                setselectedAccounts(data.data);
            }
        });

        return () => { }
    }, [])

    const classes = useStyles();
    const [valueName, setValueName] = React.useState(null);
    const [valueAccNo, setvalueAccNo] = useState(null);
    const [valueIban, setvalueIban] = useState(null);


    function changeValue(data) {
        // console.log(data);
        setValueName(data[0].username);
        setvalueAccNo(data[0].account_no);
        setvalueIban(data[0].iban);

        SetTaker(data[0]);
    }

    return (
        <div>
            <Row>

                <Col span={24}>

               
                    <Select
                        value={ valueIban }
                        showSearch
                        style={{ width: 400 }}
                        className="form-element"
                        size={"large"}
                        placeholder="INPUT IBAN"
                        optionFilterProp="children"
                        onChange={(e) =>
                            changeValue(selectedAccounts.filter(data => data.iban === e))
                        }
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >

                        {
                            selectedAccounts.map((data) => 
                            <Option key={data.account_name} value={data.iban}>{data.iban}</Option>)
                        }

                    </Select>

                    <Select
                        value={ valueAccNo }
                        showSearch
                        style={{ width: 400 }}
                        className="form-element"
                        size={"large"}
                        placeholder="INPUT ACCOUNT NO"
                        optionFilterProp="children"
                        onChange={(e) =>
                            changeValue(selectedAccounts.filter(data => data.account_no === e))
                        }
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >

                        {
                            selectedAccounts.map((data) => 
                            <Option key={data.account_name} value={data.account_no}>{data.account_no}</Option>)
                        }

                    </Select>


                    <Input value={valueName} placeholder="FULLNAME OF CUSTOMER" size={'large'} style={{ width: 400 }} />



                </Col>

            </Row>

        </div>
    )
}

export default TakerAccount;
