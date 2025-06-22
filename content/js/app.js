const $ = document;

const audio = $.getElementById("audio")
const cardElem = $.querySelector(".card");
const musicCover = $.querySelector(".music-cover");
const onImgPlayElem = $.querySelector(".on-img-play");
const repeatElem = $.getElementById("repeat");
const backElem = $.getElementById("back");
const pauseElem = $.getElementById("pause");
const nextElem = $.getElementById("next");
const shuffleElem = $.getElementById("shuffle");
const playListBtn = $.querySelector(".playlist-btn");
const playlistContainer = $.querySelector(".playlist-container");
const tracksContainer = $.querySelector(".tracks-container");

let mainMusicList = [
    {
        name: "yadet nareya",
        artist: "Poori",
        cover: "content/cover/yadet-Nare.jpg",
        music: "content/musices/yadet-nare.mp3",
    },
    {
        name: "Bedoone to",
        artist: "Sirvan Khosravi",
        cover: "content/cover/Bedoone-To.jpg",
        music: "content/musices/Bedoon-TO.mp3",
    },
    {
        name: "ghatle amd",
        artist: "Dorcci",
        cover: "content/cover/ghatle_amd.jpg",
        music: "content/musices/Ghatle-Amd.mp3",
    },
    {
        name: "Midooni in donya",
        artist: "Sogand ",
        cover: "content/cover/Midooni-In-Donya.jpg",
        music: "content/musices/Midooni-In-Donya.mp3",
    },
    {
        name: "nvazesh",
        artist: "Tataloo",
        cover: "content/cover/nvazesh.jpg",
        music: "content/musices/navazesh.mp3",
    },
];

let musicList = mainMusicList.slice();

var currentMusicIndex = { value: 0 };

onImgPlayElem.addEventListener("click", () => {
    audio.play();
    cardElem.classList.add("playing");
    paused = false;
});

paused = false;
pauseElem.addEventListener("click", () => {
    if (paused) {
        audio.play();
        cardElem.classList.add("playing");
        paused = false;
    } else {
        audio.pause();
        cardElem.classList.remove("playing");
        paused = true;
    };
});

backElem.addEventListener("click", () => {
    if (currentMusicIndex.value == 0) {
        currentMusicIndex.value = musicList.length - 1;
    } else {
        currentMusicIndex.value--;
        
    }
    audio.src = musicList[currentMusicIndex.value].music;
    musicCover.src = musicList[currentMusicIndex.value].cover;
    audio.currentTime = 0;
    audio.play();
    refreshPlaylist()           
});

nextElem.addEventListener("click", () => {
    currentMusicIndex.value++;
    if (currentMusicIndex.value == musicList.length) {
        currentMusicIndex.value = 0;
    }
    audio.src = musicList[currentMusicIndex.value].music;
    musicCover.src = musicList[currentMusicIndex.value].cover;
    audio.currentTime = 0;
    audio.play();
    refreshPlaylist()
});

let loopFlage = true;
repeatElem.addEventListener("click", () => {
    $.querySelector('.on-repeat').classList.toggle('!block');
    audio.loop = !audio.loop;
    loopFlage = !loopFlage;
});

audio.addEventListener("ended", () => {
    if (loopFlage) {
        currentMusicIndex.value++;
        if (currentMusicIndex.value == musicList.length) {
            currentMusicIndex.value = 0;   
        };
        audio.src = musicList[currentMusicIndex.value].music;
        musicCover.src = musicList[currentMusicIndex.value].cover;
        audio.currentTime = 0;
        audio.play();
    };
});

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    };
    currentMusicIndex.value = -1;
};

let flag = true;
shuffleElem.addEventListener("click", () => {
    shuffleElem.classList.toggle('animated');
    shuffleElem.classList.toggle('closeAnimates');
    if (flag) {
        shuffle(musicList);
        flag = false;
    } else {
        musicList = mainMusicList.slice();
        flag = true;
    };
    refreshPlaylist();
});

function refreshPlaylist() {
    tracksContainer.innerHTML = "";
    musicList.forEach((item , index) => {
        tracksContainer.innerHTML += `
        <div class="track w-full h-20 flex justify-start items-center gap-3 border-b-2 p-3 group cursor-pointer" detaset-index="${index}">
            <div class="relative">
                <div class="rounded-full overflow-hidden">
                    <img src="${item.cover}" alt="cover" class="w-16 h-16 bg-cover group-hover:brightness-50 duration-700">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-gray-300 absolute left-4 top-4 size-8 opacity-0 group-hover:opacity-100 duration-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </div>
            <div class="flex flex-col justify-center items-start gap-1">
                <span class="text-sm font-bold">${item.name}</span>
                <span class="text-xs text-gray-500">${item.artist}</span>
            </div>
        </div>`;
    });

    const tracks = $.querySelectorAll(".track");
    tracks.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentMusicIndex.value = index;
            audio.src = musicList[currentMusicIndex.value].music;
            musicCover.src = musicList[currentMusicIndex.value].cover;
            audio.currentTime = 0;
            audio.play();
            tracks.forEach((item) =>{
                item.firstElementChild.firstElementChild.firstElementChild.classList.remove('brightness-50');
                item.firstElementChild.lastElementChild.classList.remove('!opacity-100');
            })
            item.firstElementChild.firstElementChild.firstElementChild.classList.add('brightness-50');
            item.firstElementChild.lastElementChild.classList.add('!opacity-100');       
        });

        if(currentMusicIndex.value >= 0) {
            if (item.lastElementChild.firstElementChild.innerHTML == musicList[currentMusicIndex.value].name) {
                item.firstElementChild.firstElementChild.firstElementChild.classList.add('brightness-50');
                item.firstElementChild.lastElementChild.classList.add('!opacity-100');
            };
        }
    });
};

playListBtn.addEventListener("click", () => {
    refreshPlaylist();
    playListBtn.classList.toggle("*:w-full");
    playlistContainer.classList.toggle('!left-0');
});
