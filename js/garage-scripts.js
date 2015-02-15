$(function() { // runs after DOM has loaded

  vid_w_orig = parseInt($('video').attr('width'));
  vid_h_orig = parseInt($('video').attr('height'));

  $(window).resize(function () { KTG.resizeToCover(); });
  $(window).trigger('resize');

  var garageVideo = videojs('garageVideo');

  garageVideo.play();

  garageVideo.on('ended', function() {
      $('.sidebar').animate({
          width: 'toggle',
          opacity: 'toggle'
      });

      $('.overlay').fadeIn();
  });

});
