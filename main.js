const _0x41ad4f = _0x49de;
(function (_0x3a3771, _0x2281df) {
  const _0xdb101f = _0x49de,
    _0x202d47 = _0x3a3771();
  while (!![]) {
    try {
      const _0x57b21c =
        (parseInt(_0xdb101f(0x1e7)) / 0x1) * (-parseInt(_0xdb101f(0x1fb)) / 0x2) +
        (parseInt(_0xdb101f(0x1f6)) / 0x3) * (parseInt(_0xdb101f(0x1f1)) / 0x4) +
        (parseInt(_0xdb101f(0x1cc)) / 0x5) * (-parseInt(_0xdb101f(0x1f7)) / 0x6) +
        (parseInt(_0xdb101f(0x1de)) / 0x7) * (parseInt(_0xdb101f(0x1fc)) / 0x8) +
        (-parseInt(_0xdb101f(0x1ec)) / 0x9) * (-parseInt(_0xdb101f(0x1df)) / 0xa) +
        (-parseInt(_0xdb101f(0x1e6)) / 0xb) * (-parseInt(_0xdb101f(0x1e5)) / 0xc) +
        (-parseInt(_0xdb101f(0x1ce)) / 0xd) * (-parseInt(_0xdb101f(0x1d7)) / 0xe);
      if (_0x57b21c === _0x2281df) break;
      else _0x202d47["push"](_0x202d47["shift"]());
    } catch (_0x1170e0) {
      _0x202d47["push"](_0x202d47["shift"]());
    }
  }
})(_0x43f4, 0x8b1f5);
const geminiApiUrl = _0x41ad4f(0x1f3),
  romajiText = document["getElementById"]("romaji-text"),
  kanaInput = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1e3)),
  submitButton = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1eb)),
  regenerateButton = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1fa)),
  generateButton = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1ea)),
  resultModal = document[_0x41ad4f(0x1cf)]("modal-output"),
  analysisResult = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1cd)),
  closeModalButton = document[_0x41ad4f(0x1cf)]("close-modal"),
  categorySelect = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1e1)),
  lengthTextSelect = document[_0x41ad4f(0x1cf)]("lengt-text"),
  kanjiLevelSelect = document[_0x41ad4f(0x1cf)](_0x41ad4f(0x1ee));
