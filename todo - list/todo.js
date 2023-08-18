window.onload = start;

var tasks = new Array(10);
var colors = new Array(10);
var fieldList = false;
var lock1 = false;
var lock2 = false;

for(i = 0; i < 10; i++)
{
	tasks[i] = new Array(10);

	for(j = 0; j < 10; j++)
	{
		tasks[i][j] = "";
	}
}

for(i = 0; i < 10; i++)
{
	colors[i] = new Array(10);

	for(j = 0; j < 10; j++)
	{
		colors[i][j] = false;
	}
}

function start()
{
    $("#button1").on("click", addField);
    $("#button2").on("click", addTask);
    $("#cancel1").on("click", closeField);
    $("#confirm1").on("click", newField);
    $("#cancel2").on("click", closeTask);
    time();
}

function addField()
{
    $("#fields").html("");
    fieldList = false;

    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");

    $("#text1").css("display", "block");
    $("#cancel1").css("display", "block");
    $("#confirm1").css("display", "block");
}

function closeField()
{
    $("#text1").css("display", "none");
    $("#cancel1").css("display", "none");
    $("#confirm1").css("display", "none");
}

function newField()
{
    var text = $("#text1").val();
    var i = 0;
    var stop = false;
    while(i < 10 && stop == false)
    {
        if(tasks[i][0] == "")
        {
            tasks[i][0] = text;
            stop = true;
        } 
        else i++;
    }

    show();
}

function addTask()
{  
    $("#text1").css("display", "none");
    $("#cancel1").css("display", "none");
    $("#confirm1").css("display", "none");

    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");

    if(fieldList == false) 
    {
        for(let i = 0; i < 10; i++)
        {
            if(tasks[i][0] != "")
            {
                var oldContent = $("#fields").html();
                var content = "<div id = '" + i + "' class='selectField'>" + tasks[i][0] + "</div>";
                $("#fields").html(oldContent + content);
            }
        }

        $('.selectField').on("click", taskContent);
        fieldList = true;
    }
    else
    {
        $("#fields").html("");
        fieldList = false;
    }
}

function taskContent()
{
    var div = "";
    div = this.textContent;
    $("#fields").html("");
    fieldList = false;

    $("#text2").css("display", "block");
    $("#cancel2").css("display", "block");
    $("#confirm2").css("display", "block");

    if(lock1 == false)
    {
        $("#confirm2").on("click", function() {
            newTask(div); 
        });

        lock1 = true;
    }
}

function newTask(argument)
{
    lock1 = false;
    var task = $("#text2").val();

    $("#confirm2").off("click");

    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");

    for(i = 0; i < 10; i++)
    {
        if(tasks[i][0] == argument)
        {
            for(j = 0; j < 10; j++)
            {
                if(tasks[i][j] == "" && lock2 == false)
                {
                    tasks[i][j] = task;
                    lock2 = true;
                }
            }
        } 
    }

    lock2 = false;

    show();
}

function closeTask()
{
    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");
}

function time()
{
	var today = new Date();
		
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
		
	var hour = today.getHours();
	if (hour < 10) hour = "0"+ hour;
		
	var minute = today.getMinutes();
	if (minute < 10) minute = "0"+ minute;
		
	var second = today.getSeconds();
	if (second < 10) second = "0"+ second;
		
	$("#clock").html(day + '/' + month + '/' + year + ' | ' + hour + ':' + minute + ':' + second);
		 
	setTimeout("time()",1000);
}

function show()
{
    var lock = true;
    var content = "";

    for(i = 0; i < 10; i++)
    {
        for(j = 0; j < 10; j++)
        {
            if(j == 0 && tasks[i][j] != "")
            {
                content = content + "<h2 id = '" + i + j + "'>" + tasks[i][j] + "</h2> <span id ='ok" + tasks[i][j] + 
                "' class ='doneField' onclick = doneField(" + i + ")> <i class='icon-ok'> </i> </span> <span id ='cancel" + tasks[i][j] + 
                "'class ='cancelField' onclick = deleteField(" + i + ")> <i class='icon-cancel'> </i> </span> <div style='clear:both'> </div>";
            }
            if(j == 1 && tasks[i][j] != "")
            {
                content = content + "<ol><li id = '" + i + j + "'>" + tasks[i][j] + "</li> <span id ='ok" + tasks[i][j] + "' class ='doneTask' onclick = doneTask(" 
                + i + "," + j + ")> <i class='icon-ok'> </i> </span> <span id ='cancel" +tasks[i][j] + 
                "'class ='cancelTask' onclick = deleteTask(" + i + "," + j + ")> <i class='icon-cancel'> </i> </span> <div style='clear:both'> </div>";
                lock = false;
            }
            if(j == 9 && lock == false)
            {
                content = content + "</ol>";
                lock = true;
            }
            if(j != 0 && j != 1 && j !=9 && tasks[i][j] != "")
            {
                content = content + "<li id = '" + i + j + "'>" + tasks[i][j] + "</li> <span id ='ok" + tasks[i][j] + "' class ='doneTask' onclick = doneTask(" 
                + i + "," + j + ")> <i class='icon-ok'> </i> </span> <span id ='cancel" + tasks[i][j] + 
                "'class ='cancelTask' onclick = deleteTask(" + i + "," + j + ")> <i class='icon-cancel'> </i> </span> <div style='clear:both'> </div>";
            }
        }
    }

    $("#task").html(content);

    for(k = 0; k < 10; k++)
    {
        for(l = 0; l < 10; l++)
        {
            if(colors[k][l] == true)
            {
                $("#" + k + l).css("color", "#1c74b2");
            }
        }
    }
}

function deleteTask(arg1, arg2)
{
    tasks[arg1][arg2] = "";
    colors[arg1][arg2] = false;
    show();
}

function doneTask(arg1, arg2)
{
    $("#" + arg1 + arg2).css("color", "#1c74b2");
    colors[arg1][arg2] = true;
}

function deleteField(arg)
{
    for(i = 0; i < 9; i++)
    {
        tasks[arg][i] = "";
        colors[arg][i] = false;
    }

    show();
}

function doneField(arg)
{
    for(i = 0; i < 9; i++)
    {
        $("#" + arg + i).css("color", "#1c74b2");
        colors[arg][i] = true;
    }
}
