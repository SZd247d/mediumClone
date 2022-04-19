import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen  bg-slate-800">
      <Head>
        <title>Sanity Blog Zaki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Hero section */}

      {/* Blogs */}
    </div>
  )
}

export default Home
