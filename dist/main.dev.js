"use strict";

var geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbENma_1hhoo4cp1ptCP4DmXapdXzwXzQ";
var romajiText = document.getElementById('romaji-text');
var kanaInput = document.getElementById('kana-input');
var submitButton = document.getElementById('submit-button');
var regenerateButton = document.getElementById('regenerate-button');
var resultModal = document.getElementById('modal-output');
var analysisResult = document.getElementById('analysis-result');
var closeModalButton = document.getElementById('close-modal');

function fetchRomajiText() {
  var requestBody, response, data, generatedText;
  return regeneratorRuntime.async(function fetchRomajiText$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Fetching new Romaji text..."); // Debug log

          requestBody = {
            "contents": [{
              "parts": [{
                "text": "Berikan teks 読解 singkat 5 kalimat bahasa jepang acak dalam huruf romaji buat ke dalam bentuk paragraf"
              }]
            }]
          };
          _context.prev = 2;
          Swal.fire({
            title: 'Generating new text...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: function willOpen() {
              Swal.showLoading();
            }
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          }));

        case 6:
          response = _context.sent;

          if (response.ok) {
            _context.next = 9;
            break;
          }

          throw new Error("HTTP error! status: ".concat(response.status));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(response.json());

        case 11:
          data = _context.sent;

          if (!(data && data.candidates && data.candidates.length > 0)) {
            _context.next = 20;
            break;
          }

          generatedText = data.candidates[0].content.parts[0].text;
          console.log("New text generated:", generatedText); // Debug log

          romajiText.textContent = generatedText;
          romajiText.dataset.correctRomaji = generatedText;
          Swal.close();
          _context.next = 21;
          break;

        case 20:
          throw new Error('No candidates found in response');

        case 21:
          _context.next = 28;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](2);
          console.error('Error fetching romaji text:', _context.t0);
          romajiText.textContent = "Error fetching text. Please try again.";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to generate new text. Please try again.'
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 23]]);
}

function checkUserInput() {
  var correctRomaji, userInput, prompt, requestBody, response, data, analysisResultText;
  return regeneratorRuntime.async(function checkUserInput$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          correctRomaji = romajiText.dataset.correctRomaji;
          userInput = kanaInput.value;
          prompt = "\nAnda adalah seorang guru pendidikan bahasa jepang sekaligus ahli konversi hiragana ke romaji dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah hiragana pengguna benar-benar sesuai dengan teks romaji yang diberikan, tanpa membuat asumsi atau koreksi tambahan.\n\nhiragana pengguna: \"".concat(userInput, "\"\nTeks romaji yang benar: \"").concat(correctRomaji, "\"\n\nInstruksi:\n1. Konversikan  hiragana pengguna ke dalam bentuk romaji.\n2. Bandingkan hasil konversi tersebut dengan teks romaji yang benar, karakter per karakter.\n3. Jika dan hanya jika ada perbedaan antara hasil konversi dan teks romaji yang benar, berikan umpan balik dalam format berikut:\n   - Kesalahan: [bagian hiragana yang tidak sesuai]\n   - Seharusnya: [bagian romaji yang benar]\n   - Penjelasan: [penjelasan singkat tentang perbedaannya]\n\n4. Jika tidak ada perbedaan sama sekali, nyatakan bahwa hiragana pengguna sudah benar dan sesuai dengan teks romaji yang diberikan.\n5. Fokus hanya pada kesesuaian antara hiragana dan romaji, bukan pada tata bahasa atau makna.\n6. Lakukan verifikasi ganda sebelum memberikan umpan balik untuk memastikan keakuratan analisis Anda.\n7. Gunakan bahasa Indonesia yang formal dan mudah dipahami dalam penjelasan Anda.\n8. Berikan terjemahan bahasa indonesia dari teks hiragana yg di inputkan \n\nPenting: Jangan membuat asumsi atau koreksi di luar apa yang diberikan dalam input. Tujuan utama adalah memverifikasi kesesuaian antara hiragana dan teks romaji yang diberikan.\n\nBerikan analisis Anda secara ringkas dan akurat.");
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

          analysisResultText = data.candidates[0].content.parts[0].text; // Terapkan format teks menggunakan ekspresi reguler

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

function showModal() {
  resultModal.classList.remove('hidden');
  kanaInput.value = ''; // Clear user input after modal appears
}

function closeModal() {
  resultModal.classList.add('hidden');
} // Memastikan event listener hanya ditambahkan sekali


function addEventListeners() {
  regenerateButton.removeEventListener('click', fetchRomajiText);
  regenerateButton.addEventListener('click', fetchRomajiText);
  submitButton.removeEventListener('click', handleSubmit);
  submitButton.addEventListener('click', handleSubmit);
  closeModalButton.removeEventListener('click', closeModal);
  closeModalButton.addEventListener('click', closeModal);
}

function handleSubmit(e) {
  e.preventDefault();
  var userInput = kanaInput.value.trim(); // Validasi input pengguna

  if (!userInput) {
    Swal.fire({
      icon: 'warning',
      title: 'Input Required',
      text: 'Silakan masukkan teks sebelum mengirim.'
    });
    return; // Menghentikan eksekusi jika input kosong
  }

  checkUserInput();
} // Inisialisasi


document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded"); // Debug log

  fetchRomajiText();
  addEventListeners();
});