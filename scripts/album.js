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
 
    return template;
};

var setCurrentAlbum = function(album) {
    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    // #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    // #3
    albumSongList.innerHTML = '';
    
    // #4
    for(var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration, album.songs[i].repeat);
    }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var songRows = document.getElementsByClassName('album-view-song-item');

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
            // Change the content from the number to the play button's HTML
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
    });
    
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // Revert the content back to the number
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        });
    }
}
