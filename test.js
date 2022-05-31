var Pins = {
    "points": [],
    "path": [],
    "wire": "",
    "isVisible" : false,
    render: function(ctx){
        if (!this.isVisible) return;
        
        //ctx = document.getElementById("canvas").getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height); 
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

    Object.keys(connections).forEach(function(key) {
        Object.setPrototypeOf(connections[key], Pins);
        option = document.createElement("option");
        option.text = "["+connections[key].wire+"] "+key;
        option.setAttribute("value", key);
        document.getElementById("select").appendChild(option);
    })
    renderAll = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        Object.keys(connections).forEach(function(key) {
            if (connections[key]) connections[key].render(ctx);
        })
    
    }
    renderAll();
    document.getElementById("canvas").onclick = function(e){
        console.log('{"x":'+e.pageX+',  "y":'+e.pageY+'},');
    }
    document.getElementById("select").onchange = function(e){
        Object.keys(connections).forEach(function(key) {
            connections[key].isVisible = false;
        })
        connections[document.getElementById("select").value].isVisible = true;
        renderAll();
    }
}