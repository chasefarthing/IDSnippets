﻿var doc = app.activeDocument;var ns; // the Systemvar num = 100; // number of nodesvar width = doc.documentPreferences.pageWidth;var height = doc.documentPreferences.pageHeight ;  setup();draw();function setup(){  //background(255,5);  // bg for startup  //size(400,250);  // the starting distance for the calculation of the lines  var distance = 10;  // create the NodeSystem with distance   ns = new NodeSystem(distance,num);   // frameRate(1);   //smooth(); // make it smooth    // initalise all the nodes    // if you put the init into the draw it calcs every loop new nodes   ns.init();}// end of setup//function draw(){  // write a rect in the size of the sketch for smooth background clear // noStroke(); // fill(255,23); // rect(0,0,width,height);// run the node system  ns.run();//saveFrame("images/nodes-####.tif");//  noLoop();}// thew node class holdes the only the points// the lines get caculated in the NodeSystemfunction Node( posIn, diamIn){      this.pos = posIn; // the node position  //var  vel = [Math.random()*2,]; // the velocity of the node  this.diam = 10; // the diameter  this.cons = 0; // the connection he has    // start with own velocity  //vel = new Array(,random(-2,2));  //}// draw the node  this.show = function (){   //fill(255);        var ov = doc.pages.item(0).ovals.add();          ov.geometricBounds = [this.pos[1],this.pos[0], this.pos[1] + 10, this.pos[0]+10];  //ellipse(pos.x, pos.y, diam, diam);  }    // check Edges makes them come in from the other sidethis.checkEdges = function () {    if (this.pos[0] > width) {      this.pos[0] = 0;    } else if (this.pos[0] < 0) {      this.pos[0] = width;    } // X        if (this.pos[1] > height) {      this.pos[1] = 0;    } else if (this.pos[1] < 0) {      this.pos[1] = height;    }// Y  }// end checkEdges}function NodeSystem(dis,theNum){    this.nodes = new Array(); // a list of nodes  this.distance = dis; // inintal distance  this.number = theNum;   // this initalizes the nodes  this.init = function (){            // loop thru num    for(var i = 0; i < this.number; i++){      // make a random point       var x = Math.random()* width;      var y = Math.random()* height;                  var diam = 1;// with diameter            var pos = [x,y];// position into PVector     this.n = new Node(pos,diam);     this.nodes.push(this.n); // add the new node to the list    }    }      // run the nodesystem  this.run = function (){     display(this.nodes);      } function lineLength (x, y, x0, y0){    return Math.sqrt((x -= x0) * x + (y -= y0) * y);};// calculate the connections and draw the lines function calcConnections(n){    var num = 0; // number of connections  for(var i = 0; i < this.number; i ++){          var v1 = n.pos; // position of the refrence positoin      var v2 = this.nodes[i].pos; // every other node      var d =  lineLength(v1[1],v1[0],v2[1],v2[0]);// calc the distance        // now if the node already has some connections      // make the diastance he can check higher      if((d < this.distance + n.cons* 3) &&(d > 1)){               stroke(0,100);                      var line = doc.pages.item(0).graphicLines.add();        line.geometricBounds = [v1[0],v1[1],v2[0],v2[1]];                num++; // increment num      }    // set the connections of the node to the num  n.cons = num;  }  }    // display the nodes and draw the connectionsfunction display(nodes){       var n;// keep it clear         for(var i = 0; i < nodes.length; i++){    n = nodes[i];    // call the functions of node    n.checkEdges();     calcConnections(n);    n.diam = n.cons/3; // set the size    n.show();// display    //n.update(); // and update position        }          } // end display    }