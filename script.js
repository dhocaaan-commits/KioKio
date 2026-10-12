/* =========================================================
   SCALING
   KIOKIO - HP & LAPTOP
   Ukuran dasar: 430 x 900
========================================================= */

function fitFrame() {
  const frame = document.getElementById('frame');

  if (!frame) return;

  const isLaptop = window.innerWidth >= 768;

  if (isLaptop) {
    // Tampilan laptop memenuhi browser
    frame.style.position = 'fixed';
    frame.style.left = '0';
    frame.style.top = '0';
    frame.style.width = '100vw';
    frame.style.height = '100dvh';
    frame.style.transform = 'none';
  } else {
    // Tampilan HP mempertahankan proporsi game
    const baseWidth = 430;
    const baseHeight = 900;

    const scale = Math.min(
      (window.innerWidth - 16) / baseWidth,
      (window.innerHeight - 16) / baseHeight
    );

    frame.style.position = 'fixed';
    frame.style.left = '50%';
    frame.style.top = '50%';
    frame.style.width = baseWidth + 'px';
    frame.style.height = baseHeight + 'px';
    frame.style.transform =
      `translate(-50%, -50%) scale(${scale})`;
  }
}


/* Saat ukuran browser berubah */

window.addEventListener(
  'resize',
  fitFrame
);


/* Saat HP diputar */

window.addEventListener(
  'orientationchange',
  () => {

    setTimeout(
      fitFrame,
      100
    );

  }
);


/* Saat halaman pertama kali dibuka */

window.addEventListener(
  'load',
  fitFrame
);


/* Jalankan langsung */

fitFrame();


/* =========================================================
   DATA GAME
========================================================= */

const COLORS = [
  'var(--green)',
  'var(--coral)',
  'var(--blue)'
];

const PLANTS = [
  '🌱',
  '🌿',
  '🌷',
  '🌼',
  '🌻',
  '🌳',
  '🍀',
  '🌸'
];


/* =========================================================
   ICON / ILUSTRASI
========================================================= */

const ICONS = {
  A: '<img src="images/ayam.jpg" alt="Ayam">',
  B: '<img src="images/bola.jpg" alt="Bola">',
  G: '<img src="images/gajah.jpg" alt="Gajah">',
  I: '<img src="images/ikan.jpg" alt="Ikan">',
  K: '<img src="images/kucing.jpg" alt="Kucing">',
  M: '<img src="images/mobil.jpg" alt="Mobil">',
  O: '<img src="images/ombak.jpg" alt="Ombak">',
  P: '<img src="images/panda.jpg" alt="Panda">',
  S: '<img src="images/sapi.jpg" alt="Sapi">',
  U: '<img src="images/ular.jpg" alt="Ular">',
  Z: '<img src="images/zebra.jpg" alt="Zebra">'
};


/* =========================================================
   LETTER DATA
========================================================= */

const LETTERS = [

  {
    l: 'A',
    word: 'Ayam'
  },

  {
    l: 'B',
    word: 'Bola'
  },

  {
    l: 'G',
    word: 'Gajah'
  },

  {
    l: 'I',
    word: 'Ikan'
  },

  {
    l: 'K',
    word: 'Kucing'
  },

  {
    l: 'M',
    word: 'Mobil'
  },

  {
    l: 'O',
    word: 'Ombak'
  },

  {
    l: 'P',
    word: 'Panda'
  },

  {
    l: 'S',
    word: 'Sapi'
  },

  {
    l: 'U',
    word: 'Ular'
  },

  {
    l: 'Z',
    word: 'Zebra'
  }

];


const MAX_LIVES = 3;

const WIN_TARGET = 10;


/* =========================================================
   GAME VARIABLES
========================================================= */

let correctCount = 0;

let currentLetter = null;

let lastLetter = null;

let usedLetters = [];

let usedAnswerSets = [];

let score = 0;

let lives = MAX_LIVES;

let locked = false;


/* =========================================================
   DATA PEMAIN
========================================================= */

let playerName = '';

let playerAge = '';


/* =========================================================
   INTRO
========================================================= */

