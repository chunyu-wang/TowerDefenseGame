import { createContext,useContext,useState,useEffect } from "react";

import instance from "./api";

const UserInfoContext = createContext({
    name:'',
    id:0,
    //finishTutorial:false,
    troop:[],
    diamond:0,
    money:0,
    gameProgress:1,
    yourCharacters: {},
    setYourCharacters: ()=>{},
    saveTroop:()=>{},
    setName:()=>{},
    setWinStage:()=>{},
    Gotcha:()=>{},
})

const UserInfoProvider = (props)=>{
    const [name,setName] = useState('遊客');
    const [id,setId] = useState(0);
    //const [finishTutorial,setFinishTutorial] = useState(false);
    
    // the troop you set to beat stages
    const [troop,setTroop] = useState(['characterTest','weakdoge','2','3','4']);
    // the character & level 
    // format [ name:level, ... ]
    const [yourCharacters, setYourCharacters] = useState({});
    // user Items: diamond & gold
    const [diamond,setDiamond] = useState(100);
    const [money,setMoney] = useState(100);
    // gameProgress is how much stage you have cleared + 1
    const [gameProgress,setGameProgress] = useState(1);

    const initialUserData = async(name,password) => {
        // communicate with backend, get your character's level
        const data = await instance.post('/SignIn', {
            params: {
                name,password
            }
        })
        // where is your diamond & money & name & error (e.g. name has been used)
        // should be return after you finish initial user data
        // and then we set our userInfo to them
        // also this should be a post method
        //console.log(data);

        const getUser = data.data.user;
        //console.log(getUser);

        //let getCharacters = {};
        //console.log(getUser.CharacterLevel);
        setYourCharacters(getUser.CharacterLevel);
        setDiamond(getUser.Diamond);
        setMoney(getUser.Gold);
        setTroop(getUser.Troop);
        setGameProgress(parseInt(getUser.Stage));
        setId(getUser.id);
        setName(getUser.name);
    }

    const enrollUser = async(name, password) => {
        // communicate with backend
        await initialUserData(name,password);
    }

    const loginUser = async(name, password) => {
        // commmunicate with backend
        // send get method to backend
        // you should get the name, diamond, money, characterLevel, error(e.g. wrong password)
        const data = await instance.get('/LogIn', {
            params: {
                name,password
            }
        });
        const getUser = data.data.user;
        //console.log(getUser);

        setYourCharacters(getUser.CharacterLevel);
        setDiamond(getUser.Diamond);
        setMoney(getUser.Gold);
        setTroop(getUser.Troop);
        setGameProgress(getUser.Stage);
        setId(getUser.id);
        setName(getUser.name);
        return;
    }

    const saveTroop = async({Troop}) => {
        // communicate with backend
        // you should save the troop to backend
        // only this, no return need , use post method
        const data = await instance.post('/UpdateTroop', {
            params: {
                name,Troop,
            }
        });
        setTroop(()=>Troop);
        const respond = data.data.msg;
        console.log(respond);
        return;
    }

    const gainDiamond = async({amount})=>{
        //communicate with backend;
        // use post method to update diamond, the local gold should update after server return
        const data = await instance.post('/gain/diamond', {
            params: {
                name, amount
            }
        });
        const newDiamond = data.data.data;
        console.log("Diamond");
        console.log(newDiamond);
        setDiamond(newDiamond);
        return;
    }

    const gainMoney = async({amount})=>{
        //communicate with backend;
        // use post method to update gold, the local gold should update after server return
        const data = await instance.post('/gain/money', {
            params: {
                name, amount
            }
        });
        const newMoney = data.data.data;
        console.log("Money");
        console.log(newMoney);
        setMoney(newMoney);
        return;
    }

    const setWinStage = async({stageID}) => {
        // if(stageID < gameProgress -1)
        // return;

        const data = await instance.post('/FinishStage', {
            params: {
                name,stageID,star:3,
            }
        });
        console.log(data.data);
        if(data.data.msg === 'unlock next stage'){
            setGameProgress((old)=>(data.data.gameProgress));
        }
        return;
    }

    const setCharacterLevel = async({characterName}) => {
        var newYourCharacters = JSON.parse(JSON.stringify(yourCharacters));
        const data = await instance.post('/UpdateLevel', {
            params: {
                name,
                characterName,
            }
        });
        newYourCharacters[characterName] = data.data.level;
        setMoney(data.data.Gold);
        //console.log(newYourCharacters);
        setYourCharacters((state)=>newYourCharacters);
        return;
    }

    const Gotcha = async(count)=>{
        try{
            const data = await instance.post('/Gotcha', {
                params: {
                    name,
                }
            });
            setDiamond((old)=>(old-10));
            var newItem = '';

            if(data.data.Gold){
                setMoney((old)=>(old+Number(data.data.Gold)));
                newItem = `金幣 x${data.data.Gold} ` + newItem;
            }
            if(data.data.Diamond){
                setDiamond((old)=>(old+Number(data.data.Diamond)));
                newItem = `鑽石 x${data.data.Diamond} ` + newItem;
            }
            if(data.data.item){
                if(data.data.lv === 1){
                    yourCharacters[data.data.item] = data.data.lv;
                    newItem = data.data.item + '  (unlock)';
                }
                else if(yourCharacters[data.data.item] + 5 > 99){
                    newItem = data.data.item + `  LV.${yourCharacters[data.data.item]} -> LV.${data.data.lv} , ` + newItem ;
                    yourCharacters[data.data.item] = data.data.lv;
                }
                else {
                    newItem = data.data.item + `  LV.${yourCharacters[data.data.item]} -> LV.${data.data.lv} , ` + newItem ;
                    yourCharacters[data.data.item] = data.data.lv;
                }
                
            }
            return newItem;
        }
        catch(e){console.log(e);}
    }

    return (<UserInfoContext.Provider value={{
        name,id,setName,saveTroop,
        yourCharacters,setYourCharacters,
        troop,diamond,money,gainDiamond,
        gainMoney,gameProgress,setWinStage,
        enrollUser,loginUser,setCharacterLevel,Gotcha,
        //finishTutorial,setFinishTutorial
    }} {...props}/>)
}

const useUserInfo = ()=>useContext(UserInfoContext);

export {useUserInfo,UserInfoProvider};