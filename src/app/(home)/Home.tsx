import { TabsContent } from "@/components/ui/tabs";

import Header from "@/components/common/Header";
import LinkPage from "../(link)/Link";
import ProfilePage from "../(profile)/Profile";
import PreviewFrame from "./components/Frame";
import Preview from "../preview/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full block mb-4 md:flex justify-center items-stretch">
        <aside className="hidden relative md:flex w-5/12">
          <PreviewFrame />
        </aside>
        <div className="md:w-7/12">
          <TabsContent value="link" className="h-full">
            <LinkPage />
          </TabsContent>
          <TabsContent value="profile" className="h-full">
            <ProfilePage />
          </TabsContent>
        </div>
      </div>
    </div>
  );
}
