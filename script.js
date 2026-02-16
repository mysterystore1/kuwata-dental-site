const clinic = {
  name: "くわら歯科クリニック",
  nameEn: "KUWARA Dental Clinic",
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
  reservationNote: "当院は予約優先で診療しています。急な痛みなど緊急症状は、お電話で状況を確認のうえご案内します。",
  lineId: "@kuwara-dental",
  lineLead: "24時間受付。友だち追加後、チャットでご希望日時を送るだけで予約できます。",
  lineNote: "※LINEは24時間受付です。返信は診療時間内に順次ご案内します。",
  parking: "駐車場あり（無料5台）",
  smokingPolicy: "受動喫煙防止のため、敷地内全面禁煙",
  aed: "AED設置あり",
  hours: "月・火・水・金 9:00-13:00 / 15:00-19:00、土 9:00-13:00 / 15:00-17:00",
  hoursWeekday: "9:00-13:00 / 15:00-19:00",
  hoursSat: "9:00-13:00 / 15:00-17:00",
  hoursShort: "平日19時まで / 土曜17時まで",
  closed: "木・日・祝",
  doctorName: "院長：くわら 太郎",
  doctorBio: "くわら たろう / Kuwara Taro",
  reserveUrl: "https://line.me/R/ti/p/@kuwara-dental",
  webReserveUrl: "./reserve.html",
  reserveLabel: "LINE予約",
  webReserveLabel: "WEB予約",
  description: "くわら歯科クリニック（府中市本町／府中本町駅徒歩3分）。一般歯科・小児歯科・歯科口腔外科などに対応。LINE予約・アクセス・診療時間のご案内。",
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

const ATTRIBUTION_KEY = "clinic_attribution_v1";
const dataLayer = (window.dataLayer = window.dataLayer || []);

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
};

const normalizePhoneText = (text) => {
  if (!text) return clinic.phone;
  if (text.includes("電話：") || text.includes("TEL")) {
    return text
      .replace(/電話：\s*\d{2,4}-\d{2,4}-\d{3,4}/, `電話：${clinic.phone}`)
      .replace(/TEL\s*\d{2,4}-\d{2,4}-\d{3,4}/, `TEL ${clinic.phone}`)
      .replace(/000-0000-0000/g, clinic.phone);
  }
  if (text.includes("000-0000-0000")) return text.replace(/000-0000-0000/g, clinic.phone);
  return text;
};

const shouldNormalizeCtaLabel = (text, expectedLabel) => {
  const current = (text || "").trim();
  if (!current) return true;
  if (current.includes("000-0000-0000")) return true;
  if (current === expectedLabel) return true;
  if (/^WEB予約$/.test(current) || /^LINE予約$/.test(current)) return true;
  return false;
};

const setTel = () => {
  const telValue = clinic.phoneTel || clinic.phone.replace(/[^0-9+]/g, "");
  document.querySelectorAll("[data-clinic-tel]").forEach((el) => {
    el.setAttribute("href", `tel:${telValue}`);

    if (el.classList.contains("footer__ctaTel")) {
      el.textContent = clinic.phone;
      return;
    }

    const currentText = (el.textContent || "").trim();
    if (!currentText || /000-0000-0000/.test(currentText)) {
      el.textContent = normalizePhoneText(currentText);
    }
  });
};

const setReserve = () => {
  const reserveHref = clinic.reserveUrl || "./reserve.html";
  const reserveLabel = clinic.reserveLabel?.trim();
  const isExternal = /^https?:\/\//.test(reserveHref);

  document.querySelectorAll("[data-clinic-reserve]").forEach((el) => {
    el.setAttribute("href", reserveHref);
    if (reserveLabel && shouldNormalizeCtaLabel(el.textContent, reserveLabel)) el.textContent = reserveLabel;

    if (isExternal) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
  });
};

const setWebReserve = () => {
  const webHref = clinic.webReserveUrl || "./reserve.html";
  const webLabel = clinic.webReserveLabel || "WEB予約";
  document.querySelectorAll("[data-clinic-web]").forEach((el) => {
    el.setAttribute("href", webHref);
    if (shouldNormalizeCtaLabel(el.textContent, webLabel)) el.textContent = webLabel;
    el.removeAttribute("target");
    el.removeAttribute("rel");
  });
};

