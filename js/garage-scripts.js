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
      var url = $(this).attr('href');

      if(url.indexOf('#') > -1) {
          event.preventDefault();

          var fetchUrl = url.substring(url.indexOf('#') + 1, url.length);
          $.get(fetchUrl + '.html', function(data) {
            $('.content-inside').html(data);
            $('#content-title').text($('.content-inside').find('title').text());
            KTG.toggleAll();
          });
      }
  });

  $('.close-content').on('click', function() {
      KTG.toggleAll();
  });

  $('.content').perfectScrollbar();

  if(Modernizr.video && !KTG.isMobile() && $.cookie('no-video') != true) {

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
