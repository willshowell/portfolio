/* Will Howell - explosion.js */

var eJS = function(tag_id, params) {

  var canvas_el = document.querySelector('#'+tag_id+' > .explosion-js-canvas-el');

  /* ------ Default Values ------ */
  this.eJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    items: {
      count: 100,
      color: {
        value: '#00ff00'
      },
      array: []
    },
    outline: {},
    fn: {},
    tmp: {}
  };

  var eJS = this.eJS;

  /* ------ eJS canvas functions ------ */
  eJS.fn.retinaInit = function() {
    if (window.devicePixelRatio > 1) {
      eJS.canvas.pxratio = window.devicePixelRatio;
      eJS.tmp.retina = true;
    }
    else {
      eJS.canvas.pxratio = 1;
      eJS.tmp.retina = false;
    }
    
    eJS.canvas.w = eJS.canvas.el.offsetWidth * eJS.canvas.pxratio;
    eJS.canvas.h = eJS.canvas.el.offsetHeight * eJS.canvas.pxratio;
  };
  
  eJS.fn.canvasInit = function() {
    eJS.canvas.ctx = eJS.canvas.el.getContext('2d');
  };

  eJS.fn.canvasSize = function() {
    eJS.canvas.el.width = eJS.canvas.w;
    eJS.canvas.el.height = eJS.canvas.h;

    window.addEventListener('resize', function() {
      eJS.canvas.el.w = eJS.canvas.el.offsetWidth;
      eJS.canvas.el.h = eJS.canvas.el.offsetHeight;

      if (eJS.tmp.retina) {
        eJS.canvas.el.w *= eJS.canvas.pxratio;
        eJS.canvas.el.h *= eJS.canvas.pxratio;
      }

      eJS.canvas.el.width = eJS.canvas.w;
      eJS.canvas.el.height = eJS.canvas.h;

      eJS.fn.itemsDraw();
    });
  };

  eJS.fn.canvasPaint = function() {
    eJS.canvas.ctx.fillRect(0, 0, eJS.canvas.w, eJS.canvas.h);
  };

  eJS.fn.canvasClear = function() {
    eJS.canvas.ctx.clearRect(0, 0, eJS.canvas.w, eJS.canvas.h);
  };

  /* ------ eJS item functions ------ */
  eJS.fn.item = function(color) {

    /* size */
    var lengthMax = 300 * eJS.canvas.pxratio;
    var lengthMin = 75 * eJS.canvas.pxratio;
    var xFactor = 1.7;
    this.xLength = Math.random() * (lengthMax/xFactor  - lengthMin/xFactor) + lengthMin/xFactor;
    this.yLength = Math.random() * (lengthMax - lengthMin) + lengthMin;
    
    //this.xLength = 10;
    //this.yLength = 10;

    /* shape (triangle or rectangle) */
    this.sides = Math.floor(Math.random() * 2) + 3;

    /* position */
    xRandom = Math.random();
    this.x = xRandom * eJS.canvas.w;
    this.y = Math.random() * eJS.canvas.h/4;
    //this.y = Math.random() * (xRandom * eJS.canvas.h * 0.45);
    this.angle = Math.random() * 360;
    this.initialAngle = this.angle;
    this.initialX = this.x;
    this.initialY = this.y;

    /* z index */

    /* color */
    this.color = {};
    var colorType = Math.floor(Math.random() * 3);
    switch(colorType) {
      case 0:
        this.color.rgb = {r: 27, g: 182, b: 158};
        //this.color.rgb = {r: 25, g: 25, b: 25};
        break;
      case 1:
        this.color.rgb = {r: 2, g: 35, b: 44};
        //this.color.rgb = {r: 50, g: 50, b: 50};
        break;
      case 2:
        this.color.rgb = {r: 25, g: 175, b: 75};
        //this.color.rgb = {r: 100, g: 100, b: 100};
        break;
      default:

        this.color.rgb = {r: 0, g: 0, b: 0};
        break;
    }
    this.color.opacity = 1;
  };
  
  eJS.fn.item.prototype.draw = function() {
    var i = this;
    var color_value = 'rgba('+i.color.rgb.r+','+i.color.rgb.g+','+i.color.rgb.b+','+i.color.opacity+')';

    eJS.canvas.ctx.fillStyle = color_value;
    eJS.canvas.ctx.beginPath();
    eJS.fn.drawShape(eJS.canvas.ctx, i.x, i.y, i.xLength, i.yLength, i.sides, i.angle);
    eJS.canvas.ctx.closePath();
    eJS.canvas.ctx.fill();
  };
  
  eJS.fn.itemsCreate = function() {
    for(var i = 0; i < eJS.items.count; i++) {
      eJS.items.array.push(new eJS.fn.item(eJS.items.color));
    }
  };

  eJS.fn.itemsDraw = function() {
    /* clear the canvas */
    //eJS.fn.canvasClear();
    
    /* Make the clip */
    eJS.canvas.ctx.save();
    eJS.fn.drawOutline(eJS.canvas.ctx, eJS.canvas.w, eJS.canvas.h );
    
    /* TODO update each item's param */

    /* draw each item */
    for (var i = 0; i < eJS.items.array.length; i++) {
      var item = eJS.items.array[i];
      item.draw();
    }

    // Remove the clip
    eJS.canvas.ctx.restore();
  };

  eJS.fn.drawOutline = function(c, width, height) {
    
    c.beginPath();
    c.moveTo(0,height * 0.1);

    for (var i = 0; i < 11; i++) {
      var newHeight = 0; 
      if (i < 6 ){
        newHeight = height * (0.1 + i / 18) + Math.random() * 60;
      } else {
        newHeight = height * (0.1 + i / 18) + Math.random() * 60;
        //newHeight = height * (0.1 + (11-i) / 18) + Math.random()  * 60;
      }
      //newHeight = height * 0.5 + Math.random() * 30;
      c.lineTo(i * width / 10, newHeight);
    }

    c.lineTo(width, 0);
    c.lineTo(0, 0);
    //c.lineTo(0,height);
    //c.lineTo(width, height);
    //c.lineTo(width, height*0.9);

    c.clip();
    //c.restore();
  }

  eJS.fn.drawShape = function(c, startX, startY, sideLengthX, sideLengthY, sides, angleDeg) {
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);

    c.rotate(angleDeg * Math.PI/180);

    for (var i = 0; i < (sides-2); i++) {
      c.lineTo(sideLengthX, 0);
      c.translate(sideLengthX, 0);
      c.rotate(90 * Math.PI/180);

      c.lineTo(sideLengthY, 0);
      c.translate(sideLengthY, 0);
      c.rotate(90 * Math.PI/180);
    }
    
    c.fill();
    c.restore();
  }

  /* ------ Setup ------ */
  eJS.fn.eventListeners = function () {
    window.addEventListener('scroll', function() {

      /*var scrollTop = window.pageYOffset;
      var height = window.innerHeight - 325;
      var distanceFromFinish = height - scrollTop;
      console.log(scrollTop);
      if (distanceFromFinish < 0) distanceFromFinsih = 0;
      for (var i = 0; i < eJS.items.array.length; i++) {
        var scrollStep = eJS.items.array[i].initialAngle / 1500;
        var newAngle = eJS.items.array[i].initialAngle;
        newAngle -= scrollStep * scrollTop;

        //eJS.items.array[i].angle = newAngle;


      }*/
      //eJS.fn.itemsDraw(); // TODO uncomment

    });
  };

  eJS.fn.start = function() {
    eJS.fn.init();
    eJS.fn.draw();
  };

  eJS.fn.init = function() {
    eJS.fn.retinaInit();
    eJS.fn.canvasInit();
    eJS.fn.canvasSize();
    //eJS.fn.canvasPaint();
    eJS.fn.itemsCreate();
  };

  eJS.fn.draw = function() {
    eJS.fn.itemsDraw();
  };



  /* ------ Start ------ */
  eJS.fn.eventListeners();
  eJS.fn.start();
};



/* Global functions */
// TODO requestAnimFrame, cancelRequestAnimFrame, hexToRgb, clamp, isInArray



/* Initialization */
window.eJSDom = [];

window.explosionJS = function(tag_id, params) {

  /* create canvas element */
  var eJS_canvas_class = 'explosion-js-canvas-el';
  var canvas_el = document.createElement('canvas');
  canvas_el.className = eJS_canvas_class;

  /* set size of the canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch explosion.js */
  if (canvas != null) {
    eJSDom.push(new eJS(tag_id, params)); 
  }

};

window.explosionJS.load = function(tag_id, path_config_json, callback) {

  /* Load json config file */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function(data) {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.explosionJS(tag_id, params);
        if (callback) callback();
      } else {
        console.log('Error explosionJS - XMLHttpRequest status: ' + xhr.status);
        console.log('Error explosionJS - File config not found');
      }
    }
  };
  xhr.send();
};