function showIntro(){

  showScreen('screen-intro');

  const nameInput =
    document.getElementById(
      'playerName'
    );

  const ageDisplay =
    document.getElementById(
      'ageDisplay'
    );

  const agePopup =
    document.getElementById(
      'agePopup'
    );


  if(nameInput){

    nameInput.value = '';

    nameInput.placeholder =
      'Tulis namamu...';

  }


  playerAge = '';


  if(ageDisplay){

    ageDisplay.innerHTML = `
      <span>Pilih umur</span>
      <span>▼</span>
    `;

  }


  if(agePopup){

    agePopup.classList.remove(
      'show'
    );

  }


  document
    .querySelectorAll('.age-option')
    .forEach(option => {

      option.classList.remove(
        'selected'
      );

    });

}


/* =========================================================
   POP-UP UMUR
========================================================= */

const ageDisplay =
  document.getElementById(
    'ageDisplay'
  );

const agePopup =
  document.getElementById(
    'agePopup'
  );


if(ageDisplay && agePopup){

  ageDisplay.addEventListener(
    'click',
    () => {

      agePopup.classList.toggle(
        'show'
      );

    }
  );

}


document
  .querySelectorAll('.age-option')
  .forEach(option => {

    option.addEventListener(
      'click',
      () => {

        playerAge =
          option.dataset.age;


        if(ageDisplay){

          ageDisplay.innerHTML = `
            <span>${playerAge} Tahun</span>
            <span>▼</span>
          `;

        }


        document
          .querySelectorAll('.age-option')
          .forEach(btn => {

            btn.classList.remove(
              'selected'
            );

          });


        option.classList.add(
          'selected'
        );


        if(agePopup){

          agePopup.classList.remove(
            'show'
          );

        }

      }
    );

  });


/* =========================================================
   VOICE SYSTEM
========================================================= */

const NEURAL_HINTS =
  /online|natural|neural/i;

const FEMALE_NAME_HINTS =
  /female|wanita|perempuan|zira|samantha|karen|susan|victoria|allison|ayu|siti|dewi|putri|gadis|google/i;

const MALE_NAME_HINTS =
  /male|pria|laki|david|daniel|fred|alex\b|mark|tom\b|ardi\b/i;


let allVoices = [];

let chosenVoice = null;


/* =========================================================
   VOICE SELECT
========================================================= */

function populateVoiceSelect(){

  const sel =
    document.getElementById(
      'voiceSelect'
    );


  if(!sel) return;


  sel.innerHTML = '';


  if(!allVoices.length){

    const opt =
      document.createElement(
        'option'
      );

    opt.textContent =
      'Suara tidak tersedia di browser ini';

    sel.appendChild(opt);

    return;

  }


  allVoices.forEach(
    (v, i) => {

      const opt =
        document.createElement(
          'option'
        );

      opt.value = i;

      opt.textContent =
        `${v.name} (${v.lang})`;

      sel.appendChild(opt);

    }
  );


  const currentIdx =
    allVoices.indexOf(
      chosenVoice
    );


  if(currentIdx >= 0){

    sel.value =
      currentIdx;

  }


  sel.onchange = () => {

    chosenVoice =
      allVoices[
        sel.value
      ];

  };

}


/* =========================================================
   PILIH SUARA
========================================================= */

function pickVoice(manualReload){

  if(
    !('speechSynthesis' in window)
  ){

    return;

  }


  const voices =
    window.speechSynthesis
      .getVoices();


  if(!voices.length) return;


  allVoices =
    voices;


  const idVoices =
    voices.filter(
      v =>
        v.lang &&
        v.lang
          .toLowerCase()
          .startsWith('id')
    );


  const pool =
    idVoices.length
      ? idVoices
      : voices;


  const neuralFemale =
    pool.find(
      v =>
        NEURAL_HINTS.test(
          v.name
        ) &&
        FEMALE_NAME_HINTS.test(
          v.name
        ) &&
        !MALE_NAME_HINTS.test(
          v.name
        )
    );


  const neuralAny =
    pool.find(
      v =>
        NEURAL_HINTS.test(
          v.name
        ) &&
        !MALE_NAME_HINTS.test(
          v.name
        )
    );


  const femaleMatch =
    pool.find(
      v =>
        FEMALE_NAME_HINTS.test(
          v.name
        ) &&
        !MALE_NAME_HINTS.test(
          v.name
        )
    );


  const notMaleMatch =
    pool.find(
      v =>
        !MALE_NAME_HINTS.test(
          v.name
        )
    );


  chosenVoice =
    neuralFemale ||
    neuralAny ||
    femaleMatch ||
    notMaleMatch ||
    pool[0];


  populateVoiceSelect();


  if(manualReload){

    testVoice();

  }

}


