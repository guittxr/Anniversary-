
// ========================================
// PAGE TRANSITION
// ========================================

const openBtn = document.getElementById("openBtn");

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("page-enter");
  });

  const nextPage = document.getElementById(pageId);

  if (!nextPage) return;

  nextPage.classList.remove("hidden");

  void nextPage.offsetWidth;
  nextPage.classList.add("page-enter");

  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => {
    nextPage.classList.remove("page-enter");
  }, 900);
}


// ========================================
// MUSIC
// ========================================

const introSong = new Audio("music/intro.mp3");
introSong.loop = true;
introSong.volume = 0.5;

const favoriteSong = document.getElementById("favoriteSong");
const musicBtn = document.getElementById("musicBtn");


// ========================================
// OPENING ENVELOPE
// ========================================

openBtn.addEventListener("click", () => {

  if (openBtn.disabled) return;
  openBtn.disabled = true;

  introSong.play().catch(error => {
    console.log("INTRO MUSIC ERROR:", error);
  });

  const envelope = document.getElementById("letterEnvelope");
  const openingPage = document.getElementById("opening");
  const light = document.getElementById("envelopeLight");
  const particles = document.getElementById("envelopeParticles");

  envelope.classList.add("envelope-open");

  setTimeout(() => {

    light.classList.add("light-burst");

    const flowers = ["🌼", "🌸", "✿", "♡", "✨"];

    for (let i = 0; i < 24; i++) {

      const petal = document.createElement("span");

      petal.className = "envelope-petal";
      petal.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

      petal.style.setProperty(
        "--petal-x",
        `${Math.random() * 340 - 170}px`
      );

      petal.style.setProperty(
        "--petal-y",
        `${Math.random() * -300 - 50}px`
      );

      petal.style.setProperty(
        "--petal-rotate",
        `${Math.random() * 600 - 300}deg`
      );

      particles.appendChild(petal);

      setTimeout(() => petal.remove(), 1900);
    }

    openingPage.classList.add("opening-transition");

  }, 650);

  setTimeout(() => {

    showPage("passwordPage");

    openingPage.classList.remove("opening-transition");
    envelope.classList.remove("envelope-open");
    light.classList.remove("light-burst");

    openBtn.disabled = false;

  }, 1800);

});


// ========================================
// PRE-SURPRISE EXPERIENCE
// ========================================

const preSteps = [
  "preStep1",
  "preStep2",
  "preStep3",
  "preStep4",
  "preStep5"
];

