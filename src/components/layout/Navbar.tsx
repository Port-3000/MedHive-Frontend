//src/components/layout/Navbar.tsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { SessionContext } from "@/utils/supabase/usercontext";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const sessionData = useContext(SessionContext);


  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "MODEL HUB", path: "/model-hub" },
    { name: "CONTRIBUTE", path: "/contribute" },
    { name: "ABOUT", path: "/about" },
  ];

  const avatarUrl = sessionData?.sessionData?.session?.user?.user_metadata?.avatar_url ||"/user.png";

  return (
    <motion.div className="sticky isolate inset-x-0 top-0 z-50 w-full pt-2 font-['Lilita_One']">
      {/* Desktop Navbar */}
      <motion.div
        animate={{
          backdropFilter: "blur(16px) saturate(170%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: visible
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 32px rgba(255, 255, 255, 0.05)",
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
        style={{ minWidth: "800px" }}
        className={cn(
          "hidden lg:flex relative z-[60] mx-auto max-w-7xl items-center justify-between rounded-2xl px-6 py-3 text-white navbar-glow after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-3xl"
        )}
      >
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-medhive-500 text-white font-bold p-2 rounded-md">
              MH
            </span>
            <span className="text-xl font-['Lilita_One']">MedHive</span>
          </Link>
        </div>

        <motion.div className="flex-1 flex items-center justify-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.path
                  ? "text-medhive-400"
                  : "text-gray-300 hover:text-medhive-300"
              )}
            >
              {pathname === link.path && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 h-full w-full rounded-full bg-medhive-100/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">{link.name}</span>
            </Link>
          ))}
        </motion.div>

  {!sessionData.isLoading && (sessionData.sessionData.session ? (
  <DropdownMenu>
    <DropdownMenuTrigger className=" relative z-50 rounded-full">
      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-medhive-500">
        <Image
          src={avatarUrl}
          alt="Profile"
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent 
    className="w-56 z-[100]"
    align="end"
    sideOffset={8}>
      <DropdownMenuItem>
        <Link href="/profile">Profile</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>
        <Link href="/signout">Sign Out</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <div className="flex items-center space-x-2">
    <Link href="/login">
      <Button
        variant="outline"
        className="border-medhive-500 text-medhive-600 hover:bg-medhive-50"
      >
        SIGN IN
      </Button>
    </Link>
    <Link href="/login">
      <Button className="bg-medhive-500 hover:bg-medhive-600">
        SIGN UP
      </Button>
    </Link>
  </div>
))}
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        animate={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 32px rgba(255, 255, 255, 0.05)",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          mass: 0.5,
        }}
        className={cn(
          "lg:hidden relative z-50 mx-auto max-w-[calc(100vw-2rem)] flex-col rounded-2xl px-4 py-3 text-white after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-3xl"
        )}
      >
        <div className="flex w-full items-center justify-between px-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-medhive-500 text-white font-bold p-2 rounded-md">
              MH
            </span>
            <span className="font-bold text-xl">MedHive</span>
          </Link>

          <button
            className="text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu2 className="h-6 w-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-16 w-full rounded-lg bg-black/80 px-4 py-4 shadow-lg backdrop-blur-md dark:bg-neutral-950/80"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      "rounded-md px-4 py-2 text-sm font-medium",
                      pathname === link.path
                        ? "bg-medhive-100/20 text-medhive-400"
                        : "text-gray-300 hover:bg-gray-800"
                    )}>
                    {link.name}
                  </Link>
                ))}

                {!sessionData.isLoading && (sessionData.sessionData.session ? (
  <div className="mt-4">
    <div className="flex items-center space-x-3 px-4 py-2">
      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-medhive-500">
        <Image
          src={avatarUrl}
          alt="Profile"
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-medhive-400">
          {sessionData.sessionData.userprofile?.full_name || 'User'}
        </span>
        <Link href="/signout" className="text-sm text-gray-400 hover:text-medhive-400">
          Sign Out
        </Link>
      </div>
    </div>
  </div>
) : (<div className="mt-4 flex flex-col space-y-2">
                      <Link href="/login">
                      <Button
                    variant="outline"
                    className="border-medhive-500 text-medhive-400"
                  >
                    Sign In
                  </Button>
                  </Link>
                  <Link href="/login">
                  <Button className="bg-medhive-500 hover:bg-medhive-600">
                    Sign Up
                  </Button>
                  </Link>
                </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
