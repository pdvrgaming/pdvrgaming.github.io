import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Share2,
  Download,
  Maximize2,
  X,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Gamepad2,
  Copy,
  Wifi,
  QrCode,
  UserCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';
import pdvrLogo from '@/src/assets/images/pdvr_logo.png';
import {
  buildVCardString,
  downloadVCardFile,
  generateQRCode,
  getDigitalCardUrl
} from '../utils/vcard';

interface DigitalCardPageProps {
  onNavigate: (route: string) => void;
  onOpenBooking: () => void;
}

export const DigitalCardPage: React.FC<DigitalCardPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { settings } = useData();

  // QR Mode: 'vcard' (Direct save contact) or 'weblink' (Open webpage)
  const [qrMode, setQrMode] = useState<'vcard' | 'weblink'>('vcard');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFullscreenQr, setIsFullscreenQr] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  // Regenerate QR Code whenever mode or settings change
  useEffect(() => {
    let isMounted = true;

    async function updateQR() {
      try {
        const textToEncode =
          qrMode === 'vcard' ? buildVCardString(settings) : getDigitalCardUrl();
        const url = await generateQRCode(textToEncode, {
          width: 500,
          margin: 2,
          darkColor: '#000000',
          lightColor: '#ffffff'
        });
        if (isMounted) {
          setQrDataUrl(url);
        }
      } catch (err) {
        console.error('Failed to generate QR Code:', err);
      }
    }

    updateQR();
    return () => {
      isMounted = false;
    };
  }, [qrMode, settings]);

  const handleDownloadVCard = () => {
    downloadVCardFile(settings);
  };

  const handleDownloadQrPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `PDVR_Gaming_${qrMode === 'vcard' ? 'Save_Contact' : 'Web_Card'}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareCard = async () => {
    const cardUrl = getDigitalCardUrl();
    const shareData = {
      title: `${settings.businessName} — Digital Visiting Card`,
      text: `Save contact & explore ${settings.businessName} (Commercial VR Gaming & STEM Workshops, Vijayawada)`,
      url: cardUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const whatsappNum = settings.whatsapp.replace(/\D/g, '');
  const ownerDisplayName = settings.ownerName || 'PDVR Gaming';
  const ownerTitle = settings.ownerTitle || 'Founder & Lead VR Operator';

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Digital Business Card</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            E-CARD & QR CONTACT
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Scan the QR code with any phone camera to instantly save contact details with firm name,
            phone, website, and email.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShareCard}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700 shadow-sm"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share E-Card'}</span>
          </button>

          <button
            onClick={handleDownloadVCard}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md shadow-blue-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Save Contact (.vcf)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Card Visual (Left) & QR Code Hub (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Holographic E-Card Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Interactive Card Preview
            </span>
            <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setCardSide('front')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  cardSide === 'front' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setCardSide('back')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  cardSide === 'back' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          {/* Realistic Visiting Card Container */}
          <div className="relative group">
            {/* Ambient Cyber Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-fuchsia-600/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* The Physical Card Body (Aspect ratio ~1.58:1 typical credit card) */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0E1524] via-[#090D17] to-[#060910] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl text-white overflow-hidden min-h-[340px] flex flex-col justify-between">
              {/* Subtle Holographic Grid Overlay */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Diagonal Light Sheen Accent */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              {cardSide === 'front' ? (
                <>
                  {/* Card Header: Brand Wordmark + Chip/NFC */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={pdvrLogo}
                          alt="PDVR Gaming Logo"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400/60 shadow-lg shadow-cyan-500/30"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#090D15] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </span>
                      </div>
                      <div>
                        <div className="font-display font-extrabold text-xl tracking-wider text-white">
                          PDVR
                          <span className="ml-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                            GAMING
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-cyan-400/90 font-medium block">
                          Commercial VR Arcade & STEM
                        </span>
                      </div>
                    </div>

                    {/* High-tech Contactless Chip Icon */}
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-cyan-400 rotate-90 opacity-80" />
                      <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-400/40 via-yellow-200/50 to-amber-500/40 border border-yellow-300/60 p-1 flex items-center justify-center shadow-inner">
                        <div className="w-full h-full border border-amber-300/40 rounded-sm grid grid-cols-2 gap-0.5">
                          <div className="border-r border-b border-amber-400/40" />
                          <div className="border-b border-amber-400/40" />
                          <div className="border-r border-amber-400/40" />
                          <div />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Owner & Firm Information */}
                  <div className="relative z-10 my-4 space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                      Contact Person & Designation
                    </span>
                    <h2 className="font-display text-2xl font-black text-white tracking-tight drop-shadow-sm">
                      {ownerDisplayName}
                    </h2>
                    <p className="text-xs font-semibold text-cyan-300">
                      {ownerTitle} · <span className="text-slate-300">{settings.businessName}</span>
                    </p>
                  </div>

                  {/* Card Footer: Essential Contacts */}
                  <div className="relative z-10 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Direct Phone</span>
                      <a href={`tel:${cleanPhone}`} className="hover:text-cyan-300 font-semibold block truncate">
                        {settings.phone}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Email Address</span>
                      <a href={`mailto:${settings.email}`} className="hover:text-cyan-300 font-medium block truncate">
                        {settings.email}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Service Base</span>
                      <span className="text-slate-300 block truncate">{settings.location}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Website</span>
                      <span className="text-cyan-400 font-medium block truncate">
                        {settings.websiteUrl?.replace(/^https?:\/\//, '') || 'pdvrgaming.github.io'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Back View: QR Code, Verification Badge, Quick Scan Note */
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">SCAN WITH PHONE CAMERA</h3>
                    <p className="text-xs text-slate-400 mt-0.5 max-w-xs">
                      Instantly saves PDVR Gaming contact details to your smartphone address book.
                    </p>
                  </div>

                  {qrDataUrl && (
                    <div className="p-2.5 bg-white rounded-xl shadow-lg ring-4 ring-cyan-500/20">
                      <img src={qrDataUrl} alt="Contact QR Code" className="w-36 h-36 object-contain" />
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Works with all iPhone & Android Cameras</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Buttons for the Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <a
              href={`tel:${cleanPhone}`}
              className="p-3 rounded-xl bg-[#0C121E] hover:bg-slate-800 border border-slate-800 text-center flex flex-col items-center justify-center gap-1 text-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-semibold">Call Now</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(
                'Hi PDVR Gaming, I got your digital visiting card and would like to know more about your VR experiences / event packages.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-[#0C121E] hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-800/60 text-center flex flex-col items-center justify-center gap-1 text-slate-200 transition-colors"
            >
              <span className="w-4 h-4 text-emerald-400 font-bold flex items-center justify-center">💬</span>
              <span className="text-[11px] font-semibold">WhatsApp</span>
            </a>

            <a
              href={`mailto:${settings.email}`}
              className="p-3 rounded-xl bg-[#0C121E] hover:bg-slate-800 border border-slate-800 text-center flex flex-col items-center justify-center gap-1 text-slate-200 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-[11px] font-semibold">Email Us</span>
            </a>

            <button
              onClick={handleDownloadVCard}
              className="p-3 rounded-xl bg-[#0C121E] hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-800/60 text-center flex flex-col items-center justify-center gap-1 text-slate-200 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-semibold">Add Contact</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The High-Contrast QR Code Scanner Station (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B101A] border border-slate-800 space-y-6">
            {/* Mode Selector Tabs: Direct vCard vs Web Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-cyan-400" />
                  <span>PRESENT & SCAN QR CODE</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select what happens when someone points their camera at your screen:
                </p>
              </div>

              {/* Mode Toggle Switch */}
              <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0">
                <button
                  onClick={() => setQrMode('vcard')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    qrMode === 'vcard'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Save Contact (vCard)</span>
                </button>
                <button
                  onClick={() => setQrMode('weblink')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    qrMode === 'weblink'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web E-Card Link</span>
                </button>
              </div>
            </div>

            {/* QR Code Presentation Box */}
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center bg-[#070A10] p-6 rounded-2xl border border-slate-800/90">
              {/* The QR Image */}
              <div className="relative group/qr shrink-0">
                <div className="p-4 bg-white rounded-2xl shadow-2xl ring-4 ring-cyan-500/30">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="PDVR Digital Business Card QR"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-slate-400 text-xs">
                      Generating QR...
                    </div>
                  )}
                </div>

                {/* Center Badge Overlay on QR */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-white p-1 rounded-full shadow-md">
                  <img src={pdvrLogo} alt="PDVR Emblem" className="w-9 h-9 rounded-full object-cover" />
                </div>
              </div>

              {/* QR Instructions & Actions */}
              <div className="space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    {qrMode === 'vcard' ? 'Direct Address Book Entry' : 'Online Digital Visiting Card'}
                  </span>
                  <h4 className="font-display text-base font-bold text-white">
                    {qrMode === 'vcard' ? 'Scan to Add to Contacts' : 'Scan to Open Web Card'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                    {qrMode === 'vcard'
                      ? 'When scanned with iOS Camera, Google Lens, or Android Camera, a banner will appear to save PDVR Gaming directly to contacts.'
                      : 'Opens this responsive digital visiting card on the scanner’s phone with interactive WhatsApp, calling, and VR game menu.'}
                  </p>
                </div>

                {/* QR Utility Buttons */}
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start pt-1">
                  <button
                    onClick={() => setIsFullscreenQr(true)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                    title="Enlarge QR for easy scanning in public"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fullscreen QR</span>
                  </button>

                  <button
                    onClick={handleDownloadQrPng}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                    title="Download high-res PNG for printing"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download PNG</span>
                  </button>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 justify-center md:justify-start">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>No special scanner app required</span>
                </div>
              </div>
            </div>

            {/* vCard Details Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Fields Encoded in This E-Card
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Firm Name:</span>
                  <span className="font-semibold text-white">{settings.businessName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Contact Person:</span>
                  <span className="font-semibold text-white">{ownerDisplayName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-semibold text-white">{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-white truncate">{settings.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Website:</span>
                  <span className="font-semibold text-cyan-300 truncate">
                    {settings.websiteUrl || 'https://pdvrgaming.github.io/'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-white">{settings.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hub: Explore Experiences & Book Event */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-cyan-950/20 border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Need Commercial VR for an Event or Birthday?</span>
              </h4>
              <p className="text-xs text-slate-400">
                We bring 1 to 4 commercial VR stations with dedicated operators right to your venue.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('experiences')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                Catalog (14+ Titles)
              </button>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors shadow-sm"
              >
                Book Setup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN QR SCANNER MODAL */}
      {isFullscreenQr && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenQr(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-colors border border-slate-700"
            aria-label="Close Fullscreen QR"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center space-y-4 max-w-sm">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                {qrMode === 'vcard' ? 'Scan to Save Contact' : 'Scan to Open Web E-Card'}
              </div>
              <h3 className="font-display text-2xl font-black text-white">{settings.businessName}</h3>
              <p className="text-xs text-slate-400">{settings.brandTagline}</p>
            </div>

            {/* High Brightness White QR Canvas */}
            <div className="p-6 bg-white rounded-3xl shadow-2xl inline-block ring-8 ring-cyan-500/30">
              <img
                src={qrDataUrl}
                alt="Fullscreen Contact QR"
                className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
              />
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-white">Point any smartphone camera at this screen</p>
              <p className="text-slate-400 text-[11px]">
                {ownerDisplayName} · {cleanPhone} · {settings.email}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setQrMode(qrMode === 'vcard' ? 'weblink' : 'vcard')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                Switch to {qrMode === 'vcard' ? 'Web Link Mode' : 'vCard Save Mode'}
              </button>
              <button
                onClick={() => setIsFullscreenQr(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