function goPreStep(number) {

  preSteps.forEach(id => {
    const step = document.getElementById(id);
    if (step) step.classList.remove("active");
  });

  const nextStep = document.getElementById(preSteps[number - 1]);

  if (!nextStep) return;

  nextStep.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ========================================
// PASSWORD CHECK
// ========================================

const checkPasswordBtn = document.getElementById("checkPasswordBtn");

checkPasswordBtn.addEventListener("click", () => {

  const birthday = document.getElementById("birthdayInput").value.trim();
  const anniversary = document.getElementById("anniversaryInput").value.trim();
  const error = document.getElementById("passwordError");

  const correctBirthday = ["29032552", "29/03/2552"];
  const correctAnniversary = ["28102026", "28/10/2026"];

  if (
    correctBirthday.includes(birthday) &&
    correctAnniversary.includes(anniversary)
  ) {

    error.textContent = "";
    goPreStep(2);

  } else {

    error.textContent = "ลองนึกดูดี ๆ อีกครั้งนะ ♡";

  }

});


// กด Enter เพื่อยืนยันรหัส
document.querySelectorAll("#birthdayInput, #anniversaryInput")
  .forEach(input => {

    input.addEventListener("keydown", event => {

      if (event.key === "Enter") {
        checkPasswordBtn.click();
      }

    });

  });


// ========================================
// LETTER → MEMORIES
// ========================================

document.getElementById("toStep3").addEventListener("click", () => {
  goPreStep(3);
});


// ========================================
// MEMORY CARDS
// ========================================

const preMemoryMessages = {
  1: "บางรูปก็ไม่ต้องมีคำอธิบายอะไรเยอะ แค่เห็นก็ยิ้มแล้ว ♡",
  2: "พี่ชอบที่เธอตั้งใจทำอะไรเล็ก ๆ น้อย ๆ ให้กันนะ",
  3: "วันธรรมดาที่มีเธออยู่ ก็กลายเป็นความทรงจำได้เหมือนกัน"
};

document.querySelectorAll(".pre-memory-card").forEach(card => {

  card.addEventListener("click", () => {

    document.querySelectorAll(".pre-memory-card").forEach(item => {
      item.classList.remove("selected");
    });

    card.classList.add("selected");

    const number = card.dataset.memory;

    document.getElementById("preMemoryMessage").textContent =
      preMemoryMessages[number];

  });

});

document.getElementById("toStep4").addEventListener("click", () => {
  goPreStep(4);
});


// ========================================
// QUESTION
// ========================================

document.querySelectorAll(".pre-choice").forEach(choice => {

  choice.addEventListener("click", () => {

    document.querySelectorAll(".pre-choice").forEach(item => {
      item.classList.remove("selected");
    });

    choice.classList.add("selected");

    document.getElementById("preAnswerMessage").textContent =
      "พี่ก็อยากเก็บทุกอย่างที่มีเธออยู่เหมือนกัน ♡";

    document.getElementById("toStep5").disabled = false;

  });

});


// ========================================
// QUESTION → COUNTDOWN
// ========================================

document.getElementById("toStep5").addEventListener("click", () => {

  goPreStep(5);

  let count = 3;
  const countdown = document.getElementById("preCountdown");

  countdown.textContent = count;

  const timer = setInterval(() => {

    count--;

    if (count > 0) {

      countdown.textContent = count;

    } else {

      clearInterval(timer);
      countdown.textContent = "♡";
      countdown.style.transform = "scale(1.4)";

    }

  }, 1000);

});


// ========================================
// FLOWER BURST
// ========================================

function flowerBurst() {

  const flowers = ["🌼", "✿", "🌸", "💙"];

  for (let i = 0; i < 30; i++) {

    const flower = document.createElement("div");

    flower.className = "burst-flower";
    flower.textContent =
      flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = (4 + Math.random() * 3) + "s";
    flower.style.fontSize = (15 + Math.random() * 20) + "px";

    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 7000);
  }

}


// ========================================
// SPRING FLOWERS
// ========================================

let springFlowerTimeout = null;

function createSpringFlower() {

  const flowers = ["🌼", "🌸", "✿", "🍃", "🌷"];

  const flower = document.createElement("div");
  flower.className = "spring-flower";

  flower.textContent =
    flowers[Math.floor(Math.random() * flowers.length)];

  flower.style.left = Math.random() * 100 + "vw";
  flower.style.fontSize = (12 + Math.random() * 10) + "px";
  flower.style.animationDuration = (8 + Math.random() * 6) + "s";

  flower.style.setProperty(
    "--drift",
    (Math.random() * 100 - 50) + "px"
  );

  document.body.appendChild(flower);

  setTimeout(() => flower.remove(), 15000);

}

function startSpringFlowers() {

  if (springFlowerTimeout !== null) return;

  function scheduleNextFlower() {

    createSpringFlower();

    const nextTime = 1800 + Math.random() * 2600;

    springFlowerTimeout = setTimeout(() => {
      scheduleNextFlower();
    }, nextTime);

  }

  scheduleNextFlower();

}


// ========================================
// AMBIENT ITEMS
// ========================================

