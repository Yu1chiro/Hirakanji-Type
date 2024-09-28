// Load environment variables
// main.js

const _0x3b1e30 = _0x1e18;
function _0x1e18(_0x17bd15, _0x19e8eb) {
  const _0x5a6f3f = _0x5a6f();
  return (
    (_0x1e18 = function (_0x1e18da, _0xac9d32) {
      _0x1e18da = _0x1e18da - 0x140;
      let _0x22b4e9 = _0x5a6f3f[_0x1e18da];
      return _0x22b4e9;
    }),
    _0x1e18(_0x17bd15, _0x19e8eb)
  );
}
(function (_0x249928, _0x34302b) {
  const _0x3fb2bc = _0x1e18,
    _0x5ab78b = _0x249928();
  while (!![]) {
    try {
      const _0x1ad428 =
        (-parseInt(_0x3fb2bc(0x14c)) / 0x1) * (-parseInt(_0x3fb2bc(0x167)) / 0x2) +
        -parseInt(_0x3fb2bc(0x140)) / 0x3 +
        -parseInt(_0x3fb2bc(0x14d)) / 0x4 +
        (parseInt(_0x3fb2bc(0x16c)) / 0x5) * (parseInt(_0x3fb2bc(0x155)) / 0x6) +
        parseInt(_0x3fb2bc(0x16d)) / 0x7 +
        (parseInt(_0x3fb2bc(0x158)) / 0x8) * (-parseInt(_0x3fb2bc(0x169)) / 0x9) +
        parseInt(_0x3fb2bc(0x14e)) / 0xa;
      if (_0x1ad428 === _0x34302b) break;
      else _0x5ab78b["push"](_0x5ab78b["shift"]());
    } catch (_0x194d9f) {
      _0x5ab78b["push"](_0x5ab78b["shift"]());
    }
  }
})(_0x5a6f, 0xce931);
const romajiText = document["getElementById"](_0x3b1e30(0x14b)),
  kanaInput = document[_0x3b1e30(0x156)](_0x3b1e30(0x144)),
  submitButton = document[_0x3b1e30(0x156)]("submit-button"),
  regenerateButton = document[_0x3b1e30(0x156)](_0x3b1e30(0x14a)),
  generateButton = document["getElementById"]("generate-button"),
  resultModal = document[_0x3b1e30(0x156)](_0x3b1e30(0x141)),
  analysisResult = document[_0x3b1e30(0x156)](_0x3b1e30(0x148)),
  closeModalButton = document[_0x3b1e30(0x156)](_0x3b1e30(0x157)),
  categorySelect = document[_0x3b1e30(0x156)]("category"),
  lengthTextSelect = document[_0x3b1e30(0x156)]("lengt-text"),
  kanjiLevelSelect = document["getElementById"](_0x3b1e30(0x171));
