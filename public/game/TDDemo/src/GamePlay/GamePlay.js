/**
 * Created by lingjianfeng on 15/4/2.
 */

var GamePlayLayer = cc.Layer.extend({
    backgroundLayer : null,
    mainLayar : null,
    ctor:function () {
        this._super();
        // 加载[资源] [TODO] 资源卸载
        this.loadResource();
        this.loadBackground();
        this.loadMainLayer();
        return true;
    },
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames("res/enemy.plist");
    },
    loadBackground : function(){
        this.backgroundLayer = new GPBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainLayer : function(){
        this.mainLayar = new GPMainLayer();
        this.addChild(this.mainLayar);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});