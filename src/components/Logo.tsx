/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_LOGOS } from '../data';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'header' | 'footer';
  wrapperClassName?: string;
}

export default function Logo({
  className = 'h-12 w-auto',
  showText = true,
  variant = 'header',
  wrapperClassName = 'relative flex items-center justify-center',
}: LogoProps) {
  const isFooter = variant === 'footer';
  const src = isFooter ? APP_LOGOS.footer : APP_LOGOS.header;
  const srcSet = isFooter ? undefined : `${APP_LOGOS.header2x} 2x`;

  return (
    <div className={wrapperClassName}>
      <img
        src={src}
        srcSet={srcSet}
        alt="Gemini Motors Logo"
        className={`${className} object-contain`}
        decoding="async"
      />
      {showText && <span className="sr-only">Gemini Motors</span>}
    </div>
  );
}
