"use strict";

var geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbENma_1hhoo4cp1ptCP4DmXapdXzwXzQ";
var romajiText = document.getElementById('romaji-text');
var kanaInput = document.getElementById('kana-input');
var submitButton = document.getElementById('submit-button');
var regenerateButton = document.getElementById('regenerate-button');
var resultModal = document.getElementById('modal-output');
var analysisResult = document.getElementById('analysis-result');
var closeModalButton = document.getElementById('close-modal');
var categorySelect = document.getElementById('category');
var lengthTextSelect = document.getElementById('lengt-text');
var kanjiLevelSelect = document.getElementById('kanji');

function fetchText() {
  var promptText, requestBody, response, data, generatedText;
  return regeneratorRuntime.async(function fetchText$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(categorySelect.value === '')) {
            _context.next = 3;
            break;
          }

          romajiText.textContent = "Please select a category first.";
          return _context.abrupt("return");

        case 3:
          if (categorySelect.value === 'Kanji') {
            promptText = "Berikan teks \u8AAD\u89E3  level JLPT ".concat(kanjiLevelSelect.value, " singkat ").concat(lengthTextSelect.value, " bahasa Jepang dalam bentuk hiragana murni tanpa ada campuran kanji. Berikan hanya teks Jepang tanpa terjemahan atau penjelasan tambahan.");
          } else {
            promptText = "Berikan teks \u8AAD\u89E3 singkat ".concat(lengthTextSelect.value, " bahasa Jepang acak dalam huruf romaji saja, tanpa terjemahan atau catatan tambahan.");
          }

          requestBody = {
            "contents": [{
              "parts": [{
                "text": promptText
              }]
            }]
          };
          _context.prev = 5;
          Swal.fire({
            title: 'Generating new text...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: function willOpen() {
              Swal.showLoading();
            }
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          }));

        case 9:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          throw new Error("HTTP error! status: ".concat(response.status));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;

          if (!(data && data.candidates && data.candidates.length > 0)) {
            _context.next = 25;
            break;
          }

          generatedText = data.candidates[0].content.parts[0].text; // Clean up the generated text

          generatedText = generatedText.split(/\n|Terjemahan:|Catatan:/)[0].trim();
          generatedText = generatedText.replace(/^(Teks:|Text:)/i, "").trim(); // For romaji, ensure only valid characters are present

          if (categorySelect.value !== 'Kanji') {
            generatedText = generatedText.replace(/[^a-zA-Z\s]/g, '');
          }

          romajiText.textContent = generatedText;
          romajiText.dataset.correctText = generatedText;
          Swal.close();
          _context.next = 26;
          break;

        case 25:
          throw new Error('No candidates found in response');

        case 26:
          _context.next = 33;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](5);
          console.error('Error fetching text:', _context.t0);
          romajiText.textContent = "Error fetching text. Please try again.";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to generate new text. Please try again.'
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 28]]);
}

