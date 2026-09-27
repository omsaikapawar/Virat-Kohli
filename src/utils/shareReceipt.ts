import * as htmlToImage from 'html-to-image';

export const shareReceiptAsImage = async (): Promise<boolean> => {
  const originalEl = document.getElementById('receipt-capture');
  if (!originalEl) {
    alert("Receipt not found on the page.");
    return false;
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
  clonedEl.style.margin = '0'; // Remove mx-auto which causes the shift
  clonedEl.style.boxShadow = 'none';
  
  // Remove the barcode from the clone if it exists to prevent SVG crash
  const barcode = clonedEl.querySelector('#fake-barcode');
  if (barcode) {
    barcode.remove();
  }
  
  cloneContainer.appendChild(clonedEl);
  document.body.appendChild(cloneContainer);

  try {
    // Generate image from the perfectly positioned clone
    const dataUrl = await htmlToImage.toPng(clonedEl, {
      quality: 1.0,
      backgroundColor: '#fffcf5',
      pixelRatio: 2,
    });
    
    // Cleanup clone
    document.body.removeChild(cloneContainer);

    const shareText = "Try OSK Fun Virat! I just blew the entire fortune. \\n\\nCheck it out: " + window.location.origin;

    // We must use navigator.share to open the share menu as requested
    let shareSuccess = false;
    
    if (navigator.canShare) {
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'virat-receipt.png', { type: 'image/png' });
        
        const shareData = {
          title: "OSK Fun | Virat Kohli",
          text: shareText,
          files: [file],
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          shareSuccess = true;
        }
      } catch (err: any) {
        console.warn("Native share failed", err);
        // If user cancelled, don't fallback to download
        if (err.name === 'AbortError') {
          return true;
        }
      }
    }
    
    // If share menu fails (or is unsupported), we fallback to download but alert them
    if (!shareSuccess) {
      alert("Your browser does not support the native Share Menu with images. The receipt will be downloaded instead!");
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'virat-receipt.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      try {
        await navigator.clipboard.writeText(shareText);
      } catch (e) {}
    }
    
    return true;
  } catch (error: any) {
    if (document.body.contains(cloneContainer)) {
      document.body.removeChild(cloneContainer);
    }
    console.error("Error generating receipt image:", error);
    alert("System error generating image.");
    return false;
  }
};
