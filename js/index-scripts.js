$(function() { // runs after DOM has loaded

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  KTG.videos = {
      introVideo : videojs('introVideo'),
      czBlinkVideoOn : videojs('czBlinkVideoOn'),
      czBlinkVideoOff : videojs('czBlinkVideoOff'),
      enBlinkVideoOn : videojs('enBlinkVideoOn'),
      enBlinkVideoOff : videojs('enBlinkVideoOff'),
      enParkVideo : videojs('enParkVideo')
  }

  KTG.bindUserEvents = function() {
      $('.lang-link').on('click', function( event ) {
        event.preventDefault();
        $('#enParkVideo').fadeIn( 100 , function() {
            KTG.videos.enParkVideo.play();
            KTG.hideFirst();
        });
      });
  }

  KTG.bindMouseoverEvents = function() {
      $('.lang-link.cz').on('mouseover', function() {
        $('#czBlinkVideoOn').fadeIn( 100 , function() {
            KTG.unbindUserEvents();
            KTG.videos.czBlinkVideoOn.play();
        });
      });

      $('.lang-link.en').on('mouseover', function() {
        $('#enBlinkVideoOn').fadeIn( 100 , function() {
            KTG.unbindUserEvents();
            KTG.videos.enBlinkVideoOn.play();
        });
      });
  }

  KTG.bindMouseoutEvents = function() {
      $('.lang-link.cz').on('mouseout', function() {
          KTG.videos.czBlinkVideoOff.play();
      });

      $('.lang-link.en').on('mouseout', function() {
        $('#enBlinkVideoOff').fadeIn( 100 , function() {
            KTG.videos.enBlinkVideoOff.play();
        });
      });

  }

  KTG.unbindUserEvents = function() {
      $('.lang-link.cz, .lang-link.en').off('mouseover');
      $('.lang-link.cz, .lang-link.en').off('mouseout');
  }

  // Intro video

  KTG.videos.introVideo.play();

  KTG.videos.introVideo.on('ended', function() {
    KTG.appendFirst();
  });

  // CZ blink videos

  KTG.videos.czBlinkVideoOn.on('ended', function() {
    KTG.bindMouseoutEvents();
    $('#czBlinkVideoOn').fadeOut( 100 );
    $('#czBlinkVideoOff').fadeIn( 100 );
  });

  KTG.videos.czBlinkVideoOff.on('ended', function() {
    $('#czBlinkVideoOff').fadeOut( 100, function() {
        KTG.bindMouseoverEvents();
        KTG.videos.czBlinkVideoOn.currentTime( 0 );
        KTG.videos.czBlinkVideoOff.currentTime( 0 );
    });
  });

  // EN blink videos

  KTG.videos.enBlinkVideoOn.on('ended', function() {
    KTG.bindMouseoutEvents();
    $('#enBlinkVideoOn').fadeOut( 100 );
    $('#enBlinkVideoOff').fadeIn( 100 );
  });

  KTG.videos.enBlinkVideoOff.on('ended', function() {
    $('#enBlinkVideoOff').fadeOut( 100, function() {
        KTG.bindMouseoverEvents();
        KTG.videos.enBlinkVideoOn.currentTime( 0 );
        KTG.videos.enBlinkVideoOff.currentTime( 0 );
    });
  });

  // Parking videos

  KTG.videos.enParkVideo.on('ended', function() {
    window.location.href += "cz-garage.html";
  });



  // User Events

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
          $.each(KTG.videos, function( key, value ) {
              value.muted(true);
          });
          $(this).removeClass('mute-on').addClass('mute-off');
      }
      else {
          $.each(KTG.videos, function( key, value ) {
              value.muted(false);
          });
          $(this).removeClass('mute-off').addClass('mute-on');
      }
  });

  KTG.bindUserEvents();
  KTG.bindMouseoverEvents();
  KTG.bindMouseoutEvents();

});
