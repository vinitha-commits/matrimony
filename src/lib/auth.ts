import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/connection";
import { User as UserModel, Profile } from "@/lib/db/models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Password login
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Phone or Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        await connectDB();

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const user = await UserModel.findOne({
          $or: [
            { email: identifier },
            { phone: identifier },
            { phone: `+91${identifier.replace(/[\s\-()]/g, "")}` },
          ],
        });

        if (!user) return null;

        // If user has a hashed password, compare
        if (user.password && user.password.startsWith("$2")) {
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) return null;
        } else if (user.password && user.password !== password) {
          // Plain text fallback for seed data
          return null;
        }

        const profile = await Profile.findOne({ userId: user._id });

        return {
          id: user._id.toString(),
          name: profile?.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role,
          gender: user.gender,
          isPremium: user.isPremium,
          plan: user.plan,
          profileComplete: user.profileComplete,
        };
      },
    }),

    // OTP login
    Credentials({
      id: "otp",
      name: "OTP",
      credentials: {
        userId: { label: "User ID" },
      },
      async authorize(credentials) {
        if (!credentials?.userId) return null;

        await connectDB();

        const user = await UserModel.findById(credentials.userId);
        if (!user) return null;

        const profile = await Profile.findOne({ userId: user._id });

        return {
          id: user._id.toString(),
          name: profile?.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role,
          gender: user.gender,
          isPremium: user.isPremium,
          plan: user.plan,
          profileComplete: user.profileComplete,
        };
      },
    }),

    // Admin login
    Credentials({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Admin Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const { Admin } = await import("@/lib/db/models");
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) return null;

        // Compare password
        if (admin.password.startsWith("$2")) {
          const valid = await bcrypt.compare(credentials.password as string, admin.password);
          if (!valid) return null;
        } else if (admin.password !== credentials.password) {
          return null;
        }

        return {
          id: admin._id.toString(),
          name: admin.name || "Admin",
          email: admin.email,
          role: "admin",
          isAdmin: true,
        } as any;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
        token.role = (user as any).role;
        token.gender = (user as any).gender;
        token.isPremium = (user as any).isPremium;
        token.plan = (user as any).plan;
        token.profileComplete = (user as any).profileComplete;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).phone = token.phone;
        (session.user as any).role = token.role;
        (session.user as any).gender = token.gender;
        (session.user as any).isPremium = token.isPremium;
        (session.user as any).plan = token.plan;
        (session.user as any).profileComplete = token.profileComplete;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
