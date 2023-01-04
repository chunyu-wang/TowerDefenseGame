import './css/HomePage.css'
import UserPanel from "../UserPanel/UserPanel";
import { Button , Modal } from 'antd';
import { useRef , useState } from 'react';
import { ExperimentFilled , TeamOutlined, TrophyFilled , HomeFilled, UserOutlined, SketchOutlined, DollarOutlined} from '@ant-design/icons'
import Title from 'antd/lib/skeleton/Title';

const Home = () => {
    const [modalIndex, setModalIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const ModalContext = [
    <><div>
        <p style={{fontWeight:'900'}}>主頁:</p>
        <p>主頁就只是一個主頁，他能把你丟到其他頁面</p>
    </div></>,
    <><div>
        <p style={{fontWeight:'900'}}>背包:</p>
        <p>在背包裡你能升級角色，並檢視其基本資料</p>
    </div></>,
    <><div>
        <p style={{fontWeight:'900'}}>編隊:</p>
        <p>在編隊裡面，你可以透過拖曳綠色區塊中的角色(你的角色)到上方欄位(隊伍)完成編成，左右滑動以顯示所有角色</p>
    </div></>,
    <><div>
    <p style={{fontWeight:'900'}}>戰鬥:</p>
    <p>在戰鬥介面，你可以左右滑動或是左右箭頭選擇關卡</p>
    </div></>,
    <><div>
    <p style={{fontWeight:'900'}}>關卡:</p>
    <p>在關卡裡面，左上角分別是"暫停鍵/繼續鍵"和"離開鍵"，功能顧名思義，
        下方角色拖曳到上方的場地進行施放，其中玩家是右方的塔，敵人是左方的塔，擊毀敵人的塔即獲得勝利</p>
    </div></>,
    <><div>
    <p style={{fontWeight:'900'}}>轉蛋:</p>
    <p>你可以在這裡用鑽石試試你的手氣(笑)</p>
    </div></>,]

    const next = ()=>{setModalIndex(i=>i+1)};
    const prev = ()=>{setModalIndex(i=>i-1)};
    const close = ()=>{setOpen(false);setModalIndex(0);};
    return (
        <>
        <Modal open={open} onClose={() => setOpen(false) } closable={false}
        footer={
            (modalIndex===0)?[<Button onClick={next}>下一頁</Button>]:
            (modalIndex<ModalContext.length-1)?[<div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={prev} style={{width:'50%',alignSelf:'center'}}>上一頁</Button>
            <Button onClick={next}  style={{width:'50%',backgroundColor:'orange'}}>下一頁</Button></div>]:
            (modalIndex===ModalContext.length-1)?[<div style={{display:'flex',flexDirection:'row'}}>
            <Button onClick={prev} style={{width:'50%',alignSelf:'center'}}>上一頁</Button>
            <Button onClick={close}  style={{width:'50%',backgroundColor:'orange'}}>關閉</Button></div>]:undefined
        }>
            <div style={{fontSize:'4vh'}}>{ModalContext[modalIndex]}</div>
        </Modal>
        <div id='HomePage'>
            <div id="Home">
                <p id='HomePageTitle'>塔防遊戲</p>
                <Button id='Instruction' onClick={()=>{setModalIndex(0);setOpen(true);}}>
                    操作簡介
                </Button>
            </div>
            <div id="HomePageUI">
                <UserPanel/>
            </div>
        </div>
        </>
    )
}

export default Home;