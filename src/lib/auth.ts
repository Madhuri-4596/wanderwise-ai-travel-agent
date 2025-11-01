// Authentication utilities
// This is a placeholder for authentication setup
// You can integrate Supabase, Firebase, or NextAuth.js

/*
SUPABASE SETUP (Recommended):
------------------------------
1. Install: npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared

2. Create Supabase project at https://supabase.com

3. Create client:
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )

4. Set up auth UI:
   import { Auth } from '@supabase/auth-ui-react'
   import { ThemeSupa } from '@supabase/auth-ui-shared'

   <Auth
     supabaseClient={supabase}
     appearance={{ theme: ThemeSupa }}
     providers={['google', 'github']}
   />

5. Database schema for user trips:
   create table trips (
     id uuid primary key default uuid_generate_v4(),
     user_id uuid references auth.users not null,
     destination text,
     data jsonb,
     created_at timestamp with time zone default now()
   );
*/

/*
FIREBASE SETUP (Alternative):
------------------------------
1. Install: npm install firebase

2. Initialize Firebase:
   import { initializeApp } from 'firebase/app'
   import { getAuth } from 'firebase/auth'

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   }

   const app = initializeApp(firebaseConfig)
   export const auth = getAuth(app)

3. Use Firebase Auth UI for easy login
*/

/*
NEXTAUTH.JS SETUP (Most flexible):
-----------------------------------
1. Install: npm install next-auth

2. Create /app/api/auth/[...nextauth]/route.ts

3. Configure providers (Google, GitHub, Email, etc.)

4. Use useSession() hook in components
*/

export const authPlaceholder = {
  message: 'Authentication not yet configured. Choose Supabase, Firebase, or NextAuth.js',
};
