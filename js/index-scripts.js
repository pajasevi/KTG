$(function() { // runs after DOM has loaded

  vid_w_orig = parseInt($('video').attr('width'));
  vid_h_orig = parseInt($('video').attr('height'));

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  var introVideo = videojs('introVideo'),
      czBlinkVideo = videojs('czBlinkVideo'),
      enBlinkVideo = videojs('enBlinkVideo'),
      enParkVideo = videojs('enParkVideo');


  introVideo.play();

  introVideo.on('ended', function() {
    KTG.appendFirst();
  });

  czBlinkVideo.on('ended', function() {
    $('#czBlinkVideo').fadeOut( 100 );
    czBlinkVideo.currentTime( 0 );
  });

  enBlinkVideo.on('ended', function() {
    $('#enBlinkVideo').fadeOut( 100 );
    enBlinkVideo.currentTime( 0 );
  });

  enParkVideo.on('ended', function() {
    window.location.href += "cz-garage.html";
  });

  $('.lang-link.cz').on('mouseover', function() {
    $('#czBlinkVideo').fadeIn( 100 , function() {
      czBlinkVideo.play();
    });
  });

  $('.lang-link.en').on('mouseover', function() {
    $('#enBlinkVideo').fadeIn( 100 , function() {
      enBlinkVideo.play();
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