const weddingDate = new Date("2027-06-26T16:00:00-06:00");
function updateCountdown() {
  let diff = Math.max(0, weddingDate.getTime() - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(d).padStart(3, "0");
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("minutes").textContent = String(m).padStart(2, "0");
  document.getElementById("seconds").textContent = String(s).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const inviteNames = [
  "Familia Martínez",
  "Familia Hernández",
  "Familia Ramírez",
  "Familia López",
  "Familia Torres",
  "Familia García",
  "Familia Flores",
  "Familia Rivera",
  "Familia Sánchez",
  "Familia Cruz",
];
const chosenInvite =
  inviteNames[Math.floor(Math.random() * inviteNames.length)];
document.getElementById("randomGuestName").textContent = chosenInvite;
let attendance = "yes";
let guestCount = 1;
const countInput = document.getElementById("guestCount");
const countDisplay = document.getElementById("guestCountDisplay");
function renderGuestCount() {
  countInput.value = String(guestCount);
  countDisplay.textContent = String(guestCount);
  document.getElementById("minusGuest").disabled = guestCount <= 1;
  document.getElementById("plusGuest").disabled = guestCount >= 4;
}
document.getElementById("minusGuest").addEventListener("click", () => {
  if (guestCount > 1) {
    guestCount--;
    renderGuestCount();
  }
});
document.getElementById("plusGuest").addEventListener("click", () => {
  if (guestCount < 4) {
    guestCount++;
    renderGuestCount();
  }
});
renderGuestCount();
document.querySelectorAll("[data-choice]").forEach((btn) =>
  btn.addEventListener("click", () => {
    attendance = btn.dataset.choice;
    document
      .querySelectorAll("[data-choice]")
      .forEach((b) => b.classList.toggle("rsvp__choice--active", b === btn));
    renderGuestCount();
    document.getElementById("minusGuest").disabled =
      attendance === "no" || guestCount <= 1;
    document.getElementById("plusGuest").disabled =
      attendance === "no" || guestCount >= 4;
  }),
);
document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = chosenInvite;
  const response = attendance === "yes" ? "Asistiré" : "No asistiré";
  const summary = `Confirmación RSVP — Regina & César\nInvitación: ${chosenInvite}\nNombre: ${name}\nRespuesta: ${response}${attendance === "yes" ? "\nNúmero de asistentes: " + guestCount : ""}\nFecha: 26 de junio de 2027`;
  document.getElementById("formNotice").textContent =
    "¡Gracias! Tu respuesta está lista. Para enviarla a los novios, puedes copiarla y compartirla por WhatsApp.";
  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn btn-outline";
  copyBtn.textContent = "Copiar confirmación";
  copyBtn.onclick = () =>
    navigator.clipboard
      .writeText(summary)
      .then(
        () =>
          (document.getElementById("formNotice").textContent =
            "Confirmación copiada. ¡Gracias!"),
      )
      .catch(() => {
        document.getElementById("formNotice").textContent = summary;
      });
  const old = document.getElementById("copyConfirmation");
  if (old) old.remove();
  copyBtn.id = "copyConfirmation";
  document.getElementById("formNotice").after(copyBtn);
});
document.getElementById("calendarBtn").addEventListener("click", () => {
  const start = "20270626T220000Z",
    end = "20270627T050000Z";
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Regina y Cesar//Boda//ES\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\nUID:regina-cesar-boda-20270626@example.com\nDTSTAMP:20261026T120000Z\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:Boda de Regina y César\nDESCRIPTION:¡Celebremos juntos! Lugar por confirmar.\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "boda-regina-cesar.ics";
  a.click();
  URL.revokeObjectURL(url);
});

const music = document.getElementById("wedding-music");
const musicButton = document.getElementById("music-toggle");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ Pausar música";
    } catch (error) {
      musicButton.textContent = "No se pudo reproducir";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ Activar música";
  }
});

music.addEventListener("ended", () => {
  musicButton.textContent = "♫ Activar música";
});
