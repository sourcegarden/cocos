/**
 * Created by lingjianfeng on 15/4/2.
 */

var PageMark = cc.Node.extend({
    normalImg   : null,
    selectedImg : null,
    dir         : 0,
    length      : 0,
    space       : 0,
    markPos     : [],
    mark        : null,
    ctor : function(params){
        this._super();
        this.loadConfig(params);
        this.loadSelf();
        this.loadMark();
        return true;
    },
    loadConfig : function(params){
        cc.assert(
            params !== undefined &&
            params.normalImg &&
            params.selectedImg &&
            params.length,
            "params is null");

        this.normalImg = params.normalImg;
        this.selectedImg = params.selectedImg;
        this.dir = params.dir || PageMark.DIR_Horizontal;
        this.length = params.length || 0;

        var tmpWidth2 = new cc.Sprite(this.normalImg).width / 2;
        this.space = params.space ? params.space + tmpWidth2 : tmpWidth2;
    },
    loadSelf : function(){
        var nodeSize = new cc.Sprite(this.normalImg);

        var startX = -(this.length * nodeSize.width + (this.length - 1) * this.space) / 2 + nodeSize.width / 2;
        var startY = -(this.length * nodeSize.height + (this.length - 1) * this.space) / 2 + nodeSize.height / 2;

        for (var i = 0; i < this.length; i++){
            var x = (this.dir == PageMark.DIR_VERTICAL)   ? 0 : startX + (nodeSize.width + this.space) * i;
            var y = (this.dir == PageMark.DIR_Horizontal) ? 0 : startY + (nodeSize.height + this.space) * i;
            var pos = cc.p(x, y);
            this.markPos.push(pos);

            var node = new cc.Sprite(this.normalImg);
            this.addChild(node);
            node.setPosition(pos);
        }
    },
    loadMark : function(){
        this.mark = new cc.Sprite(this.selectedImg);
        this.addChild(this.mark);
        this.mark.setPosition(this.markPos[0]);
    },
    onChangeIndex : function(index){
        this.mark.setPosition(this.markPos[index]);
    }
});

PageMark.DIR_Horizontal = 0;
PageMark.DIR_VERTICAL = 1;