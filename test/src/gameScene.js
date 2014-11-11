/**
 * Created by Administrator on 2014/11/4.
 */
var NewGameLayer0 = cc.Layer.extend({
    sprite:null,
//    bg1:null,
//    bg2:null,
    space:null,
    initPysics:function(){
    	var staticBody = this.space.staticBody;
    	
    	var wall = new cp.SegmentShape(staticBody,cp.v(0, 50),cp.v(cc.winSize.width, 50),0);
    	wall.setElasticity(1);
    	wall.setFriction(1);
    	this.space.addStaticShape(wall);
    	
    	this.space.gravity = cp.v(0,-100);
    	this.space.iterations = 15;
    },
    createPhysicsSprite:function(){
    	
    },
    p:null,
    ctor:function(){
        this._super();
        var size0 = cc.winSize;
        //初始化空间
        this.space = new cp.Space();
        this.setupDebugNode();
        this.initPysics();
        //添加背景
        var bg1 = new cc.Sprite(res.BackPng);
        bg1.attr({
            x:0,
            y:size0.height/2,
//            scaleX:1,
//            scaleY:size0.height/bg1._getHeight(),
            anchorX:0.5,
            anchorY:0.5
        })
        this.addChild(bg1);
        
        //添加关闭按钮
        var startItem = new cc.MenuItemImage(
        		res.StartPng,
        		res.StartPng,
        		function () {
        			cc.log("Menu is clicked!");
        			cc.Scene.end;
//        			playerAction();
        		}, this);
        startItem.attr({
        	x: size0.width *0.5,
        	y: size0.height*0.5,
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
   
        
        //添加角色动画
        var texture = cc.textureCache.addImage(res.PlayerPng);
        
        var i = 0;
        var AnimFrames = [];
        while(i<8){
        	var frame = new cc.SpriteFrame(texture,cc.rect(i*37, 0, 37, 36));
        	AnimFrames.push(frame);
        	i++;
        }
//        var playerSprite = new cc.Sprite(AnimFrames[0]);
//        playerSprite.x = 100;
//        playerSprite.y = size0.height/2;
//        this.addChild(playerSprite);
//        
//        var animation = new cc.Animation(AnimFrames,0.05);
//        var animate = cc.animate(animation);
//        var delay = cc.delayTime(1);
//        var seq = cc.sequence(animate
//        		);
//        playerSprite.runAction(seq.repeatForever());
//        seq.retain();
        cc.log("节点1");
        
        p = new playerAnim();
        this.addChild(p);
        
        p.x = 50;
        p.y = 50;
        var playerAction = function(){
        	cc.log("节点2");
        }
        
//        p.run();
//        p.jump();
//        p.run();
//        p.retain();
        if('keyboard' in cc.sys.capabilities){
        	cc.eventManager.addListener({
        		event:cc.EventListener.KEYBOARD,
        		onKeyPressed:function(key,event){
        			cc.log(key);
        			if(key == 24){
        				p.run();
        				cc.log("run+++++++++");
//        				p.retain();
        				p.runAction(cc.MoveTo(1,cc.p(100,100)));
        			}
        			if(key == 56){
        				p.jump();
        				cc.log("jump+++++++++");
        			}
        			
        		},
        		onKeyReleased:function(key,event){
        			
        		}
        	}, this)
        	
        }
        if('mouse' in cc.sys.capabilities){
        	cc.eventManager.addListener({
        		event:cc.EventListener.MOUSE,
      			onMouseMove:function(event){	
//      				var pos = event.getLocation();
//      				playerSprite.x = pos.x;
//      				playerSprite.y = pos.y;
//      					runA();
      			},
      			onMouseDown:function(event){
      				cc.log("持续状态");
      			}

        	},this);
        }
        var runA = function(){
        	cc.log("ceshi++++++++++");
        	p.run();
        }
        return true;
    },
    setupDebugNode:function(){
    	this._debugNode = new cc.PhysicsDebugNode(this.space);
    	this._debugNode.visible = false;
    	this.addChild(this._debugNode);
    },
    onToggleDebug:function(){
    	var state = this._debugNode.visible;
    	this._debugNode.visible = !state;
    }
})


var NewGameScene = cc.Scene.extend(
    {
    	onUpdate:function()
    	{
    		cc.log("检测执行")
    	},
        onEnter:function(){
            this._super();
            var layer = new NewGameLayer0();
            this.addChild(layer);
        }
    }

)