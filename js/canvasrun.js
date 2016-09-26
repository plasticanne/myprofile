/**
 *@author plastic.anne@gmail.com
 *@date 2016/9/14
 *@fileoverview
 */
import  * as m from "./machine.js";
//class  MakeTexture
function MakeTexture() {
    PIXI.Graphics.call(this);
};
MakeTexture.prototype = new PIXI.Graphics();
MakeTexture.prototype.constructor = MakeTexture;
MakeTexture.prototype.circle = function(r, color, border, opacity) {
    this.lineStyle(border);
    this.beginFill(color, opacity);
    this.drawCircle(0, 0, r);
    this.endFill();
};
MakeTexture.prototype.clickArea = function(border, borderColor) {
    this.lineStyle(border, borderColor);
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(0, 0, RENDERER_W, RENDERER_H);
    this.drawRect(0, 0, RENDERER_W, RENDERER_H);
};

//class DrawGraphics
function AddSprite(texture) {
    PIXI.Sprite.call(this, texture);
    this.texture = texture;
    this.interactive = true;
};
AddSprite.prototype = new PIXI.Sprite(AddSprite.texture);
AddSprite.prototype.constructor = AddSprite;
AddSprite.prototype.setSprite = function(x, y, box) {
    this.position.set(x, y);
    box.addChild(this);
};
AddSprite.prototype.reSetSprite = function(x, y, sx, sy) {
    (x != null && y != null) && (this.position.set(x, y));
    sx != null && (this.scale.x = sx);
    sy != null && (this.scale.y = sy);
};

//class DragCircleSize
function DragCircleSize(downx, downy, ex, ey) {
    var upx = this.range(0, ex, RENDERER_W);
    var upy = this.range(0, ey, RENDERER_H);
    var r = Math.sqrt(Math.pow(upx - downx, 2) + Math.pow(upy - downy, 2)) / 2;
    var x = (upx + downx) / 2 - r;
    var y = (upy + downy) / 2 - r;
    this.r = r
    this.x = x
    this.y = y
};
DragCircleSize.prototype.range = function(min, e, max) {
    if (min <= e && e <= max) {
        return e
    } else if (max < e) {
        return max
    } else {
        return min
    }
};

//class MoveSpriteS
function MoveSpriteS(container, spriteArray) {
    this.spriteArray = spriteArray;
    this.container = container;
};
MoveSpriteS.prototype.circlesFall = function() {
    for (var i = 0; i < this.container.children.length; i++) {
        var t = count - this.spriteArray[i].start
        var r = this.spriteArray[i].r;
        var x = this.spriteArray[i].x;
        var y = this.spriteArray[i].y;
        var xr = this.spriteArray[i].xrandom
        var h = RENDERER_H;

        if (t < 100) {
            this.container.children[i].position.y = (h - 2 * r) - (h - y - 2 * r) *
                Math.abs(Math.cos((-0.9) * t)) * Math.exp(-0.1 * t);
            this.container.children[i].position.x = x + xr * r * t / 2;
        } else {
            this.container.children[i].position.y = h - 2 * r;
            this.container.children[i].position.x = x + xr * r * 100 / 2;
        };
    };
};
////////////////////////////
var RENDERER_W = $(window).width() * 0.65;
var RENDERER_H = $(window).height() * 0.6;
var renderer = new PIXI.autoDetectRenderer(RENDERER_W, RENDERER_H, {
    view: document.getElementById('maincanvas'),
    antialias: false,
    transparent: false,
    resolution: 1,
    //    transparent:1
});

// 創建 Stage 
var stage = new PIXI.Container(RENDERER_W, RENDERER_H);
stage.interactive = true;
// 創建 ParticleContainer
var container = new PIXI.particles.ParticleContainer;
stage.addChild(container);



// 創建 click區
//var info = new PIXI.interaction.InteractionData()
var rect = new MakeTexture();
rect.clickArea(1, 0x000);
stage.addChild(rect);
/*var rect = new PIXI.Graphics();
rect.lineStyle(1, 0x000);
rect.interactive = true;
rect.hitArea = new PIXI.Rectangle(0, 0, RENDERER_W, RENDERER_H);
rect.drawRect(0, 0, RENDERER_W, RENDERER_H);
stage.addChild(rect);*/


// 創建 不可見circle texture
var graphics0 = new MakeTexture();
graphics0.circle(100, 0xFFFFFF, 0, 0);
/*var graphics0 = new PIXI.Graphics();
graphics0.lineStyle(0);
graphics0.beginFill(0xFFFFFF, 0);
graphics0.drawCircle(0, 0, 100);
graphics0.endFill();*/


// 創建 不可見circle sprite
var sprite0 = new AddSprite(graphics0.generateCanvasTexture(10, 1));
sprite0.setSprite(0, 0, stage);
/*var sprite0 = new PIXI.Sprite(graphics0.generateCanvasTexture(10, 1));
sprite0.interactive = true;
sprite0.position.set(0, 0);
stage.addChild(sprite0);*/




var count = 0;
var mouseMode = 0;
var spriteArray = new Array();
var downx;
var downy;
//var overx;
//var overy;
//var upx;
//var upy;
var timer;


