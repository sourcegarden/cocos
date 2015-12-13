/**
 * Created by lingjianfeng on 15/4/2.
 */

// 游戏管理对象，单例类
var GameManager = (function () {

    function _GameManager() {
        // 敌人[波组]
        this.groupVector = [];
        // 敌人[数组]
        this.enemyVector = [];
        // 子弹[数组]
        this.bulletVector = [];
        // 移动点集合[数组]
        this.pointVector = [];
        // 当前[背景]
        this.currBgName = "";
        // 当前[地图]
        this.currMapName = "";
        // 当前[金钱]
        this.money = 0;
        // 当前[血量]
        this.currHp = 10;
        // 多少波敌人
        this.groupNum = 0;
        // 当前Level plist文件
        this.currLevelFile = "";
        // 下一Level plist文件
        this.nextLevelFile = "";
        // 是否添加完毕
        this.isFinishedAddGroup = false;

        this.clear = function(){
            this.groupVector = [];
            this.enemyVector = [];
            this.bulletVector = [];
            this.pointVector = [];
            this.currBgName = "";
            this.currMapName = "";
            this.money = 0;
            this.currHp = 10; // 我附加的，plist文件中没有。
            this.groupNum = 0;
            this.currLevelFile = "";
            this.nextLevelFile = "";
            this.isFinishedAddGroup = false;
        };
        // ==============[getter && setter]==============
        this.getGroupVector = function(){
            return this.groupVector;
        };
        this.setGroupVector = function(groupVector){
            this.groupVector = groupVector;
        };

        this.getEnemyVector = function(){
            return this.enemyVector;
        };
        this.setEnemyVector = function(enemyVector){
            this.enemyVector = enemyVector;
        };

        this.getBulletVector = function(){
            return this.bulletVector;
        };
        this.setBulletVector = function(bulletVector){
            this.bulletVector = bulletVector;
        };


        this.getPointVector = function(){
            return this.pointVector;
        };
        this.setPointVector = function(pointVector){
            this.pointVector = pointVector;
        };


        this.getCurrBgName = function(){
            return this.currBgName;
        };
        this.setCurrBgName = function(currBgName){
            this.currBgName = currBgName;
        };

        this.getCurrMapName = function(){
            return this.currMapName;
        };
        this.setCurrMapName = function(currMapName){
            this.currMapName = currMapName;
        };

        this.getMoney = function(){
            return this.money;
        };
        this.setMoney = function(money){
            this.money = money;
        };

        this.getCurrHp = function(){
            return this.currHp;
        };
        this.setCurrHp = function(hp){
            this.currHp = hp;
        };

        this.getGroupNum = function(){
            return this.groupNum;
        };
        this.setGroupNum = function(groupNum){
            this.groupNum = groupNum;
        };

        this.getCurrLevelFile = function(){
            return this.currLevelFile;
        };
        this.setCurrLevelFile = function(currLevelFile){
            this.currLevelFile = currLevelFile;
        };

        this.getNextLevelFile = function(){
            return this.nextLevelFile;
        };
        this.setNextLevelFile = function(nextLevelFile){
            this.nextLevelFile = nextLevelFile;
        };

        this.isFinishedAddGroup = function(){
            return this.isFinishedAddGroup;
        };
        this.setIsFinishedAddGroup = function(isFinishedAddGroup){
            this.isFinishedAddGroup = isFinishedAddGroup;
        };

    }
    //实例容器
    var instance;

    var _static = {
        name: 'GameManager',
        //获取实例的方法
        //返回Singleton的实例
        getInstance: function () {
            if (instance === undefined) {
                instance = new _GameManager();
            }
            return instance;
        }
    };
    return _static;
})();