var rendererw = 500
var rendererh = 500
var renderer = new PIXI.autoDetectRenderer(rendererw, rendererh, {
    view: document.getElementById('maincanvas'),
    antialias: false,
    transparent: false,
    resolution: 1,
    //    transparent:1
});

// 創建 Stage 
var stage = new PIXI.Container(rendererw, rendererh);
var container = new PIXI.particles.ParticleContainer;
stage.addChild(container);
stage.interactive = true;
var graphics = new PIXI.Graphics();

// 創建 click區
var info = new PIXI.interaction.InteractionData()
var rect = new PIXI.Graphics();
rect.lineStyle(1, 0x000);
rect.interactive = true;
rect.hitArea = new PIXI.Rectangle(0, 0, rendererw, rendererh);
rect.drawRect(0, 0, rendererw, rendererh);
stage.addChild(rect);
var graphics0 = new PIXI.Graphics();
graphics0.lineStyle(0);
graphics0.beginFill(0xFFFFFF, 0);
graphics0.drawCircle(0, 0, 100);
graphics0.endFill();
//add circle to sprite
var sprite0 = new PIXI.Sprite(graphics0.generateCanvasTexture(10, 1));
sprite0.interactive = true;
sprite0.position.set(0, 0);
stage.addChild(sprite0);



//click event

//             stage.on('mousedown', onClick);
//     stage.on('tap', onClick);
//rect.on('click', function(e){console.log(e.data.global,e.data.originalEvent)});
//stage.on('click', function(e){console.log(e.data.global,e.data.originalEvent)});
var count = 0;
var mouse = 0;
var spritearray = new Array();
var downx;
var downy;
var overx;
var overy;
var upx;
var upy;
var timer;



stage.on('mousedown', function(e) {
    //            mouse = 1
    downx = range(0, e.data.global.x, rendererw);
    downy = range(0, e.data.global.y, rendererh);
    // draw a circle,

    graphics0.lineStyle(0);
    graphics0.beginFill(0xFFFFFF, 0.6);
    graphics0.drawCircle(0, 0, 100);
    graphics0.endFill();
    //add circle to sprite
    sprite0.texture = graphics0.generateCanvasTexture(10, 1);
    sprite0.interactive = true;
    sprite0.position.set(downx - 10, downy - 10);
    sprite0.scale.x = 0.1;
    sprite0.scale.y = 0.1;

});
stage.on('click', function(e) {
    sprite0.scale.x = 0;
    sprite0.scale.y = 0;
    upx = range(0, e.data.global.x, rendererw);
    upy = range(0, e.data.global.y, rendererh);
    // draw a circle,
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 0.6);
    var circler = Math.sqrt(Math.pow(upx - downx, 2) + Math.pow(upy - downy, 2)) / 2;
    graphics.drawCircle(0, 0, circler);
    graphics.endFill();
    //add circle to sprite
    var sprite = new PIXI.Sprite(graphics.generateCanvasTexture(0, 0));
    sprite.interactive = true;
    var spritepositionx = (upx + downx) / 2 - circler;
    var spritepositiony = (upy + downy) / 2 - circler;
    sprite.position.set(spritepositionx, spritepositiony);
    container.addChild(sprite);
    spritearray.push({
        "start": count,
        "x": spritepositionx,
        "y": spritepositiony,
        "r": circler,
        "xrandom": Math.random() - 0.5,
    });

});


function range(min, e, max) {
    if (min <= e && e <= max) {
        return e
    } else if (max < e) {
        return max
    } else {
        return min
    }
};

function animate() {
    graphics.clear();
    graphics0.clear();
    count += 0.1;

    stage.on('mousedown', function(e) {
            mouse = 1
        })
        .on('mousemove', function(e) {
            if (mouse == 1) {
                overx = range(0, e.data.global.x, rendererw);
                overy = range(0, e.data.global.y, rendererh);
                var circler = Math.sqrt(Math.pow(overx - downx, 2) + Math.pow(overy - downy, 2)) / 2;
                var spritepositionx = (overx + downx) / 2 - circler;
                var spritepositiony = (overy + downy) / 2 - circler;
                sprite0.position.set(spritepositionx, spritepositiony);
                sprite0.scale.x = circler / 100;
                sprite0.scale.y = circler / 100;
            }
        })
        .on('mouseup', function(e) {
            sprite0.scale.x = 0;
            sprite0.scale.y = 0;
            mouse = 0
        });

    if (typeof spritearray[0] != "undefined") {
        for (i = 0; i < container.children.length; i++) {
            var t = count - spritearray[i].start
            var r = spritearray[i].r;
            var x = spritearray[i].x;
            var y = spritearray[i].y;
            var xr = spritearray[i].xrandom
            var h = rendererh;
            if (t < 100) {
                container.children[i].position.y = (h - 2 * r) - (h - y - 2 * r) * Math.abs(Math.cos((-0.9) * t)) * Math.exp(-0.1 * t);
                container.children[i].position.x = x + xr * r * t / 2;
            } else {
                container.children[i].position.y = h - 2 * r;
                container.children[i].position.x = x + xr * r * 100 / 2;
            };
        };
    };
    // 以 Render 去渲染 Stage
    renderer.render(stage);
    timer = requestAnimationFrame(animate);
    stage.on('mouseout', function() {
        cancelAnimationFrame(timer)
    });
};
//  animate()
