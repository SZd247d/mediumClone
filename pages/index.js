import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { sanityClient, urlFor } from '../sanity'
import Link from 'next/link'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div className=" mb-10 min-h-screen  bg-slate-800  pb-10">
      <Head>
        <title>Sanity Blog Zaki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Banner section */}
      <Banner />

      {/* Posts */}
      <div className=" mx-auto mt-3 grid h-60 max-w-7xl gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {posts.map((post) => (
          <a key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group flex flex-col overflow-hidden rounded-t-lg ">
              <img
                className="h-56 w-full rounded-t-lg object-cover transition-transform duration-200 group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
                alt=""
              />
            </div>
            <div className="flex items-center justify-between rounded-b-lg  bg-white p-2 hover:shadow-lg">
              <div className="">
                <p className="text-xl font-bold">{post.title} </p>
                <p className="text-sm">
                  {post.description} by {post.author.name}{' '}
                </p>
              </div>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={urlFor(post.author.image).url()}
                alt=""
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage,
  description,
  author ->{
  name,
  image,
  slug,
  bio
}
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
