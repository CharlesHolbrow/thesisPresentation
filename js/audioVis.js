'use strict';

// Create an instance
var wavesurfer = Object.create(WaveSurfer);
var analyser;

document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : document.querySelector('#waveform'),
        waveColor     : 'violet',
        progressColor : 'purple',
        loaderColor   : 'purple',
        cursorColor   : 'navy'
    };

    if (location.search.match('scroll')) {
        options.minPxPerSec = 100;
        options.scrollParent = true;
    }

    if (location.search.match('normalize')) {
        options.normalize = true;
    }

    // Init
    wavesurfer.init(options);
    // Load audio from URL
    wavesurfer.load('demo.wav');

});

// Play at once when ready
// Won't work on iOS until you touch the page
wavesurfer.on('ready', function () {
    //wavesurfer.play();
});

// Report errors
wavesurfer.on('error', function (err) {
    console.error(err);
});

// Do something when the clip is over
wavesurfer.on('finish', function () {
    console.log('Finished playing');
});


/* Progress bar */
document.addEventListener('DOMContentLoaded', function () {
    var progressDiv = document.querySelector('#progress-bar');
    var progressBar = progressDiv.querySelector('.progress-bar');

    var showProgress = function (percent) {
        progressDiv.style.display = 'block';
        progressBar.style.width = percent + '%';
    };

    var hideProgress = function () {
        progressDiv.style.display = 'none';
    };

    wavesurfer.on('loading', showProgress);
    wavesurfer.on('ready', hideProgress);
    wavesurfer.on('destroy', hideProgress);
    wavesurfer.on('error', hideProgress);

    var playButton = document.querySelector('#play-button');
    playButton.onclick = function(){
        wavesurfer.playPause();
    }

});
