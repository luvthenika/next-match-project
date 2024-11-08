"use client";
import { Chip, Divider } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { MdAllInbox, MdOutbox } from "react-icons/md";

const MessageSideBar = () => {
  const searchParams = useSearchParams();
  const [selected, setSelection] = useState<string>(
    searchParams.get("container") || 'inbox'
  );
  const router = useRouter();
  const pathName = usePathname();

 

  const messageSideBarLink = [
    {
      key: "inbox",
      label: "Inbox",
      icon: <MdAllInbox />,
    },
    {
      key: "outbox",
      label: "Outbox",
      icon: <MdOutbox />,
    },
  ];

  function handleSelection(key: string) {
    console.log(searchParams);
    setSelection(key);
    const newParams =  new URLSearchParams();
    newParams.set('container', key);
    router.push(`${pathName}?${newParams}`);
  }

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-700 rounded-lg shadow-lg w-[350px] ml-3 mt-3">
                

      {messageSideBarLink.map(({ key, icon, label }) => (
        
        <div
          className={clsx("flex flex-row items-center rounded-lg gap-2 p-3", {
            "text-pink-500 font-bold": key === selected,
            "text-black hover:text-pink-70/2": key !== selected,
          })}
          key={key}
          onClick={() => handleSelection(key)}
        >
          {" "}
          {React.cloneElement(icon, { size: 24 })}
          <div className="flex justify-between flex-grow">{label}

          <Chip color="default">5</Chip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSideBar;
