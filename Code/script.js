class Music {
    constructor(title, musicLink, backgroundLink) {
        this.title = title;
        this.musicLink = musicLink;
        this.backgroundLink =backgroundLink;
    }
}

let allMusic = [
    new Music("~", "GIGA.mp3", "backgroundRainyGif.gif")
];

let currentPlaylist = [
    allMusic[0]
];

let currentIndex = 0;

let progressInterval;
let currentProgress = 0.0;


var r = document.querySelector(":root");

function SwitchToNextMusic() {
    let music = currentPlaylist[currentIndex];
    
    let audio = document.getElementById("audio");
    audio.src = "../Music/" + music.musicLink;
    audio.load();
    audio.volume = 0.1;
    audio.play();

    clearInterval(progressInterval);

    audio.addEventListener("loadedmetadata", (event) => {
        let duration = audio.duration;
        
        progressInterval = setInterval(() => {
            if(!paused) {
                currentProgress += 0.01/duration;
            }
            if(currentProgress > 1) {
            
                currentProgress = 0;
            }
            else if(currentProgress < 0.01) {
                currentProgress = 0.01;
            }

            
            document.getElementById("progress").style.width = (currentProgress * 100) + "%";
        }, 10);
        
        //...
    });

    currentIndex = (currentIndex >= currentPlaylist.length - 1) ? 0 : currentPlaylist + 1;
}

let paused = false;
function Toggle() {
    au = document.getElementById("audio");
    if(paused) {
        au.play();
        paused = false;
    }
    else {
        au.pause();
        paused = true;
    }

}

function ResetProgressWidth() {
    document.getElementById("progress").style.widows = "0%";
}

function keydown(ev) {
    
    if(ev.keyCode == 32) {
        Toggle();
    }
}