window.onload = start;

var tasks = new Array(10);
var fieldList = false;
var lock = false;

for(i = 0; i < 10; i++)
{
	tasks[i] = new Array(10);

	for(j = 0; j < 10; j++)
	{
		tasks[i][j] = " ";
	}
}

function start()
{
    $("#button1").on("click", addField);
    $("#button2").on("click", addTask);
    $("#cancel1").on("click", closeField);
    $("#confirm1").on("click", newField);
    $("#cancel2").on("click", closeTask);
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
    var content = $("#text1").val();
    var i = 0;
    var stop = false;
    while(i < 10 && stop == false)
    {
        if(tasks[i][0] == " ")
        {
            tasks[i][0] = content;
            stop = true;
        } 
        else i++;
    }
    var oldContent = $("#task").html();
    $("#task").html(oldContent + "<ul class='list' id='list" + i + "'><li>" + tasks[i][0] + "</li> <ol class='sublist' id='sublist" + i + "'> </ol> </ul>");
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
            if(tasks[i][0] != " ")
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

    if(lock == false)
    {
        $("#confirm2").on("click", function() {
            newTask(div); 
        });

        lock = true;
    }
}

function newTask(argument)
{
    lock = false;
    var task = $("#text2").val();

    $("#confirm2").off("click");

    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");

    var oldContent = "";
    var content = "";

    for(i = 0; i < 10; i++)
    {
        if(tasks[i][0] == argument)
        {
            oldContent = $("#sublist" + i).html();
            content = "<li>" + task + "</li>";
            $("#sublist" + i).html(oldContent + content);
        }
    }
}

function closeTask()
{
    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");
}