/* =========================================================
   LOAD VOICES
========================================================= */

if(
  'speechSynthesis' in window
){

  pickVoice();


  window.speechSynthesis
    .onvoiceschanged =
      () => {

        pickVoice(false);

      };

}


/* =========================================================
   TEST VOICE
========================================================= */

function testVoice(){

  speak(
    'Halo! Aku KioKio, ayo main dan kenal huruf bersama!'
  );

}


/* =========================================================
   SPEAK
========================================================= */

function speak(text){

  if(
    !('speechSynthesis' in window)
  ){

    return;

  }


  window.speechSynthesis.cancel();


  const isNeural =
    chosenVoice &&
    NEURAL_HINTS.test(
      chosenVoice.name
    );


  const BASE_PITCH =
    isNeural
      ? 1.15
      : 1.65;


  const BASE_RATE =
    isNeural
      ? 1.0
      : 0.98;


  const chunks =
    isNeural
      ? [text]
      : text
          .split(',')
          .map(
            s => s.trim()
          )
          .filter(Boolean);


  function speakChunk(i){

    if(
      i >= chunks.length
    ){

      return;

    }


    const u =
      new SpeechSynthesisUtterance(
        chunks[i]
      );


    u.lang =
      'id-ID';


    u.rate =
      BASE_RATE +
      (
        Math.random() * 0.06 -
        0.03
      );


    u.pitch =
      BASE_PITCH +
      (
        Math.random() * 0.12 -
        0.06
      );


    if(chosenVoice){

      u.voice =
        chosenVoice;

    }


    u.onend = () => {

      setTimeout(
        () =>
          speakChunk(i + 1),
        90
      );

    };


    window.speechSynthesis
      .speak(u);

  }


  speakChunk(0);

}


/* =========================================================
   AUDIO MP3
========================================================= */

const AUDIO_BASE =
  'audio/';


/* =========================================================
   BACKGROUND MUSIC / BGM
========================================================= */

const bgm =
  new Audio(
    'audio/bgm.mp3'
  );


bgm.loop = true;


/*
  Volume BGM
  0.15 = 15%
*/

bgm.volume = 0.13;


/* =========================================================
   PLAY BGM
========================================================= */

function playBGM(){

  bgm.play()
    .then(() => {

      console.log(
        'BGM berhasil diputar'
      );

    })
    .catch(error => {

      console.log(
        'BGM menunggu interaksi pengguna:',
        error
      );

    });

}


/* =========================================================
   STOP BGM
========================================================= */

function stopBGM(){

  bgm.pause();

  bgm.currentTime = 0;

}


/* =========================================================
   PAUSE BGM
========================================================= */

function pauseBGM(){

  bgm.pause();

}


/* =========================================================
   AUDIO LETTERS
========================================================= */

const AUDIO_LETTERS = [
  'A',
  'B',
  'G',
  'I',
  'K',
  'M',
  'P',
  'S',
  'U',
  'Z'
];


const audioCache = {};


/* =========================================================
   NAMA FILE AUDIO
========================================================= */

function getAudioFile(key){

  const parts =
    key.split('_');

  const type =
    parts[0];

  const letter =
    parts[1];


  if(type === 'prompt'){

    return `Promp ${letter}.mp3`;

  }


  if(type === 'correct'){

    return `Correct ${letter}.mp3`;

  }


  return '';

}


/* =========================================================
   PRELOAD AUDIO
========================================================= */

