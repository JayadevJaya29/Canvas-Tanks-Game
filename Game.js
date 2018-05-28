	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.globalCompositeOperation ='destination-over';
	var mis1x=70;
	var mis2x=1332;
	var flag=0;
	var mis1y=645;
	var mis2y=643;
	var misrad=5;
	var chances=10;
	var chances2=10;
	var score=0;
	var score2 =0;
	var bgm=document.getElementById("bgm");
	var launch =document.getElementById("launch");
	var explode=document.getElementById("explode");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var animate;
	var blastrad;
	var isPaused=0;
	var isResume=0;
	var mis1xo;
	var mis1yo;
	var mis1vxo=0;
	var	mis1vyo=0;
	var angx=0;
	var to;
	var missp;
	var blastcolor;
	var mistype=["Flying Torpedo","Quantum Cube","Napalm Shower"];
	var power=["Low","Medium","High"];
	var pow=0;
	var misnum=0;
	var m1x = Math.floor((Math.random() * 800) + 200);
	var m2x = Math.floor((Math.random() * 800) + 200);
	var m3x = Math.floor((Math.random() * 800) + 200);
	var m4x = Math.floor((Math.random() * 800) + 200);
	var m5x = Math.floor((Math.random() * 800) + 200);
	var m1y = Math.floor((Math.random() * 200) + 300);
	var m2y = Math.floor((Math.random() * 200) + 300);
	var m3y = Math.floor((Math.random() * 200) + 300);
	var m4y = Math.floor((Math.random() * 200) + 300);
	var m5y = Math.floor((Math.random() * 200) + 300);
	var marrx=[m1x,m2x,m3x,m4x,m5x];
	var marry=[m1y,m2y,m3y,m4y,m5y];
	marrx.sort(function(a, b){return a - b});
	marry.sort(function(a, b){return a - b});
	ctx.font='30px serif';
	ctx.fillText("Chances = "+chances+"",50,40);
	ctx.fillText("Score = "+score+"",50,80);
	ctx.fillText("Chances = "+chances2+"",1200,40);
	ctx.fillText("Score = "+score2+"",1200,80);
	document.getElementById("mistype").innerHTML="Your Missile Type is "+mistype[misnum]+".";
	document.getElementById("power").innerHTML="Your Missile is in "+power[pow]+" Power mode.";
	document.getElementById("turns").innerHTML="Player 1's Turn";
	document.addEventListener("keyup",mistypesel,false);
	document.getElementById("pause").disabled=true;
	document.getElementById("button").addEventListener("click",blast,false);
