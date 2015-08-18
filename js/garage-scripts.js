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

  KTG.hashControl = function(hash) {
    if(hash.indexOf('#') > -1) {

      var fetchUrl = hash.substring(hash.indexOf('#') + 1, hash.length);
      $.get(fetchUrl + '.html', function(data) {
        $('.content-inside').html(data);
          var contentTitle = $('.content-inside').find('title').text();

        $('#content-title').text(contentTitle);

        KTG.toggleAll();
      });
    }
  }



  $('.main-menu').on('click', 'a', function( event ) {
      var url = $(this).attr('href');

      KTG.hashControl(url);
  });

  $('.close-content').on('click', function() {
    window.location.hash = '';
    KTG.toggleAll();
  });

  $(window).on('load', function() {
    $('.main-menu a').each(function(index, element) {
      if($(element).attr('href') == window.location.hash) {
        $(element).click();
      }
    });
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
