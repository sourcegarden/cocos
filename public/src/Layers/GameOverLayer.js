/**
 * Created by jackiezhang on 15/8/15.
 */
var GameOverLayer = cc.LayerColor.extend({
    labelGameOver:null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 100));
        var winSize = cc.director.getWinSize();

        this.labelGameOver = new cc.LabelTTF("GAME OVER", "Helvetica", 40);
        this.labelGameOver.setColor(cc.color(0,0,0));//black color
        this.labelGameOver.setPosition(cc.p(winSize.width / 2, winSize.height /2 + 80));
        this.addChild(this.labelGameOver);

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
            new cc.Sprite(res.restart_n_png),
            new cc.Sprite(res.restart_s_png),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onRestart:function (sender) {
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    }
});