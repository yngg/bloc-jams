// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
            { title: 'Blue', duration: '4:26', repeat: 18 },
            { title: 'Green', duration: '3:14', repeat: 13 },
            { title: 'Red', duration: '5:01', repeat: 15 },
            { title: 'Pink', duration: '3:21', repeat: 0 },
            { title: 'Magenta', duration: '2:15', repeat: 73 }
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
            { title: 'Hello, Operator?', duration: '1:01', repeat: 10 },
            { title: 'Ring, ring, ring', duration: '5:01', repeat: 7 },
            { title: 'Fits in your pocket', duration: '3:21', repeat: 20},
            { title: 'Can you hear me now?', duration: '3:14', repeat: 34 },
            { title: 'Wrong phone number', duration: '2:15', repeat: 2}
    ]
};

var createSongRow = function (songNumber, songName, songLength, playTimes) {
    var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '  <td class="song-item-play-times">' + playTimes + '</td>'
      + '</tr>'
      ;
 
    return $(template);
};

var setCurrentAlbum = function(album) {
    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    // #2
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    // #3
    $albumSongList.empty();
    
    // #4
    for(var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration, album.songs[i].repeat);
        $albumSongList.append($newRow);
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var songRows = document.getElementsByClassName('album-view-song-item');

var currentlyPlayingSong = null;
//var findParentByClassName = function(className) {
//        var Elems = document.getElementsByClassName(className);
//        var ElemsParents = [];
//        for(var i=0; i<Elems.length; i++) {
//            ElemsParents.push(Elems[i].parentElement);
//        }
//        return ElemsParents;
//    }

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    
    if(currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if(currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
    } else if(currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="'+currentlyPlayingSong +'"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
};

window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var clickTime = 0;
    albumImage.addEventListener('click', function() {
        if(clickTime%2 === 0) {
            setCurrentAlbum(albumPicasso);
        } else {
            setCurrentAlbum(albumMarconi);
        }
        clickTime++;
    });
    
    songListContainer.addEventListener('mouseover', function(event) {
        // #1
        //console.log(event.target);
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
            // Change the content from the number to the play button's HTML
            //event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
    });
    
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // Revert the content back to the number
//            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
 
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
}
