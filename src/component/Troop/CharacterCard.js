import './css/Troop.css'

const CharacterCard = ({name}) =>{
    return (
        <div className="CharacterCard" key={name+' character'}
        >
            <img className = "CharacterImage"
            id={name+' character'}
            src = {(name.length===1)?undefined:require('../img/icon/'+name+'.png')}
            draggable='true'
            onClick={(e)=>{e.preventDefault();}}
            onDrag={(e)=>{e.preventDefault();}}
            onDragStart={(e)=>{console.log(e.target.id);e.dataTransfer.setData('Dragged',e.target.id);}}/>

            <p className = "CharacterName">{name}</p>
        </div>
    )
}

export default CharacterCard;