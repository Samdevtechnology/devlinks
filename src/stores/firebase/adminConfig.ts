import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

interface FirebaseAdminParams {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  storageBucket?: string;
}

const formatPrivateKey = (key: string) => key.replace(/\\n/g, "\n");

const createFirebaseAdminApp = (params: FirebaseAdminParams) => {
  const { projectId, privateKey, clientEmail, storageBucket } = params;

  // Ensure only one Firebase Admin app instance exists
  if (getApps().length > 0) return getApp();

  const credential = cert({
    projectId,
    clientEmail,
    privateKey: formatPrivateKey(privateKey),
  });

  return initializeApp({
    credential,
    storageBucket,
    projectId,
  });
};

export const initAdmin = () => {
  const params: FirebaseAdminParams = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    privateKey: process.env.FIREBASE_PRIVATE_KEY || "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  };

  return createFirebaseAdminApp(params);
};

export const getAdminDb = () => {
  if (getApps().length === 0) {
    initAdmin();
  }
  return getFirestore();
};
