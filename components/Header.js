import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import banner from '../public/annapurna-logo.png';
import { signOut } from 'next-auth/react'
 function Header() {
  const router  = useRouter();
  const session = useSession();
  return (
    <header className="sticky top-0 px-4 py-4 flex items-center md:px-32 md:pt-5 border-b border-b-slate-200 bg-white">
      <Button
        color="black"
        buttonType="outline"
        rounded={true}
        ripple="dark"
        className="inline-flex md:hidden h-20 w-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Image width={155} height={52} src={banner} className="mt-1 pl-4 cursor-pointer"  onClick={() => router.push('/')}/>
      <Button color='black'
             buttonType='outline'
             rounded = {true}
             iconOnly = {true}
             ripple = 'dark' className="text-lg mt-2 md:inline-flex ml-auto hidden cursor-pointer " >
        <Icon ripple='dark' name="add_shopping_cart" size="3xl"/>
      </Button>
      {
        !session.data ?  <Button
        color="teal"
        buttonType="outline"
        rounded={false}
        block={false}
        iconOnly={false}
        ripple="dark"
       className="mt-2 ml-12 md:inline-flex hidden cursor-pointer uppercase px-4 py-1"
       onClick = {() => router.push('/login')}
     >
        <Icon size="2xl" name="login" /> Login
     </Button> : (
      <img
            onClick = {() => {localStorage.clear(); signOut({callbackUrl: `${window.location.origin}`});}}
             loading='lazy'
             ripple="dark"
             className='cursor-pointer h-10 w-10 rounded-full mt-2 ml-16 md:inline-flex hidden'
             src={session?.data?.user?.image}
             alt='img'
            />
     )
      }
     
    </header>
  );
}


export default Header;