AUDIO_LETTERS.forEach(
  letter => {

    const promptFile =
      `${AUDIO_BASE}Promp ${letter}.mp3`;

    const promptAudio =
      new Audio(promptFile);

    promptAudio.preload =
      'auto';

    audioCache[
      `prompt_${letter}`
    ] =
      promptAudio;


    const correctFile =
      `${AUDIO_BASE}Correct ${letter}.mp3`;

    const correctAudio =
      new Audio(correctFile);

    correctAudio.preload =
      'auto';

    audioCache[
      `correct_${letter}`
    ] =
      correctAudio;

  }
);


/* =========================================================
   PLAY AUDIO
========================================================= */

function playAudio(key){

  if(
    'speechSynthesis' in window
  ){

    window.speechSynthesis.cancel();

  }


  Object.values(
    audioCache
  ).forEach(
    audio => {

      audio.pause();

      audio.currentTime = 0;

    }
  );


  const fileName =
    getAudioFile(key);


  if(!fileName){

    console.error(
      'File audio tidak ditemukan:',
      key
    );

    return;

  }


  let audio =
    audioCache[key];


  if(!audio){

    audio =
      new Audio(
        `${AUDIO_BASE}${fileName}`
      );

    audio.preload =
      'auto';

    audioCache[key] =
      audio;

  }


  audio.currentTime = 0;


  console.log(
    'Mencoba memutar:',
    `${AUDIO_BASE}${fileName}`
  );


  const playPromise =
    audio.play();


  if(playPromise){

    playPromise
      .then(() => {

        console.log(
          'Audio berhasil diputar:',
          `${AUDIO_BASE}${fileName}`
        );

      })
      .catch(error => {

        console.error(
          'Audio gagal diputar:',
          `${AUDIO_BASE}${fileName}`,
          error
        );

      });

  }

}


/* =========================================================
   SUARA SOAL
========================================================= */

function speakCurrent(){

  if(!currentLetter) return;

  playAudio(
    `prompt_${currentLetter.l}`
  );

}


/* =========================================================
   APRESIASI JAWABAN
========================================================= */

function showAppreciation(isCorrect){

  const appreciation =
    document.getElementById(
      'appreciation'
    );

  const emoji =
    document.getElementById(
      'appreciationEmoji'
    );

  const title =
    document.getElementById(
      'appreciationTitle'
    );

  const text =
    document.getElementById(
      'appreciationText'
    );


  if(!appreciation) return;


  if(isCorrect){

    emoji.textContent =
      '🎉';

    title.textContent =
      'Hebat!';

    text.textContent =
      'Jawaban kamu benar! ⭐';

  }else{

    emoji.textContent =
      '😊';

    title.textContent =
      'Yuk, coba lagi!';

    text.textContent =
      'Kamu pasti bisa! 💪';

  }


  appreciation.classList.add(
    'show'
  );


  setTimeout(
    () => {

      appreciation.classList.remove(
        'show'
      );

    },
    1000
  );

}


/* =========================================================
   MULAI GAME DARI INTRO
========================================================= */

const startIntroBtn =
  document.getElementById(
    'startIntroBtn'
  );


if(startIntroBtn){

  startIntroBtn.addEventListener(
    'click',
    () => {

      const nameInput =
        document.getElementById(
          'playerName'
        );


      playerName =
        nameInput
          ? nameInput.value.trim()
          : '';


      if(!playerName){

        if(nameInput){

          nameInput.focus();

          nameInput.placeholder =
            'Tulis namamu dulu ya 😊';

        }

        return;

      }


      if(!playerAge){

        alert(
          'Pilih umur kamu dulu ya 😊'
        );

        return;

      }


      /*
        BGM MULAI
      */

      playBGM();


      /*
        Mulai game
      */

      startGame();


      /*
        Sapaan KioKio
      */

      setTimeout(
        () => {

          speak(
            `Hai ${playerName}! Kamu umur ${playerAge} tahun ya! Yuk bermain huruf bersama KioKio!`
          );

        },
        500
      );

    }
  );

}


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(arr){

  const a =
    arr.slice();


  for(
    let i = a.length - 1;
    i > 0;
    i--
  ){

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      a[i],
      a[j]
    ] = [
      a[j],
      a[i]
    ];

  }


  return a;

}


