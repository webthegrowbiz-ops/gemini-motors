/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import geminiMotorsLogo from '../assets/gemini-logo-transparent.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = 'h-12 w-auto', showText = true }: LogoProps) {
  return (
    <div className="relative flex items-center justify-center">
      <img 
        src={geminiMotorsLogo}
        alt="Gemini Motors Logo" 
        className={`${className} object-contain`}
        decoding="async"
      />
      {showText && <span className="sr-only">Gemini Motors</span>}
    </div>
  );
}
