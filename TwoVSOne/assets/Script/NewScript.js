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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    CheckWin(xIndex, yIndex) {
        var max = 0;
        var tempXIndex = xIndex;
        var tempYIndex = yIndex;
        // 三维数组记录横向，纵向，左斜，右斜的移动
        var dir = [
            // 横向
            [[-1, 0], [1, 0]],
            // 竖着
            [[0, -1], [0, 1]],
            // 左斜
            [[-1, -1], [1, 1]],
            // 右斜
            [[1, -1], [-1, 1]]
        ];

        for (var i = 0; i < 4; i++) {
            count = 1;
            //j为0,1分别为棋子的两边方向，比如对于横向的时候，j=0,表示下棋位子的左边，j=1的时候表示右边
            for (var j = 0; j < 2; j++) {
                flag = true;
                /**
                 while语句中为一直向某一个方向遍历
                 有相同颜色的棋子的时候，Count++
                  否则置flag为false，结束该该方向的遍历
                **/
                while (flag) {
                    tempXIndex = tempXIndex + dir[i][j][0];
                    tempYIndex = tempYIndex + dir[i][j][1];
                    if ((a[tempXIndex][tempYIndex] == a[xIndex][yIndex])) {
                        count++;
                        System.out.println(count);
                    } else
                        flag = false;
                }
                tempXIndex = xIndex;
                tempYIndex = yIndex;
            }

            if (count >= 5) {
                max = 1;
                break;
            } else
                max = 0;
        }
        if (max == 1)
            return true;
        else
            return false;
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.CheckWin();
    },

    // update (dt) {},
});
