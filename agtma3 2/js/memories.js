// 1) بيانات الذكريات — الصور بقت array
const MEMORIES = [
  {
    images: [
      "css/img/memories/aslko-feh/mo2tmar.jpg",
    ],
    title: "مؤتمر اسلكو فيه",
    date: "2025-02-04",
    desc: "مؤتمر شباب ناشئ 2025",
  },
  {
    images: [
      "css/img/memories/kabad-ra3os/the-main-pic.jpg",
      "css/img/memories/kabad-ra3os/the-main2-pic.jpg",
      "css/img/memories/kabad-ra3os/bus-pic.jpg",
      "css/img/memories/kabad-ra3os/mosque-pic.JPG",
      "css/img/memories/kabad-ra3os/hymns.JPG",
      "css/img/memories/kabad-ra3os/random.JPG",
      "css/img/memories/kabad-ra3os/t-marium-with-cups.jpg",
      "css/img/memories/kabad-ra3os/u-poules-with-cups.jpg",
      "css/img/memories/kabad-ra3os/berto.jpg",
      "css/img/memories/kabad-ra3os/U-sameh-with-girls.PNG",
      "css/img/memories/kabad-ra3os/t-rania&amani-with-cup.jpg",
      "css/img/memories/kabad-ra3os/u-poles-with-the-girls.jpg",
      "css/img/memories/kabad-ra3os/sermon.jpg",
      "css/img/memories/kabad-ra3os/sally.jpg",
      "css/img/memories/kabad-ra3os/nada-wirh-t.jpg",
      "css/img/memories/kabad-ra3os/the-first-pic.jpg",
      "css/img/memories/kabad-ra3os/janel.jpg",
      "css/img/memories/kabad-ra3os/koty&berto-with-t.jpg",
      "css/img/memories/kabad-ra3os/seminar.jpg",
      "css/img/memories/kabad-ra3os/dr-baher.jpg",
      "css/img/memories/kabad-ra3os/game-pic.JPG",
    ],
    title: "اليوم الروحي كبد 20225",
    date: "2025-09-04",
    desc: "رحله شباب ناشئ 2025",
  },
];

// 2) عناصر DOM
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const q = document.getElementById("q");
const year = document.getElementById("year");
const sort = document.getElementById("sort");
const viewer = document.getElementById("viewer");
const viewerTitle = document.getElementById("viewerTitle");
const viewerMeta = document.getElementById("viewerMeta");
const viewerGallery = document.getElementById("viewerGallery");

// 3) تهيئة فلاتر السنة تلقائياً
function setupYearFilter() {
  const years = Array.from(
    new Set(MEMORIES.map((m) => new Date(m.date).getFullYear()))
  ).sort((a, b) => b - a);
  for (const y of years) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = y;
    year.appendChild(opt);
  }
}

// 4) رسم الكروت
function render() {
  const query = q.value.trim().toLowerCase();
  const yr = year.value;
  const dir = sort.value;

  let list = MEMORIES.slice();
  // فلترة
  if (query) {
    list = list.filter((m) =>
      (m.title + " " + m.desc).toLowerCase().includes(query)
    );
  }
  if (yr) {
    list = list.filter((m) => String(new Date(m.date).getFullYear()) === yr);
  }
  // ترتيب
  list.sort((a, b) =>
    dir === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // تفريغ الشبكة
  grid.innerHTML = "";

  if (list.length === 0) {
    empty.hidden = false;
    return;
  } else empty.hidden = true;

  for (const m of list) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
            <div class="image-wrap">
              <img src="${m.images[0]}" alt="${m.title}" loading="lazy" />
              <span class="chip">${formatDate(m.date)}</span>
            </div>
            <div class="content">
              <h3 class="event-title">${m.title}</h3>
              <p class="event-desc">${m.desc || ""}</p>
            </div>
          `;

    // فتح العرض الكامل عند الضغط
    card.querySelector("img").addEventListener("click", () => openViewer(m));
    grid.appendChild(card);
  }
}

function openViewer(m) {
  viewerTitle.textContent = m.title;
  viewerMeta.textContent = `${formatDate(m.date)} — ${m.desc || ""}`;

  viewerGallery.innerHTML = "";
  m.images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${m.title} - ${i + 1}`;
    viewerGallery.appendChild(img);
  });

  viewer.showModal();
}

function formatDate(d) {
  const date = new Date(d);
  return new Intl.DateTimeFormat("ar-EG", { dateStyle: "long" }).format(date);
}

// 5) أحداث التفاعل
q.addEventListener("input", render);
year.addEventListener("change", render);
sort.addEventListener("change", render);
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && viewer.open) viewer.close();
});

// 6) جاهزية الصفحة
setupYearFilter();
render();
