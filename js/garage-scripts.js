$(function() { // runs after DOM has loaded

  vid_w_orig = parseInt($('video').attr('width'));
  vid_h_orig = parseInt($('video').attr('height'));

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  KTG.toggleMenu = function( callback ) {
      $('.sidebar').animate({
          width: 'toggle',
          opacity: 'toggle'
      });

      $('.overlay').animate({
          opacity: 'toggle'
      }, 400, callback );
  }

  KTG.toggleContent = function( callback ) {
      $('.content').animate({
          opacity: 'toggle'
      }, 400, callback)
  }

  KTG.toggleAll = function() {
      if($('.content').is(':visible')) {
          KTG.toggleContent(function() {
             KTG.toggleMenu();
          });
      }
      else {
          KTG.toggleMenu(function() {
              KTG.toggleContent();
          });
      }
  }



  $('.main-menu').on('click', 'a', function( event ) {
      if($(this).attr('href').indexOf('#') > -1) {
          event.preventDefault();
          KTG.toggleAll();
      }
  });

  $('.close-content').on('click', function() {
      KTG.toggleAll();
  });

  $('.content').perfectScrollbar();

  if(Modernizr.video && !KTG.isMobile() && !($.cookie('no-video', Boolean))) {

    var garageVideo = videojs('garageVideo');

    garageVideo.play();

    garageVideo.on('ended', function() {
        KTG.toggleMenu();
    });
  }
  else {
    $('#video-wrap').remove();
    KTG.toggleMenu();
  }

});
