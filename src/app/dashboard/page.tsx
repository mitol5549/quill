import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

import { Dashboard } from '@/components/Dashboard';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) {
    redirect('/auth-callback?origin=dashboard');
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    redirect('/auth-callback?origin=dashboard');
  }

  return <Dashboard />;
};

export default Page;
