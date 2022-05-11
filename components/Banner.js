import React from 'react'

function Banner() {
  return (
    <section className="border-y-b mx-auto flex max-w-7xl items-center justify-between border-black bg-slate-600 py-20 px-5">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          <span className="underline decoration-black decoration-4">
            Maduim
          </span>{' '}
          is a place to write, read, and connect
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          recusandae!
        </p>
      </div>

      <div className=" ">
        <img
          className="hidden h-56 pr-8 md:inline-flex lg:w-full"
          layout="fill"
          src="https://images.unsplash.com/photo-1539583631686-18a66e6af1b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        />
      </div>
    </section>
  )
}

export default Banner
