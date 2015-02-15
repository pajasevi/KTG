$(function() { // runs after DOM has loaded

  vid_w_orig = parseInt($('video').attr('width'));
  vid_h_orig = parseInt($('video').attr('height'));

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  var introVideo = videojs('introVideo'),
      czBlinkVideoOn = videojs('czBlinkVideoOn'),
      czBlinkVideoOff = videojs('czBlinkVideoOff'),
      enBlinkVideoOn = videojs('enBlinkVideoOn'),
      enBlinkVideoOff = videojs('enBlinkVideoOff'),
      enParkVideo = videojs('enParkVideo');

  // Intro video

  introVideo.play();

  introVideo.on('ended', function() {
    KTG.appendFirst();
  });

  // CZ blink videos

  czBlinkVideoOn.on('ended', function() {
    $('#czBlinkVideoOn').fadeOut( 100 );
    $('#czBlinkVideoOff').fadeIn( 100 );
  });

  czBlinkVideoOff.on('ended', function() {
    $('#czBlinkVideoOff').fadeOut( 100, function() {
        czBlinkVideoOn.currentTime( 0 );
        czBlinkVideoOff.currentTime( 0 );
    });
  });

  // EN blink videos

  enBlinkVideoOn.on('ended', function() {
    $('#enBlinkVideoOn').fadeOut( 100 );
    $('#enBlinkVideoOff').fadeIn( 100 );
  });

  enBlinkVideoOff.on('ended', function() {
    $('#enBlinkVideoOff').fadeOut( 100, function() {
        enBlinkVideoOn.currentTime( 0 );
        enBlinkVideoOff.currentTime( 0 );
    });
  });

  // Parking videos

  enParkVideo.on('ended', function() {
    window.location.href += "cz-garage.html";
  });



  // User Events

  $('.lang-link.cz').on('mouseover', function() {
    $('#czBlinkVideoOn').fadeIn( 100 , function() {
      czBlinkVideoOn.play();
    });
  });

  $('.lang-link.cz').on('mouseout', function() {
    czBlinkVideoOff.play();
  });

  $('.lang-link.en').on('mouseover', function() {
    $('#enBlinkVideoOn').fadeIn( 100 , function() {
      enBlinkVideoOn.play();
    });
  });

  $('.lang-link.en').on('mouseout', function() {
    $('#enBlinkVideoOff').fadeIn( 100 , function() {
      enBlinkVideoOff.play();
    });
  });

  $('.lang-link').on('click', function( event ) {
    event.preventDefault();
    $('#enParkVideo').fadeIn( 100 , function() {
      enParkVideo.play();
      KTG.hideFirst();
    });
  });

});
