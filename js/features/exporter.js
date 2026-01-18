import { buildSvgFromCard } from '../utils/svg/renderer.js';

export const exportAsImage = async ({
  element,
  button,
  status,
  mode = 'copy',
  scale = 3,
  onDone
}) => {
  if (!element) {
    return;
  }

  button.disabled = true;
  const originalText = status.textContent;
  status.textContent = mode === 'copy' ? 'Copying...' : 'Exporting...';

  try {
    if (mode === 'download-svg') {
      downloadSvg(element, scale);
      status.textContent = 'Saved SVG';
      return;
    }

    if (!window.html2canvas) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 120));
    const canvas = await window.html2canvas(element, {
      scale,
      backgroundColor: null,
      logging: false,
      useCORS: true
    });

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      return;
    }

    if (mode === 'copy') {
      const copied = await copyToClipboard(blob);
      if (copied) {
        status.textContent = 'Copied!';
        return;
      }
    }

    downloadPng(canvas);
    status.textContent = 'Downloaded';
  } catch (error) {
    status.textContent = 'Try Again';
    console.error('Export failed', error);
  } finally {
    setTimeout(() => {
      status.textContent = originalText;
      button.disabled = false;
      if (onDone) {
        onDone();
      }
    }, 1500);
  }
};

const copyToClipboard = async (blob) => {
  if (navigator.clipboard && window.ClipboardItem) {
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  }
  return false;
};

const downloadPng = (canvas) => {
  const link = document.createElement('a');
  link.download = 'code-snippet.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const downloadSvg = (card, scale) => {
  const { svg } = buildSvgFromCard(card, scale);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'code-snippet.svg';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
