var KTG = {};
var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

KTG.resizeToCover = function() {

    // set the video viewport to the window size
    $('#video-wrap').width($(window).width());
    $('#video-wrap').height($(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = $(window).width() / vid_w_orig;
    var scale_v = $(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    $('video').width(scale * vid_w_orig);
    $('video').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    $('#video-wrap').scrollLeft(($('video').width() - $(window).width()) / 2);
    $('#video-wrap').scrollTop(($('video').height() - $(window).height()) / 2);
};

KTG.appendFirst = function() {
  $('body').addClass('first-ended');
};

KTG.hideFirst = function() {
  $('body').removeClass('first-ended');
};
