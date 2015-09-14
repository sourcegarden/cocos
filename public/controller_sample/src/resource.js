var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",

//    base
    node64_png      : "res/node_64.png",
    node128_png     : "res/node_128.png",
    node152_png     : "res/node_152.png",
    node256_png     : "res/node_256.png",
    node512_png     : "res/node_512.png",
    back1_png       : "res/base/back1.png",
    back2_png       : "res/base/back2.png",
    next1_png       : "res/base/next1.png",
    next2_png       : "res/base/next2.png",
    restart1_png    : "res/base/restart1.png",
    restart2_png    : "res/base/restart2.png",

//    sprite --> Lesson0306
    skill_plist     : "res/skill.plist",
    skill_png       : "res/skill.png",
    scale9_png      : "res/Scale9.png",

//    action --> Lesson0401
    heart_png       : "res/action/heart.png",
    xyq_bg          : "res/action/bg.png",
    shadow_png      : "res/action/shadow.png",
    boy_plist       : "res/action/boy.plist",
    boy_png         : "res/action/boy.png",
    meinv_plist     : "res/action/meinv.plist",
    meinv_png       : "res/action/meinv.png",
    attack_effct    : "res/action/attack.mp3",
    attack_music    : "res/action/fight9.mp3",

//    event --> Lesson0501
    cyan_png        : "res/event/cyan_square.png",
    magenta_png     : "res/event/magenta_square.png",
    yellow_png      : "res/event/yellow_square.png",
    bg_scale9_png   : "res/event/buttonBackground.png",
    base_png        : "res/event/control_base.png",
    knob_png        : "res/event/control_knob.png",
    bone_plist      : "res/event/bone.plist",
    bone_png        : "res/event/bone.png",
    knob_bg_png     : "res/event/bg.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}