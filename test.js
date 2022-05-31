var Pins = {
    "points": [],
    "path": [],
    "wire": "",
    "isVisible" : false,
    render: function(ctx, ukey = null){
        if (!this.isVisible) return;
        
        //ctx = document.getElementById("canvas").getContext("2d");
        //ctx.clearRect(0,0,canvas.width,canvas.height); 
        //console.log("rendered - " + ukey)
        ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        this.path.forEach(function(element, key){
            if (key !== 0) {
                ctx.lineTo(element.x, element.y);
            }
        })
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
        ctx.fillStyle = "#ff0000";
        ctx.font = "20px serif";
        if (this.points[0].coords) {ctx.fillText(this.points[0].pin, this.points[0].coords.x, this.points[0].coords.y )}
        if (this.points[1].coords) {ctx.fillText(this.points[1].pin, this.points[1].coords.x, this.points[1].coords.y)}
        
    }
}


window.onload = function(){
    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');

    var optionElement = document.getElementById("select");
    var wiresElement = document.getElementById("wires");
    var pointsElement = document.getElementById("points");
    var wiresList = [];
    var pointsList = [];

    Object.keys(connections).forEach(function(key) {
        Object.setPrototypeOf(connections[key], Pins);

        option = document.createElement("option");    
        option.text = "["+connections[key].wire+"] "+key;
        option.setAttribute("value", key);
        optionElement.appendChild(option);
        
        
        if (!wiresList[connections[key].wire]) {
            wiresList[connections[key].wire] = 1;
        } else {
            wiresList[connections[key].wire]++;
        }

        if (!pointsList[connections[key].points[0].point]) {
            pointsList[connections[key].points[0].point] = 1;
        } else {
            pointsList[connections[key].points[0].point]++;
        }
        if (!pointsList[connections[key].points[1].point]) {

            pointsList[connections[key].points[1].point] = 1;
        } else {
            pointsList[connections[key].points[1].point]++;
        }
        
    })
    Object.keys(wiresList).forEach(function(key) {
        option = document.createElement("option");   
        option.text = key+" - "+wiresList[key];
        option.setAttribute("value", key);
        wiresElement.appendChild(option);
    })
    Object.keys(pointsList).forEach(function(key) {
        option = document.createElement("option");   
        option.text = key+" - "+pointsList[key];
        option.setAttribute("value", key);
        pointsElement.appendChild(option);
    })
    

    renderAll = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Object.keys(connections).forEach(function(key) {
            if (connections[key]) connections[key].render(ctx, key);
        })
    
    }
    renderAll();

    document.getElementById("canvas").onclick = function(e){
        console.log('{"x":'+e.pageX+',  "y":'+e.pageY+'},');
    }
    optionElement.onchange = function(e){
        Object.keys(connections).forEach(function(key) {
            connections[key].isVisible = false;
        })
        connections[optionElement.value].isVisible = true;
        renderAll();
    }
    wiresElement.onchange = function(e){
        Object.keys(connections).forEach(function(key) {
            connections[key].isVisible = false;
            if ( connections[key].wire == wiresElement.value){
                connections[key].isVisible = true;
            }
        })
        console.log(connections);
        renderAll();
    }
    
}