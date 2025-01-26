"use client"

import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { verifyUserEmail } from '../app/lib/verificationUtils';

// interface Props {}

const VerifyEmail = () => {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");


  useEffect(() => {
    async function verifyEmail() {
      const { token } = router.query;

      if (!token) {
        setStatus("No verification token found");
        return;
      }

      try {
        await verifyUserEmail(token as string);
        setStatus("Email verified successfully!");

        // Redirect to home or login after a short delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("Verification failed. Token may be invalid or expired.");
      }
    }

    if (router.isReady) {
      verifyEmail();
    }
  }, [router]);

  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{status}</h1>
      </div>
    </div>
  );
}

export default VerifyEmail