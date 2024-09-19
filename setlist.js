const setlist = [];
let songCount = 0; // 曲数カウント用
let invertColors = false; // 白黒反転フラグ

// 曲を追加する関数
function addSong() {
  const songInput = document.getElementById("song-input");
  const song = songInput.value.trim();

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

// 曲を削除する関数
function deleteSong(index) {
  setlist.splice(index, 1);
  songCount--;
  updateSetlist();
}

// セットリストを更新する関数
function updateSetlist() {
  const ul = document.getElementById("setlist");
  ul.innerHTML = "";
  let displayCount = 0;

  setlist.forEach((item, index) => {
    const li = document.createElement("li");

    if (item.type === "song") {
      displayCount++;
      li.textContent = `${displayCount}. ${item.name}`;
    } else if (item.type === "mc") {
      li.textContent = item.name;
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.onclick = () => deleteSong(index);
    li.appendChild(deleteButton);

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
  const venueName =
    document.getElementById("venue-name").value.trim() || "会場名未入力";

  let displayCount = 0;
  const previewContent = `
        <div style="font-size: 0.67em; text-align: center; padding: 10px; ${
          invertColors ? "background-color: black; color: white;" : ""
        }">
            <h3 style="font-size: 48px; margin: 0;">${bandName}</h3>
            <p style="font-size: 13px; margin: 0;">${inputDate}</p>
            <p style="font-size: 13px; margin: 0;">${venueName}</p>
            <p style="font-size: 13px; margin: 0;">${eventName}</p>
            <ul style="list-style-type: none; padding: 0;">
                ${setlist
                  .map((item) => {
                    if (item.type === "song") {
                      displayCount++;
                      return `<li style="font-size: 24px; margin-bottom: 1px; word-break: break-word;">${displayCount}. ${item.name}</li>`;
                    } else if (item.type === "mc") {
                      return `<li style="font-size: 24px; margin-bottom: 1px;">${item.name}</li>`;
                    }
                  })
                  .join("")}
            </ul>
        </div>
    `;

  const previewArea = document.getElementById("preview-content");
  previewArea.innerHTML = previewContent;

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
  const venueName =
    document.getElementById("venue-name").value.trim() || "会場名未入力";

  let displayCount = 0;
  const pdfContent = `
        <div style="text-align: center; padding: 20px; ${
          invertColors ? "background-color: black; color: white;" : ""
        }">
            <h1 style="font-size: 72px; margin: 0;">${bandName}</h1>
            <p style="font-size: 25px; margin: 0;">${inputDate}</p>
            <p style="font-size: 25px; margin: 0;">${venueName}</p>
            <p style="font-size: 25px; margin: 0;">${eventName}</p>
            <ul style="list-style-type: none; padding: 0;">
                ${setlist
                  .map((item) => {
                    if (item.type === "song") {
                      displayCount++;
                      return `<li style="font-size: 36px; margin-bottom: 1px; word-break: break-word;">${displayCount}. ${item.name}</li>`;
                    } else if (item.type === "mc") {
                      return `<li style="font-size: 36px; margin-bottom: 1px;">${item.name}</li>`;
                    }
                  })
                  .join("")}
            </ul>
        </div>
    `;

  const opt = {
    margin: [10, 10, 10, 10], // 上、右、下、左の余白
    filename: "setlist.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true }, // クロスオリジンの問題を防ぐ
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" }, // 単位をptに変更
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // ページブレイクをCSSに準拠させる
  };

  html2pdf()
    .from(pdfContent)
    .set(opt)
    .save()
    .then(() => {
      console.log("PDF生成完了");
    })
    .catch((err) => {
      console.error("PDF生成エラー:", err);
    });
}

// 白黒反転を切り替える関数
function toggleInvert() {
  invertColors = !invertColors;
  showPreview();
}
