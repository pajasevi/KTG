$(function() { // runs after DOM has loaded

  vid_w_orig = parseInt($('video').attr('width'));
  vid_h_orig = parseInt($('video').attr('height'));

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  videos = {
      introVideo : videojs('introVideo'),
      czBlinkVideoOn : videojs('czBlinkVideoOn'),
      czBlinkVideoOff : videojs('czBlinkVideoOff'),
      enBlinkVideoOn : videojs('enBlinkVideoOn'),
      enBlinkVideoOff : videojs('enBlinkVideoOff'),
      enParkVideo : videojs('enParkVideo')
  }

  // Intro video

  videos.introVideo.play();

  videos.introVideo.on('ended', function() {
    KTG.appendFirst();
  });

  // CZ blink videos

  videos.czBlinkVideoOn.on('ended', function() {
    $('#czBlinkVideoOn').fadeOut( 100 );
    $('#czBlinkVideoOff').fadeIn( 100 );
  });

  videos.czBlinkVideoOff.on('ended', function() {
    $('#czBlinkVideoOff').fadeOut( 100, function() {
        videos.czBlinkVideoOn.currentTime( 0 );
        videos.czBlinkVideoOff.currentTime( 0 );
    });
  });

  // EN blink videos

  videos.enBlinkVideoOn.on('ended', function() {
    $('#enBlinkVideoOn').fadeOut( 100 );
    $('#enBlinkVideoOff').fadeIn( 100 );
  });

  videos.enBlinkVideoOff.on('ended', function() {
    $('#enBlinkVideoOff').fadeOut( 100, function() {
        videos.enBlinkVideoOn.currentTime( 0 );
        videos.enBlinkVideoOff.currentTime( 0 );
    });
  });

  // Parking videos

  videos.enParkVideo.on('ended', function() {
    window.location.href += "cz-garage.html";
  });



  // User Events

  // Skip Intro
  $('.skip-intro').on('click', function( event ) {
      event.preventDefault();

      videos.introVideo.pause();
      videos.introVideo.currentTime(45);
      videos.introVideo.play();
  });

  // Mute all sounds
  $('.mute-button').on('click', function( event ) {
      event.preventDefault();

      if( $(this).hasClass('mute-on') ) {
          $.each(videos, function( key, value ) {
              value.muted(true);
          });
          $(this).removeClass('mute-on').addClass('mute-off');
      }
      else {
          $.each(videos, function( key, value ) {
              value.muted(false);
          });
          $(this).removeClass('mute-off').addClass('mute-on');
      }
  });

  $('.lang-link.cz').on('mouseover', function() {
    $('#czBlinkVideoOn').fadeIn( 100 , function() {
      videos.czBlinkVideoOn.play();
    });
  });

  $('.lang-link.cz').on('mouseout', function() {
      videos.czBlinkVideoOff.play();
  });

  $('.lang-link.en').on('mouseover', function() {
    $('#enBlinkVideoOn').fadeIn( 100 , function() {
        videos.enBlinkVideoOn.play();
    });
  });

  $('.lang-link.en').on('mouseout', function() {
    $('#enBlinkVideoOff').fadeIn( 100 , function() {
        videos.enBlinkVideoOff.play();
    });
  });

  $('.lang-link').on('click', function( event ) {
    event.preventDefault();
    $('#enParkVideo').fadeIn( 100 , function() {
        videos.enParkVideo.play();
        KTG.hideFirst();
    });
  });

});
