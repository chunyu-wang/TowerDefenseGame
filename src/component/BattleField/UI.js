import CharacterButton from "./CharacterButton";
import './css/battle.css'
import { useState } from "react";
import { useTime } from "../../container/hook/useTime";
import { useUserInfo } from "../../container/hook/useUserInfo";
import { useNavigate } from "react-router-dom";
import { CaretRightFilled, LoginOutlined, PauseOutlined, WarningFilled , } from '@ant-design/icons'
import { useGameData } from "../../container/hook/useGameData";
import { Button, Modal } from 'antd';

const UI = ({cost,stageName}) => {
    const {troop} = useUserInfo();
    const navigate = useNavigate();
    const {timerPause, timerResume,timerState} = useTime();
    const {stages,characters} = useGameData();
    const [showModal,setShowModal] = useState(false);

    const switchTimerState = () => {
        if(timerState === 'resume'){
            timerPause();
        }
        else if (timerState === 'pause'){
            timerResume();
        }
    }
    const leaveStage = ()=> {
        navigate('/StageSelect');
    }
    return (
        <>
            <button id = 'pause' onClick={()=>switchTimerState()}>
                {
                    (timerState==='pause')?<CaretRightFilled/>:
                    <PauseOutlined style={{fontSize:'2vw'}}/>
                }
            </button>
            <button id = 'leaveStage' onClick={()=>{timerPause();setShowModal(true)}}>
                <LoginOutlined/>
            </button>
            <p id='stageTitle'>{stageName}</p>
            <p id='cost'>{'$'+cost}</p>
            {troop.map(
                (char,i)=>(
                    <CharacterButton
                    img = {String(char)}
                    key = {char+Math.random()}
                    column = {i%5}
                    row = {Math.floor(i/5)}
                    cost = {characters.filter((c)=>(c.name===String(char)))[0]?.cost}
                    />
                )
            )}
            <Modal
            title={'來自系統的溫馨提示'}
            open={showModal}
            onCancel={()=>setShowModal(false)}
            closable={false}
            footer={[
                <Button style={{background:'red',width:'45%'}}onClick={leaveStage}>狠心離開</Button>,
                <Button style={{background:'white',width:'45%'}}onClick={()=>setShowModal(false)}>窩不知道</Button>
            ]}>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <WarningFilled color='red' style={{height:'2vh',width:'fit-content'}}/>
                    你確定要離開這場對戰嗎，所消耗的資源不會返還喔
                </div>
            </Modal>
        </>
    )
}
export default UI;