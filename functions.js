$(document).ready(function(){
	playOneGame();
});
function playOneGame(){
	resetBoard();
	game();
}
function play1000Game(){
	var count = 0;
	playing1000games = true;
	while(count <1000){
		playOneGame();
		count++;
	}
	playing1000games= false;
}
var metaScore = [0,0];
var playing1000games = false;
var board1 = [];
var board2 = [];
var player1ShipArray = [];
var player2ShipArray = [];
var allowedShipTypes = [1,0,1];
var player1ShipTypes = [0,0,0];
var player2ShipTypes = [0,0,0];
function resetBoard(){
	board1 = [];
	board2 = [];
	player1ShipArray = [];
	player2ShipArray = [];
	allowedShipTypes = [1,0,1];
	player1ShipTypes = [0,0,0];
	player2ShipTypes = [0,0,0];
}

//var slowmow = true;

function print1(texten){
if(!playing1000games){
console.log(texten);
 document.getElementById("player1text").value = texten;
 }
}
function print(texten){
if(!playing1000games){
console.log(texten);
 document.getElementById("mainText").innerHTML = texten;
 }
}
function print2(texten){
if(!playing1000games){
console.log(texten);
 document.getElementById("player2text").value = texten;
 }
}
function updateSpot(boardNumber,x,y,action){
	var board = [];
	var ships = [];
	if( boardNumber==1){
		board = board1;
		ships = player1ShipArray;
	}else{
		board = board2;
		ships = player2ShipArray;
	}
	var spotDivID = "board"+boardNumber+"Spot"+x+","+y;

		if(action == "Fill"){
			if(board[x][y] == "Ship"){
				return "Fail";
			}else{
				board[x][y] = "Ship";
				document.getElementById(spotDivID).style.backgroundColor = "Green";
				return "Filled";
			}
		}
		if(action == "Bomb"){
			if(board[x][y] == "Empty"){
				board[x][y] = "Miss";
				document.getElementById(spotDivID).style.backgroundColor = "blue";
				return "Miss";
			}
			if(board[x][y] == "Ship"){
				board[x][y] = "Hit";
				var shipLeft =1;
				for(var j = 0; j<ships.length; j++){
					for(var i = 0; i<ships[j].length-1; i++){
					//	console.log(x+" "+ships[j][i][1])
						if(x==ships[j][i][0] && y==ships[j][i][1]){
						//	print("jag hittade vilket skepp jag träffae");
							ships[j][ships[j].length-1]--;
							shipLeft=(ships[j][ships[j].length-1]);
						}
					}
				}
				document.getElementById(spotDivID).style.backgroundColor = "red";
				if(shipLeft<1){
					return "Sink";
				}
				return "Hit";
			}else{
				return "Repeat";
			}  
		}
	
	
}
function game(){
	var board1Divs = "";
	var board2Divs = "";
	var player1Points = 0;
	var player2Points = 0;
	var shipParts = 4;
	var ruleFail = false;
	for(var i = 0; i<10; i++){
		var array1 = [];
		var array2 = [];
		for(var j = 0; j<10; j++){
			array1.push("Empty");
			array2.push("Empty");
			board1Divs += "<div class='spotDiv'  id='board1Spot"+i+","+j+"' style='top:"+i*40+"px; left:"+j*40+"px'>"+(i+1)+","+(j+1)+"</div>";
			board2Divs += "<div class='spotDiv'  id='board2Spot"+i+","+j+"' style='top:"+i*40+"px; left:"+j*40+"px'>"+(i+1)+","+(j+1)+"</div>";
		}
		board1.push(array1);
		board2.push(array2);
	}
	document.getElementById("board1").innerHTML = board1Divs;
	document.getElementById("board2").innerHTML = board2Divs;
	//hämta startpositionerna för skeppen
	player1ShipArray = startPlayer1();
	player2ShipArray = startPlayer2();
	//placera ut och kontrollera skeppen för spelare 1
	for(var j = 0; j<player1ShipArray.length; j++){
		//räkna upp antalet av en viss storlek av skepp. 
		player1ShipTypes[player1ShipArray[j][player1ShipArray[j].length-1]-1]++;
		for(var i = 0; i<player1ShipArray[j].length-1; i++){
			var update = updateSpot(1,player1ShipArray[j][i][0], player1ShipArray[j][i][1], "Fill");
			if(update == "Fail"){
				ruleFail = true;
				print1("spelare 1 placerade flera skepp på samma ruta");
			}
		}
	}
	//placera ut och kontrollera skeppen för spelare 2
	for(var j = 0; j<player2ShipArray.length; j++){
		player2ShipTypes[player2ShipArray[j][player2ShipArray[j].length-1]-1]++;
		for(var i = 0; i<player2ShipArray[j].length-1; i++){
			var update = updateSpot(2,player2ShipArray[j][i][0], player2ShipArray[j][i][1], "Fill");
			if(update == "Fail"){
				ruleFail = true;
				print1("spelare 2 placerade flera skepp på samma ruta");
			}
		}
	}
	
	for(var i = 0; i<allowedShipTypes.length; i++){
		if(player1ShipTypes[i]>allowedShipTypes[i] || player1ShipTypes[i]<allowedShipTypes[i]){
			print1("Spelare 1 har placerat ut fel mängd skepp");
			ruleFail = true;
		}
		if(player2ShipTypes[i]>allowedShipTypes[i] || player2ShipTypes[i]<allowedShipTypes[i]){
			print2("Spelare 2 har placerat ut fel mängd skepp");
			ruleFail = true;
		}
	}
	if(!ruleFail){
		var counter = 0;
		var player1History = "";
		var player2History = "";
		while(counter < 100){
			
			counter++;
			var player1Move = movePlayer1(player1History);
			player1History = "Miss";
			var xTarget = player1Move[0];
			var yTarget = player1Move[1];
			if(xTarget> 9 || yTarget >9 || xTarget<0 ||yTarget<0 ){
				player1History = "Fail";
			}else{
				player1History = updateSpot(2, xTarget, yTarget, "Bomb");
			}
			if(player1History == "Hit" || player1History == "Sink"){
				player1Points ++;
			}
			if(player1Points>shipParts-1){
				print("Spelare 1 vann");
				metaScore[0]++;
				break;
			}
			

			var player2Move = movePlayer2(player2History);
			player2History = "Miss";
			xTarget = player2Move[0];
			yTarget = player2Move[1];
			if(xTarget> 9 || yTarget >9 || xTarget<0 ||yTarget<0 ){
				player2History = "Fail";
			}else{
				player2History = updateSpot(1, xTarget, yTarget, "Bomb");
			}
			if(player2History == "Hit" || player2History == "Sink"){
				player2Points ++;
			}
			
			if(player2Points>shipParts-1){
				print("Spelare 2 vann");
				metaScore[1]++;
				break;
			}
		}
	}else{
		print("Någon regel bröts");
	}
	document.getElementById("score").value= "Spelare1: "+ metaScore[0]+ " Spelare2: "  + metaScore[1];
//	print(board1);
	//print(board2);
	
}
