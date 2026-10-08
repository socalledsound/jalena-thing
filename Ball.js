class Ball {
  constructor(x){
      this.pos = createVector(x, random(-100, -300))
      this.sz = random(10,50)
      this.vel = createVector(random(-1,1), random(0.5,2.0))
      this.acc = createVector(0,0)
      this.col = [random(255), random(255), random(255), 250]
  }
  
  render(){
      noStroke()
      fill(this.col)
      ellipse(this.pos.x, this.pos.y, this.sz)
  }
  
  update(lines){
    lines.forEach(l => {
      l.getClosest(this.pos, this.sz/2)
      this.checkLineCollision(l)
    })
    
    
    
    this.pos.add(this.vel)
  }
  
  
   checkLineCollision(l){
        if(l.closest){
    // get distance to closest point
    const normalHeading = l.normal.heading()
    //console.log(normalHeading)
const x = this.pos.x + sin( normalHeading * -1 + 90) * this.sz/2
const y = this.pos.y + cos( normalHeading * -1 + 90) * this.sz/2
let distX = l.closest.x - this.pos.x;
let distY = l.closest.y - this.pos.y;
// let distX = l.closest.x - x;
// let distY = l.closest.y - y;
let distance = sqrt( (distX * distX) + (distY * distY) );



// const x = this.pos.x + sin(line.normal.heading() + 90) * this.r
// const y = this.pos.y + cos(line.normal.heading() + 90) * this.r

this.edge = createVector(x, y)

let incidence =  p5.Vector.mult(this.vel, -1);
incidence.normalize();
//console.log(distance, '::::', this.r)
if (distance <= this.sz/2 + 12) {
l.active = true
setTimeout(l.reset, 500)
// what do we multiply velocity by?
let dot = incidence.dot(l.normal);
let velX = 2 * l.normal.x * dot - incidence.x
let velY = 2 * l.normal.y * dot - incidence.y

if(this.vel.x > 0){
    this.pos.x -= 2
} else {
    this.pos.x += 2
}

if(this.vel.y > 0){
    this.pos.y -= 2
} else {
    this.pos.y += 2
}

this.vel.set(velX, velY, 0);
this.vel.mult(this.bumpSpeed);

// trigger sound

// min/max ranges for modulator
// let modMaxFreq = 112;
// let modMinFreq = 0;
// let modMaxDepth = 150;
// let modMinDepth = -150;

// game.level.modulator.freq(random(30,50));
// game.level.modulator.amp(random(-1000, 1000));
// game.level.osc.freq(game.level.freqs[l.id] * 40/this.r )
// game.level.osc.amp(1.0)
// setTimeout(this.stopSound, 250)

        }
    

    //console.log('collided')
}

}
  
  
}