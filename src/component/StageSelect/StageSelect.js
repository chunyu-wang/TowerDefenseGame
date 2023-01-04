import {useGameData} from '../../container/hook/useGameData'
import { useUserInfo } from '../../container/hook/useUserInfo'
import {useNavigate} from 'react-router-dom'
import './css/StageSelect.css'
import UserPanel from '../UserPanel/UserPanel'
import { SmallDashOutlined } from '@ant-design/icons'

const StageSelectPage = ()=>{
    const {stages} = useGameData();
    const {gameProgress} = useUserInfo();

    const navigate = useNavigate();

    return(
        <div id="stageSelectPage" key="stageSelectPage">
            <div id="stagesWrapper" key="stagesWrapper">
                {
                    stages.map(
                        (s,i)=>(
                        <>
                            {(i>0)?
                            <SmallDashOutlined style={{width:'8.88vh',height:'8.88vh',fontSize:'19vh'}} key={'...'+i}/>:<></>}
                            <div className='container' key={String(Math.random())+'container'+i}>
                                {
                                    (i<gameProgress)?
                                    <div className='stages' key={i+'stage'} onClick={()=>{navigate('/Battle',{state:{
                                        stageID:i,}})}}>
                                        <p key={i+'stagetitle'}className='stagesTitle'>{s.name}</p>
                                    </div>:
                                    <div className='stages locked' key={i+'stage.'} onClick={()=>alert('請先完成前一關才能挑戰這一關!')}>
                                        <p key={i+'stagetitle.'}className='stagesTitle'>{"關卡尚未解鎖"}</p>
                                    </div>
                                }
                            </div>
                        </>
                        )
                    )
                }
            </div>
            <div id="stageSelectUI" key='stageSelectUI'>
                <UserPanel key='UserPanel'></UserPanel>
            </div>
        </div>
    )
}
export default StageSelectPage;