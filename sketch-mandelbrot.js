let iterCount = 300;
let circleRadius = 2;


function setup() {
    pixelDensity(1);
    createCanvas(600, 600);
    colorMode(HSB, 1);
}


function draw() {
    background(0);
    loadPixels();

    let w = 3;
    let h = w * (height / width);

    let xMin = -w*5 / 7;
    let yMin = -h / 2;

    let xMax = xMin + w;
    let yMax = yMin + h;

    let dx = (xMax - xMin) / width;
    let dy = (yMax - yMin) / height;

    for (let pixelX = 0; pixelX < width; pixelX++) {
        for (let pixelY = 0; pixelY < height; pixelY++) {
            let x = xMin + (pixelY * dx)
            let y = yMax - (pixelX * dy)

            let n = calculateInfinity(createVector(x, y));

            let pix = (pixelY + pixelX * width) * 4;
            let color = getColor(n)
            pixels[pix] = color[0];
            pixels[pix + 1] = color[1];
            pixels[pix + 2] = color[2];
        }
    }
    updatePixels();
}

function getColor(inCircle){
    let hu = (2 / 3) + (inCircle / (iterCount))
    let col = color(hu, 1, inCircle !== iterCount ? 1 : 0);
    return [red(col) ,  green(col) , blue(col)]
}


function calculateInfinity(point){
    let count=0;
    let calcPoint =  createVector(0,0)

    for (let i = 0; i < iterCount; i++) {
        calcPoint = powComplex(calcPoint).add(point)
        if (calcPoint.mag() > circleRadius) break;
        count++
    }
    return count;
}

function powComplex(point){
    x = (point.x * point.x) - (point.y*point.y)
    y = 2* point.y * point.x
    return createVector(x,y)
}