const syncClinicLinks = () => {
  setTel();
  setReserve();
  setWebReserve();
};

const ensureFixedCtaBar = () => {
  document.querySelectorAll(".ctaBar").forEach((bar) => {
    const tel = bar.querySelector("[data-clinic-tel]");
    const web = bar.querySelector("[data-clinic-web]");
    const line = bar.querySelector("[data-clinic-reserve]");

    if (tel && (!tel.textContent || /緊急電話|000-0000-0000/.test(tel.textContent))) {
      tel.textContent = "電話";
    }
    if (web && shouldNormalizeCtaLabel(web.textContent, clinic.webReserveLabel || "WEB予約")) {
      web.textContent = clinic.webReserveLabel || "WEB予約";
    }
    if (line && shouldNormalizeCtaLabel(line.textContent, clinic.reserveLabel || "LINE予約")) {
      line.textContent = clinic.reserveLabel || "LINE予約";
    }
  });
};

const ensureNavReserveHub = () => {
  const hubHref = clinic.webReserveUrl || clinic.reserveUrl || "./reserve.html";
  const isExternal = /^https?:\/\//.test(hubHref);

  document.querySelectorAll(".nav").forEach((navEl) => {
    navEl.querySelectorAll(".nav__web, .nav__cta[data-clinic-reserve], .nav__tel").forEach((el) => {
      el.remove();
    });

    let hub = navEl.querySelector(".nav__reserveHub");
    if (!hub) {
      hub = document.createElement("a");
      hub.className = "nav__reserveHub";
      hub.textContent = "予約・お問い合わせ";
      navEl.appendChild(hub);
    }

    hub.setAttribute("href", hubHref);
    if (isExternal) {
      hub.setAttribute("target", "_blank");
      hub.setAttribute("rel", "noopener noreferrer");
    } else {
      hub.removeAttribute("target");
      hub.removeAttribute("rel");
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
if (desc && (!(desc.getAttribute("content") || "").trim() || (desc.getAttribute("content") || "").includes("後で入力"))) {
  desc.setAttribute("content", clinic.description);
}
const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle && (!(ogTitle.getAttribute("content") || "").trim() || (ogTitle.getAttribute("content") || "").includes("後で入力"))) {
  ogTitle.setAttribute("content", clinic.name);
}
const ogDesc = document.querySelector('meta[property="og:description"]');
if (ogDesc && (!(ogDesc.getAttribute("content") || "").trim() || (ogDesc.getAttribute("content") || "").includes("後で入力"))) {
  ogDesc.setAttribute("content", clinic.description);
}

const clinicTextBindings = {
  name: clinic.name,
  nameEn: clinic.nameEn,
  tagline: clinic.tagline,
  lead: clinic.lead,
  address: clinic.address,
  addressEn: clinic.addressEn,
  station: clinic.station,
  hours: clinic.hours,
  hoursWeekday: clinic.hoursWeekday,
  hoursSat: clinic.hoursSat,
  hoursShort: clinic.hoursShort,
  closed: clinic.closed,
  stationMain: clinic.stationMain,
  stationSub: clinic.stationSub,
  doctorName: clinic.doctorName,
  doctorBio: clinic.doctorBio,
  phoneNight: clinic.phoneNight,
  phoneFax: clinic.phoneFax,
  reservationPhone: clinic.reservationPhone,
  reservationNote: clinic.reservationNote,
  lineId: clinic.lineId,
  lineLead: clinic.lineLead,
  lineNote: clinic.lineNote,
  reserveLabel: clinic.reserveLabel,
  parking: clinic.parking,
  smokingPolicy: clinic.smokingPolicy,
  aed: clinic.aed
};

Object.entries(clinicTextBindings).forEach(([key, value]) => {
  setText(`[data-clinic-text="${key}"]`, value);
});

ensureFixedCtaBar();
ensureNavReserveHub();
syncClinicLinks();
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

const captureAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid"];
  const current = {};

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) current[key] = value;
  });

  if (document.referrer && !current.referrer) {
    try {
      const ref = new URL(document.referrer);
      current.referrer = ref.hostname;
    } catch (_) {
      current.referrer = document.referrer;
    }
  }

  if (Object.keys(current).length > 0) {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current));
    return current;
  }

  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
  } catch (_) {
    return {};
  }
};

