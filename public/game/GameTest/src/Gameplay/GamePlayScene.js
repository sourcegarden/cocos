/**
 * Created by jackiezhang on 16/1/25.
 */


var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GPLayer();
        layer.init();
        this.addChild(layer);
    }
});