function createAmbientItem() {

  const items = ["✧", "♡", "⋆", "✦", "˚"];
  const item = document.createElement("div");

  item.className = "ambient-item";
  item.textContent =
    items[Math.floor(Math.random() * items.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.top = (30 + Math.random() * 60) + "vh";
  item.style.fontSize = (12 + Math.random() * 16) + "px";
  item.style.color = Math.random() > 0.5 ? "#9bbbd6" : "#d9b9c9";

  document.body.appendChild(item);

  setTimeout(() => item.remove(), 5200);

}

let ambientInterval = null;

function startAmbientItems() {

  if (ambientInterval !== null) return;

  ambientInterval = setInterval(() => {
    createAmbientItem();
  }, 2200);

}


// ========================================
// ENTER MAIN SURPRISE
// ========================================

document.getElementById("enterSurpriseBtn").addEventListener("click", () => {

  introSong.pause();
  introSong.currentTime = 0;

  favoriteSong.pause();
  favoriteSong.currentTime = 0;
  musicBtn.textContent = "กดเล่นเพลง ♡";

  showPage("surprisePage");

  flowerBurst();
  startSpringFlowers();
  startAmbientItems();

});


// ========================================
// FAVORITE SONG
// ========================================

musicBtn.addEventListener("click", async () => {

  if (favoriteSong.paused) {

    try {

      introSong.pause();

      await favoriteSong.play();

      musicBtn.textContent = "กำลังเล่นเพลง ♡";
      musicBtn.classList.add("playing");

    } catch (error) {

      musicBtn.textContent = "Couldn't play the song";

    }

  } else {

    favoriteSong.pause();

    musicBtn.textContent = "กดเล่นเพลง ♡";
    musicBtn.classList.remove("playing");

  }

});

favoriteSong.addEventListener("ended", () => {

  musicBtn.textContent = "กดเล่นเพลง ♡";
  musicBtn.classList.remove("playing");

});


// ========================================
// FLYING STICKERS
// ========================================

const stickerBtn = document.getElementById("stickerBtn");

const stickerImages = [
  "images/phat1.jpeg",
  "images/phat2.jpeg",
  "images/phat3.jpeg",
  "images/phat4.jpeg"
];

stickerBtn.addEventListener("click", () => {

  const amount = Math.floor(Math.random() * 2) + 3;

  const selected = [...stickerImages]
    .sort(() => Math.random() - 0.5)
    .slice(0, amount);

  const buttonRect = stickerBtn.getBoundingClientRect();

  selected.forEach((src, index) => {

    const img = document.createElement("img");

    img.src = src;
    img.className = "flying-sticker";

    img.style.left =
      (buttonRect.left + buttonRect.width / 2 - 42) + "px";

    img.style.top =
      (buttonRect.top + window.scrollY - 35) + "px";

    img.style.setProperty(
      "--move-x",
      `${Math.random() * 280 - 140}px`
    );

    img.style.setProperty(
      "--move-y",
      `${Math.random() * -180 - 80}px`
    );

    img.style.setProperty(
      "--rotate",
      `${Math.random() * 60 - 30}deg`
    );

    img.style.animationDelay = `${index * 0.12}s`;

    document.body.appendChild(img);

    setTimeout(() => img.remove(), 2500);

  });

});



// ========================================
// CINEMATIC MEMORY ALBUM REVEAL
// ========================================

const memoryCards = document.querySelectorAll(".memory-card");
const memoryLetter = document.querySelector(".memory-letter");

if ("IntersectionObserver" in window) {

  const memoryObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const index = [...memoryCards].indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add("show-memory");
      }, Math.max(0, index) * 220);

      observer.unobserve(entry.target);

    });

  }, {
    threshold: 0.18
  });

  memoryCards.forEach(card => memoryObserver.observe(card));

  if (memoryLetter) {

    const letterObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("letter-revealed");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.15
    });

    letterObserver.observe(memoryLetter);
  }

} else {

  memoryCards.forEach(card => card.classList.add("show-memory"));

  if (memoryLetter) {
    memoryLetter.classList.add("letter-revealed");
  }

}



// ========================================
// CINEMATIC MEMORY GALLERY
// ========================================

