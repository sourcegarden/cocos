/**
 * Created by lingjianfeng on 15/4/1.
 */


var MMBackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.loadBg();
        return true;
    },
    loadBg : function(){
        var node = new cc.Sprite("res/sh_bg.png");
        this.addChild(node);
        node.setPosition(GC.w2, GC.h2);
    }
});