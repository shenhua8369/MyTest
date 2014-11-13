/**
 * Created by Administrator on 2014/11/4.
 */
var speed = 30;
var NewGameLayer0 = cc.Layer.extend(
		{
    sprite:null,
//    bg1:null,
//    bg2:null,
    space:null,
    body:null,
    speedX:0,
    wall:null,
    initPhysics:function(){
    	var staticBody = this.space.staticBody;
    	
    	wall = new cp.SegmentShape(staticBody,cp.v(0, 0),cp.v(1280, 0),0);
    	wall.setElasticity(0);
    	wall.setFriction(0);
    	wall.setCollisionType(0);
    	this.space.addStaticShape(wall);
    	
    	
    	
//    	var building = new cc.Sprite(res.Build2Png);
//    	building.x = 300;
//    	building.y = 0;
//    	this.addChild(building);
    	
    	
    	this.space.gravity = cp.v(0,-2000);
    	this.space.iterations = 60;
    },
    createPhysicsBuilding:function(){
    	var staticBody = this.space.staticBody;
    	var spriteBuilding = new cc.Sprite(res.Build2Png);
    	spriteBuilding.x = 300;
    	spriteBuilding.y = spriteBuilding.height/2;
    	this.addChild(spriteBuilding);
    	
    	
    	var wall1 = new cp.SegmentShape(staticBody,cp.v(300-spriteBuilding.width/2, 0),cp.v(300-spriteBuilding.width/2, spriteBuilding.height),1);
    	wall1.setElasticity(0);
    	wall1.setFriction(0);
    	wall1.setCollisionType(3);
    	this.space.addStaticShape(wall1);
    	
    	var wall2 = new cp.SegmentShape(staticBody,cp.v(300-spriteBuilding.width/2, spriteBuilding.height),cp.v(300+spriteBuilding.width/2, spriteBuilding.height),1);
    	wall2.setElasticity(0);
    	wall2.setFriction(0);
    	wall2.setCollisionType(1);
    	this.space.addStaticShape(wall2);
    	
    	var wall3 = new cp.SegmentShape(staticBody,cp.v(300+spriteBuilding.width/2, 0),cp.v(300+spriteBuilding.width/2, spriteBuilding.height),1);
    	wall3.setElasticity(0);
    	wall3.setFriction(0);
    	wall3.setCollisionType(3);
    	this.space.addStaticShape(wall3);
    	
    	
    },
    createPhysicsSprite:function(pos,file,collisionType,width,height){
    	var body = new cp.Body(1,cp.momentForBox(1,37,36));
    	body.setPos(pos);
    	this.space.addBody(body);
    	
    	var shape = new cp.BoxShape(body,37,36);
    	shape.setElasticity(0);
    	shape.setFriction(0);
    	shape.setCollisionType(collisionType);
    	this.space.addShape(shape);

//    	var sprite = new playerAnim();
//    	sprite.setBody(body);
    	return body;
    },
    p:null,
    ctor:function(){
        this._super();
        var size0 = cc.winSize;
        //初始化物理空间
        this.space = new cp.Space();
        //是否显示刚体
        this.setupDebugNode();
//        this.initPysics();
        
        //读取数据
        var data = new Data();
        data.ctor();
        var sData = data.sceneArr;
//        cc.log("data++++++++++",sData[0]);
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
//        this.addChild(bg1);
        
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

        p = new playerAnim;
        this.addChild(p);
        
        this.initPhysics();
        this.createPhysicsBuilding();
        this.scheduleUpdate();
        body = this.createPhysicsSprite(cc.p(100,100),res.CloseNormal_png,1,37,36);
        
//        var body0 = this.createPhysicsSprite(cc.p(100,100),res.CloseNormal_png,2,37,36);
        
        p.x  = 100;
        p.y  = 100;
        var playerAction = function(){
        	cc.log("节点2");
        }

        if('keyboard' in cc.sys.capabilities){
        	cc.eventManager.addListener({
        		event:cc.EventListener.KEYBOARD,
        		onKeyPressed:function(key,event){
        			cc.log(key);
        			if(key == 24){
        				p.run();
        				cc.log("run+++++++++");
        				if(isAir == true){
        					return;
        				}
        				playerSpeedX = speed;
        				body.applyImpulse(cp.v(50,0),cp.v(0,0))
        			}
        			if(key == 23){
        				p.run();
        				cc.log("run+++++++++");
        				if(isAir == true){
        					
        					return;
        				}
        				body.applyImpulse(cp.v(-speed,0),cp.v(0,0))
        				playerSpeedX = -speed;
        			}
        			if(key == 56){
        				p.jump();  
        				cc.log("jump+++++++++");
        				if(isAir == true){
        					body.applyImpulse(cp.v(100,0),cp.v(0,0))
        					return
        				}
        				body.applyImpulse(cp.v(20,800),cp.v(0,0))
        				
        			}
        			
        		},
        		onKeyReleased:function(key,event){ 
        			if(key == 24){
//        				body.applyImpulse(cp.v(-speed,0),cp.v(0,0));
        			}
        			if(key == 23){
//        				body.applyImpulse(cp.v(speed,0),cp.v(0,0));
        			}
        			if(key == 56){
//        				if(is)
//        				body.applyImpulse(cp.v(0,0),cp.v(0,0));
        			}
        			
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
        this.space.addCollisionHandler( 1, 0,
        		this.collisionBegin.bind(this),
        		this.collisionPre.bind(this),
        		this.collisionPost.bind(this),
        		this.collisionSeparate.bind(this)
        );
        return true;
    },
    onEnter : function () {
    	//重构函数
    	cc.Layer.prototype.onEnter.call(this);
    	
//    	this.initPhysics();
//    	this.scheduleUpdate();
//    	body = this.createPhysicsSprite(cc.p(100,100),res.CloseNormal_png,1,37,36);
//        this.space.addCollisionHandler()
    },
    setupDebugNode:function(){
    	this._debugNode = new cc.PhysicsDebugNode(this.space);
    	this._debugNode.visible = true;
    	this.addChild(this._debugNode);
    },
    onToggleDebug:function(){
    	var state = this._debugNode.visible;
    	this._debugNode.visible = !state;
    },
    update : function( delta ) {
    	this.space.step( delta );
    	var pos = body.getPos();
        p.x = pos.x;
    	p.y = pos.y;

    	this.x -=1;
//    	if(isAir == true){
//    		body.applyImpulse(cp.v(0,0),cp.v(0,0));
//    	}else{
    		
//    	}
    	
    },
    //碰撞开始
    collisionBegin:function(arbiter, space){
    	cc.log("碰撞开始");
    	body.setVel(cp.v(80,0));
    	isAir = false;
    },
    //接触中
    collisionPre : function ( arbiter, space ) {
    	cc.log('collision pre');
    	return true;
    },

    collisionPost : function ( arbiter, space ) {
    	
    	cc.log('collision post');
    },
    //碰撞分开
    collisionSeparate : function ( arbiter, space ) {
    	cc.log('collision separate');
    	isAir = true;
    },
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