const createClient = require('@sanity/client')

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-11', // or today's date for latest
}

const sanityClient = createClient(config)

export default async function createComment(req, res) {
  const { name, email, comment, _id } = JSON.parse(req.body)
  console.log('the request:', req.body)

  try {
    await sanityClient.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: _id,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Coudn't Submit Comment`, error })
  }

  console.log('Comment Submitted')
  return res.status(201).json({ message: 'Comment Submitted' })
}