async function getGeminiApiUrl() {
  const _0x4ac1ad = _0x3b1e30,
    _0x2d1386 = await fetch("/api/geminiApiUrl"),
    _0x4a071b = await _0x2d1386[_0x4ac1ad(0x15b)]();
  return _0x4a071b[_0x4ac1ad(0x160)];
}
async function fetchText() {
  const _0x41a916 = _0x3b1e30;
  if (categorySelect[_0x41a916(0x16e)] === "") {
    romajiText[_0x41a916(0x170)] = _0x41a916(0x168);
    return;
  }
  let _0x1709c8;
  categorySelect[_0x41a916(0x16e)] === _0x41a916(0x159)
    ? (_0x1709c8 = _0x41a916(0x15a) + kanjiLevelSelect["value"] + _0x41a916(0x154) + lengthTextSelect[_0x41a916(0x16e)] + _0x41a916(0x16a))
    : (_0x1709c8 = _0x41a916(0x149) + lengthTextSelect["value"] + _0x41a916(0x15c));
  const _0x503dd3 = { contents: [{ parts: [{ text: _0x1709c8 }] }] };
  try {
    Swal[_0x41a916(0x16b)]({
      title: _0x41a916(0x14f),
      allowOutsideClick: ![],
      showConfirmButton: ![],
      willOpen: () => {
        const _0x53f75c = _0x41a916;
        Swal[_0x53f75c(0x16f)]();
      },
    });
    const _0x520987 = await getGeminiApiUrl(),
      _0x84a867 = await fetch(_0x520987, { method: _0x41a916(0x153), headers: { "Content-Type": _0x41a916(0x151) }, body: JSON[_0x41a916(0x143)](_0x503dd3) });
    if (!_0x84a867["ok"]) throw new Error(_0x41a916(0x150) + _0x84a867[_0x41a916(0x15d)]);
    const _0x1986f8 = await _0x84a867["json"]();
    if (_0x1986f8 && _0x1986f8[_0x41a916(0x147)] && _0x1986f8[_0x41a916(0x147)][_0x41a916(0x166)] > 0x0) {
      let _0x54e218 = _0x1986f8[_0x41a916(0x147)][0x0]["content"]["parts"][0x0][_0x41a916(0x164)];
      (_0x54e218 = _0x54e218[_0x41a916(0x165)](/\n|Terjemahan:|Catatan:/)[0x0]["trim"]()),
        (_0x54e218 = _0x54e218[_0x41a916(0x15e)](/^(Teks:|Text:)/i, "")["trim"]()),
        categorySelect[_0x41a916(0x16e)] !== _0x41a916(0x159) && (_0x54e218 = _0x54e218[_0x41a916(0x15e)](/[^a-zA-Z\s]/g, "")),
        (romajiText["textContent"] = _0x54e218),
        (romajiText["dataset"][_0x41a916(0x163)] = _0x54e218),
        Swal[_0x41a916(0x161)]();
    } else throw new Error(_0x41a916(0x146));
  } catch (_0x35132e) {
    console[_0x41a916(0x145)](_0x41a916(0x15f), _0x35132e), (romajiText["textContent"] = _0x41a916(0x142)), Swal["fire"]({ icon: _0x41a916(0x145), title: _0x41a916(0x152), text: _0x41a916(0x162) });
  }
}
function _0x5a6f() {
  const _0x18c65a = [
    "kanji",
    "413991nfzRFA",
    "modal-output",
    "Error\x20fetching\x20text.\x20Please\x20try\x20again.",
    "stringify",
    "kana-input",
    "error",
    "No\x20candidates\x20found\x20in\x20response",
    "candidates",
    "analysis-result",
    "Berikan\x20teks\x20読解\x20singkat\x20",
    "regenerate-button",
    "romaji-text",
    "2nARgCJ",
    "6074984xzjVIb",
    "11188470UzGeTk",
    "Generating\x20text...",
    "HTTP\x20error!\x20status:\x20",
    "application/json",
    "Oops...",
    "POST",
    "\x20singkat\x20",
    "295176eNoTkt",
    "getElementById",
    "close-modal",
    "16XAMZkl",
    "Kanji",
    "Berikan\x20teks\x20読解\x20level\x20JLPT\x20",
    "json",
    "\x20bahasa\x20Jepang\x20acak\x20dalam\x20huruf\x20romaji\x20saja,\x20tanpa\x20terjemahan\x20atau\x20catatan\x20tambahan.",
    "status",
    "replace",
    "Error\x20fetching\x20text:",
    "geminiApiUrl",
    "close",
    "Failed\x20to\x20generate\x20new\x20text.\x20Please\x20try\x20again.",
    "correctText",
    "text",
    "split",
    "length",
    "363348eMyWXa",
    "Please\x20select\x20a\x20category\x20first.",
    "2983563TtRajG",
    "\x20bahasa\x20Jepang\x20dalam\x20bentuk\x20hiragana\x20murni\x20tanpa\x20ada\x20campuran\x20kanji.\x20Berikan\x20hanya\x20teks\x20Jepang\x20tanpa\x20terjemahan\x20atau\x20penjelasan\x20tambahan.",
    "fire",
    "25yUuABw",
    "10063977NvioWf",
    "value",
    "showLoading",
    "textContent",
  ];
  _0x5a6f = function () {
    return _0x18c65a;
  };
  return _0x5a6f();
}
// Other functions stay the same...

// ... kode sebelumnya tetap sama ...

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

    // Tambahkan pemanggilan getGeminiApiUrl di sini
    const geminiApiUrl = await getGeminiApiUrl();

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

// ... kode selanjutnya tetap sama ...

