var playerAnim = cc.Sprite.extend({
	sprite:null,
	player:null,
	animations:null,
	status:null,
	animation:null,
	animator:null,
	seqRun:null,
	seqJump:null,
	animationJump:null,
	animatorJump:null,
	ctor:function(){
		this._super();
		this.scheduleUpdate();
//		player = new cc.Sprite(res.BackPng);
//		this.addChild(player);
		status = "run";
//		//添加动画
		var texture = cc.textureCache.addImage(res.PlayerPng);
		
		var i = 0;
		var runFrames = [];
		animations = [];
		run = [];
//		//run
		while(i<8){
			var frame = null;
			frame = new cc.SpriteFrame(texture,cc.rect(i*37, 0, 37, 36));
			runFrames.push(frame);
			run.push(frame);
			i++;
		}
//		//
		i = 0;
		var jumpFrames = [];
		while(i<3){
			var frame = null;
			frame = new cc.SpriteFrame(texture,cc.rect(i*37, 37, 37, 36));
			jumpFrames.push(frame);
			i++;
		}
		animations.push(runFrames);
		animations.push(jumpFrames);


		player = new cc.Sprite(runFrames[0]);
		this.addChild(player);
		player.retain();
		
		animation = new cc.Animation(animations[0],0.08);
		animator = cc.Animate(animation);
		seqRun = cc.sequence(animator);
		seqRun.retain();
		animationJump = new cc.Animation(animations[1],0.08);
		animatorJump = cc.Animate(animationJump);
		seqJump = cc.sequence(animatorJump);
		seqJump.retain();
//		this.run();
		return true;
    },
	run:function(){
		player.stopAllActions();
		player.runAction(seqRun.repeatForever());
		seqRun.repeatForever().retain();
	},
	jump:function(){
		player.stopAllActions();
		player.runAction(seqJump.repeat(1));
		seqJump.repeat(1).retain();
	},
    update:function(){
        player.x = 0;
        player.y = 0;
    }

})
