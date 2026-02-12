const clinic = {
  name: "桑田歯科医院",
  nameEn: "KUWADA Dental Clinic",
  tagline: "説明重視・予防重視の診療で、安心して通える歯科医院を目指します。",
  lead: "一般歯科・小児歯科・歯科口腔外科に対応。必要性を確認しながら丁寧にご案内します。",
  address: "〒183-0027 東京都府中市本町2丁目5-3",
  addressEn: "2-5-3 Hommachi, Fuchu-shi, Tokyo",
  station: "南武線 府中本町 徒歩3分 / 京王線 府中 徒歩10分（京王バス 本町二丁目バス停 徒歩1分） / 京王線 分倍河原 徒歩10分",
  stationMain: "南武線 府中本町 徒歩3分",
  stationSub: "京王線 府中 徒歩10分 / 京王線 分倍河原 徒歩10分",
  phone: "042-366-6605",
  phoneTel: "0423666605",
  phoneNight: "042-366-6698",
  phoneFax: "042-366-6605",
  reservationPhone: "042-366-6605",
  reservationNote: "基本的に予約診療です（初診・再診で実施）。飛び込み来院や緊急性のある電話は対象外となる場合があります。",
  parking: "駐車場あり（無料5台）",
  smokingPolicy: "受動喫煙防止のため、敷地内全面禁煙",
  aed: "AED設置あり",
  hours: "月・火・水・金 9:00-13:00 / 15:00-19:00、土 9:00-13:00 / 15:00-17:00",
  hoursWeekday: "9:00-13:00 / 15:00-19:00",
  hoursSat: "9:00-13:00 / 15:00-17:00",
  hoursShort: "平日19時まで / 土曜17時まで",
  closed: "木・日・祝",
  doctorName: "院長：桑田 淳",
  doctorBio: "くわた あつし / Kuwata Atsushi",
  reserveUrl: "reserve.html",
  description: "桑田歯科医院（府中市本町／府中本町駅徒歩3分）。一般歯科・小児歯科・歯科口腔外科などに対応。予約・アクセス・診療時間のご案内。",
  services: [
    {
      title: "一般歯科",
      detail: "むし歯・詰め物・被せ物など、日常的なお口のトラブルに対応します。症状とご希望に合わせて治療方法をご提案します。"
    },
    {
      title: "歯科口腔外科",
      detail: "親知らずの抜歯、外傷、粘膜や顎の違和感などに対応します。必要に応じて専門医療機関と連携します。"
    },
    {
      title: "小児歯科",
      detail: "成長段階に合わせたむし歯予防と治療を行います。保護者の方と相談しながら進めます。"
    },
    {
      title: "歯周病治療",
      detail: "歯ぐきの炎症や出血、口臭の原因をチェックし、クリーニングや生活指導を行います。進行度に応じて治療します。"
    },
    {
      title: "顎関節症",
      detail: "顎の痛みや開閉時の違和感などに対応します。かみ合わせの確認や生活習慣の見直しを含めてご相談ください。"
    },
    {
      title: "インプラント",
      detail: "噛み合わせや骨の状態を確認し、適応を判断します。外科処置を伴うため、詳しく説明のうえ進めます。"
    },
    {
      title: "口腔ケア",
      detail: "定期検診やクリーニングで、お口の環境を整えます。ご自宅ケアの方法もお伝えします。"
    },
    {
      title: "入れ歯（欠損補綴）",
      detail: "噛みやすさと見た目のバランスに配慮した入れ歯をご提案します。調整や修理もご相談ください。"
    },
    {
      title: "金属アレルギーへの配慮",
      detail: "金属を使用しない素材の選択肢をご案内します。症状に応じて医療機関と連携しながら進めます。"
    }
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

  clinic.services.forEach((item, index) => {
    const data = typeof item === "string"
      ? { title: item, detail: "詳細は準備中です。" }
      : item;

    const li = document.createElement("li");
    li.className = "serviceItem";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "serviceItem__btn";
    btn.setAttribute("aria-expanded", "false");

    const detailId = `service-detail-${index + 1}`;
    btn.setAttribute("aria-controls", detailId);

    const title = document.createElement("span");
    title.className = "serviceItem__title";
    title.textContent = data.title;

    const icon = document.createElement("span");
    icon.className = "serviceItem__icon";
    icon.setAttribute("aria-hidden", "true");

    const detail = document.createElement("div");
    detail.className = "serviceItem__detail";
    detail.id = detailId;
    detail.setAttribute("aria-hidden", "true");
    detail.textContent = data.detail;

    btn.appendChild(title);
    btn.appendChild(icon);
    li.appendChild(btn);
    li.appendChild(detail);

    btn.addEventListener("click", () => {
      const open = !li.classList.contains("is-open");
      list.querySelectorAll(".serviceItem.is-open").forEach((other) => {
        if (other !== li) {
          other.classList.remove("is-open");
          const otherBtn = other.querySelector(".serviceItem__btn");
          const otherDetail = other.querySelector(".serviceItem__detail");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherDetail) otherDetail.setAttribute("aria-hidden", "true");
        }
      });

      li.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      detail.setAttribute("aria-hidden", String(!open));
    });

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
setText('[data-clinic-text="addressEn"]', clinic.addressEn);
setText('[data-clinic-text="station"]', clinic.station);
setText('[data-clinic-text="hours"]', clinic.hours);
setText('[data-clinic-text="hoursWeekday"]', clinic.hoursWeekday);
setText('[data-clinic-text="hoursSat"]', clinic.hoursSat);
setText('[data-clinic-text="hoursShort"]', clinic.hoursShort);
setText('[data-clinic-text="closed"]', clinic.closed);
setText('[data-clinic-text="stationMain"]', clinic.stationMain);
setText('[data-clinic-text="stationSub"]', clinic.stationSub);
setText('[data-clinic-text="doctorName"]', clinic.doctorName);
setText('[data-clinic-text="doctorBio"]', clinic.doctorBio);
setText('[data-clinic-text="phoneNight"]', clinic.phoneNight);
setText('[data-clinic-text="phoneFax"]', clinic.phoneFax);
setText('[data-clinic-text="reservationPhone"]', clinic.reservationPhone);
setText('[data-clinic-text="reservationNote"]', clinic.reservationNote);
setText('[data-clinic-text="parking"]', clinic.parking);
setText('[data-clinic-text="smokingPolicy"]', clinic.smokingPolicy);
setText('[data-clinic-text="aed"]', clinic.aed);

setTel();
setReserve();
renderServices();

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navbtn && nav) {
  let overlay = document.querySelector(".navOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "navOverlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
  }

  let closeBtn = nav.querySelector(".nav__close");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "nav__close";
    closeBtn.textContent = "閉じる";
    closeBtn.setAttribute("aria-label", "メニューを閉じる");
    nav.prepend(closeBtn);
  }

  const setNavOpen = (open) => {
    nav.classList.toggle("is-open", open);
    navbtn.setAttribute("aria-expanded", String(open));
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
  };

  navbtn.addEventListener("click", () => {
    setNavOpen(!nav.classList.contains("is-open"));
  });

  closeBtn.addEventListener("click", () => setNavOpen(false));
  overlay.addEventListener("click", () => setNavOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setNavOpen(false));
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

const heroCarousel = document.querySelector("[data-hero-carousel]");
if (heroCarousel) {
  const track = heroCarousel.querySelector(".heroSlider__track");
  const slides = Array.from(heroCarousel.querySelectorAll(".heroSlide"));
  const dots = Array.from(heroCarousel.querySelectorAll("[data-carousel-dot]"));
  const prevBtn = heroCarousel.querySelector("[data-carousel-prev]");
  const nextBtn = heroCarousel.querySelector("[data-carousel-next]");
  const toggleBtn = heroCarousel.querySelector("[data-carousel-toggle]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let autoplay = !prefersReduced.matches;
  let timerId = null;

  const updateSlides = () => {
    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", String(i !== index));
      slide.setAttribute("tabindex", i === index ? "0" : "-1");
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${i + 1} / ${slides.length}`);
    });
  };

  const updateDots = () => {
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  const update = (nextIndex) => {
    if (!track) return;
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateSlides();
    updateDots();
  };

  const stopAutoplay = () => {
    if (timerId) clearInterval(timerId);
    timerId = null;
  };

  const startAutoplay = () => {
    if (!autoplay || slides.length < 2) return;
    stopAutoplay();
    timerId = setInterval(() => update(index + 1), 6000);
  };

  const setAutoplay = (value) => {
    autoplay = value;
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(autoplay));
      toggleBtn.textContent = autoplay ? "停止" : "再生";
    }
    if (autoplay) startAutoplay();
    else stopAutoplay();
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      update(index - 1);
      setAutoplay(false);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      update(index + 1);
      setAutoplay(false);
    });
  }
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      setAutoplay(!autoplay);
    });
  }
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.carouselDot || 0);
      update(target);
      setAutoplay(false);
    });
  });

  heroCarousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      update(index - 1);
      setAutoplay(false);
    }
    if (e.key === "ArrowRight") {
      update(index + 1);
      setAutoplay(false);
    }
  });

  prefersReduced.addEventListener("change", (e) => {
    if (e.matches) setAutoplay(false);
  });

  update(0);
  if (toggleBtn) toggleBtn.setAttribute("aria-pressed", String(autoplay));
  if (autoplay) startAutoplay();
  else if (toggleBtn) toggleBtn.textContent = "再生";
}
