"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const isClientAuthenticatedPage = ['/dashboard', '/my-jobs', '/profile'].includes(pathname);
  const isTradespersonAuthenticatedPage = ['/new-leads', '/activity', '/contact', '/my-account'].includes(pathname);
  const isOnboardingPage = (
    pathname.startsWith('/signup') ||
    pathname.startsWith('/id-check') ||
    pathname.startsWith('/safety-and-quality') ||
    pathname.startsWith('/profile-setup') ||
    pathname.startsWith('/payment-method')
  );

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              alt="The Builder Network Logo"
              width={375}
              height={100}
              className="object-contain"
            />
          </Link>
        </div>
        {!isOnboardingPage && (
          <nav className="flex space-x-6">
            {isClientAuthenticatedPage ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-[#4A4A4A] font-medium font-inter ${pathname === '/dashboard' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/my-jobs" 
                  className={`text-[#4A4A4A] font-medium font-inter ${pathname === '/my-jobs' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  My Jobs
                </Link>
                <Link 
                  href="/profile" 
                  className={`text-[#4A4A4A] font-medium font-inter ${pathname === '/profile' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  Profile
                </Link>
                <Link 
                  href="/" 
                  className="text-[#4A4A4A] font-medium font-inter"
                >
                  Log out
                </Link>
              </>
            ) : isTradespersonAuthenticatedPage ? (
              <>
                <Link 
                  href="/new-leads" 
                  className={`font-medium font-inter ${pathname === '/new-leads' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  New Leads
                </Link>
                <Link 
                  href="/activity" 
                  className={`font-medium font-inter ${pathname === '/activity' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  Activity
                </Link>
                <Link 
                  href="/contact" 
                  className={`font-medium font-inter ${pathname === '/contact' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                >
                  Contact
                </Link>
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/my-account" 
                    className={`font-medium font-inter ${pathname === '/my-account' ? 'text-[#A1C5FF]' : 'text-[#000000]'}`}
                  >
                    My Account
                  </Link>
                  <span className="text-[#000000] font-medium font-inter">☰</span>
                </div>
              </>
            ) : (
              <>
                <Link href="/post-a-job" className="text-[#003087] font-medium font-inter">
                  Post a job
                </Link>
                <Link href="/signup" className="text-[#4A4A4A] font-medium font-inter">
                  Sign up as a trades person
                </Link>
                <Link href="/login" className="text-[#4A4A4A] font-medium font-inter">
                  Log in
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}