const setlist = [];
let songCount = 0; // 曲数をカウントしていく

// 曲を追加する関数
function addSong() {
  const songInput = document.getElementById("song-input");
  const song = songInput.value.trim();

  // 曲名が入力され、曲数が20未満であれば追加
  if (song && songCount < 20) {
    setlist.push({ type: "song", name: song });
    songCount++;
    updateSetlist();
    songInput.value = "";
  }
}

// MCを追加する関数
function addMC() {
  if (songCount < 20) {
    setlist.push({ type: "mc", name: "MC" });
    updateSetlist();
  }
}

// セットリストを更新する関数
function updateSetlist() {
  const ul = document.getElementById("setlist");
  ul.innerHTML = "";
  let displayCount = 0;

  setlist.forEach((item) => {
    const li = document.createElement("li");

    if (item.type === "song") {
      displayCount++;
      li.textContent = `${displayCount}. ${item.name}`;
    } else if (item.type === "mc") {
      li.textContent = item.name;
    }

    ul.appendChild(li);
  });
}

// プレビューを表示する関数
function showPreview() {
  const bandName =
    document.getElementById("band-name").value.trim() || "バンド名未入力";
  const eventName =
    document.getElementById("event-name").value.trim() || "イベント名未入力";
  const inputDate =
    document.getElementById("date-input").value.trim() || "日付未入力";

  let displayCount = 0;
  const previewContent = `
        <h3 style="font-size: 72px; text-align: center;">${bandName}</h3>
        <p style="font-size: 60px; text-align: center;">${inputDate}</p>
        <p style="font-size: 54px; text-align: center;">${eventName}</p>
        <ul style="list-style-type: none; padding: 0; text-align: center;">
            ${setlist
              .map((item) => {
                if (item.type === "song") {
                  displayCount++;
                  return `<li style="font-size: 48px;">${displayCount}. ${item.name}</li>`;
                } else if (item.type === "mc") {
                  return `<li style="font-size: 48px;">${item.name}</li>`;
                }
              })
              .join("")}
        </ul>
    `;

  const previewArea = document.getElementById("preview-content");
  previewArea.innerHTML = previewContent;

  // プレビューエリアを表示
  document.getElementById("preview-area").style.display = "block";
}

// PDFを生成する関数
function generatePDF() {
  const bandName =
    document.getElementById("band-name").value.trim() || "バンド名未入力";
  const eventName =
    document.getElementById("event-name").value.trim() || "イベント名未入力";
  const inputDate =
    document.getElementById("date-input").value.trim() || "日付未入力";

  let displayCount = 0;
  const pdfContent = `
        <div style="text-align: center; padding: 20px;">
            <h1 style="font-size: 50px;">${bandName}</h1>
            <p style="font-size: 20px;">${inputDate}</p>
            <p style="font-size: 40px;">${eventName}</p>
            <ul style="list-style-type: none; padding: 0;">
                ${setlist
                  .map((item) => {
                    if (item.type === "song") {
                      displayCount++;
                      return `<li style="font-size: 48px;">${displayCount}. ${item.name}</li>`;
                    } else if (item.type === "mc") {
                      return `<li style="font-size: 48px;">${item.name}</li>`;
                    }
                  })
                  .join("")}
            </ul>
        </div>
    `;

  const opt = {
    margin: 1,
    filename: "setlist.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  // PDFを生成
  html2pdf().from(pdfContent).set(opt).save();
}
