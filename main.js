const geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCbENma_1hhoo4cp1ptCP4DmXapdXzwXzQ";

const romajiText = document.getElementById('romaji-text');
const kanaInput = document.getElementById('kana-input');
const submitButton = document.getElementById('submit-button');
const regenerateButton = document.getElementById('regenerate-button');
const resultModal = document.getElementById('modal-output');
const analysisResult = document.getElementById('analysis-result');
const closeModalButton = document.getElementById('close-modal');

async function fetchRomajiText() {
    console.log("Fetching new Romaji text..."); // Debug log

    const requestBody = {
        "contents": [{
            "parts": [{
                "text": "Berikan teks 読解 singkat 5 kalimat bahasa jepang acak dalam huruf romaji buat ke dalam bentuk paragraf"

            }]
        }]
    };

    try {
        Swal.fire({
            title: 'Generating new text...',
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
            const generatedText = data.candidates[0].content.parts[0].text;
            console.log("New text generated:", generatedText); // Debug log
            romajiText.textContent = generatedText;
            romajiText.dataset.correctRomaji = generatedText;
            Swal.close();
        } else {
            throw new Error('No candidates found in response');
        }
    } catch (error) {
        console.error('Error fetching romaji text:', error);
        romajiText.textContent = "Error fetching text. Please try again.";
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to generate new text. Please try again.'
        });
    }
}

async function checkUserInput() {
    const correctRomaji = romajiText.dataset.correctRomaji;
    const userInput = kanaInput.value;

    const prompt = `
Anda adalah seorang guru pendidikan bahasa jepang sekaligus ahli konversi hiragana ke romaji dengan ketelitian tinggi. Tugas Anda adalah memverifikasi apakah hiragana pengguna benar-benar sesuai dengan teks romaji yang diberikan, tanpa membuat asumsi atau koreksi tambahan.

hiragana pengguna: "${userInput}"
Teks romaji yang benar: "${correctRomaji}"

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

            // Terapkan format teks menggunakan ekspresi reguler
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

function showModal() {
    resultModal.classList.remove('hidden');
    kanaInput.value = ''; // Clear user input after modal appears
}


function closeModal() {
    resultModal.classList.add('hidden');
}

// Memastikan event listener hanya ditambahkan sekali
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

    const userInput = kanaInput.value.trim();

    // Validasi input pengguna
    if (!userInput) {
        Swal.fire({
            icon: 'warning',
            title: 'Input Required',
            text: 'Silakan masukkan teks sebelum mengirim.',
        });
        return; // Menghentikan eksekusi jika input kosong
    }

    checkUserInput();
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded"); // Debug log
    fetchRomajiText();
    addEventListeners();
});



