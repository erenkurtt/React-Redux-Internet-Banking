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

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     button: {
//         margin: theme.spacing(1),
//     },

//     ActiveTables: {
//         paddingTop: theme.spacing(1),
//         paddingBottom: theme.spacing(1),
//         //height: theme.spacing(20),
//         backgroundColor: '#dfe362',
//         cursor: 'pointer',
//         transitionDuration: '0.5s',
//         transition: '0.5s',
//         '&:hover': {
//             backgroundColor: "rgb(229, 235, 122)",
//             transition: '0.5s',
//         },
//     },
//     emptyTable: {
//         paddingTop: theme.spacing(1),
//         paddingBottom: theme.spacing(1),
//         height: '100%',
//         backgroundColor: '#e6eded',
//         cursor: 'pointer',
//         transitionDuration: '0.5s',
//         transition: '0.5s',
//         '&:hover': {
//             backgroundColor: "rgb(247, 247, 247,0.8)",
//             transition: '0.5s',
//         },
//     },
// }));



const Amount = () => {


    //const apiUrl = useSelector(state => state.ApiReducer);
    const dispatch = useDispatch();
    const { SetAmount } = bindActionCreators(transferActions, dispatch);



    useEffect(() => {

        // axios.get(apiUrl + "/accounts").then((data) => {
        //     if (accounts) {
        //         setaccounts(data.data);


        //     }
        // });



        return () => { }
    }, [])

    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);




    return (
        <div>

            <Row>

                <Col span={24}>


                    <InputText type="text" className="p-inputtext-md p-d-block form-element" placeholder="AMOUNT"
                     onBlur={(e) =>  SetAmount(  parseFloat( e.target.value ) ) } 
                    />

                </Col>

            </Row>


        </div>
    )
}

export default Amount;
