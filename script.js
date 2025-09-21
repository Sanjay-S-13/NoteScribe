const fileInput = document.getElementById('file-input');
const previewCanvas = document.getElementById('preview-canvas');
const ctx = previewCanvas.getContext('2d');
const processBtn = document.getElementById('process-btn');
const clearBtn = document.getElementById('clear-btn');
const progressEl = document.getElementById('progress');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

// Preprocess controls
const grayscaleChk = document.getElementById('grayscale');
const contrastChk = document.getElementById('contrast');
const binarizeChk = document.getElementById('binarize');
const scaleRange = document.getElementById('scale');

let loadedImage = null;

// Default canvas
previewCanvas.width = 800;
previewCanvas.height = 800;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

fileInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  if (!f.type.startsWith('image/')) return alert('Please choose an image file.');
  const img = new Image();
  img.onload = () => {
    loadedImage = img;
    drawPreview(img);
  };
  img.src = URL.createObjectURL(f);
});

function drawPreview(img) {
  const max = 1000;
  let w = img.width;
  let h = img.height;
  const scale = Math.min(max / w, max / h, 1);
  previewCanvas.width = Math.round(w * scale);
  previewCanvas.height = Math.round(h * scale);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
  ctx.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height);
}

function applyPreprocessing(srcCanvas) {
  const scaleFactor = parseFloat(scaleRange.value) || 1;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(srcCanvas.width * scaleFactor);
  canvas.height = Math.round(srcCanvas.height * scaleFactor);
  const c = canvas.getContext('2d');

  const filters = [];
  if (grayscaleChk.checked) filters.push('grayscale(100%)');
  if (contrastChk.checked) filters.push('contrast(140%)');
  c.filter = filters.join(' ');
  c.drawImage(srcCanvas, 0, 0, canvas.width, canvas.height);

  if (binarizeChk.checked) {
    const img = c.getImageData(0, 0, canvas.width, canvas.height);
    const data = img.data;
    let sum = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      sum += lum; count++;
    }
    const thresh = sum / count;
    for (let i = 0; i < data.length; i += 4) {
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      const v = lum < thresh ? 0 : 255;
      data[i] = data[i + 1] = data[i + 2] = v;
    }
    c.putImageData(img, 0, 0);
  }
  return canvas;
}

async function doOCR() {
  if (!loadedImage) return alert('Please upload an image first.');
  progressEl.textContent = 'Running OCR...';

  const processed = applyPreprocessing(previewCanvas);

  // show processed preview
  previewCanvas.width = processed.width;
  previewCanvas.height = processed.height;
  ctx.drawImage(processed, 0, 0);

  try {
    const { data: { text } } = await Tesseract.recognize(
      processed,
      'eng',
      {
        langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
        logger: m => {
          if (m.status) {
            progressEl.textContent = `${m.status} ${m.progress ? Math.round(m.progress * 100) + '%' : ''}`;
          }
          console.log(m);
        }
      }
    );
    progressEl.textContent = 'OCR finished';
    output.value = postProcessText(text);
    console.log("Raw OCR output:", text);
  } catch (err) {
    console.error(err);
    progressEl.textContent = 'OCR failed — see console';
  }
}

function postProcessText(raw) {
  let s = raw.replace(/\u00A0/g, ' ');
  s = s.replace(/[ \t]{2,}/g, ' ');
  s = s.replace(/ +\n/g, '\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.replace(/^[\s\n]+|[\s\n]+$/g, '');
  return s;
}

processBtn.addEventListener('click', async () => {
  await doOCR();
});

clearBtn.addEventListener('click', () => {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
  output.value = '';
  progressEl.textContent = 'Ready';
  loadedImage = null;
  fileInput.value = '';
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.value).then(() => {
    alert('Copied to clipboard');
  }).catch(() => alert('Copy failed'));
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([output.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'recognized.txt';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}); 