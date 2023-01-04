import {useEffect,useState,useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTime } from '../../container/hook/useTime'
import { Character } from './Character'
import UI from './UI'
import './css/battle.css'
import { useGameData } from '../../container/hook/useGameData'
import { useUserInfo } from '../../container/hook/useUserInfo'
import { Button, Modal } from 'antd'
import { DollarOutlined, SketchOutlined } from '@ant-design/icons'


const BattleField = ({tile_size,tiles})=>{
    const {tick,timerPause} = useTime();
    const [myCharacters,setMyCharacters] = useState([]);

    const {state} = useLocation();
    const navigate = useNavigate();

    const [cost,setCost] = useState(98);
    const generateCostRate = 1;

    const {stages, characters} = useGameData();
    const [stage,setStage] = useState(JSON.parse(JSON.stringify(stages[(state)?state.stageID:0].enemys)));

    const {yourCharacters, setWinStage, gainMoney, gainDiamond} = useUserInfo();
    
    const yourTowerMax = 500;
    const [yourTower,setYourTower] = useState(500);
    const enemyTowerMax = (state)?stages[state.stageID].tower:123;
    const [enemyTower,setEnemyTower] = useState((state)?stages[state.stageID].tower:123);

    const [gameFinish,setGameFinish] = useState(false);
    const [win,setWin] = useState(undefined);

    const [drop,setDrop] = useState({});


    const generateCharacter=({id,x,y})=>{
        const thisCharacter = characters.filter((c)=>(c.name===id))[0];
        if(!thisCharacter){
            console.log(new Error(`cannot found character name ${id}`));
            return
        }
        if(cost >= thisCharacter.cost){
            setCost((prev)=>(prev - thisCharacter.cost))
            const level = yourCharacters[id];
            var newCharacter = new Character(
                x*tile_size,
                y*tile_size,
                id,
                thisCharacter.tag,
                thisCharacter.cost,
                thisCharacter.speed,
                thisCharacter.targetLength,
                thisCharacter.hp * (level*0.25+0.75),
                thisCharacter.atk* (level*0.25+0.75),
                thisCharacter.atkCD);
            setMyCharacters((old)=>([...old,newCharacter]));
        }
        return;
    }
    
    const moveCharacter=()=>{
        myCharacters.forEach(element => {
            if(!element.target){
            element.move();}
        });
        return;
    }

    const targetCharacter=()=>{
        // aim target
        myCharacters.forEach(
            (c)=>{
                if(c.target){
                    if(c.target.hp<0)c.target=undefined;
                    else if((c.target.x-c.x)**2+(c.target.y-c.y)**2<c.target_distance)return;
                }
                c.target_distance = 9999;
                myCharacters.forEach(
                    (c2)=>{
                        if(c.tag.includes('enemy')===c2.tag.includes('enemy'))return;
                        if((c2.x-c.x)**2+(c2.y-c.y)**2<c.target_distance){
                            c.target = c2;
                            c.target_distance = (c2.x-c.x)**2+(c2.y-c.y)**2;
                        }
                    }
                )
                if(c.target_distance>c.targetLength){
                    c.target = undefined;
                }
            }
        )
        return;
    }

    const attackCharacter=()=>{
        // attack
        myCharacters.forEach(
            (c)=>{
                if(!c.target)return;
                if(c.atkCDcount>0){
                    c.atkCDcount-=1;return;
                }
                if(c.target_distance<c.targetLength){
                    if(c.tag.includes('range')){
                        const available_targets = myCharacters.filter(
                            // not ally
                            (c2)=> ((c2.tag.includes('enemy')&&!c.tag.includes('enemy'))||
                            (!c2.tag.includes('enemy')&&c.tag.includes('enemy'))) &&
                            // distance is near
                            Math.abs((c2.x-c.x)**2+(c.y-c2.y)**2-c.target_distance)<=20
                        )
                        for(var c2 of available_targets){
                            c2.hp -= c.atk;
                            
                        }
                        c.atkCDcount = c.atkCD;
                    }
                    else {
                        c.target.hp -= c.atk;
                        c.atkCDcount = c.atkCD;
                    }
                }
            }
        )
        return;
    }

    const CharacterDie = ()=>{
        setMyCharacters((old)=>(old.filter((c)=>c.hp>0)));
        return;
    }

    const generateEnemy = () => {
        stage.forEach((e)=>{
            e.countReSpawn = e.countReSpawn - 1;
            if(e.countReSpawn <= 0 && e.count !== 0 && enemyTower <= e.towerHP){
                const thisCharacter = characters.filter((aaaaa)=>(aaaaa.name===e.name))[0];
                
                var newCharacter = new Character(
                    10,
                    Math.floor(Math.random()*4)*tile_size,
                    e.name,
                    [...thisCharacter.tag,'enemy'],
                    thisCharacter.cost,
                    thisCharacter.speed,
                    thisCharacter.targetLength,
                    thisCharacter.hp  * (e.level*0.25+0.75),
                    thisCharacter.atk * (e.level*0.25+0.75),
                    thisCharacter.atkCD);
                setMyCharacters((old)=>([...old,newCharacter]));
                e.countReSpawn = e.reSpawnTime;
                e.count -= 1;
            }
        })
    }

    const gainCost = () => {
        setCost((st)=>( st + generateCostRate));
        return;
    }

    const damageTower = ()=>{
        myCharacters.forEach(
            (c)=>{
                if(c.tag.includes('enemy')){
                    if(c.x > 85){
                        c.hp = 0;
                        setYourTower((origin_hp)=>(origin_hp-c.atk));
                    }
                }
                else {
                    if(c.x < 10){
                        c.hp = 0;
                        setEnemyTower((origin_hp)=>(origin_hp-c.atk));
                    }
                }
                
            }
        )
    }

    const checkGameEnd = ()=>{
        if(enemyTower<=0){
            const maxMoney = Number(stages[state.stageID].drop.maxMoney);
            const minMoney = Number(stages[state.stageID].drop.minMoney);
            const maxDiamond = Number(stages[state.stageID].drop.maxDiamond);
            const minDiamond = Number(stages[state.stageID].drop.minDiamond);
            
            const dropMoney   = Math.floor(Math.random()*(maxMoney  - minMoney)) +  minMoney;
            const dropDiamond = Math.floor(Math.random()*(maxDiamond- minDiamond)) + minDiamond;

            setDrop({diamond:dropDiamond,money:dropMoney});
            
            gainMoney({amount:dropMoney});
            gainDiamond({amount:dropDiamond});
            setWin('win');
            setGameFinish(true);
            setMyCharacters((old)=>[]);
            timerPause();
        }
        else if(yourTower<=0){
            setWin('lose');
            setGameFinish(true);
            setMyCharacters((old)=>[]);
            timerPause();
        }return;
    }

    const gameLogic = () => {
        moveCharacter();
        targetCharacter();
        attackCharacter();
        damageTower();
        checkGameEnd();
        CharacterDie();
        generateEnemy();
        gainCost();
        return;
    }

    useEffect(()=>{
        if(win==='win')
        setWinStage({stageID:state.stageID});
    },[win])

    useEffect(()=>{
        if(!gameFinish)
        gameLogic();
    },[tick])

    return (
        <div id='battleField'>
            <div id='background'></div>
            {
                myCharacters.sort((a,b)=>(a.y<b.y)?-1:1).map((c)=>{return c.render()})
            }
            {
                tiles.map((e,i)=>(
                    e.map((ee,j)=>{
                        return (ee===1)?<div className='tile'
                        id={`tile${j}`}
                        key={`tile${i} ${j}`}
                        draggable='false'
                        Style={`--x:${i*tile_size};--y:${j*tile_size};--size:${tile_size};`}
                        onDragStart={(e)=>{e.preventDefault();return false;}}
                        onDragEnter={(e)=>{e.preventDefault();if(i>5)e.target.style.backgroundColor='red'}}
                        onDragLeave={(e)=>{e.preventDefault();if(i>5)e.target.style.backgroundColor='transparent'}}
                        onDragOver={(e)=>{e.preventDefault();}}
                        onDrop={
                            (e)=>{
                            if(i<=5)return;
                            if(e.dataTransfer.getData('Dragged')!==''){
                                generateCharacter({id:e.dataTransfer.getData('Dragged'),x:i,y:j});
                            }
                            e.target.style.backgroundColor='transparent';
                            e.dataTransfer.setData('Dragged',undefined);
                        }}></div>:
                        <></>
                    })
                ))
            } 
            <img className='Tower myTower' src={require('../img/tower.png')}></img>
            <p key='myTowerHP' className='Tower myTowerHP'>{`${yourTower} / ${yourTowerMax}`}</p>
            <img className='Tower enemyTower' src={require('../img/tower.png')}></img>
            <p key='enemyTowerHP' className='Tower enemyTowerHP'>{`${enemyTower} / ${enemyTowerMax}`}</p>
            <UI cost={cost} stageName={(state)?stages[state.stageID].name:'未確認關卡'}/>
            <Modal
            title={(win==='win')?'大獲全勝':'慘敗...'}
            open={gameFinish}
            onCancel={()=>{
                navigate('/StageSelect');
            }}
            footer={[
                <Button onClick={()=>{navigate('/StageSelect')}} >返回</Button>,
            ]}
            closable={false}>
                {
                (win==='win')?
                <>
                    {'掉落品:'}
                    <p id="diamonds" key="dropDiamonds" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <SketchOutlined style={{color:'lightblue',height:'20px'}}/>
                        {drop.diamond}
                    </p>
                    <p id="money" key="dropMoney" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <DollarOutlined style={{color:'gold',height:'20px'}}/>
                        {drop.money}
                    </p>
                </>:
                <>
                    <p id="youLose" key="youLose">
                        {
                            ['這個隊伍齁就是遜啦',
                            '這麼簡單的關卡都能輸，雜魚❤',
                            '雖然是遊戲輸掉，但這可不是鬧著玩的',
                            '試著強化隊伍角色或改變隊伍來加強你的戰力吧',
                            '這到底是甚麼閃現阿',
                            '前往(https://r.mtdv.me/k8kSIy65cN)即可觀看最新攻略'][Math.floor(Math.random()*6)]
                        }
                    </p>
                </>
                }
            </Modal>
        </div>
    )
}
export default BattleField;