import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="institutional-curve">
              <path d="M4,36 L4,26 Q16,26 36,4 L36,36 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#institutional-curve)" fill="#F8F8F8">
            <rect x="4" y="0" width="8" height="40" />
            <rect x="16" y="0" width="8" height="40" />
            <rect x="28" y="0" width="8" height="40" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  )
}
