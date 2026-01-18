export const exportAsImage = async ({
  element,
  button,
  status,
  onDone
}) => {
  if (!window.html2canvas || !element) {
    return;
  }

  button.disabled = true;
  const originalText = status.textContent;
  status.textContent = 'Capturing...';

  try {
    await new Promise((resolve) => setTimeout(resolve, 120));
    const canvas = await window.html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      logging: false,
      useCORS: true
    });

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      return;
    }

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      status.textContent = 'Copied!';
    } else {
      const link = document.createElement('a');
      link.download = 'code-snippet.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      status.textContent = 'Downloaded';
    }
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

