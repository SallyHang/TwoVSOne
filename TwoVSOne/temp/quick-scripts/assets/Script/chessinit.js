(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/chessinit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd980dL3nNFDvqBHNn/j7pfg', 'chessinit', __filename);
// Script/chessinit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        chessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        whitechessPrefab: { //棋子的预制资源
            default: null,
            type: cc.Prefab
        }
    },
    chessinit: function chessinit() {
        var self = this;
        var chessList = [cc.Node]; //棋子从下标1开始           
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                var newNode = cc.instantiate(this.chessPrefab); //复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p(x * (this.node.width / 4), y * (this.node.height / 4))); //根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.setContentSize(this.node.width / 8, this.node.height / 8);
                newNode.opacity = 0;
                chessList.push(newNode);
                newNode.on(cc.Node.EventType.MOUSE_DOWN, function (event) {});
            };
        };
        for (var i = 0; i < 5; i++) {
            chessList[i + 1].opacity = 255;
            //chessList[25-i].opacity = 255;
            chessList[25 - i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
            chessList[25 - i].opacity = 255;
            console.log(chessList[i + 1].opacity);
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
        //# sourceMappingURL=chessinit.js.map
        