function drawmissile()
{
	ctx.beginPath();
	ctx.arc(mis1x,mis1y,misrad,0,Math.PI * 2,true); 
	ctx.fill();
}
function drawmissile2()
{
	ctx.beginPath();
	ctx.arc(mis2x,mis2y,misrad,0,Math.PI * 2,true); 
	ctx.fill();
}
function initialize()
{	
	left.onload=function() {
		ctx.drawImage(left,1,640);
	}
	left.src='TankLeft.jpg';
	right.onload=function() {
		ctx.drawImage(right,1329,640);
	}
	right.src='TankRight.jpg';
	ctx.save();
	ctx.fillStyle = 'rgb(104, 49, 2)';
	ctx.beginPath();
	ctx.moveTo(0,700);
	ctx.lineTo(0,695);
	ctx.lineTo(200,695);
	ctx.lineTo(marrx[0],marry[3]);
	ctx.lineTo(marrx[1],marry[4]);
	ctx.lineTo(marrx[2],marry[0]);
	ctx.lineTo(marrx[3],marry[2]);
	ctx.lineTo(marrx[4],marry[1]);
	ctx.lineTo(1200,693);
	ctx.lineTo(1400,693);
	ctx.lineTo(1400,700);
	ctx.fill();
	ctx.restore();
	drawmissile();
	drawmissile2();
}
function lineeq (x1,y1,x2,y2,x3,y3)
{
	var m=((y2-y1)/(x2-x1));
	var c=(y1-(m*x1));
	var M=((m*x3)+c-y3);
	return M;
}
function blastcolour()
{
	if(misnum==2)
	{
		blastcolor='rgb(255, 89, 0)';
		blastrad=20;
	}
	else if(misnum==1)
	{
		blastcolor='rgb(66, 244, 92)';
		blastrad=30;
	}
	else
	{
		blastcolor='rgb(255, 0, 0)';
		blastrad=25;
	}

}
function drawexplosion()
{
	ctx.save();
	ctx.fillStyle = blastcolor;
	ctx.beginPath();
	ctx.arc(mis1x,mis1y,blastrad,0,Math.PI*2,true);
	ctx.fill();
	ctx.restore();
	explode.play();
}
function drawexplosion2()
{
	ctx.save();
	ctx.fillStyle = blastcolor;
	ctx.beginPath();
	ctx.arc(mis2x,mis2y,blastrad,0,Math.PI*2,true);
	ctx.fill();
	ctx.restore();
	explode.play();
}
function mistypesel(e)
{
	if(e.keyCode==40)//downarrow
	{
		misnum++;
		if(misnum>2)
			misnum=0;
		document.getElementById("mistype").innerHTML="Your Missile Type is "+mistype[misnum]+".";
	}
	if(e.keyCode==38)//uparrow
	{
		pow++;
		if(pow>2)
			pow=0;
		document.getElementById("power").innerHTML="Your Missile is in "+power[pow]+" Power mode.";
	}
	blastcolour();
}
function blast()
{
	document.getElementById("button").removeEventListener("click",blast,false);
	launch.play();
	if(isResume!=1)
	{
		flag++;
	}
	if(flag%2==1)
		{
			animate=requestAnimationFrame(blast1);
		}
		else
		{
			animate=requestAnimationFrame(blast2);
		}
}
function collisiondetect(interval)
{
	if(mis1x>200&&mis1x<marrx[0])
	{
		var M = lineeq(200,695,marrx[0],marry[3],mis1x-misrad,mis1y-misrad);
		var N = lineeq(200,695,marrx[0],marry[3],mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if(mis1x>marrx[0]&&mis1x<marrx[1])
	{
		var M = lineeq(marrx[0],marry[3],marrx[1],marry[4],mis1x-misrad,mis1y-misrad);
		var N = lineeq(marrx[0],marry[3],marrx[1],marry[4],mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if(mis1x>marrx[1]&&mis1x<marrx[2])
	{
		var M = lineeq(marrx[1],marry[4],marrx[2],marry[0],mis1x-misrad,mis1y-misrad);
		var N = lineeq(marrx[1],marry[4],marrx[2],marry[0],mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if(mis1x>marrx[2]&&mis1x<marrx[3])
	{
		var M = lineeq(marrx[2],marry[0],marrx[3],marry[2],mis1x-misrad,mis1y-misrad);
		var N = lineeq(marrx[2],marry[0],marrx[3],marry[2],mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if(mis1x>marrx[3]&&mis1x<marrx[4])
	{
		var M = lineeq(marrx[3],marry[2],marrx[4],marry[1],mis1x-misrad,mis1y-misrad);
		var N = lineeq(marrx[3],marry[2],marrx[4],marry[1],mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if(mis1x>marrx[4]&&mis1x<1200)
	{
		var M = lineeq(marrx[4],marry[1],1200,693,mis1x-misrad,mis1y-misrad);
		var N = lineeq(marrx[4],marry[1],1200,693,mis1x,mis1y);
		if(N/M<=0)
		{
			drawexplosion();
			clearInterval(interval);
			restoredefaults();
		}
	}
	else if( mis1y>640&&mis1y<700&&mis1x>1330&&mis1x<1400)
	{
		score=score+10;
		drawexplosion();
		clearInterval(interval);
		restoredefaults();
	}
	else if(mis1x>canvas.width+misrad|| mis1x<-misrad || mis1y>canvas.height+5 || mis1y<-misrad)
	{
		clearInterval(interval);
		restoredefaults();
	}
}
function collisiondetect2(interval)
{
	if(mis2x>200&&mis2x<marrx[0])
	{
		var M = lineeq(200,695,marrx[0],marry[3],mis2x-misrad,mis2y-misrad);
		var N = lineeq(200,695,marrx[0],marry[3],mis2x,mis2y);
		if(N/M<=0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if(mis2x>marrx[0]&&mis2x<marrx[1])
	{
		var M = lineeq(marrx[0],marry[3],marrx[1],marry[4],mis2x-misrad,mis2y-misrad);
		var N = lineeq(marrx[0],marry[3],marrx[1],marry[4],mis2x,mis2y);
		if(N/M<=0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if(mis2x>marrx[1]&&mis2x<marrx[2])
	{
		var M = lineeq(marrx[1],marry[4],marrx[2],marry[0],mis2x-misrad,mis2y-misrad);
		var N = lineeq(marrx[1],marry[4],marrx[2],marry[0],mis2x,mis2y);
		if(N/M<=0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if(mis2x>marrx[2]&&mis2x<marrx[3])
	{
		var M = lineeq(marrx[2],marry[0],marrx[3],marry[2],mis2x-misrad,mis2y-misrad);
		var N = lineeq(marrx[2],marry[0],marrx[3],marry[2],mis2x,mis2y);
		if(N/M<=0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if(mis2x>marrx[3]&&mis2x<marrx[4])
	{
		var M = lineeq(marrx[3],marry[2],marrx[4],marry[1],mis2x-misrad,mis2y-misrad);
		var N = lineeq(marrx[3],marry[2],marrx[4],marry[1],mis2x,mis2y);
		if(N/M<=0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if(mis2x>marrx[4]&&mis2x<=1200)
	{
		var M = lineeq(marrx[4],marry[1],1200,693,mis2x+misrad,mis2y+misrad);
		var N = lineeq(marrx[4],marry[1],1200,693,mis2x-misrad,mis2y-misrad);
		if(N/M<=0||M==0)
		{
			drawexplosion2();
			clearInterval(interval);
			restoredefaults2();
		}
	}
	else if( mis2y>640&&mis2y<700&&mis2x>0&&mis2x<70)
	{
		score2=score2+10;
		drawexplosion2();
		clearInterval(interval);
		restoredefaults2();
	}
	else if(mis2x>canvas.width-misrad|| mis2x<-misrad || mis2y>canvas.height-misrad || mis2y<-misrad)
	{
		clearInterval(interval);
		restoredefaults2();
	}
}
function restoredefaults()
{
	mis1y=645;
	mis1x=70;
	drawmissile();
	
	chances--;
	ctx.save();
	ctx.fillText("Chances = "+chances+"",50,40);
	ctx.fillText("Score = "+score+"",50,80);
	ctx.fillText("Chances = "+chances2+"",1200,40);
	ctx.fillText("Score = "+score2+"",1200,80);
	ctx.restore();
	document.getElementById("turns").innerHTML="Player 2's Turn";
	document.getElementById("pause").disabled=true;
	document.getElementById("button").addEventListener("click",blast,false);
}
function restoredefaults2()
{
	mis2y=643;
	mis2x=1332;
	drawmissile2();
	chances2--;
	ctx.save();
	ctx.fillText("Chances = "+chances+"",50,40);
	ctx.fillText("Score = "+score+"",50,80);
	ctx.fillText("Chances = "+chances2+"",1200,40);
	ctx.fillText("Score = "+score2+"",1200,80);
	ctx.restore();	
	document.getElementById("turns").innerHTML="Player 1's Turn";
	document.getElementById("button").addEventListener("click",blast,false);
	document.getElementById("pause").disabled=true;
	 if(chances2==0)
    {
    	if(score>score2)
    	{
    	setTimeout(function(){
        alert("GAME OVER \n Score of Player 1: "+score+"  Score of Player 2 : "+score2+ "\n Player 1 Wins \n");
        document.location.reload();
        },1000);
    	}
    	else if(score<score2)
    	{
    	setTimeout(function(){
        alert("GAME OVER \n Score of Player 1: "+score+"  Score of Player 2 : "+score2+ "\n Player 2 Wins \n");
        document.location.reload();
        },1000);
    	}
    	else if(score==score2)
    	{
    	setTimeout(function(){
        alert("GAME OVER \n Score of Player 1: "+score+"Score of Player 2 : "+score2+" \n Game Draw \n");
        document.location.reload();
        },1000);
    	}
      

    }
}
function blast1()
{
		document.getElementById("pause").disabled=false;
		var tx;
		var angx=document.getElementById("anglein").value;
		document.getElementById("button").disabled=true;
		if(pow==0)
		{
			missp=Math.floor((Math.random()*10)+110);
			tx=0.02
		}
		else if(pow==1)
		{
			missp=Math.floor((Math.random()*10)+120);
			tx=0.04
		}
		else if(pow==2)
		{
			missp=Math.floor((Math.random()*10)+130);
			tx=0.06
		}
		var t=0;
		var angle = (Math.PI/180)*angx;
		var mis1vx = missp*Math.cos(angle);
		var mis1vy=missp*Math.sin(angle);
		ctx.save();
	
	if(isResume==1)
	{
		mis1x=mis1xo;
		mis1y=mis1yo;
		mis1vx=mis1vxo;
		mis1vy=mis1vyo;
		t=to;
		mis1xo=70;
		mis1yo=645;
		to=0;
		mis1vxo=0;
		mis1vyo=0;
		isResume=0;
	}
	var interval=setInterval(function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		initialize();
		mis1x=70+mis1vx*t;
		mis1y=645-(mis1vy*t-(5*t*t));
		t+=tx;
		drawmissile();
		collisiondetect(interval,mis1x,mis1y);
		if(isPaused==1)
		{
			mis1x0=mis1x;
			mis1yo=mis1y;
			to=t;
			mis1vxo=mis1vx;
			mis1vyo=mis1vy;
			clearInterval(interval);
			isPaused=0;
		}
	},1)
	document.getElementById("button").disabled=false;
}
function blast2()
{
		document.getElementById("pause").disabled=false;
		var t2x;
		var angx=document.getElementById("anglein").value;
		document.getElementById("button").disabled=true;
		if(pow==0)
		{
			missp=Math.floor((Math.random()*10)+110);
			t2x=0.02
		}
		else if(pow==1)
		{
			missp=Math.floor((Math.random()*10)+120);
			t2x=0.04
		}
		else if(pow==2)
		{
			missp=Math.floor((Math.random()*10)+130);
			t2x=0.06
		}
		var t=0;
		var angle = (Math.PI/180)*(180-angx);
		var mis2vx = missp*Math.cos(angle);
		var mis2vy=missp*Math.sin(angle);
		ctx.save();
	
	if(isResume==1)
	{
		mis2x=mis1xo;
		mis2y=mis1yo;
		t=to;
		mis2vx=mis1vxo;
		mis2vy=mis1vyo;
		mis1xo=70;
		mis1yo=645;
		mis1vxo=0;
		mis1vyo=0;
		to=0;
		isResume=0;
	}
	var interval=setInterval(function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		initialize();
		mis2x=1332+mis2vx*t;
		mis2y=643-(mis2vy*t-(5*t*t));
		t+=t2x;
		drawmissile2();
		collisiondetect2(interval);
		if(isPaused==1)
		{
			mis1x0=mis2x;
			mis1yo=mis2y;
			to=t;
			mis1vxo=mis2vx;
			mis1vyo=mis2vy;
			clearInterval(interval);
			isPaused=0;
		}
	},1)
	document.getElementById("button").disabled=false;
}
function pause()
{
	var e=document.getElementById("pause");
	if(e.innerHTML=="Pause")
	{
		e.innerHTML="Resume";
		isPaused=1;
	}
	else
	{
		e.innerHTML="Pause";
		isResume=1;
		blast();
	}
}
document.getElementById("restart").addEventListener("click",function(e){ e.preventDefault(); window.location.reload();},false);