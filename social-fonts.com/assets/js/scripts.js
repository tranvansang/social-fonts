jQuery(function($){(function spriteSheet(){if(typeof SFScripts.font==='undefined'){return;}
var that=this;that.textInput=$('#demo input');that.textOutput=$('#demo .demo-text');that.minSizeView=$('.demo-size-minus');that.maxSizeView=$('.demo-size-plus');that.path=SFScripts.baseUrl+'/fonts/'+SFScripts.dir+'/'+SFScripts.spacing;that.data=null;that.spriteSheet=null;that.minSize=0;that.maxSize=0;that.currentSize=24;$.getJSON(that.path,function(data){var sizes=Object.keys(data.data.size);that.data=data.data;that.spriteSheet=data.data.size[that.currentSize];that.minSize=Math.min.apply(Math,sizes);that.maxSize=Math.max.apply(Math,sizes);});that.updateMinSizeView=function(){if(that.currentSize<=that.minSize){that.minSizeView.addClass('demo-size-end');}else{that.minSizeView.removeClass('demo-size-end');}};that.updateMaxSizeView=function(){if(that.currentSize>=that.maxSize){that.maxSizeView.addClass('demo-size-end');}else{that.maxSizeView.removeClass('demo-size-end');}};that.minSizeView.click(function(event){if(that.currentSize>that.minSize){that.currentSize-=4;that.updateMinSizeView();that.updateMaxSizeView();that.spriteSheet=that.data.size[that.currentSize];that.updateTextOutput(textInput.val());}
event.preventDefault();});that.maxSizeView.click(function(event){if(that.currentSize<that.maxSize){that.currentSize+=4;that.updateMinSizeView();that.updateMaxSizeView();that.spriteSheet=that.data.size[that.currentSize];that.updateTextOutput(textInput.val());}
event.preventDefault();});that.updateTextOutput=function(text){var html='';for(i=0;i<text.length;i+=1){var css=that.cssify(that.data.sheet.css)+that.cssify(that.spriteSheet.css),obj=that.spriteSheet.glyphs[that.data.map[text[i]]];if(!obj){obj=that.spriteSheet.glyphs[that.data.map[' ']];}
css+=that.cssify(obj.css);html+='<div class="sprite-map-char" style="'+css+'">'+
text[i]+
'</div>';}
that.textOutput.html(html);that.textOutput.css({'margin-top':text.length?20:0});};that.textInput.bind('keydown keypress',function(){setTimeout(function(){var text=that.textInput.val();if(that.spriteSheet){that.updateTextOutput(text);}else{that.textOutput.text(text);}},0);});that.cssify=function(object){var css='',key,value,subKey;for(key in object){value=object[key];css+=key+':';if(typeof value==='number'){css+=value+'px';}else if(typeof value==='string'){if(key==='background-image'){css+='url(';}
css+=value;if(key==='background-image'){css+=')';}}else if(typeof value==='object'){for(subKey in value){css+=value[subKey]+'px ';}}
css+=';';}
return css;};}());(function createLogo(){if(typeof SFScripts.font==='undefined'||typeof $.jPicker==='undefined'){return;}
var that=this;that.site='http://social-fonts.com';that.colorBg=$('#create-logo-color-background');that._colorBg=that.colorBg.children('.'+that.colorBg.attr('id'));that.colorFg=$('#create-logo-color-foreground');that._colorFg=that.colorFg.children('.'+that.colorFg.attr('id'));that.download=$('#created-logo-download');that.fontSize=$('#create-logo-font-size');that.form=$('#create-logo form');that.iframe=$('#create-logo iframe');that.padding=$('#create-logo-padding');that.text=$('#create-logo-text');that.init=false;that.download.attr('download',SFScripts.dir+'.png');that.iframeWindow=that.iframe[0].contentWindow;that.form.submit(function(event){if(that.init){that.iframeWindow.postMessage(JSON.stringify({colorBg:'rgba('+that._colorBg.val()+')',colorFg:'rgba('+that._colorFg.val()+')',fontSize:that.set(that.fontSize),padding:that.set(that.padding),text:that.text.val()}),that.site);}
event.preventDefault();});that.text.bind('keydown keypress',function(event){if(!that.init){that.init=true;that.iframeWindow.postMessage(JSON.stringify({baseUrl:SFScripts.baseUrl,dir:SFScripts.dir,name:SFScripts.font}),that.site);}});that.set=function(object){if(object.val()!=object.prop('defaultValue')){return object.val();}else{return object.prop('defaultValue');}};that.jPicker=function(pickerObject,colorObject){var color=colorObject.prop('defaultValue').split(',');pickerObject.jPicker({window:{alphaSupport:true,expandable:true,effects:{type:'show',speed:{show:'fast',hide:'fast'}},position:{x:'right',y:'bottom'}},color:{active:new $.jPicker.Color({r:color[0],g:color[1],b:color[2],a:color[3]})},images:{clientPath:SFScripts.baseUrl+'/js/jpicker/images/'}},function(color,context){var r=!color.val('r')?0:color.val('r'),g=!color.val('g')?0:color.val('g'),b=!color.val('b')?0:color.val('b'),a=!color.val('a')?0:color.val('a'),colorString=r+','+g+','+b+','+a;colorObject.val(colorString);});};that.jPicker(that.colorBg,that._colorBg);that.jPicker(that.colorFg,that._colorFg);window.addEventListener('message',function(event){if(event.origin===that.site){var data=JSON.parse(event.data),show=$.trim(data.text).length>0;that.iframe.css({height:data.height,display:'block',position:'relative'});that.download.attr('href',data.image);that.download.parent().css({display:show?'block':'none'});}},false);}());(function populateRecentItems(){var that=this;that.recentPath=SFScripts.baseUrl+'/js/recent.js';that.recents=$('#recent li a');$.getScript(that.recentPath,function(data){var recentsData=JSON.parse(data);$.each(that.recents,function(index){var recentData=recentsData[index];$(this).attr('href','/'+recentData[1]).text(recentData[0]);});});}());(function populateFeaturedItems(){var that=this;that.featurePath=SFScripts.baseUrl+'/js/featured.js';that.features=$('#feature .item a');$.getScript(that.featurePath,function(data){var shuffle=function(array){var currentIndex=array.length,temporaryValue,randomIndex;while(currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue;}
return array;},shuffledData=shuffle(JSON.parse(data));$.each(that.features,function(index){var featuredData=shuffledData[index];if(featuredData){$(this).attr('href','/'+featuredData[0]).css('background-image','url(/'+featuredData[1]+')');}});});}());(function scrollToDownload(){var downloadContainer=$('#download').parent();if(downloadContainer.length>0){var yOffset=downloadContainer.offset().top-45,gotoDownload=$('#goto-download'),htmlAndBody=$('html, body');gotoDownload.click(function(){htmlAndBody.animate({scrollTop:yOffset},400);return false;});}}());(function scrollBackgroundColor(){var win=$(window),html=$('html'),offsetY=0,prevOffsetY=0,prevDirUp=false,didSetup=false;win.scroll(function(event){offsetY=win.scrollTop();if(!didSetup){didSetup=true;if(offsetY){html.removeClass('background-top');}}
if(offsetY>prevOffsetY){if(prevDirUp){prevDirUp=false;html.removeClass('background-top');}}else{if(!prevDirUp){prevDirUp=true;html.addClass('background-top');}}
prevOffsetY=offsetY;});html.addClass('background-top');}());});