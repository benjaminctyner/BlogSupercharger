import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';

export default function TokenTopup({ availableTokens, posts }) {
  console.log(availableTokens);
  console.log(posts, 'posts');
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('RESULT: ', json);
    window.location.href = json.session.url;
  };
  const handleFreeClick = async () => {
    const result = await fetch(`/api/addFreeTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('RESULT: ', json);
    window.location.href = json.session.redirect;
  };

  return (
    <div>
      {availableTokens === 0 && posts.length === 0 ? (
        <>
          <div className='w-full h-full flex flex-col overflow-auto'>
            <div className='m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200'>
              <div>
                <label>
                  <strong>
                    Add 10 free tokens to create SEO optimized blogs:
                  </strong>
                </label>

                <button className='btn' onClick={handleFreeClick}>
                  Add 10 Free Tokens
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='w-full h-full flex flex-col overflow-auto'>
            <div className='m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200'>
              <div>
                <label>
                  <strong>Add 10 tokens to create SEO optimized blogs:</strong>
                </label>

                <button className='btn' onClick={handleClick}>
                  Add 10 tokens
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
