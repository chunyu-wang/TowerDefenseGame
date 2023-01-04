import './css/Character.css' 

export class Character{
    constructor(x, y, img, tag=[], cost, speed, targetLength, hp, atk, atkCD,){
        this.x = (x===undefined)?50:x;
        this.y = (y===undefined)?50:y;
        this.maxhp = hp || 100;
        this.hp = hp || 100;
        this.atk = atk || 20;
        this.id = Math.random()*Math.random();
        this.image = img;
        this.speed = speed || 0.1;
        this.tag = tag;
        this.cost = cost || 100;

        this.targetLength = targetLength || 150;
        this.target = undefined;
        this.target_distance = 99999;

        this.atkCD = atkCD || 60;
        this.atkCDcount = 0;

        this.render = ()=>{
            return (
            <>
                <img
                className={`CharacterSprite${(tag?.includes('enemy'))?' enemy':' '}`}
                Style={`--x:${this.x};--y:${this.y};--size:10`}
                key={img+String(this.id)}
                id = {img+String(this.id)}
                draggable='false'
                onDragStart={(e)=>{e.preventDefault();return false;}}
                src = {(this.image.length>1)?require('../img/'+this.image+'.png'):undefined}
                />
                <div className='hpBar' style={{transform:`translate3d( ${2.22*(this.x+2)}vh, 40vh, ${2.22*(this.y)}vh ) translateY(-10vh)`,
                }}>
                    <div className='bar' style={{width:`${24.4*this.hp/this.maxhp}vh`,background:'green'}}/>
                    <div className='bar' style={{width:`${22.2-22.2*this.hp/this.maxhp}vh`,background:'red'}}/>
                </div>
            </>);
        }
        this.move=()=>{
            if(this.tag.includes('enemy')){
                this.x = this.x + this.speed;
            }
            else{
                this.x = this.x - this.speed;
            }
        }
    }
}