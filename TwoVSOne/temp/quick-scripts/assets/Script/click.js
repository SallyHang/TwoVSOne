(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/click.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2b619XgI3lLq5yDFRQdGN3l', 'click', __filename);
// Script/click.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },

        //chessList:{//棋子节点的集合，用一维数组表示二维位置
        //    default: [],
        //    type: []
        //},

        touchChess: { //每一回合落下的棋子
            default: null,
            type: cc.Node,
            visible: false //属性窗口不显示
        },

        whiteSpriteFrame: { //白棋的图片
            default: null,
            type: cc.SpriteFrame
        },

        blackSpriteFrame: { //黑棋的图片
            default: null,
            type: cc.SpriteFrame
        }
    },
    setInputControl: function setInputControl() {
        var self = this;
        var chessposition = []; //下标从0开始
        var chessList = [cc.Node]; //下标从1开始           
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p(x * (this.node.width / 4), y * (this.node.height / 4))); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.setContentSize(this.node.width / 8, this.node.height / 8);
                newNode.opacity = 0;
                //console.log(newNode.getPosition());
                //this.node.children.opacity = 128;
                //this.newnode.opacity = 128;
                //newNode.tag = y*15+x;//根据每个节点的tag就可以算出其二维坐标
                newNode.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                    var distance = [];
                    //将鼠标点击点的坐标转换为相对锚点的坐标
                    //var WposAR = this.node.convertToWorldSpaceAR(cc.p(0,0));

                    for (var i = 0; i < 25; i++) {
                        //计算鼠标点击位置和各棋子节点之间的距离
                        console.log(event.getLocation());
                        console.log(chessList[i + 1].convertToWorldSpaceAR(chessList[i + 1].getPosition()));
                        console.log(chessList[i + 1].getPosition());
                        var d = cc.pDistance(cc.v2(event.getLocationX(), event.getLocationY()), chessList[i + 1].convertToWorldSpaceAR(cc.v2(0, 0)));
                        distance.push(d);
                        console.log(d);
                    };
                    //console.log(distance);
                    var min = distance[0];
                    var minpos = 0;

                    for (var j = 1; j < 25; j++) {
                        if (distance[j] < min) {
                            min = distance[j];
                            minpos = j;
                        }
                    }
                    //var d = cc.pDistance(cc.p(0, 0), cc.p(10, 10));
                    console.log(minpos);
                    //event.getLocationX
                    chessList[minpos + 1].opacity = 255;
                });
                chessList.push(newNode);
                chessposition.push(newNode.getPosition());
                //console.log(chessList);
            };
        };
        //console.log(chessposition);
        //console.log(chessposition[1].x);
        // 添加鼠标事件监听
        // 按下鼠标时落子
        /*this.node.on('mousedown', function ( event ) {
            cc.loader.loadRes("blackchess", cc.SpriteFrame, function (err, blackSpriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = blackSpriteFrame;
            });
        });*/
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.setInputControl();
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=click.js.map
        