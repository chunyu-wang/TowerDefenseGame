import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import './css/Troop.css'

const TroopCard = ({name,changeTroop,index}) =>{
    return (
        <div className="CharacterCard" key={name+Math.random()}>
            <img className = "CharacterImage"
            src = {(name.length<=1)?undefined:require('../img/icon/'+name+'.png')}
            onDragStart={(e)=>{e.preventDefault();return false;}}
            onDragEnter={(e)=>{e.preventDefault();e.target.style.backgroundColor='red'}}
            onDragLeave={(e)=>{e.preventDefault();e.target.style.backgroundColor='transparent'}}
            onDragOver={(e)=>{e.preventDefault();}}
            onDrop={
                (e)=>{
                //console.log(e.dataTransfer.getData('Dragged')==='');
                if(e.dataTransfer.getData('Dragged')!==''){
                    const newName = e.dataTransfer.getData('Dragged').split(' ')[0];
                    changeTroop({pos:index,newName});
                }
                e.target.style.backgroundColor='transparent';
                e.dataTransfer.setData('Dragged',undefined);
            }}/>

            <p className = "CharacterName"> {name} </p>
            {
                (name.length>1)?
                <button className='cross' onClick={()=>changeTroop({pos:index,newName:String(index)})}>
                <DeleteOutlined/>
                </button>:<></>
            }
        </div>
    )
}
export default TroopCard;