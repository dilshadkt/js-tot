const input=document.querySelector(".input");
resetBtn=document.querySelector(".reset-btn");
hint=document.querySelector(".hint span");
guessLeft=document.querySelector(".guess-left span");
typingInput=document.querySelector(".typing-input");
wrongLetter=document.querySelector(".wrong-letters span");
let word,incorrects=[],corrects=[],maxGuesse;
function randomWord(){
    //random object from the worlist
    let ranObj=wordLits[Math.floor(Math.random()*wordLits.length)];
    word=ranObj.word;
    maxGuesse=8;corrects=[];incorrects=[];
   
    hint.innerText=ranObj.hint;
    guessLeft.innerText=maxGuesse;
    wrongLetter.innerText=incorrects;
    let html="";
    for (let i = 0; i < word.length; i++) {
        html+=`<input type="text" disabled>`;
        
    }
    input.innerHTML=html;
}
randomWord();
function initGame(e){
    let key=e.target.value;
    if(key.match(/^[A-Za-z]+$/)&&!incorrects.includes(` ${key}`) && !corrects.includes(key)){
        
        if(word.includes(key)){
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
                if(word[i]===key){
                    corrects.push(key);
                    input.querySelectorAll("input")[i].value=key;
                }
                
            }
        }else{
            maxGuesse--;
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText=maxGuesse;
        wrongLetter.innerText=incorrects;
    }
    
    typingInput.value="";
    setTimeout(()=>{
        if(corrects.length===word.length){
            alert(` congrates! you found the word ${word.toUpperCase()}`);
            randomWord();//game reset
        }
        else if(maxGuesse<1){
            alert("Game over! you don't have reamining guesse");
            for (let i = 0; i < word.length; i++){
                input.querySelectorAll("input")[i].value=word[i];
            }
            
        }
    });
     
}

resetBtn.addEventListener("click",randomWord);
typingInput.addEventListener("input",initGame);
document.addEventListener("keydown",()=>typingInput.focus());
input.addEventListener("click",()=>typingInput.focus());

