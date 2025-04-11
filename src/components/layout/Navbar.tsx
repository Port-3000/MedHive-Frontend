"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Model Hub", path: "/model-hub" },
    { name: "Contribute", path: "/contribute" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.div className="sticky inset-x-0 top-0 z-50 w-full pt-2">
      {/* Desktop Navbar */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(24px)" : "blur(16px)",
          backgroundColor: visible
            ? "rgba(0, 0, 0, 0.45)"
            : "rgba(0, 0, 0, 0.35)",
          border: visible
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: visible
            ? "0 8px 24px rgba(0, 0, 0, 0.4)"
            : "0 4px 12px rgba(0, 0, 0, 0.2)",
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        style={{ minWidth: "800px" }}
        className={cn(
          "hidden lg:flex relative z-[60] mx-auto max-w-7xl items-center justify-between rounded-2xl px-6 py-3 text-white navbar-glow"
        )}
        
      >
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-medhive-500 text-white font-bold p-2 rounded-md">
              MH
            </span>
            <span className="text-xl">MedHive</span>
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

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-medhive-500 text-medhive-400 hover:bg-medhive-50"
          >
            Sign In
          </Button>
          <Button className="bg-medhive-500 hover:bg-medhive-600">
            Sign Up
          </Button>
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(20px)" : "blur(12px)",
          backgroundColor: visible
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(0, 0, 0, 0.4)",
          border: visible
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: visible
            ? "0 6px 18px rgba(0, 0, 0, 0.4)"
            : "0 3px 8px rgba(0, 0, 0, 0.2)",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
        }}
        className={cn(
          "lg:hidden relative z-50 mx-auto max-w-[calc(100vw-2rem)] flex-col rounded-2xl px-4 py-3 text-white"
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

                <div className="mt-4 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="border-medhive-500 text-medhive-400"
                  >
                    Sign In
                  </Button>
                  <Button className="bg-medhive-500 hover:bg-medhive-600">
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