/* =========================================================
   MEMBUAT PILIHAN JAWABAN UNIK
========================================================= */

function createUniqueOptions(correct){

  let attempts = 0;

  let opts = [];


  do{

    const distractors =
      shuffle(
        LETTERS.filter(
          x =>
            x.l !== correct.l
        )
      ).slice(
        0,
        5
      );


    opts =
      shuffle([
        correct,
        ...distractors
      ]);


    const answerKey =
      opts
        .map(
          x =>
            x.l
        )
        .sort()
        .join('-');


    if(
      !usedAnswerSets.includes(
        answerKey
      )
    ){

      usedAnswerSets.push(
        answerKey
      );

      return opts;

    }


    attempts++;


  }while(
    attempts < 100
  );


  return opts;

}


/* =========================================================
   SHOW SCREEN
========================================================= */

function showScreen(id){

  document
    .querySelectorAll('.screen')
    .forEach(
      s =>
        s.classList.remove(
          'active'
        )
    );


  const screen =
    document.getElementById(id);


  if(screen){

    screen.classList.add(
      'active'
    );

  }

}


/* =========================================================
   KEMBALI KE TITLE
========================================================= */

function goTitle(){

  if(
    'speechSynthesis' in window
  ){

    window.speechSynthesis.cancel();

  }


  Object.values(
    audioCache
  ).forEach(
    audio => {

      audio.pause();

      audio.currentTime = 0;

    }
  );


  stopBGM();


  showScreen(
    'screen-title'
  );

}


/* =========================================================
   START GAME
========================================================= */

function startGame(){

  correctCount = 0;

  score = 0;

  lives =
    MAX_LIVES;

  locked = false;


  usedLetters = [];

  usedAnswerSets = [];

  lastLetter = null;


  updateScore();

  updateLives();


  const garden =
    document.getElementById(
      'garden'
    );


  if(garden){

    garden.textContent =
      '🌱';

  }


  const playerNameDisplay =
    document.getElementById(
      'playerNameDisplay'
    );


  if(playerNameDisplay){

    playerNameDisplay.textContent =
      playerName;

  }


  showScreen(
    'screen-game'
  );


  loadRound();

}


/* =========================================================
   UPDATE SCORE
========================================================= */

function updateScore(){

  const scoreEl =
    document.getElementById(
      'score'
    );


  if(scoreEl){

    scoreEl.textContent =
      score;

  }

}


/* =========================================================
   UPDATE LIVES
========================================================= */

function updateLives(){

  const livesEl =
    document.getElementById(
      'lives'
    );


  if(livesEl){

    livesEl.textContent =
      '❤️'.repeat(lives) +
      '🤍'.repeat(
        MAX_LIVES - lives
      );

  }

}


/* =========================================================
   LOAD ROUND
========================================================= */

