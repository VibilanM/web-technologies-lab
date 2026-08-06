let data = {};

function addTask()
{
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let task = document.getElementById("task").value;

    if(date == "")
    {
        alert("Select Date");
        return;
    }

    if(time == "")
    {
        alert("Select Time");
        return;
    }

    if(task == "")
    {
        alert("Enter Task");
        return;
    }

    if(data[date] == undefined)
    {
        data[date] = [];
    }

    // Duplicate checking

    for(let i=0;i<data[date].length;i++)
    {
        if(data[date][i].task == task)
        {
            alert("Task already exists");
            return;
        }
    }

    data[date].push(
    {
        time: time,
        task: task
    });

    // Sort by time

    data[date].sort(function(a,b)
    {
        if(a.time > b.time)
            return 1;
        else
            return -1;
    });

    display();

    document.getElementById("task").value="";
}

function display()
{
    let output = document.getElementById("output");

    output.innerHTML="";

    for(let date in data)
    {
        let box = document.createElement("div");
        box.className="box";

        let d = new Date(date);

        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let heading = document.createElement("h3");
        heading.innerHTML = date + " (" + days[d.getDay()] + ")";

        box.appendChild(heading);

        let count = document.createElement("p");
        count.innerHTML = "Total Tasks : " + data[date].length;

        box.appendChild(count);

        let ul = document.createElement("ul");

        for(let i=0;i<data[date].length;i++)
        {
            let li = document.createElement("li");

            li.innerHTML = data[date][i].time + " - " + data[date][i].task + " ";

            let btn = document.createElement("button");

            btn.innerHTML="Delete";

            btn.onclick = function()
            {
                data[date].splice(i,1);

                if(data[date].length==0)
                {
                    delete data[date];
                }

                display();
            };

            li.appendChild(btn);

            ul.appendChild(li);
        }

        box.appendChild(ul);

        output.appendChild(box);
    }
}