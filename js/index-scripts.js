$(function() { // runs after DOM has loaded

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  if(Modernizr.video && !KTG.isMobile()) {
    KTG.videos = {
        introVideo : videojs('introVideo'),
        czBlinkVideoOn : videojs('czBlinkVideoOn'),
        czBlinkVideoOff : videojs('czBlinkVideoOff'),
        enBlinkVideoOn : videojs('enBlinkVideoOn'),
        enBlinkVideoOff : videojs('enBlinkVideoOff'),
        czParkVideo : videojs('czParkVideo'),
        enParkVideo : videojs('enParkVideo')
    }

    // Functions for sound control

    KTG.muteSound = function() {
        $.each(KTG.videos, function( key, value ) {
            value.muted(true);
            $('.mute-button').removeClass('mute-on').addClass('mute-off');
        });
    }

    KTG.unMuteSound = function() {
        $.each(KTG.videos, function( key, value ) {
            value.muted(false);
            $('.mute-button').removeClass('mute-off').addClass('mute-on');
        });
    }

    KTG.checkMute = function() {
        if($.cookie('muted') == 'true') {
            KTG.muteSound();
        }
    }

    KTG.state = "off";

    // Intro video

    KTG.videos.introVideo.play();
    KTG.checkMute();

    KTG.videos.introVideo.on('ended', function() {
      KTG.appendFirst();
    });

    // User hover events

    $(document).on('mouseover', function (event) {
      var target = $(event.target);

      if (target.hasClass('lang-link cz') && KTG.state == "off") { // hover on CZ car
        $('#czBlinkVideoOn').fadeIn( 100 , function() {
          KTG.videos.czBlinkVideoOn.play();
          KTG.state = "cz-blink-on";
        });
      }

      if (target.hasClass('lang-link en') && KTG.state == "off") { // hover on EN car
        $('#enBlinkVideoOn').fadeIn( 100 , function() {
          KTG.videos.enBlinkVideoOn.play();
          KTG.state = "en-blink-on";
        });
      }

      if(target.hasClass('first-ended no-controls') && KTG.state == "cz-blink-off") {
        KTG.videos.czBlinkVideoOff.play();
      }

      if(target.hasClass('first-ended no-controls') && KTG.state == "en-blink-off") {
        KTG.videos.enBlinkVideoOff.play();
      }
    });


    // CZ blink videos

    KTG.videos.czBlinkVideoOn.on('ended', function() {
      $('#czBlinkVideoOn').fadeOut( 100 );
      $('#czBlinkVideoOff').fadeIn( 100 );
      KTG.state = "cz-blink-off";
      KTG.videos.czParkVideo.currentTime(1);
    });

    KTG.videos.czBlinkVideoOff.on('ended', function() {
      $('#czBlinkVideoOff').fadeOut( 100, function() {
          KTG.videos.czBlinkVideoOn.currentTime( 0 );
          KTG.videos.czBlinkVideoOff.currentTime( 0 );
          KTG.state = "off";
          KTG.videos.czParkVideo.currentTime(0);
      });
    });

    // EN blink videos

    KTG.videos.enBlinkVideoOn.on('ended', function() {
      $('#enBlinkVideoOn').fadeOut( 100 );
      $('#enBlinkVideoOff').fadeIn( 100 );
      KTG.state = "en-blink-off";
      KTG.videos.enParkVideo.currentTime(1);
    });

    KTG.videos.enBlinkVideoOff.on('ended', function() {
      $('#enBlinkVideoOff').fadeOut( 100, function() {
          KTG.videos.enBlinkVideoOn.currentTime( 0 );
          KTG.videos.enBlinkVideoOff.currentTime( 0 );
          KTG.state = "off";
          KTG.videos.enParkVideo.currentTime(0);
      });
    });

    // Parking videos on click

    $('.lang-link.cz').on('click', function( event ) {
      event.preventDefault();
      $('#czParkVideo').fadeIn( 100 , function() {
          KTG.videos.czParkVideo.play();
          KTG.hideFirst();
          KTG.state = "park-video";
      });
    });

    $('.lang-link.en').on('click', function( event ) {
      event.preventDefault();
      $('#enParkVideo').fadeIn( 100 , function() {
          KTG.videos.enParkVideo.play();
          KTG.hideFirst();
          KTG.state = "park-video";
      });
    });

    // Parking videos events

    KTG.videos.czParkVideo.on('ended', function() {
      window.location.href += "cz/";
    });

    KTG.videos.enParkVideo.on('ended', function() {
      window.location.href += "en/";
    });

  }
  else {
    $('#video-wrap').remove();
    $('html').addClass('video-declined');
    $('.mute-button').remove();
    KTG.videoDeclined = true;
    KTG.appendFirst();

    $('.lang-link.cz').on('click', function( event ) {
      event.preventDefault();
      window.location.href += "cz/";
    });

    $('.lang-link.en').on('click', function( event ) {
      event.preventDefault();
      window.location.href += "en/";
    });

    $('.lang-link.cz').on('mouseover', function( event ) {
      $('html').addClass('cz');
    });

    $('.lang-link.cz').on('mouseout', function( event ) {
      $('html').removeClass('cz');
    });

    $('.lang-link.en').on('mouseover', function( event ) {
      $('html').addClass('en');
    });

    $('.lang-link.en').on('mouseout', function( event ) {
      $('html').removeClass('en');
    });
  }


  // User Events

  // CZ tooltip hover

  $('.lang-link.cz').on('mouseover', function() {
      $('.tooltip.cz').animate({
          opacity: 1,
          top: "-=10"
      }, 300);
  });

  $('.lang-link.cz').on('mouseout', function() {
      $('.tooltip.cz').animate({
          opacity: 0,
          top: "+=10"
      }, 300);
  });

  // EN tooltip hover

  $('.lang-link.en').on('mouseover', function() {
      $('.tooltip.en').animate({
          opacity: 1,
          top: "-=10"
      }, 300);
  });

  $('.lang-link.en').on('mouseout', function() {
      $('.tooltip.en').animate({
          opacity: 0,
          top: "+=10"
      }, 300);
  });

  // Skip Intro
  $('.skip-intro').on('click', function( event ) {
      event.preventDefault();

      KTG.videos.introVideo.pause();
      KTG.videos.introVideo.currentTime(50);
      KTG.videos.introVideo.play();
  });

  // Mute all sounds
  $('.mute-button').on('click', function( event ) {
      event.preventDefault();

      if( $(this).hasClass('mute-on') ) {
          KTG.muteSound();
          $.cookie('muted', 'true');
      }
      else {
          KTG.unMuteSound();
          $.cookie('muted', 'false');
      }
  });

});
