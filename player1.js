

//----------------------------------------------------------------Här är koden för player1---------------------
var player1XTemp = -1;
var player1YTemp = 0;
function resetPlayer1Variables(){
player1XTemp = -1;
player1YTemp = 0;
}
function startPlayer1(){
	resetPlayer1Variables();
	var shipArray = [];
	var ship1Array = [];
	ship1Array.push([2,2]);
	ship1Array.push([2,3]);
	ship1Array.push([2,4]);
	ship1Array.push(3);
	shipArray.push(ship1Array);
	ship1Array = [];
	ship1Array.push([7,6]);
	ship1Array.push(1);
	shipArray.push(ship1Array);
	return shipArray;
} 

function movePlayer1(lastMove){
	if(lastMove == "Hit"){
	//	print1("jag träffade"+ (player1XTemp+1)+","+(player1YTemp+1));
	}
	if(lastMove == "Sink"){
		//print1("jag Sänkte ett skepp när jag bombade"+ (player1XTemp+1)+","+(player1YTemp+1));
	}
	if(lastMove == "Fail"){
		//	print1("player 1 skämmer ut mig"+ (player1XTemp+1)+","+(player1YTemp+1));
	}
	if(lastMove == "Miss"){
		//	print1("jag missade");
	}
	//här ska kod för att attackera smart vara
	if(player1XTemp>8){
		player1YTemp++;
		player1YTemp++;
		player1XTemp = 0;
	}else{
		player1XTemp++;

	}
	if(player1YTemp>8){
		player1YTemp = 1;
		player1XTemp = 1;
	}
	return [player1XTemp, player1YTemp];
}
