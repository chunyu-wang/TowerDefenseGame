import { useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../container/hook/useUserInfo";
import { useNavigate } from "react-router-dom";
import SwitchComponent from "./switchComponent";
import './css/LoginPage.css'
import { message } from "antd";
const LoginPage = () => {
    const [type,setType] = useState('SignIn');
    const {name,id,setName,enrollUser,loginUser} = useUserInfo();
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate(); 

    const [messageApi, contextHolder] = message.useMessage();
    
    const handleErrorCode = (errMsg) => {
        if(errMsg.includes('499')){
            return '缺失帳號或密碼';
        }
        else if(errMsg.includes('498')){
            return '帳號名已存在';
        }
        else if(errMsg.includes('497')){
            return '帳號名不存在';
        }
        else if(errMsg.includes('496')){
            return '密碼錯誤';
        }
    }
    const switchType = () =>{
        setType((state)=>(state==='SignIn')?'Login':'SignIn');
    }

    const Submit = async()=>{
        // submit
        const Name = nameRef.current.value;
        const password = passwordRef.current.value;
        if(Name.length < 1 || Name.length > 8){
            error('帳號長度應為1~8');
            return;
        }
        if(password.length < 1 || password.length > 16){
            error('密碼長度應為1~16');
            return;
        }
        if(type==='SignIn'){
            try{
                await enrollUser(Name,password);
            }
            catch(e){error(handleErrorCode(String(e.message)))}
        }
        else{
            try{
                await loginUser(Name,password);
            }
            catch(e){error(handleErrorCode(String(e.message)))}
        }
    }

    const error = (payload) => {
        messageApi.open({
          type: 'error',
          content: <p>{payload}</p>,
          style: {width:'25vh',height:'fit-content',margin:'5vh',display:'flex',flexDirection:'row'}
        });
    };

    useEffect(
        ()=>{console.log(type)},[type]
    )

    useEffect(
        ()=>{
            if(name!=='遊客'){
                navigate('/HomePage');
            }
        }
        ,[name]
    )

    return (
        <div className="LoginContainer">
            <div id="LoginBlock">
                <p id="Caption">塔防遊戲</p>
                <SwitchComponent option1={'註冊'} option2={'登入'} setValue={switchType}/>
                <p className="SubTitle">帳號</p>
                <input ref={nameRef} className='input' placeholder="帳號 1~8字"/>
                <p className="SubTitle">密碼</p>
                <input type="password" ref={passwordRef} className='input' placeholder="密碼 1~16字"/>
                <button id="Submit" onClick={()=>Submit()} onSubmit={()=>Submit()}>送出</button>
            </div>
            {contextHolder}
        </div>
    );
}

export default LoginPage;