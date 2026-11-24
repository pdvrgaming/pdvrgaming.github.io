import QRCode from 'qrcode';
import { SiteSettings } from '../types';

export interface VCardOptions {
  name?: string;
  firmName?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
  note?: string;
}

/**
 * Builds standard vCard 3.0 string compatible with iOS and Android camera scanners and contacts apps.
 */
export function buildVCardString(settings: SiteSettings, custom?: Partial<VCardOptions>): string {
  const firm = custom?.firmName || settings.businessName || 'PDVR Gaming';
  const owner = custom?.name || settings.ownerName || 'PDVR Gaming';
  const title = custom?.title || settings.ownerTitle || 'Founder & Lead VR Operator';
  const phone = custom?.phone || settings.phone || '+91 9133020759';
  const email = custom?.email || settings.email || 'gamingpdvr@gmail.com';
  const website = custom?.website || settings.websiteUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : 'https://pdvrgaming.github.io/');
  const location = custom?.location || settings.location || 'Vijayawada, Andhra Pradesh, India';
  const note = custom?.note || `${firm} — ${settings.brandTagline || 'Virtual Reality Gaming Experience'}. Commercial 90Hz VR Rides, Beat Saber, Simulators & STEM Setups.`;

  // Clean phone number for tel URI
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  // Formulate formatted display name
  const isOwnerFirmSame = owner.trim().toLowerCase() === firm.trim().toLowerCase();
  const displayName = isOwnerFirmSame ? firm : `${owner} (${firm})`;

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${displayName}`,
    `N:${isOwnerFirmSame ? firm : owner};;;;`,
    `ORG:${firm}`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}`,
    `EMAIL;TYPE=WORK,INTERNET:${email}`,
    `URL:${website}`,
    `ADR;TYPE=WORK:;;Vijayawada;Andhra Pradesh;;India`,
    `NOTE:${note}`,
    'END:VCARD'
  ].join('\r\n');
}

/**
 * Triggers a native .vcf file download in the browser so mobile users can add the contact in 1 tap.
 */
export function downloadVCardFile(settings: SiteSettings, custom?: Partial<VCardOptions>): void {
  const vcardText = buildVCardString(settings, custom);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const firmClean = (settings.businessName || 'PDVR_Gaming').replace(/\s+/g, '_');
  const filename = `${firmClean}_Contact.vcf`;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates base64 data URL for QR Code using the qrcode library.
 */
export async function generateQRCode(
  text: string,
  options?: {
    width?: number;
    margin?: number;
    darkColor?: string;
    lightColor?: string;
  }
): Promise<string> {
  return QRCode.toDataURL(text, {
    width: options?.width || 380,
    margin: options?.margin ?? 2,
    errorCorrectionLevel: 'M',
    color: {
      dark: options?.darkColor || '#000000',
      light: options?.lightColor || '#ffffff'
    }
  });
}

/**
 * Resolves current live Web Digital Card URL for scanning and sharing.
 */
export function getDigitalCardUrl(): string {
  if (typeof window === 'undefined') return 'https://pdvrgaming.github.io/#/card';
  const base = `${window.location.origin}${window.location.pathname.replace(/\/+$/, '')}`;
  return `${base}/#/card`;
}