const attribution = captureAttribution();

const detectLandingType = () => {
  const path = window.location.pathname;
  if (/symptom-/.test(path)) return "symptom_lp";
  if (/lp-/.test(path)) return "campaign_lp";
  if (/reserve\.html$/.test(path)) return "reserve";
  if (/index\.html$/.test(path) || /\/$/.test(path)) return "home";
  return "content";
};

const trackEvent = (eventName, payload = {}) => {
  dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    timestamp: new Date().toISOString(),
    ...attribution,
    ...payload
  });
};

const getPlacement = (el) => {
  const section = el.closest("section[id]");
  if (section) return section.id;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest(".ctaBar")) return "fixed_cta";
  return "unknown";
};

trackEvent("page_view", { landing_type: detectLandingType() });

document.addEventListener("click", (e) => {
  const followupActionEl = e.target.closest("[data-followup-action]");
  if (followupActionEl) {
    trackEvent("reserve_followup_click", {
      action: followupActionEl.dataset.followupAction || "unknown",
      placement: getPlacement(followupActionEl)
    });
  }

  const reminderEl = e.target.closest("[data-reminder-link]");
  if (reminderEl) {
    trackEvent("reserve_reminder_click", {
      placement: getPlacement(reminderEl)
    });
  }

  const telEl = e.target.closest("[data-clinic-tel]");
  if (telEl) {
    trackEvent("phone_click", {
      placement: getPlacement(telEl),
      link_text: (telEl.textContent || "").trim()
    });
    return;
  }

  const webEl = e.target.closest("[data-clinic-web]");
  if (webEl) {
    trackEvent("web_click", {
      placement: getPlacement(webEl),
      link_text: (webEl.textContent || "").trim()
    });
    return;
  }

  const lineEl = e.target.closest("[data-clinic-reserve]");
  if (lineEl) {
    trackEvent("line_click", {
      placement: getPlacement(lineEl),
      link_text: (lineEl.textContent || "").trim()
    });
  }
});

document.querySelectorAll(".faq details").forEach((detailEl) => {
  detailEl.addEventListener("toggle", () => {
    const question = detailEl.querySelector("summary")?.textContent?.trim() || "unknown";
    trackEvent("faq_toggle", {
      question,
      is_open: detailEl.open ? "yes" : "no"
    });
  });
});

const ensureAttributionFields = (formEl) => {
  Object.entries(attribution).forEach(([key, value]) => {
    let field = formEl.querySelector(`input[name="${key}"]`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = key;
      formEl.appendChild(field);
    }
    field.value = String(value);
  });
};

const pad = (n) => String(n).padStart(2, "0");
const formatDateTimeLocal = (date) => {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
};

const buildReminderUrl = (preferredDate, patientName) => {
  if (!preferredDate) return "";
  const appointmentDate = new Date(`${preferredDate}T10:00:00`);
  if (Number.isNaN(appointmentDate.getTime())) return "";

  const reminderStart = new Date(appointmentDate);
  reminderStart.setDate(reminderStart.getDate() - 1);
  reminderStart.setHours(19, 0, 0, 0);

  const reminderEnd = new Date(reminderStart);
  reminderEnd.setMinutes(reminderEnd.getMinutes() + 30);

  const title = encodeURIComponent(`【${clinic.name}】前日リマインド`);
  const details = encodeURIComponent(`${patientName}様 予約前日確認\n予約日: ${preferredDate}\n当日の連絡先: ${clinic.phone}`);
  const dates = `${formatDateTimeLocal(reminderStart)}/${formatDateTimeLocal(reminderEnd)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}&ctz=Asia/Tokyo`;
};

const FOLLOWUP_STATE_KEY = "clinic_reserve_followup_v1";
const VISIT_TYPE_LABELS = {
  first: "初診",
  return: "再診",
  consultation: "相談"
};
const TIME_SLOT_LABELS = {
  morning: "午前",
  afternoon: "午後",
  evening: "夕方"
};
const URGENCY_LABELS = {
  normal: "通常",
  soon: "1-2日以内希望",
  urgent: "本日相談希望"
};

