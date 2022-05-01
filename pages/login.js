import Header from "../components/Header";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import InputIcon from "@material-tailwind/react/InputIcon";
import Icon from "@material-tailwind/react/Icon";
import { useState } from "react";
import { getProviders, signIn } from 'next-auth/react'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth,db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import userProfile from '../public/user.png';
import { useRouter } from "next/router";
export default function Login({provider}) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authData, setAuthData] = useState({
    email : "",
    password : "",
    confirmPassword : "",
    fullName : "",
  })
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isSignIn){
     createUserWithEmailAndPassword(auth, authData.email, authData.password)
     .then(({user}) => {
       user.displayName = authData.fullName;
       user.photoURL = userProfile;
       const docRef = doc(db, "users", user.email);
			 setDoc(docRef, { email : user.email, id : user.uid, image : user.photoURL.src, name : user.displayName, orders: [], cart: [] }, { merge: true });
       setAuthData({
        email : "",
        password : "",
        confirmPassword : "",
        fullName : "",
       })
       setIsSignIn(true);
     })
     .catch(err => console.log(err));
    } 
  else {
      signInWithEmailAndPassword(auth, authData.email, authData.password) 
      .then(({user}) => {
        const docRef = doc(db, "users", user.email);
        console.log(user);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("userId", user.uid);
        router.push('/');
      })
      .catch(err => {
        console.log(err);
      })
   }
   
  }

  return (
    <div>
      <Header />
      <div className="w-2/6 mt-44 mx-auto mb-4 pb-4 px-12 border-2 pt-6 rounded-lg">
        {/* <form onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && (
            <>
              <InputIcon
                type="text"
                size="lg"
                placeholder="Full Name "
                color="teal"
                outline={true}
                onChange={(e) => setAuthData({...authData, fullName : e.target.value})}
                value = {authData.fullName}
              />
              <br />
            </>
          )}

          <InputIcon
            type="email"
            size="lg"
            placeholder="E-mail "
            color="teal"
            outline={true}
            onChange={(e) => setAuthData({...authData, email : e.target.value})}
            value = {authData.email}
          />
          <br />
          <InputIcon
            type="password"
            color="teal"
            size="lg"
            outline={true}
            placeholder="Password"
            iconFamily="material-icons"
            iconName="visibility_off"
            onChange={(e) => setAuthData({...authData, password : e.target.value})}
            value = {authData.password}
          />

          {!isSignIn && (
            <>
              <br />
              <InputIcon
                type="password"
                color="teal"
                size="lg"
                outline={true}
                placeholder="Confirm Password"
                iconFamily="material-icons"
                iconName="visibility_off"
                onChange={(e) => setAuthData({...authData, confirmPassword : e.target.value})}
                value = {authData.confirmPassword}
              />
            </>
          )}
          <Button type="submit" className="mx-auto my-8">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        {isSignIn ? (
          <p className="text-center mb-2 flex justify-center items-center">
            Don't have an account?{" "}
            <Button
              onClick={() => setIsSignIn(false)}
              color="grey"
              className="border-0 py-0 px-2"
              ripple="dark"
              buttonType="outline"
            >
              Sign up
            </Button>
          </p>
        ) : (
          <p className="text-center mb-2 flex justify-center items-center">
            Already have an account?{" "}
            <Button
              onClick={() => setIsSignIn(true)}
              color="grey"
              className="border-0 py-0 px-2"
              ripple="dark"
              buttonType="outline"
            >
              Sign In
            </Button>
          </p>
        )}
        <h2 className="text-center mb-2">OR</h2> */}
        <Button
          color="red"
          buttonType="filled"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="dark"
          className="mx-auto mt-4 mb-7"
          onClick={() => {signIn(provider.id,{
            callbackUrl: `${window.location.origin}`,
          });}}
        >
          SignUp With Google
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: { provider: await getProviders() } };
}