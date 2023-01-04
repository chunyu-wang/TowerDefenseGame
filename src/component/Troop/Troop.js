import { useGameData } from "../../container/hook/useGameData";
import { useUserInfo } from "../../container/hook/useUserInfo";
import CharacterCard from "./CharacterCard";
import TroopCard from "./TroopCard";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './css/Troop.css'
import UserPanel from "../UserPanel/UserPanel";
const TroopPage = ()=> {
    const {troop,saveTroop,yourCharacters} = useUserInfo();
    const {characters} = useGameData();
    const [myTroop, setMyTroop] = useState([]);
    const navigate = useNavigate();

    const changeTroop = ({pos,newName}) =>{
        let newTroop = Array.from(myTroop);
        newTroop[Number(pos)] = newName;
        //console.log('newTroop:',newTroop);
        setMyTroop((state)=>newTroop);
        saveTroop({Troop:newTroop})
    }
    useEffect(()=>{
        //console.log('userTroop',troop);
        setMyTroop((state)=>troop);
    },[])
    return(
        <div id="TroopPage" key="TroopPage">
            <div id="yourTroop" key='yourtroop'>
                {
                    myTroop.map(
                        (trp,i)=>(
                            <div className="cardWrapper" key={"cardWrapper"+i}>
                            <TroopCard name={trp} changeTroop={changeTroop} index={i}/>
                            </div>
                        )
                    )
                }
            </div>
            <div id="allTroop" key="allTroop">
                {
                    characters.filter((trp)=>(Object.keys(yourCharacters).includes(trp.name)))
                    .filter((trp)=>{return !myTroop.includes(trp.name)}).map(
                        (trp,i)=>(
                            <div className="cardWrapper" key={"alltroopCardWrapper"+i}>
                            <CharacterCard name={trp.name}/>
                            </div>
                        )
                    )
                }
            </div>
            <div id="TroopUI" key="troopUI">
                <UserPanel/>
            </div>
        </div>
    )
}

export default TroopPage;