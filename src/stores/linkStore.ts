import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Link } from "@/types/link";
import { LinkType } from "@/lib/linkTypes";
import { db } from "./firebase/config"; // Import your Firestore instance
import {
  collection,
  getDocs,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

interface LinkState {
  links: Link[];
  usedLinkTypes: LinkType[];
  addLink: (link: Link) => void;
  removeLink: (id: string) => void;
  updateLinks: (links: Link[]) => void;
  getAvailableLinkTypes: () => LinkType[];
  fetchLinksFromFirestore: () => Promise<void>;
  saveLinksToFirestore: () => Promise<void>;
}

export const useLinkStore = create<LinkState>()(
  persist(
    (set, get) => ({
      links: [],
      usedLinkTypes: [],

      addLink: (link) => {
        const existingLink = get().links.find((l) => l.type === link.type);
        if (!existingLink) {
          set((state) => ({
            links: [link, ...state.links],
            usedLinkTypes: [...state.usedLinkTypes, link.type],
          }));
        }
      },

      removeLink: (id) => {
        const linkToRemove = get().links.find((link) => link.id === id);
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
          usedLinkTypes: linkToRemove
            ? state.usedLinkTypes.filter((type) => type !== linkToRemove.type)
            : state.usedLinkTypes,
        }));
      },

      updateLinks: (links) => {
        set({
          links: links,
          usedLinkTypes: links.map((link) => link.type),
        });
      },

      getAvailableLinkTypes: () => {
        const allLinkTypes = Object.values(LinkType);
        const usedLinkTypes = get().usedLinkTypes;
        return allLinkTypes.filter((type) => !usedLinkTypes.includes(type));
      },

      fetchLinksFromFirestore: async () => {
        const linksCollection = collection(db, "links");
        const linksSnapshot = await getDocs(linksCollection);
        const linksData = linksSnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Link)
        );

        set({
          links: linksData,
          usedLinkTypes: linksData.map((link) => link.type),
        });
      },

      saveLinksToFirestore: async () => {
        const links = get().links;
        const batch = writeBatch(db);

        links.forEach((link) => {
          const linkRef = doc(db, "links", link.id);
          batch.set(linkRef, link);
        });

        await batch.commit();
      },
    }),
    { name: "link-storage" }
  )
);
