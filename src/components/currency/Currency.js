import React from 'react';
import {Row , Col} from 'antd';
import Navigation from '../Navigation';

const Currency = () => {
    return (
        <Row>
            <Col span={7} >
                <Navigation />
            </Col>

            <Col span={17} >
                currency
            </Col>
        </Row>
    )
}

export default Currency
