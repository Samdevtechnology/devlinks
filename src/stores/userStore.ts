import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db, auth, storage } from "@/stores/firebase/config"; // Adjust the path to your Firebase configuration
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface User {
  uid: string;
  email: string | null;
  nickname?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  photoURL?: string | null;
  useNickname?: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  saveUserToDb: () => Promise<void>;
  getUserFromDb: (uid: string) => Promise<void>;
}

function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (userData) => set({ user: userData }),

      clearUser: () => set({ user: null }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: {
            uid: updatedUser.uid ?? state.user?.uid ?? "", // Ensure uid is always a string
            email: updatedUser.email ?? state.user?.email ?? null,
            nickname: updatedUser.nickname ?? state.user?.nickname ?? null,
            firstName: updatedUser.firstName ?? state.user?.firstName ?? null,
            lastName: updatedUser.lastName ?? state.user?.lastName ?? null,
            photoURL: updatedUser.photoURL ?? state.user?.photoURL ?? null,
            useNickname:
              updatedUser.useNickname ?? state.user?.useNickname ?? false,
          } as User,
        })),

      saveUserToDb: async () => {
        const { user, updateUser } = get();

        if (user) {
          let photoURL = user.photoURL;
          // Update Firebase Authentication profile
          if (photoURL?.startsWith("data:image")) {
            const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
            const uploadResult = await uploadBytes(
              storageRef,
              dataURItoBlob(photoURL)
            );
            photoURL = await getDownloadURL(uploadResult.ref);
            updateUser({ photoURL });
          }

          if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
              displayName: user.nickname ?? undefined,
              photoURL: photoURL ?? undefined,
            });

            // Update Firestore with additional user data
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(
              userDocRef,
              {
                firstName: user.firstName,
                lastName: user.lastName,
                useNickname: user.useNickname,
                email: user.email,
                nickname: user.nickname,
                photoURL: user.photoURL,
              },
              { merge: true }
            );
          }
        }
      },

      getUserFromDb: async (uid: string) => {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;

          // Update Zustand store with the user data
          set({
            user: {
              uid,
              email: auth.currentUser?.email ?? userData.email,
              nickname: auth.currentUser?.displayName ?? userData.nickname,
              photoURL: auth.currentUser?.photoURL ?? userData.photoURL,
              firstName: userData.firstName,
              lastName: userData.lastName,
              useNickname: userData.useNickname,
            },
          });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
