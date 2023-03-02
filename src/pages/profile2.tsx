import { signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // sessionには、以下のような値が入っています。
  // {
  //     "user":{
  //        "name":"Taro Yamada",
  //        "email":"taro@examle.com",
  //        "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
  //     },
  //     "expires":"2023-04-01T00:29:51.016Z"
  // }
  //
  const session = await getServerSession(context.req, context.res, authOptions);
  // 以下のように、getSessionを使うこともできますが、非推奨です。
  // https://next-auth.js.org/configuration/nextjs#unstable_getserversession
  // const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // session データを用いてサーバサイドで処理を行います.
  // 例えば、userに紐づくデータをAPI経由で取得するなどの処理も可能です。
  // ここでは、何かしらAPIを呼び、ユーザーの誕生日を取得したと仮定し、birthdayを追加しています。
  const userItem = {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
    birthday: '2021-01-01',
  };

  return {
    props: userItem,
  };
};

// props type
type Props = {
  name: string;
  email: string;
  image: string;
  birthday: string;
};

// propsには、以下のような値が入っています。
// {
//   "name":"Taro Yamada",
//   "email":"taro@examle.com",
//   "image":"https://lh3.googleusercontent.com/a/AGNmyxZF7jQN_YTYVyxIx5kfdo3kalfRktVD17GrZ9n=s96-c"
//   "birthday":"2021-01-01"
// }
const Profile2: NextPage<Props> = (props) => {
  const { name, email, image, birthday } = props;

  return (
    <>
      <div>
        <h1>プロファイル</h1>
        <div>{name}</div>
        <div>{birthday}</div>
        <div>{email}</div>
        <div>
          <Image src={image} alt="" width={96} height={96} />
        </div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
};

export default Profile2;
