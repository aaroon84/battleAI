
//----------------------------------------------------------------Här är koden för player2---------------------
var player2XTemp = -1;
var player2YTemp = 0;
function resetPlayer2Variables(){
player2XTemp = -1;
player2YTemp = 0;
}
function startPlayer2(){
resetPlayer2Variables();
	var shipArray = [];
	var ship1Array = [];
	ship1Array.push([2,2]);
	ship1Array.push([2,3]);
	ship1Array.push([2,4]);
	ship1Array.push(3);
	shipArray.push(ship1Array);
	ship1Array = [];
	ship1Array.push([8,6]);
	ship1Array.push(1);
	shipArray.push(ship1Array);
	return shipArray;
}

function movePlayer2(lastMove){
	if(lastMove == "Hit"){
	//	print2("jag träffade"+ (player2XTemp+1)+","+(player2YTemp+1));
	}
	if(lastMove == "Sink"){
	//	print2("jag Sänkte ett skepp när jag bombade"+ (player2XTemp+1)+","+(player2YTemp+1));
	}
	if(lastMove == "Fail"){
		//	print2("player 2 skämmer ut mig"+ (player2XTemp+1)+","+(player2YTemp+1));
	}
	if(lastMove == "Miss"){
		//	print2("jag missade");
	}
	//här ska kod för att attackera smart vara
	if(player2XTemp>8){
		player2YTemp++;
		player2XTemp = 0;
	}else{
		player2XTemp++;
	}
	
	
	return [player2XTemp, player2YTemp];
	
}