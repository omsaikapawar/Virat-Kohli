import { useState } from 'react';
import type { GeneratedReceipt } from '../utils/shareReceipt';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: GeneratedReceipt | null;
}

export default function ShareModal({ isOpen, onClose, receipt }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !receipt) return null;

  const fullShareMessage = `${receipt.shareText} Check it out: ${receipt.shareUrl}`;

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(receipt.shareText)}&url=${encodeURIComponent(receipt.shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(receipt.shareUrl)}&text=${encodeURIComponent(receipt.shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullShareMessage);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullShareMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadImage = () => {
    if (!receipt.dataUrl) return;
    const link = document.createElement('a');
    link.href = receipt.dataUrl;
    link.download = 'virat-kohli-receipt.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSystemShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "Spend Virat Kohli's Money | OSK Fun",
          text: fullShareMessage,
          url: receipt.shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn("System share failed:", err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden p-6 z-10 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Share Receipt</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Challenge friends to blow Virat Kohli's fortune
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Receipt Image Thumbnail Preview (if captured) */}
        {receipt.dataUrl && (
          <div className="my-3 p-3 bg-[#f8f9fa] rounded-2xl border border-gray-200 flex justify-center items-center max-h-44 overflow-y-auto">
            <img 
              src={receipt.dataUrl} 
              alt="Receipt preview" 
              className="max-h-36 w-auto object-contain rounded shadow-sm border border-gray-200" 
            />
          </div>
        )}

        {/* Message Preview Box */}
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-3.5 mb-4 text-left">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
            Share Message
          </span>
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
            {receipt.shareText}
          </p>
          <p className="text-xs font-mono text-[#27ae60] mt-1.5 break-all select-all font-semibold">
            {receipt.shareUrl}
          </p>
        </div>

        {/* Primary Social Buttons */}
        <div className="space-y-2.5">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2.5"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Share on WhatsApp</span>
          </button>

          {/* Row: X / Twitter & Telegram */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleTwitter}
              className="py-3 px-3 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Share on X</span>
            </button>
            <button
              onClick={handleTelegram}
              className="py-3 px-3 bg-[#229ED9] hover:bg-[#1f8fc4] text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.92 9.06c-.14.65-.53.81-1.08.5l-2.97-2.19-1.43 1.38c-.16.16-.3.3-.61.3l.21-3.04 5.54-5.01c.24-.22-.05-.34-.37-.12l-6.85 4.31-2.95-.92c-.64-.2-.65-.64.13-.95l11.53-4.45c.53-.2 1 .12.79.93z"/>
              </svg>
              <span>Telegram</span>
            </button>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all border flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 stroke-emerald-600 stroke-2" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Share Link & Message</span>
              </>
            )}
          </button>
        </div>

        {/* Secondary Options: Download Receipt & System Share */}
        <div className="flex gap-2.5 mt-3 pt-3 border-t border-gray-100">
          {receipt.dataUrl && (
            <button
              onClick={handleDownloadImage}
              className="flex-1 py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Image</span>
            </button>
          )}

          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleSystemShare}
              className="flex-1 py-2.5 px-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>System Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
