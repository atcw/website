"use strict";angular.module("mfGalleryApp",["ngSanitize","ngRoute","debounce","angular-inview"]).config(["$routeProvider",function(a){var b=["AlbumService","$route",function(a,b){return a.loadInitialAlbum(b.current.params.album)}];a.when("/a/:album*?",{templateUrl:"views/gallery.html",controller:"GalleryCtrl",reloadOnSearch:!1,resolve:{albumData:b}}).when("/f/",{templateUrl:"views/ifs.html",controller:"IFSCtrl",reloadOnSearch:!1,resolve:{albumData:b}}).otherwise({resolve:{whereToGo:["Config","$location",function(a,b){b.path("ifs"===a.mode?"/f/":"/a/")}]}})}]),angular.module("mfGalleryApp").controller("GalleryCtrl",["albumData","$scope","$routeParams","$location","$window","Config","LinearPartitionService",function(a,b,c,d,e,f,g){function h(){var a="#/a/";b.ui.breadcrumb.push({href:a,name:"Start"}),k.split("/").reduce(function(a,c,d,e){if(d!==e.length-1){if(""===c)return a;var f=a+c+"/";return b.ui.breadcrumb.push({href:f,name:c}),f}},a)}function i(){for(var a=0;a<b.ui.album.images.length;a++)if(b.ui.album.images[a].name===c.i)return a}function j(){return c.i?(b.lightbox.imageUrl=f.folder+"/"+k+"/.thumbs/"+f.thumbLightbox+"-"+c.i,void(b.lightbox.show=!0)):void(b.lightbox.show=!1)}var k=c.album||"",l=f.folder+"/"+k;b.ui={ifsMode:"ifs"===f.mode,relPath:k,breadcrumb:[],album:a,imagesContainerWidth:0,parent:k.split("/").slice(0,-1).join("/")},b.lightbox={imageUrl:null,show:!1},b.$watch("lightbox.show",function(a){!a&&c.i&&d.search("")}),b.$on("widthChanged",function(a,c){g.fitPics(b.ui.album.images,{containerWidth:c,preferedImageHeight:f.preferedImageHeight,spacing:4})}),b.$on("$locationChangeSuccess",function(){j()}),h(),j(),b.makePath=function(a){var c="#/a/";return""!==b.ui.relPath&&(c+=b.ui.relPath+"/"),c+a.folder},b.makeThumbUrl=function(a,b,c){var d="small"===b?f.thumbSmall:f.thumbLightbox,e=c?"/"+c:"";return l+e+"/.thumbs/"+d+"-"+a},b.prevImg=function(){var a=i(),c=(a-1+b.ui.album.images.length)%b.ui.album.images.length;d.search("i",b.ui.album.images[c].name)},b.nextImg=function(){var a=i(),c=(a+1)%b.ui.album.images.length;d.search("i",b.ui.album.images[c].name)},b.yeah=function(a,b,c){console.log("yeah!",a,b),angular.element(c).unbind("scroll")}}]),angular.module("mfGalleryApp").controller("IFSCtrl",["albumData","$scope","$routeParams","$location","Config",function(a,b,c,d,e){function f(){return a.images[b.ui.currentIndex]?(b.ui.currentImage=a.images[b.ui.currentIndex],b.lightbox.imageUrl=e.folder+"/.thumbs/"+e.thumbLightbox+"-"+b.ui.currentImage.name,void(b.lightbox.show=!0)):void(b.lightbox.show=!1)}function g(){if(angular.isArray(a.images)&&0!==a.images.length){if(c.i&&(b.ui.currentIndex=h(c.i),b.ui.currentIndex))return void f();b.ui.currentIndex=0,f()}}function h(b){for(var c=0;c<a.images.length;c++)if(a.images[c].name===b)return c;return null}b.ui={currentImage:{},size:a.images.length,currentIndex:null},b.lightbox={imageUrl:"",show:!1,imgSize:{}},b.$on("$locationChangeSuccess",function(){b.ui.currentIndex=c.i?h(c.i):0,f()}),g(),b.prevImg=function(){var c=(b.ui.currentIndex-1+a.images.length)%a.images.length;d.search("i",a.images[c].name)},b.nextImg=function(){var c=(b.ui.currentIndex+1)%a.images.length;d.search("i",a.images[c].name)}}]),angular.module("mfGalleryApp").factory("Config",function(){if(!window.mfGalleryConfig)throw new Error('No config found. Provide a global config object named "mfGalleryConfig".');return window.mfGalleryConfig}),angular.module("mfGalleryApp").service("AlbumService",["$http","$log","$q","Config",function(a,b,c,d){this.loadInitialAlbum=function(a){return a=a||"",this.getAlbums(a).then(function(a){return b.info("Initial album loaded."),a},function(a){return b.error("Can´t load initial album",a),c.reject(a)})},this.getAlbums=function(b){b||(b=".");var c=d.folder+"/"+b+"/meta.json";return a.get(c).then(function(a){return a.data})}}]),angular.module("mfGalleryApp").service("LinearPartitionService",function(){var a=function(a,c){var d,e,f,g,h,i=[],j=[];if(0>=c)return j;if(e=a.length-1,c>e){for(d=0;d<a.length;d++)j.push([a[d]]);return j}for(f=b(a,c),g=f[0],h=f[1],c-=2;c>=0;){var k=[];for(d=h[e-1][c]+1;e+1>d;d++)k.push(a[d]);k=[k],i=k.concat(i),e=h[e-1][c],c-=1}for(d=0;e+1>d;d++)j.push(a[d]);return j=[j],j.concat(i)},b=function(a,b){var c,d,e=a.length,f=[],g=[],h=[];for(c=0;e>c;c++){for(f=[],d=0;b>d;d++)f.push(0);g.push(f)}for(c=0;e-1>c;c++){for(f=[],d=0;b-1>d;d++)f.push(0);h.push(f)}for(c=0;e>c;c++)g[c][0]=a[c]+(c?g[c-1][0]:0);for(c=0;b>c;c++)g[0][c]=a[0];for(c=1;e>c;c++)for(d=1;b>d;d++){var i,j=[];for(i=0;c>i;i++)j.push([Math.max.apply(Math,[g[i][d-1],g[c][0]-g[i][0]]),i]);var k={computed:1/0,value:1/0};for(i=0;i<j.length;i++)j[i][0]<k.computed&&(k={value:j[i],computed:j[i][0]});g[c][d]=k.value[0],h[c-1][d-1]=k.value[1]}return[g,h]},c=function(b,c){c.border=c.border||0,c.spacing=c.spacing||0;for(var d,e,f=0,g=[],h=0,i=0,j=[],k=0;k<b.length;k++)b[k].aspectRatio=b[k].width/b[k].height,h+=b[k].aspectRatio*c.preferedImageHeight;if(e=Math.round(h/c.containerWidth),1>e)for(k=0;k<b.length;k++)b[k].width=parseInt(c.preferedImageHeight*b[k].aspectRatio,10),b[k].height=c.preferedImageHeight;else{for(k=0;k<b.length;k++)j.push(parseInt(100*b[k].aspectRatio,10));for(d=a(j,e),k=0;k<d.length;k++){var l=d[k],m=c.containerWidth;c.spacing&&(m-=c.spacing*(l.length-1)),i=0,g=[];for(var n=0;n<l.length;n++)g.push(b[f++]);for(n=0;n<g.length;n++)i+=g[n].aspectRatio;for(n=0;n<g.length;n++){var o=g[n];o.width=parseInt(m/i*o.aspectRatio,10),o.height=parseInt(m/i,10),o.break=n===g.length-1}}}return b};this.fitPics=function(a,b){return c(a,b)}}),angular.module("mfGalleryApp").directive("lightbox",["$window","$document","Config",function(a,b,c){var d={margin:20,padding:0};return{templateUrl:"views/lightbox.tpl.html",scope:{imageUrl:"&lightbox",show:"=",onNext:"&next",onPrev:"&prev",embedded:"@",sizeUpdate:"="},link:function(e){function f(){e.imgSize={width:"200px",height:"200px"},e.imgStyle=angular.extend({"background-image":"url("+c.staticPath+"images/ajax-loader.gif)"},e.imgSize)}function g(b,c){if(e.imgSize.width=b+"px",e.imgSize.height=c+"px",e.imgStyle=angular.extend(e.imgStyle,e.imgSize),e.sizeUpdate&&(e.sizeUpdate=angular.extend(e.imgSize)),e.embedded)return void(e.dialogSize=e.imgSize);e.dialogSize.width=b+d.padding+"px";var f=c+d.padding,g=(a.innerHeight-f)/2;e.dialogSize.height=f+"px",e.dialogSize.top=g+"px"}function h(b){e.imageLoaded=!1,e.imgStyle["background-image"]="url("+c.staticPath+"images/ajax-loader.gif)";var f=new Image;f.onload=function(){e.$apply(function(){e.imgStyle["background-image"]='url("'+b+'")',e.imageLoaded=!0;var c=a.innerHeight/a.innerWidth,h=f.height/f.width;if(c>h){var i=Math.min(a.innerWidth,f.width);g(i-d.margin,f.height)}else{var j=Math.min(a.innerHeight,f.height);g(f.width,j-d.margin)}})},f.src=b}function i(a){switch(a.keyCode){case 39:e.$apply(function(){e.nextImage(a)});break;case 37:e.$apply(function(){e.prevImage(a)});break;case 27:e.$apply(function(){e.close()})}}e.dialogSize=e.embedded?{}:{width:"200px",height:"200px"},e.imgSize={},e.imageLoaded=!1,e.close=function(){e.embedded||(e.show=!1,f())},e.prevImage=function(a){a.stopPropagation(),e.onPrev()},e.nextImage=function(a){a.stopPropagation(),e.onNext()},e.$watch(function(){return{url:e.imageUrl(),show:e.show}},function(a){a.show&&a.url&&""!==a.url&&h(a.url)},!0),e.$watch("show",function(a){a?angular.element(b).on("keydown",i):angular.element(b).off("keydown",i)}),e.$on("$destroy",function(){angular.element(b).off("keydown",i)}),f()}}}]),angular.module("mfGalleryApp").directive("containerWidth",["$rootScope","$window","debounce",function(a,b,c){return{scope:{eventName:"@containerWidth"},link:function(d,e){function f(){a.$broadcast(d.eventName,e[0].offsetWidth)}function g(){h()}var h=c(function(){f()},1e3);angular.element(b).on("resize",g),f(),d.$on("$destroy",function(){angular.element(b).off("resize",g),h.cancel()})}}}]),angular.module("mfGalleryApp").directive("galleryItem",function(){return{scope:{image:"=galleryItem",listenOn:"@",url:"@"},template:'<div in-view="inview($inview)" class="gallery-image waiting"></div>',replace:!0,link:function(a,b){function c(){b.css({width:a.image.width+"px",height:a.image.height+"px"}),a.image.break?b.addClass("break"):b.removeClass("break")}function d(){var c=new Image;c.onload=function(){b.removeClass("waiting"),b.css({background:'url("'+a.url+'")',backgroundSize:"cover"})},c.src=a.url}var e=!1;a.inview=function(){e||(e=!0,d())},a.$on(a.listenOn,function(){c()}),c()}}}),angular.module("mfGalleryApp").run(["$templateCache",function(a){a.put("views/footer.tpl.html",'<footer>Mainframe Gallery <a href="https://github.com/ktt-ol/mfGallery">github.com/ktt-ol/mfGallery</a></footer>'),a.put("views/gallery.html",'<div class="mf-gallery"><div class="album" ng-if="!ui.ifsMode"><h1>{{ui.album.meta.name}}</h1><ol class="breadcrumb"><li ng-repeat="item in ui.breadcrumb"><a href="{{item.href}}">{{item.name}}</a></li><li class="active">{{ui.album.meta.name || \'???\' }}</li></ol></div><div class="sub-albums" ng-if="!ui.ifsMode"><ul class="list-inline"><li ng-repeat="sub in ui.album.subDirs" class="thumbnail"><a ng-href="{{makePath(sub)}}"><img ng-if="sub.cover" ng-src="{{makeThumbUrl(sub.cover, \'small\', sub.folder)}}"><div class="no-cover" ng-if="!sub.cover">?</div><div class="caption">{{sub.name || sub.folder}}</div></a></li></ul></div><div class="images"><div class="no-images" ng-if="!ui.album.images.length">Keine Fotos hier :(</div><ul class="list-inline" ng-show="ui.album.images.length" container-width="widthChanged"><li ng-repeat="image in ui.album.images"><a ng-href="#/a/{{ui.relPath}}?i={{image.name}}"><div gallery-item="image" listen-on="widthChanged" url="{{makeThumbUrl(image.name, \'small\')}}"></div></a></li></ul></div><div lightbox="lightbox.imageUrl" show="lightbox.show" prev="prevImg()" next="nextImg()"></div></div><div ng-include="\'views/footer.tpl.html\'"></div>'),a.put("views/ifs.html",'<div class="mf-gallery mf-gallery-ifs"><div class="header-line"><a ng-href="#/a/" class="btn btn-default show-all-button">Alle anzeigen</a> <span class="item-pos pull-right">{{ui.currentIndex + 1}}/{{ui.size}}</span></div><div lightbox="lightbox.imageUrl" show="lightbox.show" prev="prevImg()" next="nextImg()" embedded="true" size-update="lightbox.imgSize"></div><div class="caption row" ng-style="{width: lightbox.imgSize.width}"><div class="time col-xs-6">{{ui.currentImage.exif.time | date:\'medium\' }}</div><div class="name col-xs-6">{{ui.currentImage.name}}</div></div></div><div ng-include="\'views/footer.tpl.html\'"></div>'),a.put("views/lightbox.tpl.html",'<div class="lightbox" ng-show="show" ng-class="{ \'embedded\': embedded, \'lbmodal\': !embedded }"><div class="modal-backdrop fade" ng-class="{ \'in\': show }" ng-if="!embedded"></div><div tabindex="-1" class="fade" ng-class="{ \'in\': show, \'modal\': !embedded }" ng-click="close($event)" onmousedown="return false"><div ng-style="dialogSize" class="dialog" style="margin: auto"><div ng-class="{ \'modal-content\': !embedded }" onmousedown="return false"><div class="image" ng-style="imgStyle"></div></div><div class="navigation" ng-style="imgSize" ng-show="imageLoaded" onmousedown="return false"><div class="nav-left" title="Previous image [ <-- ]"><span class="glyphicon glyphicon-chevron-left" ng-click="prevImage($event)"></span></div><div class="nav-right" title="Next image [ --> ]"><span class="glyphicon glyphicon-chevron-right" ng-click="nextImage($event)"></span></div></div><div class="nav-close" title="Close" ng-if="!embedded"><span class="glyphicon glyphicon-remove" ng-click="close($event)"></span></div></div></div></div>')}]);