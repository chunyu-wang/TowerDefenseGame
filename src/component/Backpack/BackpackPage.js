import { useUserInfo } from '../../container/hook/useUserInfo'
import { useGameData } from '../../container/hook/useGameData'
import CharacterCard from './CharacterCard';
import './css/Backpack.css'
import UserPanel from '../UserPanel/UserPanel';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
const BackpackPage = () => {
    const {yourCharacters,setYourCharacters,setCharacterLevel} = useUserInfo();
    const {characters} = useGameData();
    const { money } = useUserInfo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const error = (payload) => {
        messageApi.open({
          type: 'error',
          content: <p>{payload}</p>,
          style: {width:'25vh',height:'fit-content',margin:'5vh',display:'flex',flexDirection:'row'}
        });
    };

    const showModal = ({name})=>{
        const thisCharacter = characters.filter((c)=>(c.name===name))[0];
        setModalContent(()=>thisCharacter);
        setIsModalOpen(true);
        return;
    }

    const levelUp = ({name})=>{
        if(yourCharacters[name] >= 99){
            error('已升至最高等級');
            return;
        }
        if(money < yourCharacters[name]*10){
            error('金幣不足，無法升級');
            return;
        }
        setCharacterLevel({characterName:name});
        return;
    }

    return (
        <>
        <div id="BackpackContainer" key="BackpackContainer">
        <div id="BackpackPage" key="BackpackPage">
            {
                Object.keys(yourCharacters).map(
                    (char,index)=>(
                        (yourCharacters[char]<=0)?<></>:
                        <div className='BackpackCardWrapper' key={"BackpackWrapper"+index}>
                        <CharacterCard 
                        name={char}
                        level={yourCharacters[char]}
                        levelUp={levelUp}
                        money={money}
                        Info={showModal}/>
                        </div>
                    )
                )
            }
        </div>
        
        
        <div id="BackpackUI" key="BackpackUI">
            <UserPanel/>
        </div>
        </div>
        
        <Modal title={'角色資訊  '+modalContent.name}
            key = "Modal"
            open={isModalOpen}
            onOk={()=>setIsModalOpen(false)}
            onCancel={()=>setIsModalOpen(false)}
            footer={[
            <Button onClick={()=>setIsModalOpen(false)}>
                關閉
            </Button>
        ]}
        >
            {(modalContent.tag?.includes('epic'))?  <div key="epic"  >稀有度: 史詩</div>:<></>}
            {(modalContent.tag?.includes('rare'))?  <div key="rare"  >稀有度: 稀有</div>:<></>}
            {(modalContent.tag?.includes('common'))?<div key="common">稀有度: 普通</div>:<></>}
            {''}
            {(modalContent.atk)?         <div key="atk">攻擊力:   {modalContent.atk}</div>:<></>}
            {(modalContent.hp)?          <div key="hpp">血量:     {modalContent.hp}</div>:<></>}
            {(modalContent.speed)?       <div key="spd">移動速度: {modalContent.speed*100}</div>:<></>}
            {(modalContent.targetLength)?<div key="rng">射程:     {modalContent.targetLength}</div>:<></>}
            {(modalContent.cost)?        <div key="cst">消耗費用: {modalContent.cost}</div>:<></>}
        </Modal>
        {contextHolder}
        </>
    )
}

export default BackpackPage;