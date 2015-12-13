/**
 * Created by lingjianfeng on 15/4/1.
 */

var ChooseLevelLayer = cc.Layer.extend({
    backgroundLayer : null,
    mainLayar : null,
    ctor:function () {
        this._super();
        this.loadBackground();
        this.loadMainLayer();
        return true;
    },
    loadBackground : function(){
        this.backgroundLayer = new CLBackgroundLayer();
        this.addChild(this.backgroundLayer);
    },
    loadMainLayer : function(){
        this.mainLayar = new CLMainLayer();
        this.addChild(this.mainLayar);
    }
});

var ChooseLevelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ChooseLevelLayer();
        this.addChild(layer);
    }
});