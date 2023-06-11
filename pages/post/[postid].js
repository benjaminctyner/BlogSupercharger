import { withPageAuthRequired } from '@auth0/nextjs-auth0';
export default function Post() {
  return (
    <div>
      <h1 className='text-6xl'>Whats up!!</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
