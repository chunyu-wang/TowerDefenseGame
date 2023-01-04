import { InfoCircleOutlined } from '@ant-design/icons';
import './css/Backpack.css'
import { DollarOutlined } from '@ant-design/icons';

const CharacterCard = ({name,level,levelUp,Info,money}) => {
    return (
        <div className="BackpackCard" key={name+'Card'+Math.random()}>
            <img className="BackpackCardImage"
            src = {(name.length>1)?require('../img/'+name+'.png'):undefined}/>

            <p className='CardLevel'>
                {`Lv. ${level}/99`}
            </p>

            <div className='CardDescription'>
                <p className="BackpackCardTitle">
                    {name}
                </p>
                <button className="LevelUpButton" onClick={()=>levelUp({name})}>
                    <p>levelUp</p>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <p/>
                        <DollarOutlined style={{color:'gold',height:'3vh'}}/>
                        <p style={{color:(money<level*10)?'rgb(240,0,0)':'black'}}>{level*10}</p>
                        <p/>
                    </div>
                </button>
                <div className="InfoButton" onClick={()=>Info({name:name})}>
                    <InfoCircleOutlined/>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard;