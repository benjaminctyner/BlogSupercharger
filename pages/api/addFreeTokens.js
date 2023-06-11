import { getSession } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';
import stripeInit from 'stripe';
import { useRouter } from 'next/router';

// const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // const router = useRouter();
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db('blogsupercharger');
  const userProfile = await db.collection('users').updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: 10,
      },
      $setOnInsert: {
        auth0Id: user.sub,
      },
    },
    { upsert: true }
  );
  const freeRed = {
    redirect: '/post/new',
  };

  //   const lineItems = [
  //     {
  //       price: process.env.STRIPE_PRODUCT_PRICE_ID,
  //       quantity: 1,
  //     },
  //   ];

  // //   const protocol =
  // //     process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  // //   const host = req.headers.host;

  // //   const checkoutSession = await stripe.checkout.sessions.create({
  // //     line_items: lineItems,
  // //     mode: 'payment',
  // //     success_url: `${protocol}${host}/post/new`,
  // //     payment_intent_data: {
  // //       metadata: {
  // //         sub: user.sub,
  // //       },
  // //     },
  // //     metadata: {
  // //       sub: user.sub,
  // //     },
  // //   });

  console.log('user: ', user);

  res.status(200).json({ session: freeRed });
}
