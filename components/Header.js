import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between p-5 ">
      <div className="flex items-center space-x-4 ">
        <Link href="/">
          <img
            src="https://links.papareact.com/yvf"
            layout="fill"
            className="relative w-44 cursor-pointer object-contain transition-opacity duration-200 hover:opacity-75"
          />
        </Link>
        <p className="hidden md:inline">About</p>
        <p className="hidden md:inline">Contact</p>
        <p className="rounded-full bg-green-600 px-4 py-2 text-white ">
          Follow
        </p>
      </div>

      <div className="flex items-center space-x-4 text-green-600 ">
        <p>Sign in</p>
        <p className="rounded-full border border-green-600 px-4 py-2">
          get Started
        </p>
      </div>
    </header>
  )
}

export default Header
