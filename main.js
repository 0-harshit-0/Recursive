let rng = document.querySelector('#range');
let rng1 = document.querySelector('#range1');
let clr = document.querySelector('#clr');
let c = false;
let t = false;
let m = false;
let mt = false;
let fill = 'green', fc;

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let minimum = Math.min(innerWidth, innerHeight);
canvas.width = minimum/1.5;
canvas.height = minimum/1.5;

addEventListener('resize', () => {
	minimum = Math.min(innerWidth, innerHeight);
	canvas.width = minimum/1.5;
	canvas.height = minimum/1.5;
})

let s = new Shapes(ctx);
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

let a, b, n=0;
const maxiterations = 50;
const magnify = 2;
function mandel(tri=false) {
	if (tri) {
		mt=true;
		m=false;
	}else {
		mt=false;
		m=true;
	}
	c=false;
	t=false;
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width, canvas.height);

	for (var x = 0; x < canvas.width; x += 1) {
		for (var y = 0; y < canvas.height; y += 1) {
			
			a = Vector2D.map(x, 100, canvas.width, -magnify, magnify);
			b = Vector2D.map(y, 100, canvas.height, -magnify, magnify);
			n = 0;
			if ((a <= 0 || a >= 0) && (b <= 0 || b >= 0)) {

				var ca = a;//x
				var cb = b;//y

				while(n < maxiterations && Math.sqrt(a*a + b*b) <= 15) {
					//console.log(1)
					
					if (tri) {
						let aa = a*a - b*b;
						let bb = -2*a*b;
						a = aa + ca;
						b = bb + cb;
					}else {
						let aa = a*a - b*b;
						let bb = 2*a*b;
						a = aa + ca;
						b = bb + cb;
					}
									
			        n++;
				}
				fc = hexToRgb(clr.value);
	      		if (n == maxiterations) {
	      			
			        fill = `black`;
			        
			    }else if (n < maxiterations) {
			    	
			    	fill = `rgb(${fc.r+(n*10)},${fc.g+(n*10)},${fc.b+(n*10)})`;
			    }

	            s.box(x, y, 1, 1);
	            s.fill(fill);
	            //console.log(fill)
	        }
		}
	}
}



//trees

function tree(length, color='black') {
	s.line(0,0,0,-length);
	s.stroke(color);

	if (length > 5) {
		ctx.save();
		ctx.translate(0, -length/7);
		ctx.rotate(-45);
		tree(length*0.4, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/7);
		ctx.rotate(45);
		tree(length*0.4, color);
		ctx.restore();

		ctx.save();
		ctx.translate(0, -length/2.5);
		ctx.rotate(-45);
		tree(length*0.3, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/2.5);
		ctx.rotate(45);
		tree(length*0.3, color);
		ctx.restore();

		ctx.save();
		ctx.translate(0, -length/1.6);
		ctx.rotate(-45);
		tree(length*0.2, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/1.6);
		ctx.rotate(45);
		tree(length*0.2, color);
		ctx.restore();

		ctx.save();
		ctx.translate(0, -length/1.3);
		ctx.rotate(-45);
		tree(length*0.1, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/1.3);
		ctx.rotate(45);
		tree(length*0.1, color);
		ctx.restore();

		ctx.save();
		ctx.translate(0, -length/1.15);
		ctx.rotate(-45);
		tree(length*0.07, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/1.15);
		ctx.rotate(45);
		tree(length*0.07, color);
		ctx.restore();

		ctx.save();
		ctx.translate(0, -length/1.051);
		ctx.rotate(-45);
		tree(length*0.03, color);
		ctx.restore();
		ctx.save();
		ctx.translate(0, -length/1.051);
		ctx.rotate(45);
		tree(length*0.03, color);
		ctx.restore();
	}
	
}
function makeTree(l=minimum/2, clr='black') {
	mt=false;
	m=false;
	c=false;
	t=true;
	rng.max = minimum;

	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.translate(canvas.width/2, canvas.height);
	tree(l, clr);
}

//circles
function fourTimesCircle(x, y, radii, color='black') {
	s.circle(x,y,radii);
	s.stroke(color);

	if (radii > 2) {
		fourTimesCircle(x - radii*parseInt(rng1.value), y, radii/2, color);
		fourTimesCircle(x + radii*parseInt(rng1.value), y, radii/2, color);
		fourTimesCircle(x, y - radii*parseInt(rng1.value), radii/2, color);
		fourTimesCircle(x, y + radii*parseInt(rng1.value), radii/2, color);
	}
}
function makeCir(colr) {
	mt=false;
	m=false;
	c=true;
	t=false;
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width, canvas.height);
	fourTimesCircle(canvas.width/2, canvas.height/2, parseInt(rng.value), colr);
}


function make(clr) {
	if (c) {
		makeCir(clr);
	}else if (t) {
		makeTree(rng.value, clr);
	}else if (m) {
		mandel();
	}else if (mt) {
		mandel(true);
	}
}
rng.addEventListener('change', () => {
	make(clr.value);
});
rng1.addEventListener('change', () => {
	make(clr.value);
});

clr.addEventListener('change', ()=> {
	fill = clr.value;
	make(fill);
});
