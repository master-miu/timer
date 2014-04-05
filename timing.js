function checkLength(s,len)
{
	while (s.length < len) s = '0' + s;
	return s;
}

function time(val)//milliseconds
{
	val = Math.round(val / 1000);
	return checkLength(String(Math.floor(val / 60)),2) + ':' + checkLength(String(val % 60),2);
}

function getTimeMS(time)
{
	var v = Number(time.match(/\d*/));
	if (/min$/.test(time) || /m$/.test(time)) return v * 60 * 1000;
	else if (/sec$/.test(time) || /s$/.test(time)) return v * 1000;
	else return v;
}
	
function createTimer(timer_name,maxTime,frontend)//milliseconds
{
	maxTime = getTimeMS(maxTime);
	
	var surplusTime,previousTime;
	var curInterval;
	
	$(frontend).appendTo($(timer_name));
	$(timer_name + " .start").click(start);
	$(timer_name + " .pause").click(pause);
	$(timer_name + " .reset").click(function(){
		if (confirm("Are you sure?"))
			reset();
	});
	reset();
	
	function updateTime()
	{
		var curTime = new Date().getTime();
		
		surplusTime -= curTime - previousTime;
		if (surplusTime < 0) surplusTime = 0;
		previousTime = curTime;
		
		return surplusTime;
	}
	
	function start()
	{
		previousTime = new Date().getTime();//milliseconds
		
		var display = function ()
		{
			$(timer_name + " .display-time").html(time(updateTime()));
		};
	
		curInterval = setInterval(display,200);
		
		$(timer_name + " .start").addClass("disabled").html("Resume");
		$(timer_name + " .pause").removeClass("disabled");
	}
	function pause()
	{		
		clearInterval(curInterval);
		
		updateTime();
		$(timer_name + " .start").removeClass("disabled");
		$(timer_name + " .pause").addClass("disabled");
	}
	
	function reset()
	{
		clearInterval(curInterval);
		
		surplusTime = maxTime;
		curInterval = 0;
		$(timer_name + " .display-time").html(time(maxTime));
		$(timer_name + " .start").removeClass("disabled").html("Start");
		$(timer_name + " .pause").addClass("disabled");
	};
	
	function setMaxTime(newTime)
	{
		maxTime = newTime;
		reset();
	}
	
	return {"setMaxTime" : setMaxTime};
}

