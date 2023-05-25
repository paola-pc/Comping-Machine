import React, { useEffect } from "react";
import { useSession } from 'next-auth/react';
import Modal from "bring/components/Modal";
import { useRouter } from "next/router";
import axios from 'axios'
import { cookies } from "next/headers";
import Cookies from "js-cookie";


const Login = () => {
  const { data: session } = useSession();
  console.log("Check this session : ", session)
  const router = useRouter();

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
      // const tokenCookie = cookies().get()
      // console.log("cookies ==> ", tokenCookie)
      const registered = await registerUser(newUser);
      console.log('registered user : ', registered)
      if (registered) {
        session.user.id = registered.data.id;
        localStorage.setItem("session", JSON.stringify(session));
        router.push('/userHome');
      }
    }
    redirectToProfile();
  }

  return (
    <Modal isOpen title="Identify:" actionLabel="Continue with Google"
      onClose={() => router.push('/')} />
  );
}

export default Login;