function loadRound(){

  locked = false;


  const availableLetters =
    LETTERS.filter(
      item =>
        !usedLetters.includes(
          item.l
        )
    );


  if(
    availableLetters.length === 0
  ){

    return;

  }


  const cur =
    availableLetters[
      Math.floor(
        Math.random() *
        availableLetters.length
      )
    ];


  usedLetters.push(
    cur.l
  );


  lastLetter =
    cur;

  currentLetter =
    cur;


  const targetEl =
    document.getElementById(
      'targetLetter'
    );


  if(targetEl){

    targetEl.textContent =
      cur.l;


    targetEl.style.background =
      COLORS[
        correctCount %
        COLORS.length
      ];

  }


  const feedback =
    document.getElementById(
      'feedback'
    );


  if(feedback){

    feedback.textContent =
      '';

  }


  const opts =
    createUniqueOptions(
      cur
    );


  const optionsEl =
    document.getElementById(
      'options'
    );


  if(!optionsEl) return;


  optionsEl.innerHTML =
    '';


  opts.forEach(
    o => {

      const card =
        document.createElement(
          'div'
        );


      card.className =
        'card';


      card.innerHTML =
        ICONS[o.l] || '';


      card.onclick =
        () =>
          handleAnswer(
            card,
            o,
            cur
          );


      optionsEl.appendChild(
        card
      );

    }
  );


  setTimeout(
    () => {

      if(!locked){

        speakCurrent();

      }

    },
    350
  );

}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(
  card,
  chosen,
  correct
){

  if(locked) return;


  /* =====================================================
     JAWABAN BENAR
  ===================================================== */

  if(
    chosen.l === correct.l
  ){

    locked = true;


    /*
      Tampilkan apresiasi benar
    */

    showAppreciation(true);


    if(
      'speechSynthesis' in window
    ){

      window.speechSynthesis.cancel();

    }


    Object.values(
      audioCache
    ).forEach(
      audio => {

        audio.pause();

        audio.currentTime = 0;

      }
    );


    card.classList.add(
      'correct'
    );


    score += 10;

    correctCount++;


    updateScore();


    const feedback =
      document.getElementById(
        'feedback'
      );


    if(feedback){

      feedback.textContent =
        `Betul! ${correct.l} untuk ${correct.word} 🎉 +10`;

    }


    setTimeout(
      () => {

        playAudio(
          `correct_${correct.l}`
        );

      },
      100
    );


    burstConfetti();


    const gardenEl =
      document.getElementById(
        'garden'
      );


    if(gardenEl){

      gardenEl.textContent =
        PLANTS.slice(
          0,
          Math.min(
            correctCount + 1,
            PLANTS.length
          )
        ).join('');

    }


    setTimeout(
      () => {

        if(
          correctCount >=
          WIN_TARGET
        ){

          const finalScoreWin =
            document.getElementById(
              'finalScoreWin'
            );


          if(finalScoreWin){

            finalScoreWin.textContent =
              score;

          }


          stopBGM();


          showScreen(
            'screen-complete'
          );


          burstConfetti();

        }else{

          loadRound();

        }

      },
      1400
    );

  }


  /* =====================================================
     JAWABAN SALAH
  ===================================================== */

  else{

    /*
      Tampilkan apresiasi salah
    */

    showAppreciation(false);


    card.classList.add(
      'wrong'
    );


    lives -= 1;


    updateLives();


    setTimeout(
      () => {

        card.classList.remove(
          'wrong'
        );

      },
      450
    );


    /*
      Kesempatan habis
    */

    if(lives <= 0){

      locked = true;


      const feedback =
        document.getElementById(
          'feedback'
        );


      if(feedback){

        feedback.textContent =
          'Yah, kesempatan habis!';

      }


      speak(
        'Yah, kesempatan kamu habis. Ayo coba lagi!'
      );


      stopBGM();


      setTimeout(
        () => {

          const finalScoreLose =
            document.getElementById(
              'finalScoreLose'
            );


          if(finalScoreLose){

            finalScoreLose.textContent =
              score;

          }


          showScreen(
            'screen-gameover'
          );

        },
        1200
      );

    }


    /*
      Masih punya nyawa
    */

    else{

      const feedback =
        document.getElementById(
          'feedback'
        );


      if(feedback){

        feedback.textContent =
          'Coba lagi ya! 😊';

      }


      speak(
        'Coba lagi ya'
      );

    }

  }

}


/* =========================================================
   CONFETTI
========================================================= */

function burstConfetti(){

  const frame =
    document.getElementById(
      'frame'
    );


  if(!frame) return;


  const colors = [

    '#3FB871',

    '#EF5C43',

    '#2E6DA4',

    '#F6A8C4',

    '#FCF4D6'

  ];


  for(
    let i = 0;
    i < 28;
    i++
  ){

    const c =
      document.createElement(
        'div'
      );


    c.className =
      'confetti';


    const size =
      6 +
      Math.random() * 6;


    c.style.width =
      size + 'px';


    c.style.height =
      (size * 1.4) + 'px';


    c.style.left =
      Math.random() *
      430 +
      'px';


    c.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];


    c.style.animationDuration =
      (
        1.6 +
        Math.random() * 1.2
      ) +
      's';


    frame.appendChild(
      c
    );


    setTimeout(
      () => {

        c.remove();

      },
      3200
    );

  }

}