//click event
//             stage.on('mousedown', onClick);
//     stage.on('tap', onClick);
//rect.on('click', function(e){console.log(e.data.global,e.data.originalEvent)});
//stage.on('click', function(e){console.log(e.data.global,e.data.originalEvent)});


var supportTouch=m.supportTouch

stage.on(supportTouch && ('touchstart') || ('mousedown'), function(e) {
    downx = new DragCircleSize().range(0, e.data.global.x, RENDERER_W);
    downy = new DragCircleSize().range(0, e.data.global.y, RENDERER_H);

    //創建 可拉circle texture
    graphics0.circle(100, 0xFFFFFF, 0, 0.6);
    /*graphics0.lineStyle(0);
        graphics0.beginFill(0xFFFFFF, 0.6);
        graphics0.drawCircle(0, 0, 100);
        graphics0.endFill();*/
    sprite0.texture = graphics0.generateCanvasTexture(10, 1);


    //創建 可拉circle sprite
    sprite0.reSetSprite(downx - 10, downy - 10, 0.1, 0.1);
    /*sprite0.position.set(downx - 10, downy - 10);
    sprite0.scale.x = 0.1;
    sprite0.scale.y = 0.1;*/

});

var drag;

stage.on(supportTouch && ('touchend') || ('mouseup'), function(e) {
    //消去 sprite0
    sprite0.reSetSprite(null, null, 0, 0);
    /*sprite0.scale.x = 0;
    sprite0.scale.y = 0;*/

    drag = new DragCircleSize(downx, downy, e.data.global.x, e.data.global.y);
    /*upx = range(0, e.data.global.x, RENDERER_W);
        upy = range(0, e.data.global.y, RENDERER_H);
        var r = Math.sqrt(Math.pow(upx - downx, 2) + Math.pow(upy - downy, 2)) / 2;
        var x = (upx + downx) / 2 - r;
        var y = (upy + downy) / 2 - r;*/

    if (drag.r != 0) {
        // 創建 落下circle texture
        var graphics = new MakeTexture();
        graphics.circle(drag.r, 0xFFFFFF, 0, 0.6);
        /*graphics.lineStyle(0);
           graphics.beginFill(0xFFFFFF, 0.6);
           graphics.drawCircle(0, 0, r);
           graphics.endFill();*/

        // 創建 落下circle sprite
        var sprite = new AddSprite(graphics.generateCanvasTexture(10, 10));
        sprite.setSprite(drag.x, drag.y, container);
        /*var sprite = new PIXI.Sprite(graphics.generateCanvasTexture(0, 0));
            sprite.interactive = true;
            sprite.position.set(x, y);
            container.addChild(sprite);*/


        spriteArray.push({
            "start": count,
            "x": drag.x,
            "y": drag.y,
            "r": drag.r,
            "xrandom": Math.random() - 0.5,
        });
        graphics.clear();
    }
});



export function animate() {
    graphics0.clear();
    count += 0.1;

    stage.on(supportTouch && ('touchstart') || ('mousedown'), function(e) {
            mouseMode = 1
        })
        .on(supportTouch && ('touchmove') || ('mousemove'), function(e) {
            if (mouseMode == 1) {
                var drag = new DragCircleSize(downx, downy, e.data.global.x, e.data.global.y);
                /*overx = range(0, e.data.global.x, RENDERER_W);
                    overy = range(0, e.data.global.y, RENDERER_H);
                    var r = Math.sqrt(Math.pow(overx - downx, 2) + Math.pow(overy - downy, 2)) / 2;
                    var x = (overx + downx) / 2 - r;
                    var y = (overy + downy) / 2 - r;*/
                sprite0.reSetSprite(drag.x, drag.y, drag.r / 100, drag.r / 100);
                /*sprite0.position.set(x, y);
                sprite0.scale.x = r / 100;
                sprite0.scale.y = r / 100;*/
            }
        })
        .on(supportTouch && ('touchend') || ('mouseup'), function(e) {
            sprite0.reSetSprite(null, null, 0, 0);
            /*sprite0.scale.x = 0;
            sprite0.scale.y = 0;*/
            mouseMode = 0
        });

    if (typeof spriteArray[0] != "undefined") {
        new MoveSpriteS(container, spriteArray).circlesFall();
        /*for (i = 0; i < container.children.length; i++) {
            var t = count - spritearray[i].start
            var r = spriteArray[i].r;
            var x = spriteArray[i].x;
            var y = spriteArray[i].y;
            var xr = spritAarray[i].xrandom
            var h = RENDERER_H;
            if (t < 100) {
                container.children[i].position.y = (h - 2 * r) - (h - y - 2 * r) * Math.abs(Math.cos((-0.9) * t)) * Math.exp(-0.1 * t);
                container.children[i].position.x = x + xr * r * t / 2;
            } else {
                container.children[i].position.y = h - 2 * r;
                container.children[i].position.x = x + xr * r * 100 / 2;
            };
        };*/
    };
    // 以 Render 去渲染 Stage
    renderer.render(stage);
    timer = requestAnimationFrame(animate);
    // 離開滑鼠區停止動畫
    
    supportTouch || (stage.on('mouseout', function() {
        cancelAnimationFrame(timer)
    }));
};
//  animate()
