"use client";
import { Spinner } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import MemberCard from "app/members/MemberCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const ListTabs = ({ members, likes }: any) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { id: "source", label: "Users you have liked" },
    { id: "target", label: "Users who liked you" },
    { id: "mutual", label: "Mutuals" },
  ];
  const handleSelection = async (key) => {
    startTransition(() => {
      const urlQueryClass = new URLSearchParams();
      urlQueryClass.set("type", key.toString());
      router.replace(`${pathname}?${urlQueryClass.toString()}`);
    });
  };
  return (
    <div className="flex flex-col w-full pt-7 pl-5 size-lg">
      <Tabs
        aria-label="likes"
        color="pink"
        onSelectionChange={(key) => handleSelection(key)}
      >
        {tabs.map((tab) => (
          <Tab title={tab.label} key={tab.id}>
            {isPending ? (
              <Spinner color={"pink"}/>
            ) : (
              <>
                {members && members?.length > 0 ? (
                  <div className="grid grid-cols-6 gap-3 mt-8">
                    {members.map((m) => (
                      <MemberCard key={m.id} member={m} likes={likes} />
                    ))}
                  </div>
                ) : (
                  <div>No members found</div>
                )}
              </>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ListTabs;
