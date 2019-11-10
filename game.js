console.log("start");
var myArr=["cat.jpg","dog.jpg","elephant.jpg","fish.jpg","pig.jpg","dolphin.jpg","shark.jpg","whale.jpg","cat.jpg","dog.jpg","elephant.jpg","fish.jpg","pig.jpg","dolphin.jpg","shark.jpg","whale.jpg"];
let xInt;
window.onload = function(){
  let firstCard=0;
  let secondCard=0;
  let firstCardId=0;
  let secondCardId=0;
  let countPairs=0;
  let tries=0;
 
  let win=myArr.length/2; 
  let cells = document.getElementsByClassName("cell");
  var node = document.createElement("IMG");
  node.src = "images/restart.png" ,id="rest";
  document.getElementById("topright").appendChild(node);
  node.addEventListener("click", function(event){
    restartGame();
  },false)
  main();
}

function restartGame(){
  console.log("restart");
  document.getElementById("name").innerHTML = "Memory Game";
  for (var i = 0; i < cells.length; i++) {
    console.log(cells[i]);
    cells[i].style.transform ="rotateZ(0deg)";
    if (cells[i].classList.contains("flipped") || cells[i].classList.contains("good")){
      cells[i].className ="cell";
    }
  }
  clearInterval(xInt);
  main();
  
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function main(){
  shuffle(myArr);
  firstCard=0;
  secondCard=0;
  firstCardId=0;
  secondCardId=0;
  countPairs=0;
  tries=0;
  win=myArr.length/2; 
  updateHeader(); 
  cells = document.getElementsByClassName("cell");
 
  for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML='<img src="images/'+myArr[i]+'">';
      cells[i].setAttribute("display","none");
      cells[i].addEventListener("click", function(event){
        if ((event.target.classList.contains("flipped"))||(secondCard!==0)||(event.target.nodeName == 'IMG')){
            console.log({target: event.target});
            return;
        }else{
          tries+=1;
          if (tries ==1){
            setInt("start");
          }
        }  
        event.target.style.transform ="rotateZ(5deg)";
        
        console.log(event.target);
        if ((firstCard==0) && (firstCardId!==event.target.id)){
          firstCardId=event.target.id;
          firstCard=event.target.innerHTML;
          console.log("firstCard=",firstCard);
          document.getElementById(event.target.id).classList.add("flipped");
        } else if ((secondCard==0)&&(event.target!=="img")){  
              secondCardId=event.target.id;
              secondCard=event.target.innerHTML;
              document.getElementById(secondCardId).classList.add("flipped");
              console.log("secondCard=",secondCard);
              setTimeout(check,1000); 
        }
      },false);  
  }
}

function check(){
    console.log("checking for matching:");
    console.log("firstCard=",firstCard);
    console.log("secondCard=",secondCard);
    console.log("firstCardId=",firstCardId);
    console.log("secondCardId=",secondCardId);
    if ((firstCard==secondCard)&&(firstCardId!=secondCardId)){
        document.getElementById(firstCardId).className+=" good";
        document.getElementById(secondCardId).className+=" good";
        countPairs+=1;
    } else {
      document.getElementById(firstCardId).classList.remove("flipped");
      document.getElementById(secondCardId).classList.remove("flipped")
    }
    firstCard=0;
    secondCard=0;
    firstCardId=0;
    secondCardId=0;
    if (countPairs==win){
      console.log("you won! ", countPairs);
      document.getElementById("name").innerHTML +="  *** YOU WON! ***  ";
      updateHeader(); 
      setInt("clear");
    }
}
function updateHeader(){
  elapsed=end();
  if (tries==0){
    endTime=0;
    setInt("clear");
    rating='<img src="images/star.png">'+'<img src="images/star.png">'+'<img src="images/star.png">';
    elapsed=0;
    document.getElementById("top").innerHTML = rating+"   pairs: "+countPairs+" | moves: "+tries+" | elapsed time: "+elapsed+"  ";
  }
  if (tries ==1) {
        document.getElementById("top").innerHTML = rating+"   pairs: "+countPairs+" | moves: "+tries+" | elapsed time: "+elapsed+"  ";
   } else{
        if (tries >1) {
          rating = compRating();
          document.getElementById("top").innerHTML = rating+"   pairs: "+countPairs+" | moves: "+tries+" | elapsed time: "+elapsed+"  ";
        }
  }
}

var endTime = 0;
var rating='<img src="images/star.png">'+'<img src="images/star.png">'+'<img src="images/star.png">';

function end() {
  endTime +=1;
  return endTime;
}

function compRating(){
  if (tries >26){
    rating='<img src="images/star.png">';
  } else if (tries >16){
        rating='<img src="images/star.png">'+'<img src="images/star.png">';
  }
  return rating;
}

function setInt (todo){
  if (todo=="start"){
    xInt=setInterval(updateHeader,1000);
    }else{
      clearInterval(xInt);
  }  
}