/**
 * Created by lingjianfeng on 15/4/2.
 */


var MAP_WIDTH = 16;
var MAP_HEIGHT = 9;
var GPMainLayer = cc.Layer.extend({
    gameManager     : null,
    tiledMap        : null,
    toolLayer       : null,
    mapBgLayer      : null,
    objects         : null,
    offsetX         : 0,
    currGroupIndex  : 0,
    towerPanel      : null,
    existTowerState : new Array(),
    ctor: function () {
        this._super();
        // 加载[配置]
        this.loadConfig();
        // 加载[地图]
        this.loadTiledMap();
        //加载[工具栏]
        this.loadInfoPanelLayer();
        // 更新[地图obj对象和当前场景的坐标差]
        this.updatePointsVector();
        // 绑定[事件][触摸]
        this.bindTouchListener();
        // 定时[添加敌人]
        this.schedule(this.addEnemy, 1);
        // 定时[更新游戏逻辑]
        this.scheduleUpdate();
        return true;
    },
    // 加载[配置]
    loadConfig : function(){
        // 配置[可放置塔的状态表][说明：这是一个二维数组，每个元素都是标志位] TODO word表格讲解
        for (var row = 0; row < MAP_HEIGHT; row++) {
            for (var col = 0; col < MAP_WIDTH; col++) {
                this.existTowerState[row * MAP_WIDTH + col] = 0;
            }
        }
        // 配置[游戏管理对象]
        this.gameManager = GameManager.getInstance();
    },
    // 加载[关卡信息显示层][顶部工具栏-显示金币，当前关卡等信息]
    loadInfoPanelLayer : function(){
        this.toolLayer = new GPToolLayer();
        this.addChild(this.toolLayer, 1);
    },
    // 加载[Tiled游戏地图]
    loadTiledMap : function(){
        // 通过游戏管家婆(gameManager)单例对象获取当前地图名称
        var map = new cc.TMXTiledMap("res/" + this.gameManager.getCurrMapName());
        this.addChild(map);

        var bgLayer = map.getLayer("bg"); // map 默认锚点为(0, 0)
        bgLayer.setAnchorPoint(0.5, 0.5);
        bgLayer.setPosition(GC.w2, GC.h2);

        var obj = map.getObjectGroup("obj");

        this.objects = obj;
        this.tiledMap = map;
        this.mapBgLayer = bgLayer;
    },
    // 更新[坐标点][场景和地图object对象集合的位移差]
    updatePointsVector : function(){
        var offsetX = (this.tiledMap.getContentSize().width - GC.w) / 2;

        var pointsVector = new Array();
        var objs = this.objects.getObjects();

        for(var i in objs){
            var pos = cc.p(objs[i].x - offsetX, objs[i].y);
            pointsVector.push(pos);
        }

        this.gameManager.setPointVector(pointsVector);

        this.offsetX = offsetX;
    },
    // 更新[游戏逻辑]
    update : function(dt){
        // 逻辑更新[碰撞检测]
        this.collisionDetection();
        // 逻辑更新[删除死亡的敌人][删除无效的子弹]
        this.deleteDiedEnemysAndBullets();
    },
    // 绑定[触摸事件]
    bindTouchListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    // 事件[触摸开始]
    onTouchBegan: function (touch, event) {
        var target = this.target;
        // 如果选择塔的面板存在，并且有作选择，则添加塔
        if (target.towerPanel && target.towerPanel.chooseTowerName != ""){
            var chooseName = target.towerPanel.chooseTowerName;
            target.addTower(chooseName, target.towerPanel.getPosition());
            target.removeChild(target.towerPanel);
            target.towerPanel = null;
        }
        // 不存在，则判断是否可以在此区域创建塔选择面板
        else{
            target.removeChild(target.towerPanel);
            target.towerPanel = null;
            var location = touch.getLocation();
            target.onCheckAndAddTowerPanle(location);
        }

        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
        //var target = this.target;
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
        //var target = this.target;
    },
    // 事件[检查是否]
    onCheckAndAddTowerPanle : function(pos){
        var towerCoord = this.convertTotileCoord(pos);
        var matrixCoord = this.convertToMatrixCoord(pos);

        var gid = this.mapBgLayer.getTileGIDAt(towerCoord); //地图坐标gid
        var tileTemp =this.tiledMap.getPropertiesForGID(gid);
        var matrixIndex = parseInt(matrixCoord.y * MAP_WIDTH + matrixCoord.x);
        var touchVaule = 0;
        if (tileTemp != null){ //假如不能触摸
            touchVaule = tileTemp.canTouch;
        }
        var tileWidth = this.tiledMap.getContentSize().width / this.tiledMap.getMapSize().width;
        var tileHeight = this.tiledMap.getContentSize().height / this.tiledMap.getMapSize().height;

        var towerPos = cc.p((towerCoord.x * tileWidth) + tileWidth / 2 - this.offsetX,
            this.tiledMap.getContentSize().height - (towerCoord.y * tileHeight) - tileHeight/2);

        if (touchVaule == 1 && this.existTowerState[matrixIndex] == 0){
            this.addTowerChoosePanel(towerPos);
        }else{
            var tips = new cc.Sprite("res/gp_no.png");
            tips.setPosition(towerPos);
            this.addChild(tips);
            this.scheduleOnce(function(){
                this.removeChild(tips);
            }, 1);
        }
    },
    addEnemy : function(){
        var groupVec = this.gameManager.getGroupVector();
        var groupEnemy = groupVec[this.currGroupIndex];
        var enemy = null;

        if (this.currGroupIndex == groupVec.length){
            this.unschedule(this.addEnemy);
            return;
        }
        // 如果取空了。
        if (groupEnemy.enemySum == 0){
            this.currGroupIndex++;

            // 当前为第几波+1[工具层页面]
            if (this.currGroupIndex < groupVec.length){
                var label = this.toolLayer.getGroupIndexLabel();
                label.setString((this.currGroupIndex + 1) + "");
            }

        }else{
            groupEnemy.enemySum--;
            var maxHp = 0;
            if (groupEnemy.type1Num > 0){
                enemy = new ThiefSprite();
                maxHp = groupEnemy.type1Hp;
                groupEnemy.type1Num--;
            }else if (groupEnemy.type2Num > 0){
                enemy = new PirateSprite();
                maxHp = groupEnemy.type2Hp;
                groupEnemy.type2Num--;
            }else if (groupEnemy.type3Num > 0){
                enemy = new BanditSprite();
                maxHp = groupEnemy.type3Hp;
                groupEnemy.type3Num--;
            }else{
            }
            this.addChild(enemy);
            this.gameManager.getEnemyVector().push(enemy);
            enemy.setCallback(this.onEnemyIntoHouse.bind(this));
            enemy.setMaxHp(maxHp);
        }
    },
    addTowerChoosePanel:function(pos){
        this.towerPanel = new TowerPanel();
        this.addChild(this.towerPanel);
        this.towerPanel.setPosition(pos);
    },
    addTower : function(type, pos){
        var node = null;
        switch (type){
            case "arrow":
                node = new ArrowTower();
                break;
            case "attack":
                node = new AttackTower();
                break;
            case "multiDir":
                node = new MultiDirTower();
                break;
            default :
                node = new ArrowTower();
                break;
        }

        if (this.gameManager.getMoney() < node.getMoneyValue()){

            var noMoney = new cc.Sprite("res/gp_noMoney.png");
            noMoney.setPosition(pos);
            this.addChild(noMoney);
            this.scheduleOnce(function(){
                this.removeChild(noMoney);
            }, 0.5);
            node = null;
            return;
        }
        this.addChild(node);
        node.setPosition(pos);
        this.toolLayer.onSubMoney(node.getMoneyValue());

        var matrixCoord = this.convertToMatrixCoord(pos);
        var matrixIndex = parseInt(matrixCoord.y * MAP_WIDTH + matrixCoord.x);
        this.existTowerState[matrixIndex] = 1;

    },
    onEnemyIntoHouse : function(){
        var enemyVector = this.gameManager.getEnemyVector();
        for (var i = 0; i < enemyVector.length; i++){
            var node = enemyVector[i];
            if (node.isSucceed){
                this.removeChild(node);
                enemyVector.splice(i, 1);
            }
        }

        this.toolLayer.onSubHp(1);

        var currHp = this.gameManager.getCurrHp();
        if (currHp <= 0){
            var scene = new GameOverScene();
            cc.director.runScene(new cc.TransitionFade(GC.TransitionTime, scene));
        }
    },
    deleteDiedEnemysAndBullets : function(){
        var enemyVector = this.gameManager.getEnemyVector();
        for (var i = 0; i < enemyVector.length; i++){
            var node = enemyVector[i];
            if (node.isDie){
                //this.removeChild(node);
                enemyVector.splice(i, 1);
                node.removeFromParent();

                this.toolLayer.onAddMoney(node.getMoneyValue());
            }
        }

        var bulletVector = this.gameManager.getBulletVector();
        for (var i = 0; i < bulletVector.length; i++){
            var node = bulletVector[i];
            if (node.isDie){
                //this.removeChild(node);
                node.removeFromParent();
                bulletVector.splice(i, 1);
            }
        }
    },
    collisionDetection : function(){
        var bulletVector = this.gameManager.getBulletVector();
        var enemyVector = this.gameManager.getEnemyVector();
        if(bulletVector.length == 0 || enemyVector.length == 0 ){
            return;
        }

        for (var i = 0; i < bulletVector.length; i++){
            var bullet = bulletVector[i];

            var bulletworldPos = bullet.getParent().convertToWorldSpace(bullet.getPosition());

            var bulletRect = cc.rect(
                bulletworldPos.x - bullet.getContentSize().width / 2,
                bulletworldPos.y - bullet.getContentSize().height / 2,
                bullet.getContentSize().width,
                bullet.getContentSize().height);

            for (var j = 0; j < enemyVector.length; j++){
                var enemy = enemyVector[j];
                var enemyRect = cc.rect(
                    enemy.getPositionX() - enemy.getContentSize().width / 2,
                    enemy.getPositionY() - enemy.getContentSize().height / 2,
                    enemy.getContentSize().width,
                    enemy.getContentSize().height);

                if (cc.rectIntersectsRect(bulletRect, enemyRect)){
                    enemy.onHurt(bullet.getLethality());
                    bullet.setIsDie(true);
                }
            }
        }
    },
    convertTotileCoord : function(pos){
        var x = (pos.x + this.offsetX)/ this.tiledMap.getContentSize().width * this.tiledMap.getMapSize().width;
        var y = this.tiledMap.getMapSize().height- pos.y / this.tiledMap.getContentSize().height * this.tiledMap.getMapSize().height;
        return cc.p(parseInt(x), parseInt(y));
    },
    convertToMatrixCoord : function(pos){
        var x = (pos.x + this.offsetX) / this.tiledMap.getContentSize().width * this.tiledMap.getMapSize().width;
        var y = pos.y / this.tiledMap.getContentSize().height * this.tiledMap.getMapSize().height;
        return cc.p(parseInt(x), parseInt(y));
    }
});