const formatDateJp = (dateValue) => {
  if (!dateValue) return "日程未設定";
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

const formatDateTimeJp = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const getFollowupStatus = (urgency) => {
  if (urgency === "urgent") return "優先確認中";
  if (urgency === "soon") return "当日中に確認";
  return "順次確認中";
};

const buildFollowupSteps = (followup) => {
  const preferredDateLabel = formatDateJp(followup.preferredDate);
  const preferredTimeLabel = TIME_SLOT_LABELS[followup.preferredTime] || "時間帯指定なし";

  const steps = [
    {
      title: "予約受付",
      description: `${formatDateTimeJp(followup.submittedAt)} に受付しました。受付番号は ${followup.reservationId} です。`
    },
    {
      title: "内容確認と折返し",
      description: "診療時間内に、症状と希望日時を確認したうえで折返し連絡します。"
    },
    {
      title: "予約確定のご案内",
      description: `${preferredDateLabel}（${preferredTimeLabel}）を基準に、確定時間を連絡します。`
    },
    {
      title: "来院前日の再確認",
      description: "来院前日に最終確認と当日の持ち物を再案内します。"
    }
  ];

  if (followup.urgency === "urgent") {
    steps.splice(1, 0, {
      title: "緊急時の優先案内",
      description: "強い痛み・腫れ・出血がある場合は、フォーム送信後はお電話でのご連絡を優先してください。"
    });
  }

  return steps;
};

const saveFollowupState = (followup) => {
  try {
    sessionStorage.setItem(FOLLOWUP_STATE_KEY, JSON.stringify(followup));
  } catch (_) {
    // ignore storage errors
  }
};

const loadFollowupState = () => {
  try {
    const raw = sessionStorage.getItem(FOLLOWUP_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
};

const renderFollowupPanel = (form, followup) => {
  const panel = form.parentElement?.querySelector("[data-reserve-followup]");
  if (!panel || !followup) return;

  const statusEl = panel.querySelector("[data-followup-status]");
  const summaryEl = panel.querySelector("[data-followup-summary]");
  const stepsEl = panel.querySelector("[data-followup-steps]");

  const visitTypeLabel = VISIT_TYPE_LABELS[followup.visitType] || "区分未設定";
  const preferredDateLabel = formatDateJp(followup.preferredDate);
  const preferredTimeLabel = TIME_SLOT_LABELS[followup.preferredTime] || "時間帯指定なし";
  const urgencyLabel = URGENCY_LABELS[followup.urgency] || URGENCY_LABELS.normal;

  if (statusEl) {
    statusEl.textContent = getFollowupStatus(followup.urgency);
  }
  if (summaryEl) {
    summaryEl.textContent = `受付番号 ${followup.reservationId} / ${visitTypeLabel} / ${preferredDateLabel} ${preferredTimeLabel} / 緊急度: ${urgencyLabel}`;
  }
  if (stepsEl) {
    stepsEl.innerHTML = "";
    buildFollowupSteps(followup).forEach((step, index) => {
      const li = document.createElement("li");
      const indexBadge = document.createElement("span");
      indexBadge.className = "followupTimeline__index";
      indexBadge.textContent = String(index + 1);

      const content = document.createElement("div");
      const title = document.createElement("p");
      title.className = "followupTimeline__title";
      title.textContent = step.title;

      const desc = document.createElement("p");
      desc.className = "followupTimeline__desc";
      desc.textContent = step.description;

      content.append(title, desc);
      li.append(indexBadge, content);
      stepsEl.appendChild(li);
    });
  }

  panel.hidden = false;
};

document.querySelectorAll('input[name="preferredDate"]').forEach((input) => {
  const today = new Date();
  const minDate = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  input.setAttribute("min", minDate);
});

const persistedFollowup = loadFollowupState();

document.querySelectorAll("form#contactForm").forEach((form) => {
  const formNote = form.querySelector("#formNote") || form.querySelector(".note[aria-live]");

  if (
    persistedFollowup &&
    persistedFollowup.pagePath === window.location.pathname &&
    persistedFollowup.formId === (form.id || "contactForm")
  ) {
    renderFollowupPanel(form, persistedFollowup);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ensureAttributionFields(form);

    const name = (form.querySelector("#name")?.value || "").trim();
    const tel = (form.querySelector("#tel")?.value || "").trim();
    const email = (form.querySelector("#email")?.value || "").trim();
    const preferredDate = (form.querySelector("#preferredDate")?.value || "").trim();
    const visitType = (form.querySelector("#visitType")?.value || "").trim();
    const preferredTime = (form.querySelector("#preferredTime")?.value || "").trim();
    const urgency = (form.querySelector("#urgency")?.value || "normal").trim();
    const message = (form.querySelector("#msg")?.value || "").trim();

    if (!name || !tel || !preferredDate || !visitType) {
      if (formNote) {
        formNote.textContent = "お名前・電話番号・希望日・来院区分は必須です。入力内容をご確認ください。";
      }
      return;
    }

    const submittedAt = new Date().toISOString();
    const reservationId = `KW-${new Date().getTime().toString().slice(-8)}`;
    const reminderUrl = buildReminderUrl(preferredDate, name);

    trackEvent("reserve_submit", {
      form_id: form.id || "contactForm",
      reserve_channel: "web_form",
      preferred_date: preferredDate,
      visit_type: visitType,
      preferred_time: preferredTime || "none",
      urgency,
      has_email: email ? "yes" : "no",
      has_message: message ? "yes" : "no"
    });

    if (formNote) {
      const reminderLink = reminderUrl
        ? ` <a href="${reminderUrl}" target="_blank" rel="noopener" data-reminder-link>前日リマインドを登録</a>`
        : "";
      formNote.innerHTML = `予約希望を受け付けました（受付番号: ${reservationId}）。確認の自動返信をお送りします。${reminderLink}`;
    }

    const followupState = {
      pagePath: window.location.pathname,
      formId: form.id || "contactForm",
      reservationId,
      submittedAt,
      preferredDate,
      visitType,
      preferredTime,
      urgency
    };

    saveFollowupState(followupState);
    renderFollowupPanel(form, followupState);

    trackEvent("reserve_followup_view", {
      reservation_id: reservationId,
      visit_type: visitType,
      urgency
    });

    form.reset();

    syncClinicLinks();
  });
});

const heroCarousel = document.querySelector("[data-hero-carousel]");
if (heroCarousel) {
  const track = heroCarousel.querySelector(".heroSlider__track");
  const slides = Array.from(heroCarousel.querySelectorAll(".heroSlide"));
  const dotsWrap = heroCarousel.querySelector(".heroSlider__dots");
  let dots = Array.from(heroCarousel.querySelectorAll("[data-carousel-dot]"));
  const prevBtn = heroCarousel.querySelector("[data-carousel-prev]");
  const nextBtn = heroCarousel.querySelector("[data-carousel-next]");
  const toggleBtn = heroCarousel.querySelector("[data-carousel-toggle]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let autoplay = !prefersReduced.matches;
  let timerId = null;
  let touchStartX = null;
  let touchStartY = null;

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

  if (dotsWrap && dots.length !== slides.length) {
    dotsWrap.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="heroDot${i === 0 ? " is-active" : ""}" type="button" data-carousel-dot="${i}" aria-label="${i + 1}枚目" aria-current="${i === 0 ? "true" : "false"}"></button>`
      )
      .join("");
    dots = Array.from(dotsWrap.querySelectorAll("[data-carousel-dot]"));
  }

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

  const resetTouch = () => {
    touchStartX = null;
    touchStartY = null;
  };

  heroCarousel.addEventListener(
    "touchstart",
    (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  heroCarousel.addEventListener(
    "touchend",
    (e) => {
      if (!e.changedTouches || e.changedTouches.length !== 1) return;
      if (touchStartX === null || touchStartY === null) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - touchStartX;
      const deltaY = endY - touchStartY;
      resetTouch();

      if (Math.abs(deltaX) < 42) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

      update(deltaX > 0 ? index - 1 : index + 1);
      setAutoplay(false);
    },
    { passive: true }
  );

  heroCarousel.addEventListener("touchcancel", resetTouch, { passive: true });

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
