import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="w-full px-4 py-3 bg-gray-100 text-sm text-gray-600 mt-auto">
            <style>
                {`
          @keyframes rotateGlow {
            0% { transform: rotate(0deg); filter: drop-shadow(0 0 0px red); }
            50% { transform: rotate(180deg); filter: drop-shadow(0 0 6px red); }
            100% { transform: rotate(360deg); filter: drop-shadow(0 0 0px red); }
          }
        `}
            </style>
            <div className="flex items-center justify-center gap-2">
                <span>Made with</span>
                <FaHeart className="text-red-500 animate-[rotateGlow_2s_linear_infinite]" />
                <span>by <span className="font-semibold text-gray-800">Diksha</span></span>
            </div>
        </footer>
    )
}

export default Footer
