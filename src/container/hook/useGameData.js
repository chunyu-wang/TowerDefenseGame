import { createContext,useContext,useState,useEffect } from "react";
import instance from "./api";
//import { stageList ,characterList } from "./GameDataTempDB";

const GameDataContext = createContext({
    characters:[],
    stages:[],
})

const GameDataProvider = (props)=>{
    const [characters,setCharacters] = useState([]);
    const [stages, setStages] = useState([]);

    const getCharacters = async() => {
        // this is just for test data
        // TODO should add axios communicate with backend here
        var characterList = await instance.get("/getData/character", {} );
        characterList = JSON.parse(JSON.stringify(characterList.data.character));
        setCharacters((state)=>characterList);
        return;
    }

    const getStages = async() => {
        //TODO should add communicate to backend here
        var stageList = await instance.get("/getData/stage", {} )
        stageList = JSON.parse(JSON.stringify(stageList.data.stage))
        //console.log(JSON.stringify(stageList));
        setStages(stageList);
        return;
    }

    useEffect(
        ()=>{
            getCharacters();
            getStages();
        },[]
    )

    return (<GameDataContext.Provider value={{characters,stages}} {...props}/>)
}

const useGameData = ()=>useContext(GameDataContext);

export{useGameData,GameDataProvider};