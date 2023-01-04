/*
Stage format:
name: recommend length (1~5)
tower: enemy tower health (no restriction)
enemys: [
    {
        name: length > 1
        reSpawnTime: (how much time the enemy respawn) >0 integer
        countReSpawn: (first time enemy spawn)
        towerHP: (at what enemy tower HP restriction will it spawn)
        count: total turns to spawn (-1 means infintie)
    }
drop: [
    {
        minMoney: min drop money
        maxMoney: max drop money
        .
        .
        .
    }
]
]
*/



const stageList = [
    {
        name:"1.  傳說的開始",
        tower:3,
        enemys:[
            {name:"weakdoge",reSpawnTime:99999,countReSpawn:50,towerHP:3,count:-1,level:1},
            {name:"starburst",reSpawnTime:1000,countReSpawn:1,towerHP:2,count:1,level:1},
        ],
        drop:{
            minMoney:22222,
            maxMoney:111111,
            minDiamond:12345,
            maxDiamond:34567,
        }
    },
    {
        name:"2.  窩不知道",
        tower:10,
        enemys:[
            {name:"ie",reSpawnTime:50,countReSpawn:50,towerHP:100,count:-1,level:1},
            {name:"starburst",reSpawnTime:1000,countReSpawn:1000,towerHP:100,count:1,level:1},
        ],
        drop:{
            minMoney:22222,
            maxMoney:111111,
            minDiamond:12345,
            maxDiamond:34567,
        }
    },
    {
        name:"3.  窩又不知道",
        tower:10,
        enemys:[
            {name:"ie",reSpawnTime:50,countReSpawn:50,towerHP:100,count:-1,level:1},
            {name:"starburst",reSpawnTime:1000,countReSpawn:1000,towerHP:100,count:1,level:1},
        ],
        drop:{
            minMoney:22222,
            maxMoney:111111,
            minDiamond:12345,
            maxDiamond:34567,
        }
    },
    {
        name:"4.  不要問窩",
        tower:10,
        enemys:[
            {name:"ie",reSpawnTime:50,countReSpawn:50,towerHP:100,count:-1,level:1},
            {name:"starburst",reSpawnTime:1000,countReSpawn:1000,towerHP:100,count:1,level:1},
        ],
        drop:{
            minMoney:22222,
            maxMoney:111111,
            minDiamond:12345,
            maxDiamond:34567,
        }
    },
];
/*
character format:
name        : recommend ( 2~6 )
atk         : recommend (10~400)
hp          : recommend (50~2000)
targetLength: recommend (100~1000)
speed       : recommend (0.01 ~ 0.5)
tag         : 'ground' 'enemy' currently no use
cost        : $50 ~ $ 1000
atkCD       : recommend ( 180 ~ 5 )
*/
const characterList = [
    {name:"characterTest",atk:50,hp:100, targetLength:115,  speed:0.5,  tag:['ground'],  cost:100, atkCD:40},
    {name:"weakdoge",     atk:50,hp:50,  targetLength:223,  speed:1,    tag:['ground'],  cost:100, atkCD:20},
    {name:"starburst",    atk:99,hp:500, targetLength:440,  speed:0.3,  tag:['ground'],  cost:900, atkCD:60},
    {name:"ie",           atk:50,hp:1000,targetLength:1000, speed:0.2,  tag:['ground','range'],  cost:100, atkCD:130},
]

export { stageList , characterList };