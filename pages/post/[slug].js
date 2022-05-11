import React, { useState } from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { PortableText } from '@portabletext/react'
import BlockContent from '@sanity/block-content-to-react'
import { useForm } from 'react-hook-form'

function Post({ post }) {
  const [submitted, setSubmitted] = useState(false)
  // console.log(post)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const { name, email, comment, _id } = data

    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })

    // try {
    //   const response = await sanityClient.mutate({
    //       create: {
    //         _type: 'comment',
    //         post: {
    //           _ref: post._id,
    //         },
    //       }})
    // } catch (error) {
    // }

    // const doc = {
    //   _type: 'comment',
    //   name,
    //   email,
    //   comment,
    //   post: {
    //     _type: 'refrence',
    //     _ref: post._id,
    //   },
    // }

    // sanityClient
    //   .create(doc)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  return (
    <div className="min-h-screen bg-slate-800 pb-8">
      <Header />
      <img
        className="h-56 w-full object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <article className="mx-auto mt-14 max-w-3xl font-semibold">
        <h1 className="text-3xl">{post.title}</h1>
        <p className="my-3 font-light text-gray-600">{post.description}</p>
        <div className="flex items-center space-x-2 ">
          <img
            className="mb-3 h-10 w-10 rounded-full object-cover "
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="text-sm font-light text-gray-600">
            Blog Post by{' '}
            <span className="font-thin text-green-600">
              {' '}
              {post.author.name}
            </span>{' '}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="prose max-w-full px-8 py-12">
          <BlockContent
            blocks={post.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          />
        </div>

        <hr className="mx-auto  mb-8 max-w-2xl border border-lime-100" />

        {submitted ? (
          <div className="my-10 flex flex-col items-center space-y-4 rounded-lg bg-lime-400 py-10  text-xl shadow-lg">
            <h3 className="text-3xl font-bold drop-shadow-2xl">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will apear below</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex max-w-lg flex-col space-y-8 p-8 "
          >
            <p className="text-sm text-lime-500">Enjoy this article ?</p>
            <h1 className="text-2xl">Leave a Comment below!</h1>
            <hr className="text-lime-400" />

            <input
              type="hidden"
              value={post._id}
              name="_id"
              {...register('_id')}
            />

            <lable className="flex flex-col space-y-2">
              <span>Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input block rounded-sm p-2 shadow-md outline-none"
                type="text"
                placeholder="John Doe"
              />
              {errors.name && (
                <span className="text-red-500">
                  The Name is field is required
                </span>
              )}
            </lable>

            <lable className="flex flex-col space-y-2">
              <span>Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input block rounded-sm p-2 shadow-md outline-none"
                type="email"
                placeholder="John Doe"
              />

              {errors.email && (
                <span className="text-red-500">The Email is required</span>
              )}
            </lable>

            <lable className="flex flex-col space-y-2">
              <span>Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-input mb-5 block rounded-sm p-2 shadow-md outline-none"
                type="text"
                placeholder="John Doe"
                rows={8}
                col={10}
              />

              {errors.comments && (
                <span className="text-red-500">
                  The Comment Field is required
                </span>
              )}
            </lable>

            <input
              className="form-input block cursor-pointer rounded-sm bg-lime-400 p-2 shadow-md outline-none"
              type="submit"
            />
          </form>
        )}

        {/* Comments */}

        <div className="mx-auto max-w-xl rounded-sm bg-white p-5 shadow-lg shadow-lime-500/70">
          <h3 className="mb-4 text-4xl">Comments</h3>
          <hr className="pb-2" />

          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>
                <span className="text-lime-600">{comment.name}</span>:
                {comment.comment}{' '}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}

export default Post

export const getStaticPaths = async (ctx) => {
  const query = `*[_type == 'post']{
  _id,
  slug
}`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
  _id,
  title,
  _createdAt,
  slug,
  mainImage,
  description,
  body,
  'comments': *[
    _type == 'comment' &&
    post._ref == ^._id &&
    approved == true
  ],
  author ->{
  name,
  image,
  slug,
  bio
}
}`

  const post = await sanityClient.fetch(query, {
    slug: ctx.params?.slug,
  })

  // if (!post) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