function _0x43f4() {
  const _0x274fa1 = [
    "submit-button",
    "162uVTnCu",
    "POST",
    "kanji",
    "\x20singkat\x20",
    "content",
    "4YEOkzt",
    "\x20bahasa\x20Jepang\x20acak\x20dalam\x20huruf\x20romaji\x20saja,\x20tanpa\x20terjemahan\x20atau\x20catatan\x20tambahan.",
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbENma_1hhoo4cp1ptCP4DmXapdXzwXzQ",
    "length",
    "No\x20candidates\x20found\x20in\x20response",
    "842328qQSXuq",
    "774uaTMNG",
    "parts",
    "application/json",
    "regenerate-button",
    "92iXoVkL",
    "80EMyrId",
    "Please\x20select\x20a\x20category\x20first.",
    "Kanji",
    "Generating\x20text...",
    "15175cfmitG",
    "analysis-result",
    "13jOfaHe",
    "getElementById",
    "Error\x20fetching\x20text:",
    "text",
    "close",
    "Oops...",
    "status",
    "textContent",
    "Error\x20fetching\x20text.\x20Please\x20try\x20again.",
    "2705024xCFHXc",
    "correctText",
    "value",
    "dataset",
    "fire",
    "candidates",
    "showLoading",
    "309064NVvETq",
    "34860lUcgCx",
    "\x20bahasa\x20Jepang\x20dalam\x20bentuk\x20hiragana\x20murni\x20tanpa\x20ada\x20campuran\x20kanji.\x20Berikan\x20hanya\x20teks\x20Jepang\x20tanpa\x20terjemahan\x20atau\x20penjelasan\x20tambahan.",
    "category",
    "Berikan\x20teks\x20読解\x20singkat\x20",
    "kana-input",
    "HTTP\x20error!\x20status:\x20",
    "24nyEDua",
    "714373nsrrlJ",
    "3191MYjVfe",
    "error",
    "Failed\x20to\x20generate\x20new\x20text.\x20Please\x20try\x20again.",
    "generate-button",
  ];
  _0x43f4 = function () {
    return _0x274fa1;
  };
  return _0x43f4();
}
function _0x49de(_0x15678e, _0x42df96) {
  const _0x43f488 = _0x43f4();
  return (
    (_0x49de = function (_0x49de63, _0x5e34da) {
      _0x49de63 = _0x49de63 - 0x1ca;
      let _0x302eff = _0x43f488[_0x49de63];
      return _0x302eff;
    }),
    _0x49de(_0x15678e, _0x42df96)
  );
}
async function fetchText() {
  const _0xbec0a6 = _0x41ad4f;
  if (categorySelect[_0xbec0a6(0x1d9)] === "") {
    romajiText[_0xbec0a6(0x1d5)] = _0xbec0a6(0x1fd);
    return;
  }
  let _0x40f597;
  categorySelect[_0xbec0a6(0x1d9)] === "Kanji"
    ? (_0x40f597 = "Berikan\x20teks\x20読解\x20\x20level\x20JLPT\x20" + kanjiLevelSelect[_0xbec0a6(0x1d9)] + _0xbec0a6(0x1ef) + lengthTextSelect[_0xbec0a6(0x1d9)] + _0xbec0a6(0x1e0))
    : (_0x40f597 = _0xbec0a6(0x1e2) + lengthTextSelect[_0xbec0a6(0x1d9)] + _0xbec0a6(0x1f2));
  const _0x29871e = { contents: [{ parts: [{ text: _0x40f597 }] }] };
  try {
    Swal[_0xbec0a6(0x1db)]({
      title: _0xbec0a6(0x1cb),
      allowOutsideClick: ![],
      showConfirmButton: ![],
      willOpen: () => {
        const _0xa5aee7 = _0xbec0a6;
        Swal[_0xa5aee7(0x1dd)]();
      },
    });
    const _0xdc6a35 = await fetch(geminiApiUrl, { method: _0xbec0a6(0x1ed), headers: { "Content-Type": _0xbec0a6(0x1f9) }, body: JSON["stringify"](_0x29871e) });
    if (!_0xdc6a35["ok"]) throw new Error(_0xbec0a6(0x1e4) + _0xdc6a35[_0xbec0a6(0x1d4)]);
    const _0x426893 = await _0xdc6a35["json"]();
    if (_0x426893 && _0x426893[_0xbec0a6(0x1dc)] && _0x426893["candidates"][_0xbec0a6(0x1f4)] > 0x0) {
      let _0x44743d = _0x426893[_0xbec0a6(0x1dc)][0x0][_0xbec0a6(0x1f0)][_0xbec0a6(0x1f8)][0x0][_0xbec0a6(0x1d1)];
      (_0x44743d = _0x44743d["split"](/\n|Terjemahan:|Catatan:/)[0x0]["trim"]()),
        (_0x44743d = _0x44743d["replace"](/^(Teks:|Text:)/i, "")["trim"]()),
        categorySelect[_0xbec0a6(0x1d9)] !== _0xbec0a6(0x1ca) && (_0x44743d = _0x44743d["replace"](/[^a-zA-Z\s]/g, "")),
        (romajiText[_0xbec0a6(0x1d5)] = _0x44743d),
        (romajiText[_0xbec0a6(0x1da)][_0xbec0a6(0x1d8)] = _0x44743d),
        Swal[_0xbec0a6(0x1d2)]();
    } else throw new Error(_0xbec0a6(0x1f5));
  } catch (_0x474a68) {
    console[_0xbec0a6(0x1e8)](_0xbec0a6(0x1d0), _0x474a68), (romajiText["textContent"] = _0xbec0a6(0x1d6)), Swal[_0xbec0a6(0x1db)]({ icon: _0xbec0a6(0x1e8), title: _0xbec0a6(0x1d3), text: _0xbec0a6(0x1e9) });
  }
}
async function checkUserInput() {
  const correctText = romajiText.dataset.correctText;
  const userInput = kanaInput.value;

  let prompt;
  if (categorySelect.value === "Kanji") {
    prompt = `
Anda adalah seorang ahli konversi kanji ke hiragana dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah kanji pengguna benar-benar sesuai dengan teks hiragana yang diberikan, tanpa membuat asumsi atau koreksi tambahan.

Kanji pengguna: "${userInput}"
Teks hiragana: "${correctText}"

Instruksi:
1. Teks hiragana tersebut anda konversikan terlebih dahulu dalam bentuk kanji kemudian konversikan kanji pengguna ke dalam bentuk hiragana, mempertahankan struktur kalimat, spasi, dan tanda baca persis seperti dalam input kanji.
2. Bandingkan hasil konversi tersebut dengan kanji yg anda konversikan sebelumnya, karakter per karakter, termasuk spasi dan tanda baca.
3. Jika dan hanya jika ada perbedaan antara hasil konversi dan teks kanji yang benar, berikan umpan balik dalam format berikut:
   - Kesalahan: [bagian kanji yang tidak sesuai setelah dikonversi ke hiragana dan apa kanji yg tepat dan benar?]
   - Seharusnya: [sarankan kanji yg tepat jika kanji pengguna salah]
   - Penjelasan: [penjelasan singkat tentang perbedaannya, fokus hanya pada perbedaan karakter]

4. Jika tidak ada perbedaan sama sekali antara hasil konversi dan teks hiragana yang diberikan, nyatakan bahwa kanji pengguna sudah benar dan sesuai serta berikan apresiasi.
5. Fokus hanya pada kesesuaian karakter per karakter antara kanji (setelah dikonversi ke hiragana) dan teks hiragana yang diberikan. Jangan mempertimbangkan tata bahasa, makna, atau aturan penulisan lainnya.
6. Jangan membuat asumsi tentang pemisahan kata, bentuk konjugasi, atau perubahan bentuk lainnya. Konversi harus dilakukan secara harfiah, karakter per karakter.
7. Lakukan verifikasi ganda sebelum memberikan umpan balik untuk memastikan keakuratan analisis Anda.
8. Gunakan bahasa Indonesia yang formal dan mudah dipahami dalam penjelasan Anda.
9. Berikan terjemahan bahasa Indonesia dari teks kanji yang diinputkan.

Penting: Jangan membuat asumsi atau koreksi di luar apa yang diberikan dalam input. Tujuan utama adalah memverifikasi kesesuaian karakter per karakter antara kanji (setelah dikonversi ke hiragana) dan teks hiragana yang diberikan.
Berikan analisis Anda secara ringkas dan akurat.`;
  } else {
    prompt = `
Anda adalah seorang guru pendidikan bahasa jepang sekaligus ahli konversi hiragana ke romaji dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah hiragana pengguna benar-benar sesuai dengan teks romaji yang diberikan, tanpa membuat asumsi atau koreksi tambahan.

Hiragana pengguna: "${userInput}"
Teks romaji: "${correctText}"

Instruksi:
1. Konversikan  hiragana pengguna ke dalam bentuk romaji.
2. Bandingkan hasil konversi tersebut dengan teks romaji yang benar, karakter per karakter.
3. Jika dan hanya jika ada perbedaan antara hasil konversi dan teks romaji yang benar, berikan umpan balik dalam format berikut:
   - Kesalahan: [bagian hiragana yang tidak sesuai]
   - Seharusnya: [bagian romaji yang benar]
   - Penjelasan: [penjelasan singkat tentang perbedaannya]

4. Jika tidak ada perbedaan sama sekali, nyatakan bahwa hiragana pengguna sudah benar dan sesuai dengan teks romaji yang diberikan.
5. Fokus hanya pada kesesuaian antara hiragana dan romaji, bukan pada tata bahasa atau makna.
6. Lakukan verifikasi ganda sebelum memberikan umpan balik untuk memastikan keakuratan analisis Anda.
7. Gunakan bahasa Indonesia yang formal dan mudah dipahami dalam penjelasan Anda.
8. Berikan terjemahan bahasa indonesia dari teks hiragana yg di inputkan 

Penting: Jangan membuat asumsi atau koreksi di luar apa yang diberikan dalam input. Tujuan utama adalah memverifikasi kesesuaian antara hiragana dan teks romaji yang diberikan.

Berikan analisis Anda secara ringkas dan akurat.`;
  }

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    Swal.fire({
      title: "Menganalisis...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(geminiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.candidates && data.candidates.length > 0) {
      let analysisResultText = data.candidates[0].content.parts[0].text;

      // Apply text formatting using regular expressions
      analysisResultText = analysisResultText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      analysisResultText = analysisResultText.replace(/\*(.*?)\*/g, "<i>$1</i>");
      analysisResultText = analysisResultText.replace(/~~(.*?)~~/g, "<s>$1</s>");
      analysisResultText = analysisResultText.replace(/^#\s+(.*)/gm, "<h1>$1</h1>");
      analysisResultText = analysisResultText.replace(/^##\s+(.*)/gm, "<h2>$1</h2>");
      analysisResultText = analysisResultText.replace(/^###\s+(.*)/gm, "<h3>$1</h3>");
      analysisResultText = analysisResultText.replace(/^>\s+(.*)/gm, "<blockquote>$1</blockquote>");
      analysisResultText = analysisResultText.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
      analysisResultText = analysisResultText.replace(/\n(?!<\/?(h1|h2|h3|blockquote|pre|code)>)/g, "<br>");

      analysisResult.innerHTML = analysisResultText;
      Swal.close();
      showModal();
    } else {
      throw new Error("No analysis found in response");
    }
  } catch (error) {
    console.error("Error checking input:", error);
    analysisResult.textContent = "Terjadi kesalahan saat menganalisis input. Silakan coba lagi.";
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Gagal menganalisis input. Silakan coba lagi.",
    });
  }
}

const _0x49d252 = _0x407d;
(function (_0x25de78, _0x5a8629) {
  const _0x3d50f8 = _0x407d,
    _0x15866f = _0x25de78();
  while (!![]) {
    try {
      const _0x4f9744 =
        -parseInt(_0x3d50f8(0x75)) / 0x1 +
        (parseInt(_0x3d50f8(0x6e)) / 0x2) * (-parseInt(_0x3d50f8(0x7e)) / 0x3) +
        -parseInt(_0x3d50f8(0x74)) / 0x4 +
        -parseInt(_0x3d50f8(0x72)) / 0x5 +
        (parseInt(_0x3d50f8(0x7b)) / 0x6) * (parseInt(_0x3d50f8(0x81)) / 0x7) +
        (-parseInt(_0x3d50f8(0x69)) / 0x8) * (parseInt(_0x3d50f8(0x79)) / 0x9) +
        (parseInt(_0x3d50f8(0x84)) / 0xa) * (parseInt(_0x3d50f8(0x87)) / 0xb);
      if (_0x4f9744 === _0x5a8629) break;
      else _0x15866f["push"](_0x15866f["shift"]());
    } catch (_0x5ea081) {
      _0x15866f["push"](_0x15866f["shift"]());
    }
  }
})(_0xd9e3, 0xd315d);
function _0xd9e3() {
  const _0x4269a4 = [
    "style",
    "DOM\x20fully\x20loaded",
    "132522BIhETp",
    "change",
    "Input\x20Required",
    "fire",
    "1621105UNBSoB",
    "warning",
    "1122288Yqibmi",
    "1289757kfXbsz",
    "add",
    "log",
    "preventDefault",
    "9OgJxJB",
    "hidden",
    "3462aHaRnk",
    "block",
    "display",
    "30HJySlS",
    "addEventListener",
    "classList",
    "6167rKLkMQ",
    "click",
    "value",
    "2210ePpKtH",
    "remove",
    "none",
    "193391KxKqah",
    "7775784VHcZhX",
    "Silakan\x20masukkan\x20teks\x20sebelum\x20mengirim.",
    "trim",
  ];
  _0xd9e3 = function () {
    return _0x4269a4;
  };
  return _0xd9e3();
}
function handleCategoryChange() {
  const _0x3c47d3 = _0x407d;
  categorySelect[_0x3c47d3(0x83)] === "Kanji" ? (kanjiLevelSelect[_0x3c47d3(0x6c)][_0x3c47d3(0x7d)] = _0x3c47d3(0x7c)) : (kanjiLevelSelect[_0x3c47d3(0x6c)][_0x3c47d3(0x7d)] = _0x3c47d3(0x86)),
    (romajiText["textContent"] = "Choose\x20category\x20and\x20generate\x20text\x20for\x20training");
}
function handleSubmit(_0x54ba37) {
  const _0x12994f = _0x407d;
  _0x54ba37[_0x12994f(0x78)]();
  const _0x26c0bf = kanaInput[_0x12994f(0x83)][_0x12994f(0x6b)]();
  if (!_0x26c0bf) {
    Swal[_0x12994f(0x71)]({ icon: _0x12994f(0x73), title: _0x12994f(0x70), text: _0x12994f(0x6a) });
    return;
  }
  checkUserInput();
}
function showModal() {
  const _0x39647c = _0x407d;
  resultModal[_0x39647c(0x80)][_0x39647c(0x85)](_0x39647c(0x7a)), (kanaInput[_0x39647c(0x83)] = "");
}
function _0x407d(_0x458c1f, _0x1986bf) {
  const _0xd9e37c = _0xd9e3();
  return (
    (_0x407d = function (_0x407d73, _0x592fd5) {
      _0x407d73 = _0x407d73 - 0x69;
      let _0x2f75e4 = _0xd9e37c[_0x407d73];
      return _0x2f75e4;
    }),
    _0x407d(_0x458c1f, _0x1986bf)
  );
}
function closeModal() {
  const _0x36dd34 = _0x407d;
  resultModal["classList"][_0x36dd34(0x76)]("hidden");
}
function addEventListeners() {
  const _0xe7edb5 = _0x407d;
  regenerateButton[_0xe7edb5(0x7f)](_0xe7edb5(0x82), fetchText),
    generateButton[_0xe7edb5(0x7f)]("click", fetchText),
    submitButton[_0xe7edb5(0x7f)](_0xe7edb5(0x82), handleSubmit),
    closeModalButton["addEventListener"](_0xe7edb5(0x82), closeModal),
    categorySelect["addEventListener"](_0xe7edb5(0x6f), handleCategoryChange);
}
document[_0x49d252(0x7f)]("DOMContentLoaded", () => {
  const _0xc39388 = _0x49d252;
  console[_0xc39388(0x77)](_0xc39388(0x6d)), addEventListeners(), handleCategoryChange();
});
