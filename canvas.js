
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


function Particles(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function(){

      c.beginPath();
      var gradient = c.createLinearGradient(5, 5, 1800, 100);
      gradient.addColorStop("0", "transparent");
      gradient.addColorStop("0.2", "#fff092")
      gradient.addColorStop("0.5" ,"#ffad00");
      gradient.addColorStop("0.9", "#fff092");
      gradient.addColorStop("1", "transparent");
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = gradient;
      c.fillStyle = gradient;
      c.fill();
      c.stroke();
    }

    this.update = function(){
      if (this.x > innerWidth){
        c.clearRect(0,0, innerWidth, innerHeight);
      }
      this.x += 1;

      this.draw();
    }
}

var particleArray = [];

manageParticles = setInterval( function(){
    
    var x = 0;
    var y = Math.random() * window.innerHeight;
    var radius = Math.random() * 6;
    if(particleArray.length < 50){
      particleArray.push(new Particles(x,y,radius));
    }
    else(
      particleArray.splice(0,1)
    )
},2000);

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);
   
  for(var i = 0; i < particleArray.length; i++){
      particleArray[i].update();
  }
}
animate() 














