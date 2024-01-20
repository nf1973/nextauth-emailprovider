import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/(lib)/mongodb";

export const options = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      profile(profile) {
        return {
          //email: profile.email,
          ...profile,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
