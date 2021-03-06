/**
 * Created by zezhang on 2016/1/22.
 */

var MMLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.MenuBg_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        //create main menu logo
        var logopos = cc.p(winsize.width / 2, winsize.height * 2/ 3);

        var titlebg = new cc.Sprite(res.MainMenuLogo_png);
        titlebg.setPosition(logopos);
        titlebg.setScale(0.8);
        this.addChild(titlebg);


        //5.
        cc.MenuItemFont.setFontSize(60);
        var menupos = cc.p(winsize.width / 2, winsize.height / 3);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_n_png), // normal state image
            new cc.Sprite(res.start_s_png), // select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(menupos);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked")
       cc.director.runScene(new GamePlayScene());
    }
});