//
function _0x78d7(_0x337da3, _0x36a2bd) {
  const _0x1b5bd5 = _0x1b5b();
  return (
    (_0x78d7 = function (_0x78d7d9, _0x9bdf3d) {
      _0x78d7d9 = _0x78d7d9 - 0x17a;
      let _0x4c3824 = _0x1b5bd5[_0x78d7d9];
      return _0x4c3824;
    }),
    _0x78d7(_0x337da3, _0x36a2bd)
  );
}
const _0x349320 = _0x78d7;
(function (_0x3583dc, _0x39cf83) {
  const _0x586fe9 = _0x78d7,
    _0x25a82e = _0x3583dc();
  while (!![]) {
    try {
      const _0x5abe9d =
        (-parseInt(_0x586fe9(0x187)) / 0x1) * (parseInt(_0x586fe9(0x194)) / 0x2) +
        (parseInt(_0x586fe9(0x191)) / 0x3) * (parseInt(_0x586fe9(0x192)) / 0x4) +
        parseInt(_0x586fe9(0x182)) / 0x5 +
        (parseInt(_0x586fe9(0x17d)) / 0x6) * (-parseInt(_0x586fe9(0x18f)) / 0x7) +
        -parseInt(_0x586fe9(0x190)) / 0x8 +
        parseInt(_0x586fe9(0x185)) / 0x9 +
        parseInt(_0x586fe9(0x18a)) / 0xa;
      if (_0x5abe9d === _0x39cf83) break;
      else _0x25a82e["push"](_0x25a82e["shift"]());
    } catch (_0x2077ad) {
      _0x25a82e["push"](_0x25a82e["shift"]());
    }
  }
})(_0x1b5b, 0x99d9c);
function handleCategoryChange() {
  const _0x37f200 = _0x78d7;
  categorySelect["value"] === _0x37f200(0x183) ? (kanjiLevelSelect[_0x37f200(0x18b)][_0x37f200(0x186)] = _0x37f200(0x18c)) : (kanjiLevelSelect[_0x37f200(0x18b)][_0x37f200(0x186)] = _0x37f200(0x17a)),
    (romajiText["textContent"] = _0x37f200(0x181));
}
function handleSubmit(_0x301d1b) {
  const _0x317d51 = _0x78d7;
  _0x301d1b[_0x317d51(0x17f)]();
  const _0x59ea24 = kanaInput[_0x317d51(0x180)][_0x317d51(0x18e)]();
  if (!_0x59ea24) {
    Swal[_0x317d51(0x189)]({ icon: "warning", title: _0x317d51(0x17e), text: "Silakan\x20masukkan\x20teks\x20sebelum\x20mengirim." });
    return;
  }
  checkUserInput();
}
function showModal() {
  const _0x278401 = _0x78d7;
  resultModal[_0x278401(0x17c)]["remove"](_0x278401(0x184)), (kanaInput[_0x278401(0x180)] = "");
}
function closeModal() {
  const _0x4f65f9 = _0x78d7;
  resultModal[_0x4f65f9(0x17c)]["add"](_0x4f65f9(0x184));
}
function addEventListeners() {
  const _0x53be41 = _0x78d7;
  regenerateButton[_0x53be41(0x17b)](_0x53be41(0x193), fetchText),
    generateButton["addEventListener"]("click", fetchText),
    submitButton[_0x53be41(0x17b)](_0x53be41(0x193), handleSubmit),
    closeModalButton["addEventListener"](_0x53be41(0x193), closeModal),
    categorySelect["addEventListener"](_0x53be41(0x18d), handleCategoryChange);
}
document["addEventListener"](_0x349320(0x188), () => {
  console["log"]("DOM\x20fully\x20loaded"), addEventListeners(), handleCategoryChange();
});
function _0x1b5b() {
  const _0x36c374 = [
    "Input\x20Required",
    "preventDefault",
    "value",
    "Choose\x20category\x20and\x20generate\x20text\x20for\x20training",
    "2489005kFeRuV",
    "Kanji",
    "hidden",
    "8717049MDpMzv",
    "display",
    "653wRzibd",
    "DOMContentLoaded",
    "fire",
    "16609040cFzwWg",
    "style",
    "block",
    "change",
    "trim",
    "42434zWYTgm",
    "8944680yquZxG",
    "1900212wfUxUF",
    "4sTrtnj",
    "click",
    "3490atzGoH",
    "none",
    "addEventListener",
    "classList",
    "864AROjPq",
  ];
  _0x1b5b = function () {
    return _0x36c374;
  };
  return _0x1b5b();
}
