/**
 * Created by zezhang on 2016/1/22.
 */

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MMLayer();
        layer.init();
        this.addChild(layer);
    }
});