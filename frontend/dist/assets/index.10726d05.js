var q=Object.defineProperty;var N=(h,t,i)=>t in h?q(h,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[t]=i;var e=(h,t,i)=>(N(h,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();class G{constructor(){e(this,"detections",new Map);e(this,"drawShadow",!1);e(this,"event");window.addEventListener("mousemove",this.detectHandler.bind(this))}detectHandler(t){this.detections.get("isOpenInven")?(this.drawShadow=!0,this.event=t):(this.drawShadow=!1,this.event=null)}addDetection(t,i){this.detections.set(t,i)}update(){if(!this.event)return;const t=this.detections.get("inventoryPosition"),i=p.getBoundingClientRect(),s=this.event.clientX-i.left,o=this.event.clientY-i.top;if(t.left<s&&s<t.right&&o>t.top&&o<t.bottom){const a=parseInt(((s-t.left)/t.block).toString()),r=parseInt(((o-t.top)/t.block).toString());n&&(n.fillStyle="#00000055",document.body.style.cursor="pointer",n.fillRect(a*t.block+t.padding/2+t.left,r*t.block+t.padding/2+t.top,t.block,t.block))}else document.body.style.cursor="inherit"}}const p=document.querySelector("canvas"),n=p.getContext("2d");p.width=1024;p.height=576;const b=new G,d={right:{pressed:!1},left:{pressed:!1},up:{pressed:!1}},c={windowLeftLimit:0,windowRightLimit:0,scrollOffset:0,mapEnd:2e3};class k{constructor({name:t,width:i,height:s,image:o,position:a,color:r}){e(this,"name");e(this,"width");e(this,"height");e(this,"image");e(this,"position");e(this,"color");this.name=t,this.width=i,this.height=s,this.image=o,this.position=a,this.color=r}marker(t){const i="ENTER";n&&(n.fillStyle="#000000",n.textAlign="center",n.fillText(i,this.position.x+this.width/2-100/2+50,this.position.y-this.height+200+Math.sin(t*10)*3),n.fillText("\u2B07\uFE0F",this.position.x+this.width/2-100/2+50,this.position.y-this.height+230+Math.sin(t*10)*3))}drawWindow(){n&&(n.fillStyle="#0056ff55",n.fillRect(this.position.x+50,this.position.y-this.height+100,100,100),n.fillStyle="#0056ff55",n.fillRect(this.position.x+this.width-150,this.position.y-this.height+100,100,100))}drawDoor(){n&&(n.fillStyle="#855523",n.fillRect(this.position.x+this.width/2-100/2,this.position.y-this.height+150,100,150))}drawKanban(){this.name.length*30,n&&(n.fillStyle="#ffffff",n.font="bold 20px Arial",n.textAlign="center",n.fillText(this.name.toUpperCase(),this.position.x+this.width/2,this.position.y-this.height-20))}draw(){n&&(n.fillStyle=this.color,n.fillRect(this.position.x,this.position.y-this.height,this.width,this.height),this.drawDoor(),this.drawKanban())}moveHorizontally(t){this.position.x=this.position.x+t}moveVertical(t){this.position.y=this.position.y+t}}class K{constructor(t){e(this,"imageSource");e(this,"buildings",[]);this.imageSource=t}add(t){if(t instanceof Array)for(let i of t)this.buildings.push(new k(i));else this.buildings.push(new k(t))}setImage(t){this.imageSource=t}moveHorizontally(t){this.buildings.forEach(i=>i.moveHorizontally(t))}moveVertical(t){this.buildings.forEach(i=>i.moveVertical(t))}draw(){this.buildings.forEach(t=>t.draw())}clear(){this.buildings=[]}frontOfDoor(t,i,s){this.buildings.forEach(o=>{i.position.x+i.width>=o.position.x+o.width/2-50&&i.position.x<o.position.x+o.width/2+50&&(o.marker(t),d.up.pressed&&(i.frontOfBuilding(o),confirm(`"${o.name}"\uC5D0 \uC785\uC7A5\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?`)?(s(o),i.building=void 0,i.velocity.x=0,i.velocity.y=0,i.jumpped=!1,d.up.pressed=!1,d.left.pressed=!1,d.right.pressed=!1):(i.building=void 0,i.velocity.x=0,i.velocity.y=0,i.jumpped=!1,d.up.pressed=!1,d.left.pressed=!1,d.right.pressed=!1),i.building=void 0))})}}class C{constructor({x:t,y:i,image:s}){e(this,"position");e(this,"width");e(this,"height");e(this,"image");this.position={x:t,y:i},s instanceof HTMLImageElement?(this.image=s,this.width=s.width,this.height=s.height):s&&(this.width=s.width,this.height=s.height)}moveHorizontally(t){this.position.x=this.position.x+t}moveVertical(t){this.position.y=this.position.y+t}draw(){n&&(this.image instanceof HTMLImageElement?n.drawImage(this.image,this.position.x,this.position.y):n.fillRect(this.position.x,this.position.y,200,300))}}class j{constructor(t){e(this,"imageSource");e(this,"generic",[]);this.imageSource=t}add(t){if(t instanceof Array)for(let i of t)this.generic.push(new C(i));else this.generic.push(new C(t))}setImage(t){this.imageSource=t}moveHorizontally(t){this.generic.forEach(i=>i.moveHorizontally(t))}moveVertical(t){this.generic.forEach(i=>i.moveVertical(t))}draw(){this.generic.forEach(t=>t.draw())}clear(){this.generic=[]}}class A{constructor(){e(this,"monsters",[])}add(t){t instanceof Array?this.monsters=this.monsters.concat(t):this.monsters.push(t)}draw(){this.monsters.filter(t=>t.gradient>0),this.monsters.forEach(t=>t.draw())}detect(t){this.monsters.forEach(i=>{t.position.x+t.width>i.position.x&&i.position.x+i.width>t.position.x&&(t.attack(i),i.attack(t))})}update(){this.monsters.forEach(t=>t.update())}moveHorizontally(t){this.monsters.forEach(i=>i.moveHorizontally(t))}moveVertical(t){this.monsters.forEach(i=>i.moveVertical(t))}aiMove(t){this.monsters.forEach(i=>i.aiMove(t))}boundaryCollision(){this.monsters.forEach(t=>t.boundaryCollision())}}class L{constructor({x:t,y:i,image:s}){e(this,"position");e(this,"width");e(this,"height");e(this,"image");this.position={x:t,y:i},s instanceof HTMLImageElement?(this.image=s,this.width=s.width,this.height=s.height):s&&(this.width=s.width,this.height=s.height)}moveHorizontally(t){this.position.x=this.position.x+t}moveVertical(t){this.position.y=this.position.y+t}draw(){n&&(this.image instanceof HTMLImageElement?n.drawImage(this.image,this.position.x,this.position.y):n.fillRect(this.position.x,this.position.y,200,300))}collision(t){t.name,t.position.y+t.height<=this.position.y&&t.position.y+t.height+t.velocity.y>=this.position.y&&t.position.x+t.width>=this.position.x&&t.position.x<=this.position.x+this.width&&(t.jumpped=!1,t.velocity.y=0)}}class F{constructor(t){e(this,"imageSource");e(this,"platforms",[]);this.imageSource=t}add(t){if(t instanceof Array)for(let i of t)this.platforms.push(new L({...i,image:this.imageSource}));else this.platforms.push(new L({...t,image:this.imageSource}))}setImage(t){this.imageSource=t}moveHorizontally(t){this.platforms.forEach(i=>i.moveHorizontally(t))}moveVertical(t){this.platforms.forEach(i=>i.moveVertical(t))}draw(){this.platforms.forEach(t=>t.draw())}clear(){this.platforms=[]}collision(t){this.platforms.forEach(i=>t.forEach(s=>s instanceof A?s.monsters.forEach(o=>i.collision(o)):i.collision(s)))}}class y{constructor(t){e(this,"str",1);e(this,"dex",1);e(this,"int",1);e(this,"lux",1);e(this,"speed",0);const{str:i,dex:s,int:o,lux:a,speed:r}=t||{str:1,dex:1,int:1,lux:1};this.str=i,this.dex=s,this.int=o,this.lux=a,r&&(this.speed=r)}setStr(t){this.str=t}setDex(t){this.dex=t}setInt(t){this.int=t}setLux(t){this.lux=t}setSpeed(t){this.speed=t}}class B{constructor(t,i,s,o,a){e(this,"barWidth",50);e(this,"gravity",1);e(this,"position");e(this,"velocity");e(this,"width");e(this,"height");e(this,"speed",5);e(this,"jumpped",!1);e(this,"name");e(this,"health",0);e(this,"mana",0);e(this,"maxHealth",0);e(this,"maxMana",0);e(this,"infoBarSize",{width:100,height:5});e(this,"stats",new y);e(this,"attacked",!1);e(this,"alive",!0);e(this,"gradient",255);this.name=t,this.position=i,this.velocity=s,this.width=o,this.height=a}setHealth(t,i){this.health=t,this.maxHealth=i}setMana(t,i){this.mana=t,this.maxMana=i}jump(){this.velocity.y-=20,this.jumpped=!0}drawPlayerInfo(){if(n){const t=this.health/this.maxHealth*100*(this.barWidth/100),i=this.mana/this.maxMana*100*(this.barWidth/100);n.fillStyle="gray",n.fillRect(this.position.x-this.barWidth/2+this.width/2,this.position.y-20,this.barWidth,this.infoBarSize.height),n.fillStyle="red",n.fillRect(this.position.x-this.barWidth/2+this.width/2,this.position.y-20,Number.isFinite(t)?t:0,this.infoBarSize.height),n.fillStyle="gray",n.fillRect(this.position.x-this.barWidth/2+this.width/2,this.position.y-15,this.barWidth,this.infoBarSize.height),n.fillStyle="blue",n.fillRect(this.position.x-this.barWidth/2+this.width/2,this.position.y-15,Number.isFinite(i)?i:0,this.infoBarSize.height)}}knockback(t){this.position.x+this.width>t.position.x&&this.position.x+this.width<t.position.x+t.width/2?(console.log("left"),this.velocity.x=-10,this.velocity.y=-5):this.position.x>t.position.x+t.width/2&&this.position.x<t.position.x+t.width?(console.log("right"),this.velocity.x=10,this.velocity.y=-5):(this.velocity.x=Math.random()>.5?10:-10,this.velocity.y=-5)}attack(t){this.health!==0&&t.health!==0&&(this.attacked||(console.log(`${this.name}\uC774 ${t.name}\uC744 \uACF5\uACA9`),t.knockback(this),t.damaged(this.stats.str),t.health===0&&(t.health=0),this.attacked=!0,setTimeout(()=>{this.attacked=!1},500),setTimeout(()=>{t.velocity.x=0},50)))}damaged(t){this.health-=t}die(){this.alive=!1;const t=setInterval(()=>{this.gradient-=10,this.gradient<=0&&(this.gradient=0,clearInterval(t))},16)}draw(){!!n&&this.gradient>0&&(this.drawPlayerInfo(),n.fillStyle=`#000000${this.gradient.toString(16)}`,this.gradient===0&&(n.fillStyle="#00000000"),n.fillRect(this.position.x,this.position.y,this.width,this.height),n.font="bold 14px Arial",n.textAlign="center",n.fillText(this.name,this.position.x+this.width/2,this.position.y-25),this.health===0&&this.alive&&this.die())}update(){this.draw(),this.name,this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.position.y+this.height+this.velocity.y<=p.height&&(this.velocity.y+=this.gravity)}}const H={range:500,current:0,direction:0};class T extends B{constructor(i="noename",s,o,a,r){super(i,s||{x:100,y:100},{x:0,y:0},o,o);e(this,"gravity",1);e(this,"position");e(this,"velocity");e(this,"width");e(this,"height");e(this,"speed",5);e(this,"stats",new y({str:1,dex:0,int:0,lux:0,speed:2}));this.position=s||{x:100,y:100},this.velocity={x:0,y:0},this.width=o,this.height=o,a&&(this.health=a),r&&(this.mana=r),a&&(this.maxHealth=a),r&&(this.maxMana=r)}moveHorizontally(i){this.position.x=this.position.x+i}moveVertical(i){this.position.y=this.position.y+i}aiMove(i){H.direction=Math.cos(i)>0?0:1,H.direction?this.velocity.x=this.speed:this.velocity.x=-this.speed}boundaryCollision(){this.position.x+c.scrollOffset<0?this.velocity.x=0:this.position.x-this.width+c.scrollOffset-c.windowRightLimit>c.mapEnd&&(this.velocity.x=0)}}class I{constructor(t){e(this,"equiped",!1);t&&(this.equiped=t)}take(){this.equiped=!0}takeoff(){this.equiped=!1}}class V{constructor(t,i,s,o){e(this,"head");e(this,"top");e(this,"bottom");e(this,"foot");this.head=t,this.top=i,this.bottom=s,this.foot=o}take(t){this[t].equiped=!0}takeoff(t){this[t].equiped=!1}}class O{constructor({type:t,name:i,price:s,stats:o}){e(this,"type");e(this,"name","noname");e(this,"price");e(this,"stats");this.type=t,this.name=i,this.price=s,this.stats=o}setPrice(t){this.price=t}setStats(t){this.stats=new y(t)}}class W extends I{constructor({type:i,name:s,price:o,stats:a},r=!1){super(r);e(this,"item");e(this,"place");this.item=new O({type:i,name:s,price:o,stats:a}),this.place="head"}}class U extends I{constructor({type:i,name:s,price:o,stats:a},r=!1){super(r);e(this,"item");e(this,"place");this.item=new O({type:i,name:s,price:o,stats:a}),this.place="top"}}class $ extends I{constructor({type:i,name:s,price:o,stats:a},r=!1){super(r);e(this,"item");e(this,"place");this.item=new O({type:i,name:s,price:o,stats:a}),this.place="bottom"}}class X extends I{constructor({type:i,name:s,price:o,stats:a},r=!1){super(r);e(this,"item");e(this,"place");this.item=new O({type:i,name:s,price:o,stats:a}),this.place="foot"}}class P extends B{constructor(i,s,o){console.log(i);super(i||"Player",{x:100,y:100},{x:0,y:0},30,30);e(this,"equipment",new V(new W({type:"normal",name:"none",price:0,stats:new y({str:0,dex:0,int:0,lux:0})},!0),new U({type:"normal",name:"none",price:0,stats:new y({str:0,dex:0,int:0,lux:0})},!0),new $({type:"normal",name:"none",price:0,stats:new y({str:0,dex:0,int:0,lux:0})},!0),new X({type:"normal",name:"none",price:0,stats:new y({str:0,dex:0,int:0,lux:0,speed:0})},!0)));e(this,"gravity",1);e(this,"position");e(this,"velocity");e(this,"width");e(this,"height");e(this,"jumpped",!1);e(this,"building");e(this,"stats",new y({str:5,dex:2,int:1,lux:2,speed:15}));e(this,"infoBarSize",{width:100,height:20});e(this,"health",100);e(this,"mana",20);e(this,"maxHealth",100);e(this,"maxMana",20);e(this,"inventory",new Y(5,6,50));this.position={x:100,y:100},this.velocity={x:0,y:0},this.width=30,this.height=30,this.updateUserStats(),console.log(this.equipment.foot.item.stats.speed),this.infoBarSize.width=50,this.infoBarSize.height=5,s&&(this.health=s),o&&(this.mana=o),s&&(this.maxHealth=s),o&&(this.maxMana=o)}updateUserStats(){this.equipment.foot.equiped&&this.equipment.foot.item.stats.speed&&(this.stats.speed+=this.equipment.foot.item.stats.speed)}frontOfBuilding(i){this.building=i}}class Y{constructor(t,i,s){e(this,"items",[]);e(this,"x");e(this,"y");e(this,"limits");e(this,"BLOCK",50);e(this,"PADDING",5);e(this,"isOpen",0);e(this,"inventoryPosition",{left:0,top:0,width:0,height:0});this.x=t,this.y=i,this.limits=s,this.items=new Array(t*i).fill(null),b.addDetection("inventory",this)}add(t){this.items.push(t)}open(){function t(){if(n){const i=p.width-this.x*this.BLOCK;this.inventoryPosition.x=this.x,this.inventoryPosition.y=this.y,this.inventoryPosition.padding=this.PADDING,this.inventoryPosition.block=this.BLOCK,this.inventoryPosition.left=i-100-this.PADDING/2,this.inventoryPosition.right=this.inventoryPosition.left+this.BLOCK*this.x+this.PADDING/2,this.inventoryPosition.top=50-this.PADDING/2,this.inventoryPosition.bottom=this.inventoryPosition.top+this.y*this.BLOCK+this.PADDING/2,this.inventoryPosition.width=this.x*this.BLOCK,this.inventoryPosition.height=this.y*this.BLOCK,n.fillStyle="#ffffff",n.fillRect(i-100,50,this.inventoryPosition.width,this.inventoryPosition.height),this.items.forEach((s,o)=>{n&&(n.fillStyle=s===null?"#ccc":"#222",n.fillRect(i-100+o%this.x*this.BLOCK+this.PADDING/2,50+parseInt((o/this.x).toString())*this.BLOCK+this.PADDING/2,this.BLOCK-this.PADDING,this.BLOCK-this.PADDING))}),b.addDetection("inventoryPosition",this.inventoryPosition),b.update()}this.isOpen=requestAnimationFrame(t.bind(this))}return this.isOpen?(b.addDetection("isOpenInven",!1),document.body.style.cursor="inherit",this.close()):(this.isOpen=requestAnimationFrame(t.bind(this)),b.addDetection("isOpenInven",!0)),this.items}close(){cancelAnimationFrame(this.isOpen),this.isOpen=0}}const D="/images/background.png",E="/images/platform.png",z="/images/rock.png",J="/images/storeBackground.jpg";function g(h,t,i){const s=new Image;return s.src=h,t&&i&&(s.width=t,s.height=i),s}let l=new P,m=g(E),S=g(D),f=g(z);c.windowLeftLimit=p.width/4;c.windowRightLimit=p.width-p.width/4;const w=new F,v=new j,x=new K,u=new A;c.scrollOffset=0;function Q(h){l=new P("Player1"),m=g(E),S=g(J),console.log(h.name,"entered"),v.add([{x:0,y:0,image:S}]),x.clear(),c.scrollOffset=0}function M(){l=new P("Player1"),u.add(new T("slime",{x:300,y:0},20,50,0)),m=g(E),S=g(D),f=g(z),w.clear(),w.setImage(m),w.add([{x:m.width*4,y:470},{x:m.width*3,y:470},{x:m.width*2,y:470},{x:m.width*1,y:470},{x:m.width*0,y:470}]),v.add([{x:0,y:0,image:S}]),v.add([{x:0,y:0,image:S},{x:f.width*4,y:576-f.height,image:{width:f.width,height:f.height}},{x:f.width*2,y:576-f.height+150,image:{width:f.width,height:f.height}},{x:f.width*.5,y:576-f.height,image:{width:f.width,height:f.height}}]),x.add([new k({name:"account",width:500,height:300,image:new Image,position:{x:1200,y:470},color:"green"}),new k({name:"house",width:500,height:300,image:new Image,position:{x:500,y:470},color:"yellow"})]),c.scrollOffset=0}function R(h){h*=.001,requestAnimationFrame(R),n&&(n.fillStyle="white",n.fillRect(0,0,p.width,p.height)),v.draw(),x.draw(),w.draw(),l.update(),u.update(),u.aiMove(h),u.detect(l),!l.jumpped&&!l.building&&d.up.pressed&&l.jump(),u.boundaryCollision(),d.right.pressed&&l.position.x<c.windowRightLimit?l.velocity.x=l.stats.speed:d.left.pressed&&l.position.x>c.windowLeftLimit||d.left.pressed&&c.scrollOffset===0&&l.position.x>0&&l.position.x?l.velocity.x=-l.stats.speed:(l.velocity.x=0,d.right.pressed&&c.scrollOffset<c.mapEnd?(c.scrollOffset+=l.stats.speed,w.moveHorizontally(-l.stats.speed),x.moveHorizontally(-l.stats.speed),v.moveHorizontally(-l.stats.speed*.66),u.moveHorizontally(-l.stats.speed)):d.left.pressed&&c.scrollOffset>0&&(c.scrollOffset-=l.stats.speed,w.moveHorizontally(l.stats.speed),x.moveHorizontally(l.stats.speed),v.moveHorizontally(l.stats.speed*.66),u.moveHorizontally(l.stats.speed))),w.collision([l,u]),x.frontOfDoor(h,l,Q),c.scrollOffset>c.mapEnd&&console.log("you win"),l.position.y>p.height&&(console.log("you lose"),l.inventory.close(),M())}M();requestAnimationFrame(R);addEventListener("keydown",h=>{const{key:t}=h;switch(t.toLowerCase()){case"a":d.left.pressed=!0;break;case"d":d.right.pressed=!0;break;case"s":break;case"w":d.up.pressed=!0;break;case"e":l.inventory.open();break}});addEventListener("keyup",h=>{const{key:t}=h;switch(t.toLowerCase()){case"a":d.left.pressed=!1;break;case"d":d.right.pressed=!1;break;case"s":break;case"w":d.up.pressed=!1;break}});