function checkUserInput() {
  var correctText, userInput, prompt, requestBody, response, data, analysisResultText;
  return regeneratorRuntime.async(function checkUserInput$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          correctText = romajiText.dataset.correctText;
          userInput = kanaInput.value;

          if (categorySelect.value === 'Kanji') {
            prompt = "\nAnda adalah seorang ahli konversi kanji ke hiragana dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah kanji pengguna benar-benar sesuai dengan teks hiragana yang diberikan, tanpa membuat asumsi atau koreksi tambahan.\n\nKanji pengguna: \"".concat(userInput, "\"\nTeks hiragana: \"").concat(correctText, "\"\n\nInstruksi:\n1. Teks hiragana tersebut anda konversikan terlebih dahulu dalam bentuk kanji kemudian konversikan kanji pengguna ke dalam bentuk hiragana, mempertahankan struktur kalimat, spasi, dan tanda baca persis seperti dalam input kanji.\n2. Bandingkan hasil konversi tersebut dengan kanji yg anda konversikan sebelumnya, karakter per karakter, termasuk spasi dan tanda baca.\n3. Jika dan hanya jika ada perbedaan antara hasil konversi dan teks kanji yang benar, berikan umpan balik dalam format berikut:\n   - Kesalahan: [bagian kanji yang tidak sesuai setelah dikonversi ke hiragana dan apa kanji yg tepat dan benar?]\n   - Seharusnya: [sarankan kanji yg tepat jika kanji pengguna salah]\n   - Penjelasan: [penjelasan singkat tentang perbedaannya, fokus hanya pada perbedaan karakter]\n\n4. Jika tidak ada perbedaan sama sekali antara hasil konversi dan teks hiragana yang diberikan, nyatakan bahwa kanji pengguna sudah benar dan sesuai serta berikan apresiasi.\n5. Fokus hanya pada kesesuaian karakter per karakter antara kanji (setelah dikonversi ke hiragana) dan teks hiragana yang diberikan. Jangan mempertimbangkan tata bahasa, makna, atau aturan penulisan lainnya.\n6. Jangan membuat asumsi tentang pemisahan kata, bentuk konjugasi, atau perubahan bentuk lainnya. Konversi harus dilakukan secara harfiah, karakter per karakter.\n7. Lakukan verifikasi ganda sebelum memberikan umpan balik untuk memastikan keakuratan analisis Anda.\n8. Gunakan bahasa Indonesia yang formal dan mudah dipahami dalam penjelasan Anda.\n9. Berikan terjemahan bahasa Indonesia dari teks kanji yang diinputkan.\n\nPenting: Jangan membuat asumsi atau koreksi di luar apa yang diberikan dalam input. Tujuan utama adalah memverifikasi kesesuaian karakter per karakter antara kanji (setelah dikonversi ke hiragana) dan teks hiragana yang diberikan.\nBerikan analisis Anda secara ringkas dan akurat.");
          } else {
            prompt = "\nAnda adalah seorang guru pendidikan bahasa jepang sekaligus ahli konversi hiragana ke romaji dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah hiragana pengguna benar-benar sesuai dengan teks romaji yang diberikan, tanpa membuat asumsi atau koreksi tambahan.\n\nHiragana pengguna: \"".concat(userInput, "\"\nTeks romaji: \"").concat(correctText, "\"\n\nInstruksi:\n1. Konversikan  hiragana pengguna ke dalam bentuk romaji.\n2. Bandingkan hasil konversi tersebut dengan teks romaji yang benar, karakter per karakter.\n3. Jika dan hanya jika ada perbedaan antara hasil konversi dan teks romaji yang benar, berikan umpan balik dalam format berikut:\n   - Kesalahan: [bagian hiragana yang tidak sesuai]\n   - Seharusnya: [bagian romaji yang benar]\n   - Penjelasan: [penjelasan singkat tentang perbedaannya]\n\n4. Jika tidak ada perbedaan sama sekali, nyatakan bahwa hiragana pengguna sudah benar dan sesuai dengan teks romaji yang diberikan.\n5. Fokus hanya pada kesesuaian antara hiragana dan romaji, bukan pada tata bahasa atau makna.\n6. Lakukan verifikasi ganda sebelum memberikan umpan balik untuk memastikan keakuratan analisis Anda.\n7. Gunakan bahasa Indonesia yang formal dan mudah dipahami dalam penjelasan Anda.\n8. Berikan terjemahan bahasa indonesia dari teks hiragana yg di inputkan \n\nPenting: Jangan membuat asumsi atau koreksi di luar apa yang diberikan dalam input. Tujuan utama adalah memverifikasi kesesuaian antara hiragana dan teks romaji yang diberikan.\n\nBerikan analisis Anda secara ringkas dan akurat.");
          }

          requestBody = {
            "contents": [{
              "parts": [{
                "text": prompt
              }]
            }]
          };
          _context2.prev = 4;
          Swal.fire({
            title: 'Menganalisis...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: function willOpen() {
              Swal.showLoading();
            }
          });
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          }));

        case 8:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 11;
            break;
          }

          throw new Error("HTTP error! status: ".concat(response.status));

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context2.sent;

          if (!(data && data.candidates && data.candidates.length > 0)) {
            _context2.next = 30;
            break;
          }

          analysisResultText = data.candidates[0].content.parts[0].text; // Apply text formatting using regular expressions

          analysisResultText = analysisResultText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
          analysisResultText = analysisResultText.replace(/\*(.*?)\*/g, '<i>$1</i>');
          analysisResultText = analysisResultText.replace(/~~(.*?)~~/g, '<s>$1</s>');
          analysisResultText = analysisResultText.replace(/^#\s+(.*)/gm, '<h1>$1</h1>');
          analysisResultText = analysisResultText.replace(/^##\s+(.*)/gm, '<h2>$1</h2>');
          analysisResultText = analysisResultText.replace(/^###\s+(.*)/gm, '<h3>$1</h3>');
          analysisResultText = analysisResultText.replace(/^>\s+(.*)/gm, '<blockquote>$1</blockquote>');
          analysisResultText = analysisResultText.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
          analysisResultText = analysisResultText.replace(/\n(?!<\/?(h1|h2|h3|blockquote|pre|code)>)/g, '<br>');
          analysisResult.innerHTML = analysisResultText;
          Swal.close();
          showModal();
          _context2.next = 31;
          break;

        case 30:
          throw new Error('No analysis found in response');

        case 31:
          _context2.next = 38;
          break;

        case 33:
          _context2.prev = 33;
          _context2.t0 = _context2["catch"](4);
          console.error('Error checking input:', _context2.t0);
          analysisResult.textContent = "Terjadi kesalahan saat menganalisis input. Silakan coba lagi.";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Gagal menganalisis input. Silakan coba lagi.'
          });

        case 38:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 33]]);
}

function handleCategoryChange() {
  if (categorySelect.value === 'Kanji') {
    kanjiLevelSelect.style.display = 'block';
  } else {
    kanjiLevelSelect.style.display = 'none';
  }

  romajiText.textContent = "Select options and click regenerate to get new text.";
}

function handleSubmit(e) {
  e.preventDefault();
  var userInput = kanaInput.value.trim(); // Validate user input

  if (!userInput) {
    Swal.fire({
      icon: 'warning',
      title: 'Input Required',
      text: 'Silakan masukkan teks sebelum mengirim.'
    });
    return; // Stop execution if input is empty
  }

  checkUserInput();
}

function showModal() {
  resultModal.classList.remove('hidden');
  kanaInput.value = ''; // Clear user input after modal appears
}

function closeModal() {
  resultModal.classList.add('hidden');
}

function addEventListeners() {
  regenerateButton.addEventListener('click', fetchText);
  submitButton.addEventListener('click', handleSubmit);
  closeModalButton.addEventListener('click', closeModal);
  categorySelect.addEventListener('change', handleCategoryChange);
}

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded");
  addEventListeners();
  handleCategoryChange(); // Initial setup
});