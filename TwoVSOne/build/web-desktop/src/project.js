require=function r(n,a,s){function p(c,e){if(!a[c]){if(!n[c]){var o="function"==typeof require&&require;if(!e&&o)return o(c,!0);if(d)return d(c,!0);var t=new Error("Cannot find module '"+c+"'");throw t.code="MODULE_NOT_FOUND",t}var i=a[c]={exports:{}};n[c][0].call(i.exports,function(e){return p(n[c][1][e]||e)},i,i.exports,r,n,a,s)}return a[c].exports}for(var d="function"==typeof require&&require,e=0;e<s.length;e++)p(s[e]);return p}({NewScript:[function(e,c,o){"use strict";cc._RF.push(c,"5f400jWajhIkLBYf9WlTIFr","NewScript"),cc.Class({extends:cc.Component,properties:{},CheckWin:function(e,c){for(var o=0,t=e,i=c,r=[[[-1,0],[1,0]],[[0,-1],[0,1]],[[-1,-1],[1,1]],[[1,-1],[-1,1]]],n=0;n<4;n++){count=1;for(var s=0;s<2;s++){for(flag=!0;flag;)t+=r[n][s][0],i+=r[n][s][1],a[t][i]==a[e][c]?(count++,System.out.println(count)):flag=!1;t=e,i=c}if(5<=count){o=1;break}o=0}return 1==o},start:function(){this.CheckWin()}}),cc._RF.pop()},{}],chessinit:[function(e,c,o){"use strict";cc._RF.push(c,"d980dL3nNFDvqBHNn/j7pfg","chessinit");var i=cc.Class({extends:cc.Component,properties:{chessPrefab:{default:null,type:cc.Prefab},occupied:{default:[]},occupiedcolor:{default:[]},gameState:{default:"white"},lastNode:{default:0},prepare:{default:0},directionX:{default:[]},directionY:{default:[]},whitenum:{default:5},blacknum:{default:5},overSprite:{default:null,type:cc.Sprite},overLabel:{default:null,type:cc.Label}},ctor:function(){this.occupied=[1,2,3,4,5,21,22,23,24,25],this.occupiedcolor=[0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],this.directionX=[1,-1],this.directionY=[5,-5]},selectchess:function(e,c){for(var o=[],t=0;t<25;t++){var i=cc.pDistance(cc.v2(e.getLocationX(),e.getLocationY()),c[t+1].convertToWorldSpaceAR(cc.v2(0,0)));o.push(i)}for(var r=o[0],n=0,a=1;a<25;a++)o[a]<r&&(r=o[a],n=a);return n},sortchesss:function(e,c,o){if(o=o.sort(function(e,c){return e-c}),console.log("theThreeX:"+o),e.occupiedcolor[o[0]]==e.occupiedcolor[o[1]]){if(e.occupiedcolor[o[1]]!=e.occupiedcolor[o[2]]){c[o[2]].opacity=0,1==e.occupiedcolor[o[2]]?e.whitenum--:e.blacknum--;for(var t=e.occupiedcolor[o[2]]=0;t<e.occupied.length;t++)e.occupied[t]==o[2]&&e.occupied.splice(t,1)}}else if(e.occupiedcolor[o[1]]==e.occupiedcolor[o[2]]){c[o[0]].opacity=0,1==e.occupiedcolor[o[0]]?e.whitenum--:e.blacknum--;for(t=e.occupiedcolor[o[0]]=0;t<e.occupied.length;t++)e.occupied[t]==o[0]&&e.occupied.splice(t,1)}},eatchess:function(e,c,o){for(var t=1,i=!0,r=e,n=parseInt((e-1)/5),a=e%5==0?5:e%5,s=0;s<2;s++){for(r+=c.directionX[s];5*n<r&&r<=5*(n+1);)-1!=c.occupied.indexOf(r)&&t++,r+=c.directionX[s];r=e}if(3==t){t=1,i=!0,(p=[]).push(r=e);for(s=0;s<2;s++){for(r+=c.directionX[s],i=!0;i&&5*n<r&&r<=5*(n+1);)-1!=c.occupied.indexOf(r)?(p.push(r),t++,r+=c.directionX[s]):i=!1;r=e}3==t&&c.sortchesss(c,o,p)}t=1,r=e;for(s=0;s<2;s++){for(;a<=r&&r<=20+a;)r+=c.directionY[s],-1!=c.occupied.indexOf(r)&&t++;r=e}if(3==t){var p;t=1,i=!0,(p=[]).push(r=e);for(s=0;s<2;s++){for(i=!0;i&&a<=r&&r<=20+a;)r+=c.directionY[s],-1!=c.occupied.indexOf(r)?(p.push(r),t++):i=!1;r=e}3==t&&c.sortchesss(c,o,p)}},b_oncemore:function(){cc.director.loadScene("game")},judgeover:function(e,c){1==e.whitenum&&(c.overLabel.string="黑子获胜",c.overSprite.node.x=0,e.gameState="over",cc.eventManager.removeAllListeners()),1==e.blacknum&&(c.overLabel.string="白子获胜",c.overSprite.node.x=0,e.gameState="over",cc.eventManager.removeAllListeners())},chessinit:function(){this.overSprite.node.x=1e4;for(var n=this,a=[cc.Node],e=0;e<5;e++)for(var c=0;c<5;c++){var o=cc.instantiate(this.chessPrefab),s=new i;this.node.addChild(o),o.setPosition(cc.p(c*(this.node.width/4),e*(this.node.height/4))),o.setContentSize(this.node.width/6,this.node.height/6),o.opacity=0,a.push(o),o.on(cc.Node.EventType.MOUSE_DOWN,function(e){console.log(s.gameState),console.log(s.prepare);var c=s.selectchess(e,a)+1;if(0!=a[c].opacity&&0==s.prepare&&"over"!=s.gameState)a[c].opacity=128,s.prepare=1,s.lastNode=c;else if(console.log(s.occupied),console.log(s.occupied.indexOf(c)),1==s.prepare&&-1==s.occupied.indexOf(c)&&"over"!=s.gameState){if(0!=s.lastNode){if(a[c].position.x==a[s.lastNode].position.x)for(var o=Math.min(c,s.lastNode)+5,t=Math.max(c,s.lastNode),i=o;i<t;i+=5)if(-1!=s.occupied.indexOf(i))return alert("不能跨越其他棋子！"),a[s.lastNode].opacity=255,s.prepare=0,!1;if(a[c].position.y==a[s.lastNode].position.y)for(o=Math.min(c,s.lastNode)+1,t=Math.max(c,s.lastNode),i=o;i<t;i++)if(-1!=s.occupied.indexOf(i))return alert("不能跨越其他棋子！"),a[s.lastNode].opacity=255,s.prepare=0,!1;if(a[c].position.x!=a[s.lastNode].position.x&&a[c].position.y!=a[s.lastNode].position.y)return alert("不能沿斜线移动棋子！"),a[s.lastNode].opacity=255,s.prepare=0,!1}if(console.log(s.occupiedcolor[c]),"white"==s.gameState&&1==s.occupiedcolor[s.lastNode]){a[c].getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(cc.url.raw("resources/whitechess.png")),a[c].opacity=255,a[s.lastNode].opacity=0,-(s.occupiedcolor[c]=1)==s.occupied.indexOf(c)&&s.occupied.push(c);for(var r=s.occupiedcolor[s.lastNode]=0;r<s.occupied.length;r++)s.occupied[r]==s.lastNode&&s.occupied.splice(r,1);s.prepare=0,s.eatchess(c,s,a),s.gameState="black",s.judgeover(s,n)}else{if("black"!=s.gameState||2!=s.occupiedcolor[s.lastNode])return alert("此轮为对方执棋"),a[s.lastNode].opacity=255,s.prepare=0,!1;a[c].getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(cc.url.raw("resources/blackchess.png")),a[c].opacity=255,a[s.lastNode].opacity=0,s.occupiedcolor[c]=2,-1==s.occupied.indexOf(c)&&s.occupied.push(c);for(r=s.occupiedcolor[s.lastNode]=0;r<s.occupied.length;r++)s.occupied[r]==s.lastNode&&s.occupied.splice(r,1);s.prepare=0,s.eatchess(c,s,a),s.gameState="white",s.judgeover(s,n)}}else-1==s.occupied.indexOf(c)&&(s.prepare=0)})}for(var t=0;t<5;t++)a[t+1].opacity=255,a[25-t].opacity=255,a[25-t].getComponent(cc.Sprite).spriteFrame=new cc.SpriteFrame(cc.url.raw("resources/whitechess.png"))},start:function(){this.chessinit()}});cc._RF.pop()},{}],click:[function(e,c,o){"use strict";cc._RF.push(c,"2b619XgI3lLq5yDFRQdGN3l","click"),cc.Class({extends:cc.Component,properties:{chessPrefab:{default:null,type:cc.Prefab},whitechessPrefab:{default:null,type:cc.Prefab},touchChess:{default:null,type:cc.Node,visible:!1}},setInputControl:function(){for(var a=[cc.Node],e=0;e<5;e++)for(var c=0;c<5;c++){var o=cc.instantiate(this.chessPrefab);this.node.addChild(o),o.setPosition(cc.p(c*(this.node.width/4),e*(this.node.height/4))),o.setContentSize(this.node.width/8,this.node.height/8),o.opacity=0,o.on(cc.Node.EventType.MOUSE_DOWN,function(e){for(var c=[],o=0;o<25;o++){var t=cc.pDistance(cc.v2(e.getLocationX(),e.getLocationY()),a[o+1].convertToWorldSpaceAR(cc.v2(0,0)));c.push(t)}for(var i=c[0],r=0,n=1;n<25;n++)c[n]<i&&(i=c[n],r=n);a[r+1].opacity=255}),a.push(o)}},start:function(){this.setInputControl()}}),cc._RF.pop()},{}]},{},["NewScript","chessinit","click"]);