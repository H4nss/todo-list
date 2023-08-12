window.onload = start;

var tasks = new Array(10);
var fieldList = false;

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
    $("#confirm2").on("click", newTask);
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
    $("#task").html(oldContent + "<ul id='list'><li>" + tasks[i][0] + "</li></ul>");
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
                var content = "<div class='selectField'>" + tasks[i][0] + "</div>";
                $("#fields").html(oldContent + content);
                
                $('#' + i).on("click", () => {
                    taskContent(i); //tylko ostatni tworzony div ma przypisana funkcje z odpowiednim argumentem, pozostale w ogole nie reaguja na onclick 
                });
            }
        }

        fieldList = true;
    }
    else
    {
        $("#fields").html("");
        fieldList = false;
    }
 
}

function taskContent(argument)
{
    console.log(argument);  // do testow
    $("#fields").html("");
    fieldList = false;

    $("#text2").css("display", "block");
    $("#cancel2").css("display", "block");
    $("#confirm2").css("display", "block");
}

function newTask()
{

}

function closeTask()
{
    $("#text2").css("display", "none");
    $("#cancel2").css("display", "none");
    $("#confirm2").css("display", "none");
}
