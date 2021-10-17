import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd'
import { Input } from 'antd';
import { Button, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Alert from '@material-ui/lab/Alert';
import '../App.css';
import { useHistory } from "react-router-dom";

const Login = () => {

    const apiUrl = useSelector(state => state.ApiReducer);
    let history = useHistory();
     
    const [usernumb, setusernumb] = useState("");
    const [password, setpassword] = useState("");

    const [failed, setfailed] = useState(false);
    const [failedText, setfailedText] = useState("")

    function returnValue( usernumb ){
        console.log(usernumb + password);
        GetUser( usernumb )
    }


    async function GetUser(payload) {

        try {
            let result =
                await axios.get(apiUrl + "/users/getUser/" + payload).then((result) => {
              

                    if(result.data[0].password === password){
                        console.log("yes");
                        localStorage.setItem("bankId", payload );

                        setTimeout(() => {
                            history.push("/accounts");
                            window.location.reload();
                        }, 200);
                        
                    }
                    else{
                        setfailedText("Login failed");
                        setfailed(true);
                  
                    }
        
            
                } )

        }
        catch (e) {
            console.log(e);
            setfailed(true);
            setfailedText("Login failed");
        }
    }



    return (
        <div>
            <Row  justify="center" align="middle"  style={{height:'100vh'}}>
                
                <Col span={12} >
                    <h1 style={{textAlign:'center'}}> Eren Kurt Bank Application</h1>

                    <Input size="large" placeholder="User Number" prefix={<UserOutlined />}
                     style={{width:'70%' , margin:'1% 15% 1% 15%'}} onChange={(e) => setusernumb(e.target.value)} />

                    <Input.Password size="large" placeholder="Password" 
                     style={{ width:'70%' ,   margin:'1% 15% 1% 15%'}} onChange={(e) => setpassword(e.target.value)} />

                    <Button   type="primary" size={"large"}  onClick={() => returnValue( usernumb ) }
                     style={{ width:'70%'  , margin:'1% 15% 1% 15%'}} >
                        Login
                    </Button>

                    {
                        failed &&
                        <Alert severity="error"    >{failedText}</Alert>

                    }

                </Col>
              
                {/* 
                            margin:'30% 20% 2% 20%' ,
                        margin:'2% 20% 2% 20%' ,
                    margin:'2% 20% 10% 20% ' ,
                 */}

            </Row>


        </div>
    )
}

export default Login
