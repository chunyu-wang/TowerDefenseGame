import './css/battle.css'

const CharacterButton = ({img,column,row,cost}) => {
    return <div className='CharacterButton' style={{left:`${column*8+34}vw`,top:`${85}vh`}}>
        <img className='dragComponentTest'
            id = {String(img)}
            key= {`${img}`}
            style={{left:'0px',top:'0px'}}
            draggable='true'
            onClick={(e)=>{e.preventDefault();}}
            onDrag={(e)=>{e.preventDefault();}}
            onDragStart={(e)=>{e.dataTransfer.setData('Dragged',e.target.id);}}
            src = {(img.length!==1)?require('../img/icon/'+img+'.png'):undefined}
        />
        <p className = "costText">
            {(cost)?`$${cost}`:''}
        </p>
    </div>
}

export default CharacterButton;