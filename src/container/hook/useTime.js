import { createContext,useContext,useState,useEffect } from "react";

const TimeContext = createContext({
    tick:0,
    timerState:'resume',
    timerPause:()=>{},
    timerResume:()=>{},
})

const TimeProvider = (props)=>{
    const [tick,setTick] = useState(0);
    const [timerState,setTimerState] = useState('pause');
    const FRAME_PER_SEC = 20;
    const [timerID,setTimerID] = useState(undefined);

    const timerPause = () => {
        if(timerState === 'resume'){
            console.log(timerID);
            clearInterval(timerID);
            setTimerID(0);
            setTimerState((state)=>'pause');
        }
    }

    const timerResume = () => {
        if(timerState === 'pause'){
            const mytimer = setInterval(()=>setTick(
            (currentTick)=>(currentTick+1)),1000/FRAME_PER_SEC);
            setTimerState((state)=>'resume');
            setTimerID(mytimer);
        }
    }

    const timerReset = () => {
        if(timerState !== 'pause'){
            console.log(new Error('you should pause the timer before reset it'));
        }
        setTick((state)=>0);
    }

    return (<TimeContext.Provider value={{tick,timerState,
    timerPause,timerResume,timerReset}} {...props}/>)
}

const useTime = ()=>useContext(TimeContext);

export{useTime,TimeProvider};