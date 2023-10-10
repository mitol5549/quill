import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data } = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
  });
};

export default Page;
