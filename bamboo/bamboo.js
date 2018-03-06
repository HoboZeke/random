//Bamboo Growth Simulator
var bambooLength = 0;
var intervalTimer = 5000;
var bambooShootBase = "I";
var noBambooShootBase = "_";
var bambooShoot = "I";
var noBambooShoot = "";

function GrowBamboo()
{
	if (bambooLength < 10)
	{
		bambooLength++;   //increse the length of bamboo
	}
	document.getElementById("bambooLength").innerHTML = bambooLength;
	
	for (i = 0; i < bambooLength; i++)  //loop through all the shoots
	{
		var index = i+1;
		var name = "bamboo" + String(index);
		
		if (i<=1) //A catch for the first shoot, to allow proper rendering of plant pot.
		{
			document.getElementById(name).innerHTML = bambooShootBase;
		}
		else
		{
			document.getElementById(name).innerHTML = bambooShootBase;
		}
	}
	
}



window.setInterval(function()
	{
		GrowBamboo();
	}, intervalTimer);
