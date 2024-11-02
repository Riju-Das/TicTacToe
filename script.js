const box = document.querySelectorAll(".box")

const firstplayerside= document.querySelector(".firstplayerside")
const secondplayerside= document.querySelector(".secondplayerside")
const submitbtn = document.querySelector(".submitbtn")
const formcontainer = document.querySelector(".startgame")
const winningplayer= document.querySelector(".winningteam")
const resetbtn = document.querySelector(".resetbtn")
function createplayer(username){
    const name = username
    return {name}
}

let p1
let p2
let p1_turn
let p2_turn
let count = 0


box.forEach((item)=>{
    
    item.addEventListener("click",(e)=>{
        
    
        gameboard.playgame(item)
        count++
        gamerules.checkforwin()
        item.classList.add("boxactive")


        
    })
})

submitbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    const player1 = document.querySelector("#player1")
    const player2 = document.querySelector("#player2")
    p1 = createplayer(player1.value)
    p2= createplayer(player2.value) 
    formcontainer.innerHTML = ""
    formcontainer.classList.remove("active")
    gameboard.startgame()

})

resetbtn.addEventListener("click",()=>{
    gameboard.resetgame()
})

const gameboard = (function(){
    const startgame=function(){

        firstplayerside.textContent = `${p1.name}'s turn `
        p1_turn =true
        p2_turn =false
    
    }
    const playgame=function(item){
        if(p1_turn==true){
            firstplayerside.textContent = ``
            secondplayerside.textContent = `${p2.name}'s turn `
            item.innerHTML="X"
            p1_turn=false
            p2_turn=true;
            
        }
        else if(p2_turn==true){
            item.innerHTML ="O"
            secondplayerside.textContent = ``
            firstplayerside.textContent = `${p1.name}'s turn `
            p2_turn=false;
            p1_turn=true
            
        }
    }
    const gamewon = function(string){
        if(string=="X"){
            winningplayer.innerHTML=`${p1.name} won the GAME!!` 
            firstplayerside.textContent = ``
            secondplayerside.textContent = ``
        }
        else if(string=="O"){
            winningplayer.innerHTML=`${p2.name} won the GAME!!` 
            firstplayerside.textContent = ``
            secondplayerside.textContent = ``
        }
        else if(string=="draw"){
            winningplayer.innerHTML=`Its a DRAW!!`
            firstplayerside.textContent = ``
            secondplayerside.textContent = `` 
        }
    }

    const resetgame= function(){
        box.forEach((item)=>{
            item.innerHTML=""
            count = 0
            winningplayer.innerHTML=``
            firstplayerside.textContent = ``
            secondplayerside.textContent = `` 
            startgame()
            item.classList.remove("boxactive")


        })
    }
    return {startgame,playgame,gamewon,resetgame}
    
})()

const gamerules= (function(){


    
    const checkforwin = function(){
        let won = false
        const winconditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ]
    
        winconditions.forEach((item)=>{
            let a = item[0]
            let b = item[1]
            let c = item[2]
            
            if(box[a].innerHTML=="O" && box[a].innerHTML==box[b].innerHTML && box[a].innerHTML==box[c].innerHTML){
                console.log("O won")
                won=true
                box.forEach((item)=>{
                    item.classList.add("boxactive")
                })
                gameboard.gamewon("O")
                
                

            }
            else if(box[a].innerHTML=="X" && box[a].innerHTML==box[b].innerHTML && box[a].innerHTML==box[c].innerHTML){
                console.log("X won")
                won=true
                box.forEach((item)=>{
                    item.classList.add("boxactive")
                })
                gameboard.gamewon("X")
            }
            
        })
        if(won==false && count==9){
            console.log("Its a draw")
            gameboard.gamewon("draw")
        }

    }


    return {checkforwin}
})()