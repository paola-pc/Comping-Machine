import React, { useEffect } from "react";
import { useSession, signOut } from 'next-auth/react';
import Modal from "bring/components/Modal";
import { useRouter } from "next/router";
import axios from 'axios'
import { cookies } from "next/dist/client/components/headers";

const Login = () => {
  const { data: session } = useSession();

  console.log("Check this session : ", session)
  const router = useRouter();
  const tokenCookie = cookies().get("__Secure-next-auth.session-token")
  console.log("cookies ==> ", tokenCookie)
  useEffect(() => {
    

    localStorage.setItem("session", JSON.stringify(session));

  }, [session])

  const registerUser = async (newUser) => {
    try {
      const response = await axios.post('/api/log', newUser)
      console.log(response)
      return response;
    } catch (error) {
      console.log('nop ', error)
      return false;
    };
  }

  if (session) {
    const newUser = {
      username: session.user.name,
      email: session.user.email
    }
    const redirectToProfile = async () => {
      const registered = await registerUser(newUser);
      console.log('registered user : ', registered)
      if (registered) {
        session.user.id = registered.data.id;
        localStorage.setItem("session", JSON.stringify(session));
        // registered && setTimeout(() => { router.push('/') }, 2000)
      }
    }
    redirectToProfile();
  }

  //   return (
  //     <div className="lg:container">
  //       <div className="text-white flex flex-col justify-between items-center h-full p-5">
  //         Welcome, <span className="text-fuchsia-500">{session.user.name}!</span>
  //         <p>You are logged-in, <span className="underline text-fuchsia-200">
  //           <strong className="cursor-pointer" onClick={() => router.push('/')}>have fun!</strong></span></p>
  //       </div>
  //     </div>
  //   );
  // } else {
    return (
      <Modal isOpen title="Identify:" actionLabel="Continue with Google"
        onClose={() => router.push('/')} />
    );
  // }
}

export default Login;