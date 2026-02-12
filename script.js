const clinic = {
  name: "桑田歯科医院",
  nameEn: "KUWADA Dental Clinic",
  tagline: "地域のかかりつけ歯科として、相談しやすい診療を大切にしています。",
  lead: "一般歯科・小児歯科・歯科口腔外科に対応。必要性を確認しながら丁寧にご案内します。",
  address: "〒183-0027 東京都府中市本町2丁目5-3",
  station: "南武線 府中本町 徒歩3分 / 京王線 府中 徒歩10分 / 京王線 分倍河原 徒歩10分",
  phone: "042-366-6605",
  phoneTel: "0423666605",
  hours: "月・火・水・金 9:00-13:00 / 15:00-19:00、土 9:00-13:00 / 15:00-17:00",
  hoursShort: "平日19時まで / 土曜17時まで",
  closed: "木・日・祝",
  doctorName: "院長：桑田 徹",
  doctorBio: "プロフィールは後で入力（例）",
  reserveUrl: "reserve.html",
  description: "桑田歯科医院（府中市本町／府中本町駅徒歩3分）。一般歯科・小児歯科・歯科口腔外科などに対応。予約・アクセス・診療時間のご案内。",
  services: [
    "一般歯科",
    "歯科口腔外科",
    "小児歯科",
    "歯周病治療",
    "顎関節症",
    "インプラント",
    "口腔ケア",
    "入れ歯（欠損補綴）",
    "金属アレルギーへの配慮"
  ]
};

const navbtn = document.getElementById("navbtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
};

const setTel = () => {
  const telValue = clinic.phoneTel || clinic.phone.replace(/[^0-9+]/g, "");
  document.querySelectorAll("[data-clinic-tel]").forEach((el) => {
    el.setAttribute("href", `tel:${telValue}`);
    el.textContent = clinic.phone;
  });
};

const setReserve = () => {
  const isExternal = /^https?:\/\//.test(clinic.reserveUrl);
  document.querySelectorAll("[data-clinic-reserve]").forEach((el) => {
    el.setAttribute("href", clinic.reserveUrl);
    if (isExternal) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
  });
};

const renderServices = () => {
  const list = document.getElementById("serviceList");
  if (!list || !Array.isArray(clinic.services)) return;
  list.innerHTML = "";
  clinic.services.forEach((label) => {
    const li = document.createElement("li");
    li.className = "service";
    li.textContent = label;
    list.appendChild(li);
  });
};

const pageTitle = document.body?.dataset?.pageTitle;
document.title = pageTitle
  ? `${clinic.name}｜${pageTitle}`
  : `${clinic.name}｜府中本町駅徒歩3分`;
const desc = document.querySelector('meta[name="description"]');
if (desc) desc.setAttribute("content", clinic.description);
const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) ogTitle.setAttribute("content", clinic.name);
const ogDesc = document.querySelector('meta[property="og:description"]');
if (ogDesc) ogDesc.setAttribute("content", clinic.description);

setText('[data-clinic-text="name"]', clinic.name);
setText('[data-clinic-text="nameEn"]', clinic.nameEn);
setText('[data-clinic-text="tagline"]', clinic.tagline);
setText('[data-clinic-text="lead"]', clinic.lead);
setText('[data-clinic-text="address"]', clinic.address);
setText('[data-clinic-text="station"]', clinic.station);
setText('[data-clinic-text="hours"]', clinic.hours);
setText('[data-clinic-text="hoursShort"]', clinic.hoursShort);
setText('[data-clinic-text="closed"]', clinic.closed);
setText('[data-clinic-text="doctorName"]', clinic.doctorName);
setText('[data-clinic-text="doctorBio"]', clinic.doctorBio);

setTel();
setReserve();
renderServices();

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navbtn && nav) {
  navbtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navbtn.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navbtn.setAttribute("aria-expanded", "false");
    });
  });
}

if (form && formNote) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const msg = document.getElementById("msg")?.value?.trim();

    if (!name || !email || !msg) {
      formNote.textContent = "未入力の項目があります。確認してね。";
      return;
    }

    formNote.textContent = "送信デモ：OK！ 実運用では送信先（フォーム/サーバー/予約システム）を接続します。";
    form.reset();
  });
}
