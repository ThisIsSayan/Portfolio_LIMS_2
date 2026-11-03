/* ============ EDIT YOUR CONTENT HERE ============ */
const DATA = {
  jobs: [
    {
      now: true,
      title: "Associate Projects",
      company: "Cognizant",
      when: "Mar 2026 – Present",
      bullets: [
        "ADD a bullet from your LinkedIn: what you own or deliver in this role.",
        "ADD a bullet: clients, systems or technologies you work with.",
        "ADD a bullet: a result you can point to.",
      ],
      tags: ["LIMS"],
    },
    {
      title: "Associate Solution Engineer",
      company: "LabVantage Solutions Inc.",
      when: "Aug 2023 – ADD END DATE",
      bullets: [
        "Developed and tested across LabVantage LIMS modules, owning several end to end through the full development lifecycle.",
        "Configured and extended LIMS to match each client's workflows and business logic.",
        "Built instrument driver integrations in production-level Java.",
        "Designed backend data flows with SQL and Oracle, and built interactive Jaspersoft reports for specific customer needs.",
        "Ran Xray test plans with traceability through the QA cycle and performed IQ executions for clients.",
        "Led client sessions on requirements, demos, user training and feedback across North America and Europe.",
        "Supported production rollouts and post-deployment stability with senior engineers on version control, deployment pipelines and release coordination.",
        "Received the Make Us Proud Award for Q4 2024–2025.",
      ],
      tags: [
        "Java",
        "Oracle",
        "SQL",
        "JavaScript",
        "Jaspersoft",
        "BarTender",
        "Xray",
      ],
    },
    {
      title: "Associate Solution Engineer Trainee",
      company: "LabVantage Solutions Inc.",
      when: "Jan 2023 – Aug 2023",
      bullets: [
        "Learned LIMS deployment hands-on and contributed to client rollouts.",
        "Built Java proficiency by solving real-world programming problems.",
        "Wrote optimized SQL with joins across complex pharma data models.",
        "Learned the full project lifecycle and its best practices.",
      ],
      tags: ["Java", "SQL", "LIMS"],
    },
  ],
  skills: [
    ["Languages", ["Java", "Groovy", "SQL", "JavaScript"]],
    ["Databases and data", ["Oracle", "Query optimization", "Talend"]],
    ["Reporting and labels", ["JasperSoft Studio", "BarTender"]],
    ["Testing and APIs", ["Xray", "SoapUI", "Postman"]],
    ["Workflow", ["Git", "Jira", "Confluence", "VS Code"]],
  ],
  work: [
    [
      "Instrument driver integrations",
      "Production Java drivers that connect lab instruments to LabVantage LIMS so results flow in without manual entry.",
      ["Java", "LIMS"],
    ],
    [
      "Custom Jaspersoft reports",
      "Interactive reports shaped around each customer's data and review process.",
      ["JasperSoft", "SQL"],
    ],
    [
      "Pharma data models",
      "Oracle and SQL data flows built for complex pharma datasets.",
      ["Oracle", "SQL"],
    ],
    [
      "LIMS configuration and rollout",
      "Tailoring workflows to client business logic, then supporting go-live and the weeks after.",
      ["LabVantage", "Groovy"],
    ],
    [
      "Test management and IQ execution",
      "Xray test plans with full traceability, plus installation qualification runs for client sign-off.",
      ["Xray", "Jira", "Postman"],
    ],
  ],
};
/* ================================================= */

const $ = (s) => document.querySelector(s);
const esc = (s) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const chips = (a) =>
  a.map((t) => `<span class="chip">${esc(t)}</span>`).join("");

// photo fallback: monogram if photo.jpg is missing
$("#photo").addEventListener("error", () => {
  $("#photoBox").innerHTML = '<span class="mono">SC</span>';
});

// ticker
const words = [
  "LIMS",
  "Java",
  "Oracle",
  "SQL",
  "Jaspersoft",
  "Xray",
  "GxP-minded",
  "Pharma data",
];
$("#track").innerHTML = [...words, ...words, ...words, ...words]
  .map((w) => `<span>${w}</span><b>✦</b>`)
  .join("");

// skills
$("#skillGrid").innerHTML = DATA.skills
  .map(
    ([h, c]) =>
      `<div class="bx"><h3>${esc(h)}</h3><div class="chips">${chips(c)}</div></div>`,
  )
  .join("");

// experience
$("#chain").innerHTML = DATA.jobs
  .map(
    (j, i) => `
  <article class="job${j.now ? " now" : ""}${i === 0 || i === 1 ? " open" : ""}">
    <button class="head" aria-expanded="${i < 2}">
      <div><h3>${esc(j.title)}</h3><div class="co">${esc(j.company)}</div></div>
      <div class="when">${esc(j.when)}<span class="chev" aria-hidden="true">▾</span></div>
    </button>
    <div class="body"><div class="inner"><ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul><div class="chips">${chips(j.tags)}</div></div></div>
  </article>`,
  )
  .join("");
document.querySelectorAll(".job .head").forEach((h) =>
  h.addEventListener("click", () => {
    const j = h.closest(".job");
    h.setAttribute("aria-expanded", j.classList.toggle("open"));
  }),
);

// work
$("#workGrid").innerHTML = DATA.work
  .map(
    ([t, d, tags]) => `
  <article class="card"><h3>${esc(t)}</h3><p>${esc(d)}</p><div class="chips">${chips(tags)}</div>
  <div class="links2"><a href="#">Live demo</a><a href="#">Source code</a></div></article>`,
  )
  .join("");

// nav
const menu = $(".menu"),
  links = $("#links");
menu.addEventListener("click", () =>
  menu.setAttribute("aria-expanded", links.classList.toggle("open")),
);
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }
});
const anchors = [...links.querySelectorAll("a")];
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting)
        anchors.forEach((a) =>
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("main section").forEach((s) => io.observe(s));

// cursor glow (fine pointers only)
if (matchMedia("(pointer:fine)").matches) {
  addEventListener(
    "pointermove",
    (e) => {
      const g = $("#glow");
      g.style.setProperty("--x", e.clientX + "px");
      g.style.setProperty("--y", e.clientY + "px");
    },
    { passive: true },
  );
}

// contact form: opens visitor's email app (no backend needed)
const form = $("#form"),
  st = $("#status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form),
    n = d.get("name").trim(),
    em = d.get("email").trim(),
    m = d.get("message").trim();
  if (!n || !/^\S+@\S+\.\S+$/.test(em) || !m) {
    st.style.color = "#ffb454";
    st.textContent = "Add your name, a valid email and a message.";
    return;
  }
  location.href =
    "mailto:susmitachattaraj47@gmail.com?subject=" +
    encodeURIComponent("Portfolio message from " + n) +
    "&body=" +
    encodeURIComponent(m + "\n\n— " + n + " (" + em + ")");
  st.style.color = "";
  st.textContent = "Opening your email app…";
});
$("#yr").textContent = new Date().getFullYear();
