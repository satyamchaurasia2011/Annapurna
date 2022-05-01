import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
   GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
		async signIn({ user }) {
			try {
				const docRef = doc(db, "users", user.email);
				const docSnap = await getDoc(docRef);
				if (!docSnap.exists()) setDoc(docRef, { ...user, orders: [], cart: [] }, { merge: true });
				
				return { message: true };
			} catch (error) {
				return { message: false };
			}
		},
		
	}

}); 