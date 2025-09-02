import { Head } from "@inertiajs/react";
import MainMenu from "@/components/MainMenu";
import FlashMessages from "@/components/FlashMessages";
import TopHeader from "@/components/TopHeader";
import BottomHeader from "@/components/BottomHeader";
import BaseLayout from "@/layouts/BaseLayout";

export default function MainLayout({ title, children }) {
  return (
    <BaseLayout>
      <Head title={title} />
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="hidden shrink-0 p-12 w-56 bg-indigo-800 overflow-y-auto md:block" />
            <div
              className="px-4 py-8 md:flex-1 md:p-12 overflow-y-auto"
              scroll-region="true"
            >
              <FlashMessages />
              {children}
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
