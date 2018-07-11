cc.Class({
    extends: cc.Component,

    properties: {
        chessPrefab: {//棋子的预制资源
            default: null,
            type: cc.Prefab
        },
        whitechessPrefab: {//棋子的预制资源
            default: null,
            type: cc.Prefab
        },
    },
    chessinit() {
        var self = this;
        var chessList = [cc.Node];//棋子从下标1开始           
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                //****start 获取鼠标点击的棋子节点
                var newNode = cc.instantiate(this.chessPrefab);//复制Chess预制资源
                this.node.addChild(newNode);
                newNode.setPosition(cc.p(x * (this.node.width / 4), y * (this.node.height / 4)));//根据棋盘和棋子大小计算使每个棋子节点位于指定位置
                newNode.setContentSize(this.node.width / 6, this.node.height / 6);
                newNode.opacity = 0;
                chessList.push(newNode);
                newNode.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
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
                            min = distance[j]
                            minpos = j;
                        }
                    }
                    //***** end 返回minpos
                    //显示此棋子节点
                    if (chessList[minpos + 1].getComponent(cc.Sprite).spriteFrame != null) {
                        chessList[minpos + 1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/clickwhite.png'));
                    }
                });
            };
        };
        for (var i = 0; i < 5; i++) {
            chessList[i + 1].opacity = 255;
            //chessList[25-i].opacity = 255;
            chessList[25 - i].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/whitechess.png'));
            chessList[25 - i].opacity = 255;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.chessinit();
    },

    // update (dt) {},
});
