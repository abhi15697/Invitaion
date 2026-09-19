import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'],
    });
  } catch (err) {
    console.warn('Confetti trigger failed:', err);
  }
};

/**
 * Clean clone filter to ensure no UI artifacts or helper overlays are captured
 */
const filterOptions = (node: HTMLElement) => {
  if (node.classList && node.classList.contains('no-export')) {
    return false;
  }
  return true;
};

export const exportInvitationToPng = async (
  element: HTMLElement,
  filename = 'invitation.png'
): Promise<string> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2, // 2x for crystal-sharp print resolution (2160 x 2700)
      cacheBust: true,
      filter: filterOptions,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    triggerConfetti();
    return dataUrl;
  } catch (error) {
    console.error('Failed to export PNG:', error);
    throw new Error('Could not generate PNG image. Please try again.');
  }
};

export const exportInvitationToJpg = async (
  element: HTMLElement,
  filename = 'invitation.jpg'
): Promise<string> => {
  try {
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: filterOptions,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    triggerConfetti();
    return dataUrl;
  } catch (error) {
    console.error('Failed to export JPG:', error);
    throw new Error('Could not generate JPG image. Please try again.');
  }
};

export const exportInvitationToPdf = async (
  element: HTMLElement,
  filename = 'invitation.pdf'
): Promise<void> => {
  try {
    // First generate crisp image data
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: filterOptions,
    });

    // 1080 x 1350 is a 4:5 ratio. In mm: 210 x 262.5 or custom page size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 262.5],
    });

    pdf.addImage(dataUrl, 'JPEG', 0, 0, 210, 262.5);
    pdf.save(filename);
    triggerConfetti();
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw new Error('Could not generate PDF document. Please try again.');
  }
};

export const captureInvitationDataUrl = async (
  element: HTMLElement
): Promise<string> => {
  return await toPng(element, {
    quality: 0.95,
    pixelRatio: 1.5,
    cacheBust: true,
    filter: filterOptions,
  });
};
