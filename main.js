const geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbENma_1hhoo4cp1ptCP4DmXapdXzwXzQ";

const romajiText = document.getElementById('romaji-text');
const kanaInput = document.getElementById('kana-input');
const submitButton = document.getElementById('submit-button');
const regenerateButton = document.getElementById('regenerate-button');
const generateButton = document.getElementById('generate-button');
const resultModal = document.getElementById('modal-output');
const analysisResult = document.getElementById('analysis-result');
const closeModalButton = document.getElementById('close-modal');
const categorySelect = document.getElementById('category');
const lengthTextSelect = document.getElementById('lengt-text');
const kanjiLevelSelect = document.getElementById('kanji');

async function fetchText() {
    if (categorySelect.value === '') {
        romajiText.textContent = "Please select a category first.";
        return;
    }

    let promptText;
    if (categorySelect.value === 'Kanji') {
        promptText = `Berikan teks 読解  level JLPT ${kanjiLevelSelect.value} singkat ${lengthTextSelect.value} bahasa Jepang dalam bentuk hiragana murni tanpa ada campuran kanji. Berikan hanya teks Jepang tanpa terjemahan atau penjelasan tambahan.`;
    } else {
        promptText = `Berikan teks 読解 singkat ${lengthTextSelect.value} bahasa Jepang acak dalam huruf romaji saja, tanpa terjemahan atau catatan tambahan.`;
    }

    const requestBody = {
        "contents": [{
            "parts": [{
                "text": promptText
            }]
        }]
    };

    try {
        Swal.fire({
            title: 'Generating text...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            let generatedText = data.candidates[0].content.parts[0].text;
            
            // Clean up the generated text
            generatedText = generatedText.split(/\n|Terjemahan:|Catatan:/)[0].trim();
            generatedText = generatedText.replace(/^(Teks:|Text:)/i, "").trim();

            // For romaji, ensure only valid characters are present
            if (categorySelect.value !== 'Kanji') {
                generatedText = generatedText.replace(/[^a-zA-Z\s]/g, '');
            }

            romajiText.textContent = generatedText;
            romajiText.dataset.correctText = generatedText;
            Swal.close();
        } else {
            throw new Error('No candidates found in response');
        }
    } catch (error) {
        console.error('Error fetching text:', error);
        romajiText.textContent = "Error fetching text. Please try again.";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to generate new text. Please try again.'
        });
    }
}

async function checkUserInput() {
    const correctText = romajiText.dataset.correctText;
    const userInput = kanaInput.value;

    let prompt;
    if (categorySelect.value === 'Kanji') {
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
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }]
    };

    try {
        Swal.fire({
            title: 'Menganalisis...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.candidates && data.candidates.length > 0) {
            let analysisResultText = data.candidates[0].content.parts[0].text;

            // Apply text formatting using regular expressions
            analysisResultText = analysisResultText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            analysisResultText = analysisResultText.replace(/\*(.*?)\*/g, '<i>$1</i>');
            analysisResultText = analysisResultText.replace(/~~(.*?)~~/g, '<s>$1</s>');
            analysisResultText = analysisResultText.replace(/^#\s+(.*)/gm, '<h1>$1</h1>');
            analysisResultText = analysisResultText.replace(/^##\s+(.*)/gm, '<h2>$1</h2>');
            analysisResultText = analysisResultText.replace(/^###\s+(.*)/gm, '<h3>$1</h3>');
            analysisResultText = analysisResultText.replace(/^>\s+(.*)/gm, '<blockquote>$1</blockquote>');
            analysisResultText = analysisResultText.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
            analysisResultText = analysisResultText.replace(/\n(?!<\/?(h1|h2|h3|blockquote|pre|code)>)/g, '<br>');

            analysisResult.innerHTML = analysisResultText;
            Swal.close();
            showModal();
        } else {
            throw new Error('No analysis found in response');
        }
    } catch (error) {
        console.error('Error checking input:', error);
        analysisResult.textContent = "Terjadi kesalahan saat menganalisis input. Silakan coba lagi.";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Gagal menganalisis input. Silakan coba lagi.'
        });
    }
}

function handleCategoryChange() {
    if (categorySelect.value === 'Kanji') {
        kanjiLevelSelect.style.display = 'block';
    } else {
        kanjiLevelSelect.style.display = 'none';
    }
    romajiText.textContent = "Choose category and generate text for training";
}

function handleSubmit(e) {
    e.preventDefault();

    const userInput = kanaInput.value.trim();

    // Validate user input
    if (!userInput) {
        Swal.fire({
            icon: 'warning',
            title: 'Input Required',
            text: 'Silakan masukkan teks sebelum mengirim.',
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
    generateButton.addEventListener('click', fetchText);
    submitButton.addEventListener('click', handleSubmit);
    closeModalButton.addEventListener('click', closeModal);
    categorySelect.addEventListener('change', handleCategoryChange);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    addEventListeners();
    handleCategoryChange(); // Initial setup
});