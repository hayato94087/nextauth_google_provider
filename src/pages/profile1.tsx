import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { NextPage } from 'next';

const Profile1: NextPage = () => {
  // sessionには、以下のような値が入っています。
  // {
  //     "user":{
  //        "name":"Taro Yamada",
  //        "email":"taro@examle.com",
  //        "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
  //     },
  //     "expires":"2023-04-01T00:29:51.016Z"
  // }
  const { data: session } = useSession({ required: true });

  return (
    <>
      {
        // セッションがある場合は、プロファイルを表示する
        session && (
          <div>
            <h1>プロファイル</h1>
            <div>{session.user?.email}</div>
            {session.user?.image && (
              <div>
                <Image src={session.user?.image} alt="" width={96} height={96} />
              </div>
            )}
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )
      }
      {
        // セッションがない場合は、ログインページに遷移する
        !session && (
          <div>
            <p>You are not signed in.</p>
          </div>
        )
      }
    </>
  );
};

export default Profile1;
