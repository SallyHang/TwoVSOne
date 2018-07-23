"use strict";
cc._RF.push(module, 'd980dL3nNFDvqBHNn/j7pfg', 'chessinit');
// Script/chessinit.js

"use strict";

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        occupied: { //记录当前棋盘中被占用的节点位置
            default: []
        },
        occupiedcolor: { //记录当前棋盘中被占用的节点颜色 0：无子 1：白色 2：黑色
            default: []
        },
        gameState: { // 游戏顺序
            default: 'white'
        },
        lastNode: { // 上一步棋子位置
            default: 0
        },
        prepare: { // 是否是准备走棋子 0：否 1：是
            default: 0
        },
        directionX: { //X轴
            default: []
        },
        directionY: { //Y轴
            default: []
        }
    },
    //构造函数
    ctor: function ctor() {
        // 声明实例变量并赋默认值
        this.occupied = [1, 2, 3, 4, 5, 21, 22, 23, 24, 25];
        this.occupiedcolor = [0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];
        this.directionX = [1, -1];
        this.directionY = [5, -5];
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
                    //显示此棋子节点 节点从1开始 所以需要+1
                    var chessNode = game.selectchess(event, chessList) + 1;
                    if (game.occupied.indexOf(chessNode) == -1) {
                        game.occupied.push(chessNode);
                    }
                    //console.log(game.occupied);
                    //点击棋子变为半透明状态
                    if (chessList[chessNode].opacity != 0) {
                        chessList[chessNode].opacity = 128;
                        game.prepare = 1;
                        game.lastNode = chessNode;
                    } else {
                        if (game.prepare == 1) {
                            if (game.lastNode != 0) {
                                //判断不能跨棋子移动
                                if (chessList[chessNode].position.x == chessList[game.lastNode].position.x) {
                                    var min = Math.min(chessNode, game.lastNode) + 5;
                                    var max = Math.max(chessNode, game.lastNode);
                                    for (var i = min; i < max; i = i + 5) {
                                        if (game.occupied.indexOf(i) != -1) {
                                            alert("不能跨越其他棋子！");
                                            chessList[game.lastNode].opacity = 255;
                                            return false;
                                        }
                                    }
                                }
                                if (chessList[chessNode].position.y == chessList[game.lastNode].position.y) {
                                    var min = Math.min(chessNode, game.lastNode) + 1;
                                    var max = Math.max(chessNode, game.lastNode);
                                    for (var i = min; i < max; i++) {
                                        if (game.occupied.indexOf(i) != -1) {
                                            alert("不能跨越其他棋子！");
                                            chessList[game.lastNode].opacity = 255;
                                            return false;
                                        }
                                    }
                                }
                                if (chessList[chessNode].position.x != chessList[game.lastNode].position.x && chessList[chessNode].position.y != chessList[game.lastNode].position.y) {
                                    alert("不能沿斜线移动棋子！");
                                    return false;
                                }
                            }
                            //目标棋子节点显示，上一棋子节点透明
                            if (game.gameState == 'white') {
                                chessList[chessNode].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
                                chessList[chessNode].opacity = 255;
                                chessList[game.lastNode].opacity = 0;
                                game.occupiedcolor[chessNode] = 1;
                                //console.log(game.lastNode);
                                //将颜色列表中上一棋子颜色改为0
                                game.occupiedcolor[game.lastNode] = 0;
                                //将上一棋子节点从occupied中删除
                                for (var k = 0; k < game.occupied.length; k++) {
                                    if (game.occupied[k] == game.lastNode) {
                                        game.occupied.splice(k, 1);
                                    }
                                }
                                game.prepare = 0;
                                console.log(game.occupiedcolor);
                                //判断胜负
                                var count = 1;
                                var flag = true;
                                var temp = chessNode;
                                var s = parseInt((chessNode - 1) / 5);
                                var r = chessNode % 5 == 0 ? 5 : chessNode % 5;
                                //console.log(game.occupied);
                                //console.log(temp + ' ' + s + ' ' + r);
                                //X轴 j=0 X右侧；j=1 X左侧
                                for (var j = 0; j < 2; j++) {
                                    //flag = true;
                                    while (temp > s * 5 && temp < (s + 1) * 5) {
                                        temp = temp + game.directionX[j];
                                        if (game.occupied.indexOf(temp) != -1) {
                                            count++;
                                            //console.log('countX:' + count);
                                        } else {
                                                //flag = false;
                                            }
                                    }
                                    temp = chessNode;
                                }
                                if (count == 3) {
                                    for (var j = 0; j < 2; j++) {
                                        //flag = true;
                                        console.log('jadgeover');
                                        while (temp > s * 5 && temp < (s + 1) * 5) {
                                            console.log('1' + temp);
                                            temp = temp + game.directionX[j];
                                            if (game.occupiedcolor[chessNode] == game.occupiedcolor[temp]) {
                                                console.log('2' + temp);
                                                temp = temp + game.directionX[j];
                                                if (game.occupiedcolor[temp - 1] != game.occupiedcolor[temp]) {
                                                    console.log('3' + temp);
                                                    chessList[temp].opacity = 0;
                                                }
                                            } else {
                                                //flag = false;
                                            }
                                        }
                                        temp = chessNode;
                                    }
                                }
                                count = 1;
                                //y轴 j=0 y右侧；j=1 y左侧
                                for (var j = 0; j < 2; j++) {
                                    //flag = true;
                                    while (temp >= r && temp <= 20 + r) {
                                        temp = temp + game.directionY[j];
                                        if (game.occupied.indexOf(temp) != -1) {
                                            count++;
                                            //console.log('countY:' + count);
                                        } else {
                                                //flag = false;
                                            }
                                    }
                                    temp = chessNode;
                                }
                                console.log('count:' + count);
                                if (count == 3) {
                                    var theThree = [];
                                    count = 1;
                                    temp = chessNode;
                                    flag = true;
                                    theThree.push(temp);
                                    for (var j = 0; j < 2; j++) {
                                        flag = true;
                                        console.log('temp:' + temp);
                                        while (flag && temp >= r && temp <= 20 + r) {
                                            temp = temp + game.directionY[j];
                                            console.log('tempo:' + game.occupied.indexOf(temp));
                                            if (game.occupied.indexOf(temp) != -1) {
                                                theThree.push(temp);
                                                count++;
                                                console.log('countY:' + count);
                                            } else {
                                                flag = false;
                                            }
                                        }
                                        temp = chessNode;
                                    }
                                    console.log('count3:' + count);
                                    if (count == 3) {
                                        theThree = theThree.sort(function (a, b) {
                                            return a - b;
                                        });
                                        console.log('theThree:' + theThree);
                                        console.log(game.occupiedcolor[theThree[0]]);
                                        if (game.occupiedcolor[theThree[0]] == game.occupiedcolor[theThree[1]]) {
                                            console.log(game.occupiedcolor[theThree[0]]);
                                            if (game.occupiedcolor[theThree[1]] != game.occupiedcolor[theThree[2]]) {
                                                chessList[theThree[2]].opacity = 0;
                                            }
                                        } else {
                                            if (game.occupiedcolor[theThree[1]] == game.occupiedcolor[theThree[2]]) {
                                                chessList[theThree[0]].opacity = 0;
                                            }
                                        }
                                    }
                                }
                            } else {
                                chessList[chessNode].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/blackchess.png'));
                                chessList[chessNode].opacity = 255;
                                chessList[game.lastNode].opacity = 0;
                                for (var k = 0; k < game.occupied.length; k++) {
                                    if (game.occupied[k] == game.lastNode) {
                                        game.occupied.splice(k, k + 1);
                                    }
                                }
                                game.prepare = 0;
                            }
                        }
                    }
                });
            };
        };
        //初始化棋盘
        for (var i = 0; i < 5; i++) {
            chessList[i + 1].opacity = 255;
            chessList[25 - i].opacity = 255;
            chessList[25 - i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
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