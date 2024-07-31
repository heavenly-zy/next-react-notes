import { signIn, signOut, auth } from 'auth';
import { BuiltInProviderType } from 'next-auth/providers';

interface SignInProps {
  provider?: BuiltInProviderType;
  props?: React.HTMLAttributes<HTMLButtonElement>;
}

function SignIn({ provider, ...props }: SignInProps) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

function SignOut(props: SignInProps['props']) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-around' }}>
      {session?.user ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {session?.user.name}
          <SignOut />
        </span>
      ) : (
        <SignIn />
      )}
    </header>
  );
}
