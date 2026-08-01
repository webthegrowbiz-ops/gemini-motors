/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_LOGOS } from '../data';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = 'h-12 w-auto', showText = true }: LogoProps) {
  return (
    <div className="relative flex items-center justify-center">
      <img 
        src={APP_LOGOS.header} 
        srcSet={`${APP_LOGOS.header2x} 2x`}
        alt="Gemini Motors Logo" 
        className={`${className} object-contain`}
        decoding="async"
      />
      {showText && <span className="sr-only">Gemini Motors</span>}
    </div>
  );
}
