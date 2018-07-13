"use strict";
cc._RF.push(module, 'd980dL3nNFDvqBHNn/j7pfg', 'chessinit');
// Script/chessinit.js

'use strict';

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        chess: { //棋子节点
            default: null,
            type: cc.Node
        },
        whitechessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        gameState: { // 游戏顺序
            default: 'white'
        },
        lastNode: { // 上一步棋子位置
            default: 0
        },
        prepare: { // 是否是准备走棋子 0：否 1：是
            default: 0
        }
    },
    //返回点击的棋子节点
    selectchess: function selectchess(event, chessList) {
        var distance = [];
        for (var i = 0; i < 25; i++) {
            //计算鼠标点击位置和各棋子节点之间的距离
            //将棋子节点的坐标转化为世界坐标系
            var d = cc.pDistance(cc.v2(event.getLocationX(), event.getLocationY()), chessList[i + 1].convertToWorldSpaceAR(cc.v2(0, 0)));
            distance.push(d);
        };
        var min = distance[0];
        var minpos = 0;
        //取距离最近的下标，即棋子节点位置
        for (var j = 1; j < 25; j++) {
            if (distance[j] < min) {
                min = distance[j];
                minpos = j;
            }
        }

        return minpos;
    },
    chessinit: function chessinit() {
        var self = this;
        var chessList = [cc.Node]; //棋子从下标1开始           
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                //为了调用类里面的静态方法，需要将类实例化
                var game = new Game();
                this.node.addChild(newNode);
                newNode.setPosition(cc.p(x * (this.node.width / 4), y * (this.node.height / 4))); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.setContentSize(this.node.width / 6, this.node.height / 6);
                newNode.opacity = 0;
                chessList.push(newNode);
                newNode.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                    var chessNode = game.selectchess(event, chessList);
                    //显示此棋子节点 节点从1开始 所以需要+1
                    //if (game.gameState == 'white' && chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame != null) {
                    //   chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/clickwhite.png'));
                    //}
                    console.log(chessList[chessNode + 1].opacity);
                    console.log(game.prepare);
                    //if(game.lastNode != 0){
                    //     newNode.getLocationX;
                    //}
                    if (chessList[chessNode + 1].opacity != 0) {
                        if (game.gameState == 'white') {
                            chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/clickwhite.png'));
                            game.prepare = 1;
                            game.lastNode = chessNode + 1;
                            console.log('white:' + game.gameState + game.prepare);
                        } else {
                            chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/clickblack.png'));
                            game.prepare = 1;
                            game.lastNode = chessNode + 1;
                        };
                    } else {
                        if (game.prepare == 1) {
                            if (game.gameState == 'white') {
                                console.log('prepare:' + game.gameState + game.prepare);
                                chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
                                chessList[chessNode + 1].opacity = 255;
                                chessList[game.lastNode].opacity = 0;
                                game.prepare = 0;
                            } else {
                                chessList[chessNode + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/blackchess.png'));
                                chessList[chessNode + 1].opacity = 255;
                                chessList[game.lastNode].opacity = 0;
                                game.prepare = 0;
                            }
                        }
                    }
                    //if chess != null{if white white.png prepare =1 else black.png prepare=1}
                    //else {if prepare =1 }
                });
            };
        };
        for (var i = 0; i < 5; i++) {
            chessList[i + 1].opacity = 255;
            chessList[25 - i].opacity = 255;
            chessList[25 - i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
            //chessList[25 - i].opacity = 255;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.chessinit();
    }
}

// update (dt) {},
);

cc._RF.pop();