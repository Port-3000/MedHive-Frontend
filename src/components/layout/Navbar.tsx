//src/components/layout/Navbar.tsx

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import { createPortal } from 'react-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const sessionData = useContext(SessionContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    setMounted(true);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "MODEL HUB", path: "/model-hub" },
    { name: "CONTRIBUTE", path: "/contribute" },
    { name: "ABOUT", path: "/about" },
  ];

  const handleSignOut = async () => {
    // Prevent layout shifts during transition
    document.documentElement.style.pointerEvents = "none";

    const { error } = await supabase.auth.signOut();

    // Wait for next animation frame
    await new Promise(requestAnimationFrame);

    document.documentElement.style.pointerEvents = "";

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  const avatarUrl = sessionData?.sessionData?.session?.user?.user_metadata?.avatar_url || "/user.png";

  return (
    <motion.div className="sticky isolate inset-x-0 top-0 z-[100] w-full pt-2 font-['Lilita_One']">
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

        {!sessionData.isLoading &&
          (sessionData.sessionData.session ? (
            <div className="relative profile-menu">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative z-50 rounded-full"
              >
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-medhive-500">
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg bg-black/90 border border-gray-700 text-white shadow-lg backdrop-blur-md z-[200]">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block text-center px-2 py-2 text-sm hover:bg-blue-400 cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <div className="border-t border-gray-700 my-1" />
                    <button
                      className="block w-full px-2 py-2 text-sm hover:bg-blue-400 cursor-pointer"
                      onClick={() => {
                        setIsProfileOpen(false),
                        setModalOpen(true)
                      }
                      }
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
              {mounted && modalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                  <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setModalOpen(false)}
                  />

                  <div className="relative bg-gray-900 text-white rounded-lg p-6 shadow-xl w-[95%] max-w-md mx-4">
                    <h2 className="text-2xl text-center font-semibold mb-4">Confirm Sign Out</h2>
                    <p className="text-center text-lg mb-6">Are you sure you want to sign out?</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>,
                document.body
              )}
            </div>
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
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                {!sessionData.isLoading &&
                  (sessionData.sessionData.session ? (
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
                          <div className="flex flex-col gap-2 mt-2">
                            <Link
                              href="/profile"
                              className="text-sm text-medhive-500 hover:text-medhive-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sessionData.sessionData.userprofile?.full_name ||
                                "User"}
                            </Link>
                            <button
                              className="text-sm text-gray-400 hover:text-medhive-400"
                              onClick={() => {
                                setIsMenuOpen(false),
                                setModalOpen(true)
                              }}
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col space-y-2">
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
