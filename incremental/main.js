var money = 0;					var income = 0.25;
var seeds = 25;					var seedIncome = 1;					var seedHarvesters = 0;		
var pigeons = 0;				var pigeonDifference = 0;				var persistantPigeons = 0;
var chubbyPigeons = 0;				var chubbyPigeonsRevealed = 0;
var fatPigeons = 0;				var fatPigeonsRevealed = 0;
var oldFatPigeons = 0;				var oldFatPigeonsRevealed = 0;
var flour = 0;					var seedGrinders = 0;
var bread = 0;					var breadRevealed = 0;					var crumbs = 0;
var interval = 1;	
var loadedGameState = 0;
var pigeonThreshold = 100;


function setup()
{
	Load();

	UpdateLabels("seeds");
	UpdateLabels("flour");
	UpdateLabels("days"); 
	UpdateLabels("money");

	if (loadedGameState == 0)
	{
		document.getElementById("story").innerHTML = "You have no home, no money, no shoes. </br> You sit on a park bench looking at your one possession, a bag of seeds.";
	}
	else if (loadedGameState == 1)
	{
		Reveal("seedSection");
		UpdateLabels("pigeons");
		if(bread>=1){breadRevealed = 1; UpdateLabels("bread");}
		if(chubbyPigeons>=1){chubbyPigeonsRevealed = 1; UpdateLabels("pigeons");}
		if(fatPigeons>=1){fatPigeonsRevealed = 1; UpdateLabels("pigeons");}
		if(oldFatPigeons>=1){oldFatPigeonsRevealed = 1; UpdateLabels("pigeons");}
		var nextGCost = Math.floor(10 * Math.pow(1.1,seedGrinders));                       
		document.getElementById("grinderCost").innerHTML = nextGCost; 
		var nextHCost = Math.floor(10 * Math.pow(1.1,seedHarvesters));                       
		document.getElementById("harvesterCost").innerHTML = nextHCost;
		document.getElementById("story").innerHTML = "You return to your park bench.";
		if(flour > 0 || seedGrinders > 0){Reveal("flourButton")}
		if(bread > 0){Reveal("breadButton")}
	}

	if (pigeonThreshold <= 99)
	{
		pigeonThreshold = 100;
	}
}

function seedClick (number)
{
	seeds = seeds+number;
	UpdateLabels("seeds");
}
function flourClick (number)
{
	flour = flour+number;
	UpdateLabels("flour");
}
function moneyClick (number)
{
	var gain = Math.random()*number;
	gain = Math.round(gain*100)/100;
	money = money + gain;
	UpdateLabels("money");
	Reveal("story");
	document.getElementById("story").innerHTML = "A kind stranger comes and gives you £"+gain.toFixed(2);
}

function buySeedHarvester()
{
	var harvesterCost = Math.floor(10 * Math.pow(1.1,seedHarvesters));         	//works out the cost of this cursor
	if(seeds >= harvesterCost){                                                	//checks that the player can afford the cursor
		seedHarvesters = seedHarvesters + 1;                                   	//increases number of cursors
		seeds = seeds - harvesterCost;                                          //removes the cookies spent
		UpdateLabels("seeds");                                                	//updates the number of cookies for the user
	}
	var nextCost = Math.floor(10 * Math.pow(1.1,seedHarvesters));              	//works out the cost of the next cursor
	document.getElementById("harvesterCost").innerHTML = nextCost;              	//updates the cursor cost for the user
}

function buySeedGrinders()
{
	var grinderCost = Math.floor(10 * Math.pow(1.1,seedGrinders));         		//works out the cost of this cursor
	if(money >= grinderCost){                                                 	//checks that the player can afford the cursor
		seedGrinders = seedGrinders + 1;                                  	//increases number of cursors
		money = money - grinderCost;                                            //removes the cookies spent
		UpdateLabels("money");                                                	//updates the number of cookies for the user
	}
	var nextCost = Math.floor(10 * Math.pow(1.1,seedGrinders));                	//works out the cost of the next cursor
	document.getElementById("grinderCost").innerHTML = nextCost;               	//updates the cursor cost for the user
}

function getRandomInt(max) 
{
	return Math.floor(Math.random() * Math.floor(max));
}

function throwSeeds()
{
	Reveal("seedSection");
	Hide("story");																	//Put this here to allow events later in list to create story items.
	var previousPigeons = pigeons;

	var pigeonHunger = getRandomInt(5) + 1;
	pigeons = Math.floor(seeds/5);
	seeds = 0;
	if(interval == 1)																//Set the original pigeon count on day 1
	{
		persistantPigeons = pigeons;
	}
	pigeonDifference = pigeons - persistantPigeons;
	if (seeds > pigeonDifference)
	{
		persistantPigeons = pigeons;
	}
	
	if(crumbs >= chubbyPigeons){
		crumbs = crumbs - chubbyPigeons;
	}
	else{
		chubbyPigeons = crumbs;
		crumbs = 0;
	}

	if (bread >= fatPigeons){
		bread = bread - fatPigeons;
	}
	else{
		fatPigeons = bread;
		bread = 0;
	}

	interval = interval + 1;
	if (interval == 8)
	{        
		oldFatPigeons = oldFatPigeons + fatPigeons;
		if (oldFatPigeons >= 1){oldFatPigeonsRevealed = 1;}
		fatPigeons = chubbyPigeons;
		chubbyPigeons = persistantPigeons;
		interval = 1;
		if (chubbyPigeons >= 1){chubbyPigeonsRevealed = 1};
		if (fatPigeons >= 1){fatPigeonsRevealed = 1;}
	}

	if (pigeons >=  pigeonThreshold)
	{
		pigeonThreshold = pigeonThreshold*1.5;
		StoryStage(1);
	}

	UpdateLabels("seeds");
	UpdateLabels("crumbs");
	UpdateLabels("bread");
	UpdateLabels("days"); 
	UpdateLabels("pigeons");       
}

