import * as htmlToImage from 'html-to-image';
import { formatIndianCurrency } from './currency';

export interface GeneratedReceipt {
  dataUrl: string;
  blob: Blob;
  shareText: string;
  shareUrl: string;
}

export function formatSpentAmount(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    const crStr = cr >= 100 ? Math.round(cr).toLocaleString('en-IN') : parseFloat(cr.toFixed(2)).toLocaleString('en-IN');
    return `₹${crStr} Crore`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    const lStr = parseFloat(l.toFixed(2)).toLocaleString('en-IN');
    return `₹${lStr} Lakh`;
  }
  return formatIndianCurrency(amount);
}

const DEFAULT_SHARE_URL = 'https://oskfun.in/virat-kohli';

export const generateReceiptImage = async (totalSpent: number): Promise<GeneratedReceipt | null> => {
  const originalEl = document.getElementById('receipt-capture');
  if (!originalEl) {
    return null;
  }

  // Create an off-screen container to avoid all scrolling and mx-auto offset bugs
  const cloneContainer = document.createElement('div');
  cloneContainer.style.position = 'fixed';
  cloneContainer.style.top = '0px';
  cloneContainer.style.left = '0px';
  cloneContainer.style.zIndex = '-9999';
  cloneContainer.style.opacity = '0';
  cloneContainer.style.pointerEvents = 'none';
  cloneContainer.style.width = originalEl.offsetWidth + 'px';

  // Clone the receipt
  const clonedEl = originalEl.cloneNode(true) as HTMLElement;
  clonedEl.style.margin = '0';
  clonedEl.style.boxShadow = 'none';

  // Remove the barcode from the clone if it exists to prevent SVG rendering quirks
  const barcode = clonedEl.querySelector('#fake-barcode');
  if (barcode) {
    barcode.remove();
  }

  cloneContainer.appendChild(clonedEl);
  document.body.appendChild(cloneContainer);

  try {
    const dataUrl = await htmlToImage.toPng(clonedEl, {
      quality: 1.0,
      backgroundColor: '#fffcf5',
      pixelRatio: 2,
    });

    if (document.body.contains(cloneContainer)) {
      document.body.removeChild(cloneContainer);
    }

    const res = await fetch(dataUrl);
    const blob = await res.blob();

    const shareUrl = DEFAULT_SHARE_URL;
    const spentText = formatSpentAmount(totalSpent);
    const shareText = `I spent ${spentText} on Virat Kohli in this game. You can spend your Virat Kohli money here:`;

    return {
      dataUrl,
      blob,
      shareText,
      shareUrl,
    };
  } catch (err) {
    if (document.body.contains(cloneContainer)) {
      document.body.removeChild(cloneContainer);
    }
    console.error("Error generating receipt image:", err);
    return null;
  }
};

export const shareReceipt = async (
  totalSpent: number,
  onOpenModal: (receipt: GeneratedReceipt) => void
): Promise<void> => {
  const receipt = await generateReceiptImage(totalSpent);
  const shareUrl = DEFAULT_SHARE_URL;
  const spentText = formatSpentAmount(totalSpent);
  const shareText = `I spent ${spentText} on Virat Kohli in this game. You can spend your Virat Kohli money here:`;

  const fallbackReceipt: GeneratedReceipt = receipt || {
    dataUrl: '',
    blob: new Blob(),
    shareText,
    shareUrl,
  };

  const fullShareMessage = `${shareText} ${shareUrl}`;

  // If the browser supports native file sharing (Mobile Safari, Chrome on Android, etc.)
  if (receipt && navigator.canShare && typeof File !== 'undefined') {
    try {
      const file = new File([receipt.blob], 'virat-receipt.png', { type: 'image/png' });
      const shareData = {
        title: "Spend Virat Kohli's Money | OSK Fun",
        text: fullShareMessage,
        url: shareUrl,
        files: [file],
      };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return; // Successfully shared via native sheet with image!
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User intentionally cancelled the native share sheet
        return;
      }
      console.warn("Native file share failed, falling back to share modal:", err);
    }
  }

  // On desktop browsers (like Chrome on Windows) or where file sharing is unsupported,
  // open the share modal directly with WhatsApp, X, Telegram, and Copy options.
  onOpenModal(fallbackReceipt);
};