const memoryLightbox = document.getElementById("memoryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeMemoryLightbox = document.getElementById("closeMemoryLightbox");

const galleryTitle = document.getElementById("galleryTitle");
const galleryCounter = document.getElementById("galleryCounter");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

const memoryImages = [
  { src: "images/memory1.jpg", title: "อันนี้น่ารักก ♡" },
  { src: "images/memory2.jpg", title: "เธอวาดให้พี่ด้วยแหละ" },
  { src: "images/memory3.jpg", title: "อันนี้โทรกันแรกก ๆ" },
  { src: "images/memory4.jpg", title: "กินไอติมด้วยกันน" }
];

let currentMemory = 0;

function showMemory(index) {

  currentMemory =
    (index + memoryImages.length) % memoryImages.length;

  const memory = memoryImages[currentMemory];

  lightboxImage.style.opacity = "0";

  setTimeout(() => {

    lightboxImage.src = memory.src;
    lightboxImage.alt = memory.title;
    galleryTitle.textContent = memory.title;

    galleryCounter.textContent =
      String(currentMemory + 1).padStart(2, "0") +
      " / " +
      String(memoryImages.length).padStart(2, "0");

    lightboxImage.style.opacity = "1";

  }, 120);

}

function openMemoryGallery(index) {

  showMemory(index);

  memoryLightbox.classList.add("active");
  document.body.style.overflow = "hidden";

}

function closeGallery() {

  memoryLightbox.classList.remove("active");
  document.body.style.overflow = "";

}

document.querySelectorAll(".memory-card .polaroid img")
  .forEach((img, index) => {

    img.addEventListener("click", () => {
      openMemoryGallery(index);
    });

  });

galleryPrev.addEventListener("click", () => {
  showMemory(currentMemory - 1);
});

galleryNext.addEventListener("click", () => {
  showMemory(currentMemory + 1);
});

closeMemoryLightbox.addEventListener("click", closeGallery);

memoryLightbox.addEventListener("click", event => {

  if (event.target === memoryLightbox) {
    closeGallery();
  }

});

document.addEventListener("keydown", event => {

  if (!memoryLightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") showMemory(currentMemory - 1);
  if (event.key === "ArrowRight") showMemory(currentMemory + 1);

});

let touchStartX = 0;

memoryLightbox.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

memoryLightbox.addEventListener("touchend", event => {

  const touchEndX = event.changedTouches[0].screenX;
  const difference = touchEndX - touchStartX;

  if (Math.abs(difference) < 50) return;

  if (difference < 0) showMemory(currentMemory + 1);
  else showMemory(currentMemory - 1);

}, { passive: true });


// ========================================
// OPEN MEMORY BOOK
// ========================================

const albumCover = document.getElementById("albumCover");
const openAlbumBtn = document.getElementById("openAlbumBtn");
const albumInside = document.getElementById("albumInside");

function releaseAlbumFlowers() {

  const layer = document.createElement("div");
  layer.className = "album-petal-layer";

  document.body.appendChild(layer);

  const flowers = ["✿", "❀", "✧", "✽", "♡"];

  const colors = [
    "#f4c6d5",
    "#fff0b8",
    "#ffffff",
    "#e7d5f5",
    "#dcebd5"
  ];

  for (let i = 0; i < 32; i++) {

    const petal = document.createElement("span");

    petal.className = "album-petal";
    petal.textContent =
      flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.setProperty("--left", Math.random() * 100 + "vw");
    petal.style.setProperty("--size", (14 + Math.random() * 19) + "px");
    petal.style.setProperty("--delay", (Math.random() * 2.5) + "s");
    petal.style.setProperty("--duration", (4 + Math.random() * 3) + "s");
    petal.style.setProperty("--sway", (Math.random() * 100 - 50) + "px");

    petal.style.setProperty(
      "--petal-color",
      colors[Math.floor(Math.random() * colors.length)]
    );

    layer.appendChild(petal);

  }

  setTimeout(() => layer.remove(), 8500);

}

openAlbumBtn.addEventListener("click", () => {

  if (openAlbumBtn.disabled) return;

  openAlbumBtn.disabled = true;

  albumCover.classList.add("cover-opening");

  releaseAlbumFlowers();
  startAlbumSparkles();

  setTimeout(() => {

    albumCover.classList.add("hidden");

    albumInside.classList.remove("hidden");
    albumInside.classList.add("album-reveal");

    window.scrollTo({
      top: albumInside.getBoundingClientRect().top + window.scrollY - 20,
      behavior: "smooth"
    });

  }, 750);

});
// ========================================
// FINAL CINEMATIC SCENE
// ========================================

const lastThingBtn = document.getElementById("lastThingBtn");
const finalScene = document.getElementById("finalScene");

if (lastThingBtn && finalScene) {
  lastThingBtn.addEventListener("click", () => {
    finalScene.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

// ========================================
// SOFT SPARKLE EFFECT
// ========================================

function createSoftSparkle() {

  const album = document.querySelector(".memory-album");

  if (!album || album.classList.contains("hidden")) return;

  const sparkle = document.createElement("span");

  sparkle.className = "soft-sparkle";
  sparkle.textContent = ["✧", "✦", "˚", "♡"][
    Math.floor(Math.random() * 4)
  ];

  sparkle.style.left = Math.random() * 90 + 5 + "%";
  sparkle.style.top = Math.random() * 85 + 5 + "%";

  album.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 2800);
}

let sparkleInterval = null;

function startAlbumSparkles() {

  if (sparkleInterval) return;

  sparkleInterval = setInterval(() => {
    createSoftSparkle();
  }, 1100);

}

function stopAlbumSparkles() {

  clearInterval(sparkleInterval);
  sparkleInterval = null;

}
