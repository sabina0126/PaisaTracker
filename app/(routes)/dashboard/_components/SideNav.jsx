"use client";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Link href={`/`}>
        <div className="flex items-center">
          <Image src={"/Logo.JPG"} alt="logo" width={50} height={50} />
          <h1 className="text-2xl text-teal-400 font-serif">Paisa Tracker</h1>
        </div>
      </Link>
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-sm text-sm p-3 cursor-pointer rounded-md hover:text-teal-700 hover:bg-secondary ${
                path == menu.path && "text-teal-700 bg-secondary"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-5 flex gap-2 items-center">
        <UserButton />
        <h4 className="text-md font-semibold text-teal-700">Profile</h4>
      </div>
    </div>
  );
}

export default SideNav;
