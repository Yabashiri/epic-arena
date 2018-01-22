"use strict";var Arena;(function(Arena){class ArenaObject{constructor(){}
loadImage(game,path){game.load.image(this.name,path+`${this.name}.png`);}
get getDisplayName(){return this.display_name;}
get getName(){return this.name;}
get getDescription(){return this.description;}
addTapEvent(game){this.sprite.inputEnabled=true;let image=game.add.sprite(Arena.Global.Constants.descImageX,Arena.Global.Constants.descImageY,this.name);this.sprite.events.onInputDown.add(()=>{Arena.State.Play.updateDescription(this,game);if(this instanceof Arena.Characters.skill)
Arena.State.Play.enableCost();else
Arena.State.Play.disableCost();});}}
Arena.ArenaObject=ArenaObject;})(Arena||(Arena={}));var Arena;(function(Arena){class Chakra{constructor(){this.value=[0,0,0,0];this.reserved=[0,0,0,0];if(Arena.Global.connectionDetails.turn==true)
this.addRandomChakra();}
generateRandomChakra(){return Math.floor(Math.random()*4);}
addRandomChakra(){this.value[this.generateRandomChakra()]++;}
addTurnChakra(alive){for(let i=0;i<alive;i++)
this.addRandomChakra();}
getTotalChakra(array){let sum=0;for(let i=0;i<array.length;i++)
sum+=array[i];return sum;}
addChakraUI(game){this.chakraUI=game.add.group();this.addChakraImages(game);this.addChakraText(game);this.addTextToGroup();}
addChakraImages(game){let current_sprite=game.add.sprite(293,58,"tai");this.chakraUI.add(current_sprite);current_sprite=game.add.sprite(0,0,"blood").alignTo(current_sprite,Phaser.RIGHT_TOP,31);this.chakraUI.add(current_sprite);current_sprite=game.add.sprite(0,0,"nin").alignTo(current_sprite,Phaser.RIGHT_TOP,31);this.chakraUI.add(current_sprite);current_sprite=game.add.sprite(0,0,"gen").alignTo(current_sprite,Phaser.RIGHT_TOP,31);this.chakraUI.add(current_sprite);current_sprite=game.add.sprite(0,0,"random").alignTo(current_sprite,Phaser.RIGHT_TOP,31);this.chakraUI.add(current_sprite);}
addChakraText(game){this.taiText=game.add.text(305,54,"x"+this.value[0],Arena.Global.Constants.style_black);this.bloodText=game.add.text(0,0,"x"+this.value[1],Arena.Global.Constants.style_black).alignTo(this.taiText,Phaser.RIGHT_TOP,25);this.ninText=game.add.text(0,0,"x"+this.value[2],Arena.Global.Constants.style_black).alignTo(this.bloodText,Phaser.RIGHT_TOP,25);this.genText=game.add.text(0,0,"x"+this.value[3],Arena.Global.Constants.style_black).alignTo(this.ninText,Phaser.RIGHT_TOP,25);this.randomText=game.add.text(0,0,"x"+this.getTotalChakra(this.value),Arena.Global.Constants.style_black).alignTo(this.genText,Phaser.RIGHT_TOP,25);}
addTextToGroup(){this.chakraUI.add(this.taiText);this.chakraUI.add(this.bloodText);this.chakraUI.add(this.ninText);this.chakraUI.add(this.genText);this.chakraUI.add(this.randomText);}
updateUI(){this.taiText.setText("x"+this.value[0]);this.bloodText.setText("x"+this.value[1]);this.ninText.setText("x"+this.value[2]);this.genText.setText("x"+this.value[3]);this.randomText.setText("x"+this.getTotalChakra(this.value));}
static chakraResolve(n){switch(n){case 0:return"tai";case 1:return"blood";case 2:return"nin";case 3:return"gen";case 4:return"random";default:return"random";}}
isEnoughChakra(cost){for(let i=0;i<cost.length;i++){if(this.value[i]<cost[i])
return false;}
if(this.getTotalChakra(this.value)>=this.getTotalChakra(cost))
return true;else
return false;}
minusChakra(cost){for(let i=0;i<cost.length&&i<4;i++)
this.value[i]-=cost[i];}
plusReserve(cost){for(let i=0;i<4;i++)
this.reserved[i]+=cost[i];}
reserveChakra(cost){this.minusChakra(cost);this.updateUI();}}
Arena.Chakra=Chakra;})(Arena||(Arena={}));var Arena;(function(Arena){class Game extends Phaser.Game{constructor(elementName){let element=document.getElementById(elementName);super(Arena.Global.Constants.gameWidth,Arena.Global.Constants.gameHeight,Phaser.AUTO,element.id,Arena.State.Blank);this.state.add("play",Arena.State.Play);this.state.add("win",Arena.State.Win);this.state.add("lose",Arena.State.Lose);}
connect(connectionDetails,callback){Arena.Global.socket=io.connect(Arena.Global.Constants.serverUrl,{query:`name=${connectionDetails.name}&title=${connectionDetails.title}`});Arena.Global.socket.on("turn",(turn)=>{connectionDetails.turn=turn;console.log(turn);});Arena.Global.socket.on("start-battle",(opponent,opponentName,opponentTitle)=>{connectionDetails.opponentID=opponent;connectionDetails.opponentName=opponentName;connectionDetails.opponentTitle=opponentTitle;this.state.start("play");$("#game").show();callback(Arena.Global.socket);});Arena.Global.connectionDetails=connectionDetails;}}
Arena.Game=Game;})(Arena||(Arena={}));var Arena;(function(Arena){class player extends Arena.ArenaObject{constructor(char1,char2,char3,who){super();if(who=="you")
this.yourDetails();else
this.opponentDetails();if(this.display_name=="")
this.display_name="Un-named";if(this.description=="")
this.description="Un-titled";this.who=who;this.characters=[];this.characters.push(Arena.Characters.character.createCharacter(1,char1));this.characters.push(Arena.Characters.character.createCharacter(2,char2));this.characters.push(Arena.Characters.character.createCharacter(3,char3));}
yourDetails(){this.name="yabashiri";this.display_name=Arena.Global.connectionDetails.name;this.description=Arena.Global.connectionDetails.title;}
opponentDetails(){this.name="junko";this.display_name=Arena.Global.connectionDetails.opponentName;this.description=Arena.Global.connectionDetails.opponentTitle;}
get getCharacters(){return this.characters;}
damage(game,i){this.characters[i].damageHealth(game,20);}
preloadImages(game){if(this.who=="you")
game.load.image("yabashiri","assets/yabashiri.png");else
game.load.image("junko","assets/Junko.jpg");for(let i=0;i<=2;i++){const path=`assets/characters/${this.characters[i].getName}/`;this.characters[i].loadImage(game,path);for(let j=0;j<this.characters[i].skills_number;j++)
this.characters[i].skills_list[j].loadImage(game,path);}}
deployPortraits(game,side){this.deployPortrait(game,side);for(let i=1;i<=3;i++)
this.characters[i-1].deployPortrait(game,side);this.initHealth(game,side);}
deployPortrait(game,side){if(side=="left"){this.sprite=game.add.sprite(Arena.Global.Constants.leftPlayerX,Arena.Global.Constants.PlayerY,this.name);let text=game.add.text(Arena.Global.Constants.leftPlayerTextX,Arena.Global.Constants.PlayerNameY,this.display_name.toUpperCase(),Arena.Global.Constants.player_red);text.setTextBounds(0,0);text.boundsAlignH="right";let title=game.add.text(Arena.Global.Constants.leftPlayerTextX,Arena.Global.Constants.PlayerTitleY,this.description.toUpperCase(),Arena.Global.Constants.style_black);title.setTextBounds(0,0);title.boundsAlignH="right";}
else{this.sprite=game.add.sprite(Arena.Global.Constants.rightPlayerX,Arena.Global.Constants.PlayerY,this.name);let text=game.add.text(Arena.Global.Constants.rightPlayerTextX,Arena.Global.Constants.PlayerNameY,this.display_name.toUpperCase(),Arena.Global.Constants.player_red);let title=game.add.text(Arena.Global.Constants.rightPlayerTextX,Arena.Global.Constants.PlayerTitleY,this.description.toUpperCase(),Arena.Global.Constants.style_black);}
this.sprite.scale.setTo(0.65);this.addTapEvent(game);}
initHealth(game,side){let x,y;y=Arena.Global.Constants.hpFirstY;if(side=="left")
x=Arena.Global.Constants.hpLeftX;else
x=Arena.Global.Constants.hpRightX;for(let i=0;i<=2;i++){this.characters[i].initHealth(game,x,y+Arena.Global.Constants.hpIncrementY*i);}}
deploySkills(game,signal){let y=Arena.Global.Constants.firstSkillY;for(let i=0;i<=2;i++){let j=0;let skill=(this.characters[i].skills_list[0].setSprite=game.add.sprite(Arena.Global.Constants.firstSkillX,y,`${this.characters[i].getName}-${j}`));this.characters[i].skills_list[0].addTapEvent(game);this.characters[i].skills_list[0].eventCost(game,signal);for(j=1;j<4;j++){skill=this.characters[i].skills_list[j].setSprite=game.add.sprite(0,0,`${this.characters[i].getName}-${j}`).alignTo(skill,Phaser.RIGHT_TOP,8);this.characters[i].skills_list[j].addTapEvent(game);this.characters[i].skills_list[j].eventCost(game,signal);}
y+=Arena.Global.Constants.skillDistanceY;}}
blockAllCharacters(){for(let i=0;i<=2;i++){if(this.characters[i].dead==false)
this.characters[i].blockSkills();}}
unblockAllCharacters(){for(let i=0;i<=2;i++)
this.characters[i].unblockSkills();}
findCharacter(char_name){for(let i=0;i<=2;i++)
if(this.characters[i].getName==char_name)
return this.characters[i];}
addEnemyListeners(game,signal){for(let i=0;i<=2;i++){if(this.characters[i].dead==false)
this.characters[i].listenToSkillEnemy(signal,game);}}
renewCharacter(game){for(let i=0;i<=2;i++){if(this.characters[i].dead==false)
this.characters[i].disableHighlight(game);}}
getCost(character,skill){return this.findCharacter(character).skills_list[skill].cost;}
blockCharacter(game,character,skill,signal){let char=this.findCharacter(character);char.active_skill=skill;char.createActiveSkillSprite(game,skill);}
createUnknown(game){for(let i=0;i<=2;i++)
this.characters[i].createUnknown(game);}
checkDead(){for(let i=0;i<=2;i++){if(this.characters[i].dead==false)
return false;}
return true;}
countAlive(){let alive=0;for(let i=0;i<=2;i++){if(this.characters[i].dead==false)
alive++;}
return alive;}}
Arena.player=player;})(Arena||(Arena={}));var Arena;(function(Arena){class queue{constructor(){this.temp_skills=[];this.setActiveNone();}
setActive(name,id){this.active_character=name;this.active_skill=id;}
setActiveNone(){this.active_character="none";this.active_skill=-1;}
addTempSkill(target){let new_skill=new elem(this.active_character,this.active_skill,target);this.temp_skills.push(new_skill);this.setActiveNone();}
get getActiveCharacter(){return this.active_character;}
get getActiveSkill(){return this.active_skill;}
getQueueItem(){return this.temp_skills.shift();}
getQueueLength(){return this.temp_skills.length;}
getQueue(){return this.temp_skills.slice();}
setQueue(queue){this.temp_skills=queue.slice();}}
Arena.queue=queue;class elem{constructor(character,skill,target){this.character=character;this.skill=skill;this.target=target;}}
Arena.elem=elem;})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class character extends Arena.ArenaObject{constructor(order){super();this.dead=false;this.character_order=order;this.skills_list=[];this.active_skill=-1;}
deployPortrait(game,side){let y;switch(this.character_order){case 1:y=Arena.Global.Constants.firstCharacterY;break;case 2:y=Arena.Global.Constants.secondCharacterY;break;case 3:y=Arena.Global.Constants.thirdCharacterY;break;}
if(side=="left")
this.sprite=game.add.sprite(Arena.Global.Constants.leftCharacterX,y,this.name);else{this.sprite=game.add.sprite(Arena.Global.Constants.rightCharacterX+75,y,this.name);this.sprite.scale.x*=-1;}
this.addTapEvent(game);}
static createCharacter(new_order,char_name){switch(char_name){case"ritsu":return new Characters.Ritsu(new_order);case"hiyori":return new Characters.Hiyori(new_order);case"yoroi":return new Characters.Yoroi(new_order);}}
initHealth(game,x,y){this.sprite.maxHealth=100;this.sprite.health=100;this.health_bar=new Characters.healthbar(game,x,y);this.health_bar.setPercent(100);this.health_text=game.add.text(x,y-7,`${this.sprite.health}/${this.sprite.maxHealth}`,Arena.Global.Constants.style_black_small);this.health_text.setTextBounds(0,0);this.health_text.boundsAlignH="center";}
damageHealth(game,value){if(this.sprite.health<=value)
this.kill(game,value);else
this.updateHealthDamage(game,value);}
updateHealthDamage(game,value){this.sprite.damage(value);this.health_bar.setPercent(this.sprite.health);let health=this.sprite.health;if(health<0)
health=0;this.health_text.setText(`${health}/${this.sprite.maxHealth}`,true);}
blockSkills(){for(let i=0;i<this.skills_number;i++){this.skills_list[i].makeUnusable();}}
unblockSkills(){for(let i=0;i<this.skills_number;i++){this.skills_list[i].makeUsable();}}
listenToSkillEnemy(signal,game){signal.add(this.onActiveSkillEnemy,this,0,game,signal);}
onActiveSkillEnemy(){if(arguments[1]=="enemy")
this.addHighlight(arguments[4],arguments[5]);else
this.sprite.tint=0xffffff;}
addHighlight(game,signal){this.sprite.tint=0xb4e9ff;this.sprite.events.onInputDown.addOnce(()=>{signal.dispatch("target","none",this.name);});}
disableHighlight(game){this.sprite.tint=0xffffff;this.sprite.events.destroy();this.addTapEvent(game);}
createUnknown(game){this.unknown=game.add.sprite(0,0,"unknown").alignTo(this.skills_list[0].getSprite,Phaser.LEFT_TOP,21);}
createActiveSkillSprite(game,skill){this.active_skill_sprite=game.add.sprite(0,0,`${this.name}-${skill}`).alignTo(this.skills_list[0].getSprite,Phaser.LEFT_TOP,1,-1);this.active_skill_sprite.scale.setTo(0.72);}
createCancelling(signal,game){signal.add(this.cancelActiveSkill,this);this.active_skill_sprite.events.onInputDown.add(()=>{signal.dispatch("cancel","none",this.name,this.active_skill);});this.active_skill_sprite.inputEnabled=true;}
cancelActiveSkill(){if(this.active_skill!=-1){this.active_skill=-1;this.active_skill_sprite.destroy();}}
kill(game,value){let sprite=game.add.sprite(0,0,"dead").alignIn(this.sprite,Phaser.CENTER);this.dead=true;this.health_bar.setPercent(0);this.health_text.setText(`0/${this.sprite.maxHealth}`,true);this.sprite.visible=false;}}
Characters.character=character;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class healthbar{constructor(new_game,x,y){this.setPercent=function(newValue){if(newValue<0)
newValue=0;if(newValue>100)
newValue=100;let newWidth=newValue*this.width/100;this.setWidth(newWidth);};this.game=new_game;this.configure(x,y);this.drawBackground();this.drawHealthBar();}
configure(new_x,new_y){this.width=75;this.height=14;this.x=new_x;this.y=new_y;this.bg_color="#fff";this.bar_color="#3ad949";this.animationDuration=200;}
drawBackground(){const bmd=this.game.add.bitmapData(this.width,this.height);bmd.ctx.fillStyle=this.bg_color;bmd.ctx.beginPath();bmd.ctx.rect(0,0,this.width,this.height);bmd.ctx.fill();bmd.update();this.bgSprite=this.game.add.sprite(this.x,this.y,bmd);this.bgSprite.anchor.set(0.5);}
drawHealthBar(){const bmd=this.game.add.bitmapData(this.width,this.height);bmd.ctx.fillStyle=this.bar_color;bmd.ctx.beginPath();bmd.ctx.rect(0,0,this.width,this.height);bmd.ctx.fill();bmd.update();this.barSprite=this.game.add.sprite(this.x-this.bgSprite.width/2,this.y,bmd);this.barSprite.anchor.y=0.5;}
setWidth(newWidth){this.game.add.tween(this.barSprite).to({width:newWidth},this.animationDuration,Phaser.Easing.Linear.None,true);}}
Characters.healthbar=healthbar;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class Hiyori extends Characters.character{constructor(order){super(order);this.name="hiyori";this.display_name="Sarugaki Hiyori";this.description="The former lieutenant of the 12th Division, Hiyori is a short-tempered, festering girl with very violent tendencies.";this.skills_number=4;this.skills_list.push(new Characters.skill(0,"hiyori","Flying Kick","This skills deals 55 damage to a single enemy.",[0,2],"enemy",55));this.skills_list.push(new Characters.skill(1,"hiyori","Serpent Strike","This skills deals 40 damage to a single enemy.",[1,0,0,1],"enemy",40));this.skills_list.push(new Characters.skill(2,"hiyori","Sweeping Cero","This skills deals 75 damage to a single enemy.",[0,0,1,2],"enemy",75));this.skills_list.push(new Characters.skill(3,"hiyori","Serpent Parry","This skills deals 20 damage to a single enemy.",[0,0,1,0],"enemy",20));}}
Characters.Hiyori=Hiyori;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class Ritsu extends Characters.character{constructor(order){super(order);this.name="ritsu";this.display_name="Tainaka Ritsu";this.description="Self-appointed president of the Light Music Club, and the drummer of the band Ho-kago Tea Time.";this.skills_number=4;this.skills_list.push(new Characters.skill(0,"ritsu","Drums Release","This skills deals 20 damage to a single enemy.",[0,1],"enemy",20));this.skills_list.push(new Characters.skill(1,"ritsu","All Out","This skills deals 40 damage to a single enemy.",[0,1,1,0,0],"enemy",40));this.skills_list.push(new Characters.skill(2,"ritsu","Final Song","This skills deals 95 damage to a single enemy.",[1,1,1,1],"enemy",95));this.skills_list.push(new Characters.skill(3,"ritsu","Sky High","This skills deals 75 damage to a single enemy.",[0,2,1],"enemy",75));}}
Characters.Ritsu=Ritsu;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class skill extends Arena.ArenaObject{constructor(new_id,new_name,new_display_name,new_description,new_cost,new_target,damage){super();this.id=new_id;this.name=`${new_name}-${this.id}`;this.belongsToCharacter=new_name;this.description=new_description;this.display_name=new_display_name;this.cost=new_cost;this.target=new_target;this.damage=damage;}
deploySkill(game,character_order){let y=Arena.Global.Constants.firstSkillY;let j=0;}
set setSprite(new_sprite){this.sprite=new_sprite;this.sprite.scale.setTo(0.72);}
lowerOpacity(){this.sprite.alpha=0.5;}
restoreOpacity(){this.sprite.alpha=1.0;}
makeUsable(){this.restoreOpacity();this.status="usable";this.sprite.tint=0xffffff;}
makeUnusable(){this.lowerOpacity();this.sprite.tint=0xffffff;this.status="unusable";}
makeActive(game,signal){this.sprite.tint=0xb4e9ff;signal.dispatch("select",this.target,this.belongsToCharacter,this.id);signal.addOnce(this.makeUnactive,this);}
makeUnactive(){this.sprite.tint=0xffffff;}
eventCost(game,signal){this.sprite.events.onInputDown.add(()=>{Arena.State.Play.updateCost(this.cost,game);if(this.status=="usable")
this.makeActive(game,signal);});}
get getSprite(){return this.sprite;}}
Characters.skill=skill;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Characters;(function(Characters){class Yoroi extends Characters.character{constructor(order){super(order);this.name="yoroi";this.display_name="Akadou Yoroi";this.description="The best character to be ever created.";this.skills_number=4;this.skills_list.push(new Characters.skill(0,"yoroi","Chidori","This skills deals 20 damage to a single enemy.",[0,0,0,1],"enemy",20));this.skills_list.push(new Characters.skill(1,"yoroi","Kirin","This skills deals 55 damage to a single enemy.",[0,0,0,2],"enemy",55));this.skills_list.push(new Characters.skill(2,"yoroi","Sharingan","This skills deals 65 damage to a single enemy.",[1,1,0,1],"enemy",65));this.skills_list.push(new Characters.skill(3,"yoroi","Vodovorot","This skills deals 100 damage to a single enemy",[0,0,0,3],"enemy",100));}}
Characters.Yoroi=Yoroi;})(Characters=Arena.Characters||(Arena.Characters={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Global;(function(Global){class Constants{static get serverUrl(){if(window.location.href==="http://127.0.0.1:8080/"||window.location.href==="http://localhost:8080/"){return"http://localhost:9001";}
else{return"http://naruto-arena.com";}}}
Constants.gameHeight=560;Constants.gameWidth=770;Constants.char1="ritsu";Constants.char2="hiyori";Constants.char3="yoroi";Constants.player_name="yabashiri";Constants.rightPlayerX=506;Constants.leftPlayerX=224;Constants.PlayerY=10;Constants.leftPlayerTextX=214;Constants.rightPlayerTextX=566;Constants.PlayerNameY=23;Constants.PlayerTitleY=44;Constants.leftCharacterX=33;Constants.rightCharacterX=660;Constants.firstCharacterY=64;Constants.secondCharacterY=185;Constants.thirdCharacterY=306;Constants.unknownX=125;Constants.firstSkillY=99.5;Constants.firstSkillX=202;Constants.skillDistanceY=121;Constants.descX=365;Constants.descY=467;Constants.descTitleY=452;Constants.descWidth=380;Constants.descImageX=279;Constants.descImageY=454;Constants.hpLeftX=70.5;Constants.hpRightX=697.5;Constants.hpFirstY=150;Constants.hpIncrementY=121;Constants.style_black={font:"bold 14px Trebuchet MS",fill:"#000",align:"left"};Constants.style_black_small={font:"bold 11px Trebuchet MS",fill:"#000",align:"left"};Constants.style_red={font:"bold 14px Trebuchet MS",fill:"#ba1a1c",align:"left"};Constants.player_red={font:"bold 18px Trebuchet MS",fill:"#ba1a1c"};Global.Constants=Constants;})(Global=Arena.Global||(Arena.Global={}));})(Arena||(Arena={}));var Arena;(function(Arena){var Global;(function(Global){})(Global=Arena.Global||(Arena.Global={}));})(Arena||(Arena={}));var Arena;(function(Arena){var State;(function(State){class Blank extends Phaser.State{preload(){}
create(){}}
State.Blank=Blank;})(State=Arena.State||(Arena.State={}));})(Arena||(Arena={}));var Arena;(function(Arena){var State;(function(State){class Lose extends Phaser.State{preload(){this.game.load.image("lose","assets/lose.png");}
create(){this.game.add.sprite(160,100,"lose");let text=this.game.add.text(420,160,`You lost a battle against ${Arena.Global.connectionDetails.opponentName}!`.toUpperCase(),Arena.Global.Constants.style_black);text.wordWrap=true;text.wordWrapWidth=200;}}
State.Lose=Lose;})(State=Arena.State||(Arena.State={}));})(Arena||(Arena={}));var Arena;(function(Arena){var State;(function(State){class Play extends Phaser.State{constructor(){super(...arguments);this.signal=new Phaser.Signal();this.queue=new Arena.queue();}
preload(){this.you=new Arena.player(Arena.Global.Constants.char1,Arena.Global.Constants.char2,Arena.Global.Constants.char3,"you");this.you.preloadImages(this.game);this.opponent=new Arena.player(Arena.Global.Constants.char2,Arena.Global.Constants.char1,Arena.Global.Constants.char3,"opponent");this.opponent.preloadImages(this.game);this.preloadChakra();this.game.load.image("unknown","assets/unknown.png");this.game.load.image("dead","assets/dead.png");this.game.load.image("battle","assets/battle1.jpg");this.game.load.image("pokemon","assets/pokemon.png");}
preloadChakra(){this.game.load.image("tai","assets/chakra/tai.png");this.game.load.image("blood","assets/chakra/blood.png");this.game.load.image("nin","assets/chakra/nin.png");this.game.load.image("gen","assets/chakra/gen.png");this.game.load.image("random","assets/chakra/random.png");}
create(){this.game.stage.backgroundColor="#fff";this.game.add.image(0,0,"pokemon");this.you.deployPortraits(this.game,"left");this.opponent.deployPortraits(this.game,"right");this.you.deploySkills(this.game,this.signal);this.you.createUnknown(this.game);this.opponent.addEnemyListeners(this.game,this.signal);this.signal.add(this.onSignalReceived,this);Play.initDescription(this);Play.initCost(this.game);this.game.stage.disableVisibilityChange=true;this.chakra=new Arena.Chakra();this.chakra.addChakraUI(this.game);this.blockUnusableSkills();this.initTurnText();if(Arena.Global.connectionDetails.turn==false)
this.you.blockAllCharacters();this.onTurnSwitch();}
onSignalReceived(){switch(arguments[0]){case"select":this.queue.setActive(arguments[2],arguments[3]);break;case"target":this.onSkillTarget(arguments[2]);break;default:break;}}
onSkillTarget(target){let character=this.queue.getActiveCharacter;let skill=this.queue.getActiveSkill;const cost=this.you.getCost(character,skill);this.you.blockCharacter(this.game,character,skill,this.signal);this.chakra.reserveChakra(cost);this.you.renewCharacter(this.game);this.opponent.renewCharacter(this.game);this.blockUnusableSkills();this.queue.addTempSkill(target);}
initTurnText(){this.turn_text=this.game.add.text(325,10,this.turnTextResolve(),Arena.Global.Constants.style_black);this.turn_text.inputEnabled=Arena.Global.connectionDetails.turn;}
onTurnSwitch(){this.turn_text.events.onInputUp.add(()=>{Arena.Global.socket.emit("turn-switch",Arena.Global.connectionDetails.opponentID,this.queue.getQueue());Arena.Global.connectionDetails.turn=!Arena.Global.connectionDetails.turn;this.turn_text.setText(this.turnTextResolve());this.turn_text.inputEnabled=Arena.Global.connectionDetails.turn;this.you.blockAllCharacters();this.useSkills();if(this.opponent.checkDead()==true){Arena.Global.socket.emit("victory",Arena.Global.connectionDetails.opponentID);this.victory();}},this);Arena.Global.socket.on("turn-switch",(queue)=>{Arena.Global.connectionDetails.turn=!Arena.Global.connectionDetails.turn;this.queue.setQueue(queue);this.useOpponentSkills();this.turn_text.setText(this.turnTextResolve());this.turn_text.inputEnabled=Arena.Global.connectionDetails.turn;this.chakra.addTurnChakra(this.you.countAlive());this.chakra.updateUI();this.blockUnusableSkills();});Arena.Global.socket.on("disconnect",(id)=>{if(id==Arena.Global.connectionDetails.opponentID)
this.victory();});Arena.Global.socket.on("defeat",()=>{this.defeat();});}
turnTextResolve(){if(Arena.Global.connectionDetails.turn==true)
return"PRESS WHEN READY";else
return"OPPONENT'S TURN";}
static initDescription(play){Play.description_name=play.game.add.text(Arena.Global.Constants.descX,Arena.Global.Constants.descTitleY,play.you.getDisplayName.toUpperCase(),Arena.Global.Constants.style_red);Play.description=play.game.add.text(Arena.Global.Constants.descX,Arena.Global.Constants.descY,play.you.getDescription.toUpperCase(),Arena.Global.Constants.style_black_small);Play.descriptionImage=play.game.add.sprite(Arena.Global.Constants.descImageX,Arena.Global.Constants.descImageY,"yabashiri");}
static updateDescription(object,game){this.description_name.setText(object.getDisplayName.toUpperCase());this.description.setText(object.getDescription.toUpperCase());this.description.wordWrap=true;this.description.wordWrapWidth=Arena.Global.Constants.descWidth;this.description.lineSpacing=-6;this.descriptionImage.destroy();this.descriptionImage=game.add.sprite(Arena.Global.Constants.descImageX,Arena.Global.Constants.descImageY,object.getName);}
static initCost(game){this.cost_text=game.add.text(Arena.Global.Constants.descX+290,Arena.Global.Constants.descTitleY,"ENERGY:",Arena.Global.Constants.style_black_small);this.cost_text.alpha=0.7;this.cost_text.visible=false;this.cost_images=game.add.group();}
static disableCost(){Arena.State.Play.cost_text.visible=false;Arena.State.Play.cost_images.visible=false;}
static enableCost(){Arena.State.Play.cost_text.visible=true;}
static updateCost(cost,game){let images;images=[];for(let i=0;i<cost.length;i++){let chakra_needed=cost[i];while(chakra_needed>0){images.push(game.add.sprite(0,0,Arena.Chakra.chakraResolve(i)));chakra_needed--;}}
if(images.length!=0){this.cost_images.destroy();this.cost_images=game.add.group();this.cost_images.add(images[0]);for(let i=1;i<images.length;i++){images[i].alignTo(images[i-1],Phaser.RIGHT_TOP,5);this.cost_images.add(images[i]);}}
this.cost_images.alignTo(this.cost_text,Phaser.RIGHT_TOP,5,-2);}
blockUnusableSkills(){let characters=this.you.getCharacters;for(let i=0;i<=2;i++){if(characters[i].active_skill!=-1||characters[i].dead==true)
characters[i].blockSkills();else{for(let j=0;j<characters[i].skills_number;j++){if(this.chakra.isEnoughChakra(characters[i].skills_list[j].cost))
characters[i].skills_list[j].makeUsable();else
characters[i].skills_list[j].makeUnusable();}}}}
useSkills(){let length=this.queue.getQueueLength();for(let i=0;i<length;i++){let item=this.queue.getQueueItem();let target=this.opponent.findCharacter(item.target);let character=this.you.findCharacter(item.character);let skill=character.skills_list[item.skill];target.damageHealth(this.game,skill.damage);character.cancelActiveSkill();}}
useOpponentSkills(){let length=this.queue.getQueueLength();for(let i=0;i<length;i++){let item=this.queue.getQueueItem();let target=this.you.findCharacter(item.target);let character=this.opponent.findCharacter(item.character);let skill=character.skills_list[item.skill];target.damageHealth(this.game,skill.damage);}}
victory(){this.game.state.start("win");}
defeat(){this.game.state.start("lose");}}
State.Play=Play;})(State=Arena.State||(Arena.State={}));})(Arena||(Arena={}));var Arena;(function(Arena){var State;(function(State){class Win extends Phaser.State{preload(){this.game.load.image("win","assets/win.png");}
create(){this.game.add.sprite(160,100,"win");let text=this.game.add.text(420,160,`You won a battle against ${Arena.Global.connectionDetails.opponentName}!`.toUpperCase(),Arena.Global.Constants.style_black);text.wordWrap=true;text.wordWrapWidth=200;}}
State.Win=Win;})(State=Arena.State||(Arena.State={}));})(Arena||(Arena={}));