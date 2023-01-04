import { React , useEffect } from 'react'
import { TimeProvider } from './hook/useTime';
import BattleField from '../component/BattleField/BattleField';
const Battle = () => {
    const tiles = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]];
    const tile_size = 10; 
    return(
        <div id = 'battle' style={{height:'100%',width:'100%',padding:'0',margin:'0',display:'block',position:'absolute',left:'0',top:'0'}}>
            <TimeProvider>
                <BattleField tile_size={tile_size} tiles={tiles}></BattleField>
            </TimeProvider>
        </div>
    )
} 

export default Battle; 