function groundSeedsIntoFlour ()
{
	flour = flour + seeds/10;
	seeds = 0;

	UpdateLabels("seeds");
	UpdateLabels("flour");
}

function bakeBread ()
{
	if (flour >= 100)
	{
		bread = bread + 1;
		flour = flour - 100;
		if (bread >= 1){breadRevealed = 1;}

		UpdateLabels("flour");
		UpdateLabels("bread");
		Reveal("crumbButton");
	}
}

function MakeCrumbs ()
{
	if (bread>=1)
	{
		bread = bread - 1;
		crumbs = crumbs + 25;
		
		UpdateLabels("crumbs");
		UpdateLabels("bread");
	}
}

function StoryStage(stage)
{
	if (stage == 1)
	{
		income += 0.25;
		Reveal("story");
		document.getElementById("story").innerHTML = "The amount of pigeons flocking to you each day <br/> seems to have increased peoples generosity.";
	}
}

function BuyUpgrade(upgrade)
{
	// 1 = fingerless gloves,
	if(upgrade == 1 && money >= 0.5)
	{
		seedIncome += 1;
		money -= 0.5;
		UpdateLabels("money");
	}
}

function Reveal(name) 
{
	var x = document.getElementById(name);
	if (x.style.display === "none") {
		x.style.display = "block";
	}
}
function Hide(name) 
{
	var x = document.getElementById(name);
	x.style.display = "none";
}

function UpdateLabels (type)
{
	if (type == "days"){
		document.getElementById("interval").innerHTML = interval;}

	if (type == "money"){
		document.getElementById("money").innerHTML = money.toFixed(2);}

	if (type == "seeds"){
		document.getElementById("seeds").innerHTML = seeds;
		document.getElementById("seedHarvesters").innerHTML = seedHarvesters;}

	if (type == "flour"){
		flour = Math.round(flour*10)/10; //Round the flour to 1 dp.
		document.getElementById("flour").innerHTML = flour.toFixed(1);
		document.getElementById("seedGrinders").innerHTML = seedGrinders;}

	if (type == "bread"){
		if (breadRevealed == 1){
			document.getElementById("bread").innerHTML = bread + " loaves";}
	}
	
	if (type == "crumbs"){
		document.getElementById("crumbs").innerHTML = crumbs + " bread crumbs";}

	if (type == "pigeons"){
		document.getElementById("pigeons").innerHTML = pigeons + " pigeons currently feeding";
		if (chubbyPigeonsRevealed ==1){
			document.getElementById("chubbyPigeons").innerHTML = chubbyPigeons + " chubby pigeons hungry for crumbs";}
		if (fatPigeonsRevealed == 1){
			document.getElementById("fatPigeons").innerHTML = fatPigeons + " fat pigeons looking for bread";}
		if (oldFatPigeonsRevealed == 1){
			document.getElementById("oldFatPigeons").innerHTML = oldFatPigeons + " old fat pigeons pilfering pennies";}
	}
}

window.setInterval(function()
	{
		seedClick(seedHarvesters);
		flourClick(seedGrinders);

		money += oldFatPigeons/100;
		UpdateLabels("money");

		if (flour >= 100)
		{
			Reveal("breadButton");
		}

		if (seeds >= 50)
		{
			Reveal("flourButton");
			Reveal("upgrades");
		}

		Save();

	}, 1000);

function Save() {
       
    	var saveGame = {
	    	seeds:seeds,
	    	seedHarvesters:seedHarvesters,
	    	flour:flour,
	    	seedGrinders:seedGrinders,
	    	interval:interval,
	    	bread:bread,
	    	pigeons:pigeons,
		chubbyPigeons:chubbyPigeons,
	    	fatPigeons:fatPigeons,
	    	oldFatPigeons:oldFatPigeons,
	    	money:money,
	    	persistantPigeons:persistantPigeons,
	    	pigeonThreshold:pigeonThreshold,
		crumbs:crumbs
    	}
    	localStorage.setItem("saveGame",JSON.stringify(saveGame));  
}

function Load() {
	
	document.getElementById("story").innerHTML = "Game loaded";
    
    	var loadGame = JSON.parse(localStorage.getItem("saveGame"));    
   	
	seeds = loadGame.seeds;
        seedHarvesters = loadGame.seedHarvesters;
	flour = loadGame.flour;
	seedGrinders = loadGame.seedGrinders;
	interval = 1;
	bread = loadGame.bread;
	pigeons = loadGame.pigeons;
	chubbyPigeons = loadGame.chubbyPigeons;
	fatPigeons = loadGame.fatPigeons;
	oldFatPigeons = loadGame.oldFatPigeons;
	money = loadGame.money;
	persistantPigeons = loadGame.persistantPigeons;
	pigeonThreshold = loadGame.pigeonThreshold;
	crumbs = loadGame.crumbs;
	
	if (pigeons >= 1 || fatPigeons >= 1 || oldFatPigeons >= 1){loadedGameState = 1}
}


function DeleteSave()
{
	localStorage.removeItem("saveGame");
	setup();
}
