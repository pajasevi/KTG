$(function(){if($(window).resize(function(){KTG.resizeToCover()}),$(window).trigger("resize"),Modernizr.video&&!KTG.isMobile()&&"true"!=$.cookie("no-video")){$.cookie("no-video","false",{path:"/"}),KTG.VideoController=function(){return{pushState:this.pushState}};var e=new KTG.VideoController;e.pushState("intros")}});