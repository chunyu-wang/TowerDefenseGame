import './css/UserPanel.css'
import { useNavigate } from 'react-router-dom'
import { ExperimentFilled , TeamOutlined, TrophyFilled , HomeFilled, UserOutlined, SketchOutlined, DollarOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import { useUserInfo } from '../../container/hook/useUserInfo';
import { useEffect } from 'react';

const UserPanel = ()=>{
    const navigate = useNavigate();
    const {name, id, money, diamond, finishTutorial, setFinishTutorial} = useUserInfo();
    useEffect(()=>{
        if(name==='遊客'){
            navigate('/Login');
        }
    },[name])
    return (
        <>
        <div id="UserPanel" key="UserPanel">

            <div id="userinfo" key='UserInfo'>
                <p><UserOutlined/>{name}</p>
            </div>

            <button key = "toHome" id="toHome"   onClick={(e)=>{e.preventDefault();navigate('/HomePage')}}>
                <HomeFilled style={{color:'white'}} className='UserPanelIcon'/>
                <p>主頁</p>
            </button>

            <button key="toBackPack" id="toBackPack"  onClick={(e)=>{e.preventDefault();navigate('/Backpack')}}>
                <ExperimentFilled style={{color:'white'}} className='UserPanelIcon'/>
                <p>背包</p>
            </button>

            <button key="toTroop" id="toTroop"   onClick={(e)=>{e.preventDefault();navigate('/Troop')}}>
                <TeamOutlined style={{color:'white'}} className='UserPanelIcon'/>
                <p>編隊</p>
            </button>

            <button key="toStageSelect"id="toStageSelect" onClick={(e)=>{e.preventDefault();navigate('/StageSelect')}}>
                <TrophyFilled style={{color:'white'}} className='UserPanelIcon'/>
                <p>戰鬥</p>
            </button>

            <button key="toGotcha"id="toGotcha" onClick={(e)=>{e.preventDefault();navigate('/Gotcha')}}>
                <ShoppingCartOutlined style={{color:'white'}} className='UserPanelIcon'/>
                <p>轉蛋</p>
            </button>

            <div id="items" key="items">
                <p id="diamonds" key="diamonds">
                    <SketchOutlined style={{color:'lightblue'}}/>
                    {diamond}
                </p>
                <p id="money" key="money">
                    <DollarOutlined style={{color:'gold'}}/>
                    {money}
                </p>
            </div>
        </div>
        
        </>
    )
}
export default UserPanel;