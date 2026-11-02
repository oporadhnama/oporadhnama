const WATERMARK_SRC = '/oporadhnama-watermark.png';

let cachedWatermarkImg = null;

function loadWatermarkImage() {
  if (cachedWatermarkImg) {
    return Promise.resolve(cachedWatermarkImg);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cachedWatermarkImg = img;
      resolve(img);
    };
    img.onerror = (err) => reject(err);
    img.src = WATERMARK_SRC;
  });
}

function loadFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Composites the Oporadhnama brand logo + text watermark into the bottom-right corner
 * of a browser File object using HTML5 Canvas and returns a new watermarked File (*-wm.jpg).
 */
export async function applyWatermarkToFile(file) {
  if (!file || typeof window === 'undefined') return file;

  // Skip if already watermarked
  const rawName = file.name || 'news-image.jpg';
  const dotIdx = rawName.lastIndexOf('.');
  const stem = dotIdx !== -1 ? rawName.slice(0, dotIdx) : rawName;
  if (stem.endsWith('-wm') || stem.endsWith('_wm')) {
    return file;
  }

  try {
    const [baseImg, wmImg] = await Promise.all([
      loadFileAsImage(file),
      loadWatermarkImage(),
    ]);

    const baseW = baseImg.naturalWidth || baseImg.width;
    const baseH = baseImg.naturalHeight || baseImg.height;

    if (!baseW || !baseH || baseW < 100 || baseH < 80) {
      return file;
    }

    const canvas = document.createElement('canvas');
    canvas.width = baseW;
    canvas.height = baseH;
    const ctx = canvas.getContext('2d');

    // 1. Draw original image
    ctx.drawImage(baseImg, 0, 0, baseW, baseH);

    // 2. Compute watermark size (~24% of image width, clamped for small/huge images)
    const wmOrigW = wmImg.naturalWidth || wmImg.width || 575;
    const wmOrigH = wmImg.naturalHeight || wmImg.height || 128;
    const targetWmW = Math.max(115, Math.min(480, Math.round(baseW * 0.24)));
    const targetWmH = Math.max(25, Math.round(wmOrigH * (targetWmW / wmOrigW)));

    const padX = Math.max(10, Math.round(baseW * 0.02));
    const padY = Math.max(10, Math.round(baseH * 0.025));
    const posX = Math.max(0, baseW - targetWmW - padX);
    const posY = Math.max(0, baseH - targetWmH - padY);

    ctx.save();
    ctx.globalAlpha = 0.96;
    ctx.drawImage(wmImg, posX, posY, targetWmW, targetWmH);
    ctx.restore();

    const blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92)
    );

    if (!blob) return file;

    const cleanStem = stem.replace(/[^a-zA-Z0-9_-]/g, '-') || 'oporadhnama-news';
    return new File([blob], `${cleanStem}-wm.jpg`, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch (err) {
    console.warn('Client watermark fallback to server:', err);
    return file;
  }
}

