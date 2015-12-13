/**
 * Created by lingjianfeng on 15/4/1.
 */

var MainMenuLayer = cc.Layer.extend({
    backgroundLayer : null,
    mainLayar : null,
    ctor:function () {
        this._super();
        this.loadBackground();
        this.loadMainLayer();
        return true;
    },
    loadBackground : function(){
        this.backgroundLayer = new MMBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainLayer : function(){
        this.mainLayar = new MMMainLayer();
        this.addChild(this.mainLayar);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});
