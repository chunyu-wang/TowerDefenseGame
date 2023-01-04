import {useUserInfo} from '../../container/hook/useUserInfo';
import UserPanel from '../UserPanel/UserPanel';
import { useState } from 'react';
import './css/gotcha.css';
import { Button, Modal } from 'antd';
const GotchaPage = ()=>{
    const {diamond,Gotcha} = useUserInfo();
    const [open,setOpen] = useState(false);
    const [gotchaResult,setGotchaResult] = useState([]);
    const delayRoll = async(count)=>{
        setTimeout(async()=>{
            const item = await Gotcha();
            setGotchaResult((old)=>([...old,item]));
            if(count>1)delayRoll(count-1);
        },250);
        return;
    }
    const roll = async(count)=>{
        if(count * 10 <= diamond){
            setGotchaResult(()=>[]);
            setOpen(true);
            delayRoll(count);
        }
        else {
            alert('diamond is not enough');
            //console.log('diamond is not enough')
        }
    }
    return (
    <div id="GotchaPage" key='GotchaPage'>
        <div id="GotchaContainer" key='GotchaContainer'>
            <button className='roll' key='X01'id='X01' onClick={(e)=>{e.preventDefault(); roll(1)}}>
                <div key='LeftLeft' className='buttonText leftButton'>轉蛋X01</div>
                <div key='LeftRight' className='buttonText rightButton'>鑽石X10</div>
            </button>
            <button className='roll' key='X10'id='X10'  onClick={(e)=>{e.preventDefault(); roll(10)}}>
                <div key='RightLeft' className='buttonText leftButton'>轉蛋X10</div>
                <div key='RightRight' className='buttonText rightButton'>鑽石X100</div>
            </button>
        </div>
        <div id="GotchaUI" key="GotchaUI">
            <UserPanel/>
        </div>
        <Modal
        title={'抽卡結果'}
        open={open}
        closable={false}
        style={{overflow:'hidden'}}
        keyboard={false}
        key="Modal"
        footer={
            (gotchaResult.length===1||gotchaResult.length===10)?[<Button onClick={()=>setOpen(false)} key="closeModal">關閉</Button>]:null
        }>
            {
                <div style={{overflowX:'hidden',overflowY:'scroll'}} key='ModalInsideMessages'>
                {
                    gotchaResult.map((item,i)=>(
                    <div style={{backgroundColor:'azure',margin:'1vh',padding:'1vh',
                    border:'2px dashed black',borderRadius:'5px',width:'93%',transition:'400ms'}}
                    key={'ModalMessage'+i}>
                    {item}
                    </div>))
                }
                </div>
            }
        </Modal>
    </div>)
}

export default GotchaPage;