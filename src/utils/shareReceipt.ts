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

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
  const binaryStr = atob(parts[1]);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
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
      skipFonts: true,
    });

    if (document.body.contains(cloneContainer)) {
      document.body.removeChild(cloneContainer);
    }

    const blob = dataUrlToBlob(dataUrl);

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

  // Automatically open system share options
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    // 1. First Priority: Share with image file + message
    if (receipt && receipt.blob && typeof File !== 'undefined') {
      try {
        const file = new File([receipt.blob], 'virat-kohli-receipt.png', { type: 'image/png' });
        const filePayload: ShareData = {
          title: "Spend Virat Kohli's Money | OSK Fun",
          text: fullShareMessage,
          files: [file],
        };

        let canShareFile = true;
        if (typeof navigator.canShare === 'function') {
          try {
            canShareFile = navigator.canShare(filePayload);
          } catch {
            canShareFile = false;
          }
        }

        if (canShareFile) {
          await navigator.share(filePayload);
          return; // Successfully opened system share with bill image & message!
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          // User opened and dismissed system share dialog
          return;
        }
        console.warn("File share failed, attempting system text share:", err);
      }
    }

    // 2. Second Priority: System share with message & web link (if OS doesn't support file payload)
    try {
      const textPayload: ShareData = {
        title: "Spend Virat Kohli's Money | OSK Fun",
        text: fullShareMessage,
        url: shareUrl,
      };

      let canShareText = true;
      if (typeof navigator.canShare === 'function') {
        try {
          canShareText = navigator.canShare(textPayload);
        } catch {
          canShareText = true;
        }
      }

      if (canShareText) {
        await navigator.share(textPayload);
        return; // Successfully opened system share!
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      console.warn("System text share failed:", err);
    }
  }

  // 3. Fallback: Only for browsers with no system share support at all (e.g. desktop Firefox)
  onOpenModal(fallbackReceipt);
};
