import { useState } from "react";
import { ShoppingCart, Moon, Sun, Menu, X } from "lucide-react";
import { Logo } from "./common/Logo";
import { Link } from "react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LogOut } from 'lucide-react';
import {
  useCartStore,
  selectTotalQuantity
} from "../stores/cartStore";

import {
  useCurrentUser,
  CURRENT_USER_KEY
} from "../hooks/queries/useCurrentUser";
import { logoutUser } from "../services/authService";

//for theme management

import { useThemeStore } from "../stores/themeStore";


//import css
import '../App.css'

// Navigation links for the header
import { Navigation } from "../data/Navigation";

const navLinks = Navigation.map((link) => ({
  title: link.name,
  href: link.path,
}));

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const totalQuantity = useCartStore(selectTotalQuantity);


  const queryClient = useQueryClient();
  const { data: user, isPending: isAuthLoading, isError: isAuthError } = useCurrentUser();
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(CURRENT_USER_KEY, null);
      setIsMenuOpen(false); // Close the menu after logout
    },
    onError: (error) => {
      console.error("Error occurred during logout:", error);
    }
  })

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-lg border-b border-[var(--border)] transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-full items-center justify-between px-2 md:px-6 ">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="text-sm font-medium transition-colors duration-300 hover:text-[var(--text-secondary)]"
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">

         

          <Link
            to="/cart"
            aria-label={`سلة المشتريات، ${totalQuantity} قطعة`}
            className="
            relative
            rounded-full
            bg-[var(--bg-secondary)]
            p-2.5
            transition-all duration-300
            hover:bg-[var(--primary)]
            hover:scale-105"
          >
            <ShoppingCart size={20} strokeWidth={1.8} />

            {totalQuantity > 0 && (
              <span className="
            absolute -top-1 -right-1
            flex h-5 min-w-5
            items-center justify-center
            rounded-full
            bg-[var(--secondary)]
            px-1
            text-[10px]
            font-bold
            text-white
          ">
                {totalQuantity}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={theme ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
            // onClick={() => setIsDarkMode((prev) => !prev)}
            className="rounded-full bg-[var(--bg-secondary)] p-2.5 text-[var(--text-accent)] transition-all duration-300 hover:bg-[var(--primary)] hover:scale-105"
            onClick={toggleTheme}
          >
            {theme == "light" ? (
              <Sun size={20} strokeWidth={1.8} />
            ) : (
              <Moon size={20} strokeWidth={1.8} />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="فتح القائمة"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-full bg-[var(--bg-secondary)] p-2.5 transition-colors duration-300 hover:bg-[var(--primary)] md:hidden"
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          {/* Desktop Account */}
          <div className="hidden md:flex items-center gap-3">

            {isAuthLoading ? (
              <span className="text-xs text-[var(--text-secondary)]">
                جاري التحقق...
              </span>
            ) : isAuthError ? (
              <span className="text-xs text-red-500">
                تعذر التحقق من الحساب
              </span>
            ) : user ? (
              <>
                <button
                  type="button"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="flex items-center gap-2 rounded-full bg-[var(--bg-secondary)] px-4 py-2 text-sm hover:bg-[var(--primary)] disabled:opacity-50"
                >
                  <LogOut size={17} />
                  {logoutMutation.isPending ? "جاري الخروج..." : "تسجيل الخروج"}
                </button>

                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                   {user.name || user.email}
                </span>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-[var(--secondary)] px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:opacity-80"
              >
                تسجيل الدخول
              </Link>
            )}

          </div>
        </div>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm transition-colors duration-300 hover:text-[var(--text-accent)]"
              >
                {link.title}
              </a>
            ))}
            <div className="mt-5 flex flex-col gap-4 border-t border-[var(--border)] pt-5">

              {isAuthLoading ? (
                <span className="text-sm text-[var(--text-secondary)]">
                  جاري التحقق...
                </span>
              ) : isAuthError ? (
                <span className="text-sm text-red-500">
                  تعذر التحقق من الحساب
                </span>
              ) : user ? (
                <>
                  <span className="text-sm font-bold text-[var(--text-primary)]">
                    أهلاً، {user.name || user.email}
                  </span>

                  <button
                    type="button"
                    disabled={logoutMutation.isPending}
                    onClick={() => logoutMutation.mutate()}
                    className="flex items-center gap-2 text-sm text-red-500 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-semibold text-[var(--text-primary)]"
                >
                  تسجيل الدخول
                </Link>
              )}

            </div>
          </div>
        </nav>
      )}
    </header>
  );
}