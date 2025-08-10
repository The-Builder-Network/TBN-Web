import React from "react";
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="The Builder Network Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">THE BUILDER NETWORK</h2>
              <p className="text-sm text-gray-500">New leads Activity Contacts My account</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link href="/profile" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/fahad.svg" alt="Fahad icon" /></span>
                <span className="ml-3">Fahad</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/complete-registration.svg" alt="Complete registration icon" /></span>
                <span className="ml-3">Complete registration</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/company-description" className="flex items-center p-4 text-blue-600 bg-blue-50 hover:bg-blue-100">
                <span className="w-5 h-5"><img src="/icons/company-description.svg" alt="Company description icon" /></span>
                <span className="ml-3">Company description</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/reviews" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/reviews.svg" alt="Reviews icon" /></span>
                <span className="ml-3">Reviews</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/portfolio" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/portfolio.svg" alt="Portfolio icon" /></span>
                <span className="ml-3">Portfolio</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/ask-a-trades-person" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/ask-a-trades-person.svg" alt="Ask a trades person icon" /></span>
                <span className="ml-3">Ask a trades person</span>
              </Link>
            </li>
            <li>
              <Link href="/profile/account" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/account.svg" alt="Account icon" /></span>
                <span className="ml-3">Account</span>
              </Link>
              <ul className="ml-8 space-y-2 mt-2">
                <li>
                  <Link href="/profile/contact-details" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/contact-details.svg" alt="Contact details icon" /></span>
                    <span className="ml-3">Contact details</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/manage-account" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/manage-account.svg" alt="Manage account icon" /></span>
                    <span className="ml-3">Manage account</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/saved-leads" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/saved-leads.svg" alt="Saved leads icon" /></span>
                    <span className="ml-3">Saved leads</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/profile/job-settings" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/job-settings.svg" alt="Job settings icon" /></span>
                <span className="ml-3">Job settings</span>
              </Link>
              <ul className="ml-8 space-y-2 mt-2">
                <li>
                  <Link href="/profile/work-area" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/work-area.svg" alt="Work area icon" /></span>
                    <span className="ml-3">Work area</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/services" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/services.svg" alt="Services icon" /></span>
                    <span className="ml-3">Services</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/message-templates" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/message-templates.svg" alt="Message templates icon" /></span>
                    <span className="ml-3">My message templates</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/notifications" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/notifications.svg" alt="Notifications icon" /></span>
                    <span className="ml-3">Notifications</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/profile/payments" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/payments.svg" alt="Payments icon" /></span>
                <span className="ml-3">Payments</span>
              </Link>
              <ul className="ml-8 space-y-2 mt-2">
                <li>
                  <Link href="/profile/balance" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/balance.svg" alt="Balance icon" /></span>
                    <span className="ml-3">Balance</span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/payments" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/payments.svg" alt="Payments icon" /></span>
                    <span className="ml-3">Payments</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/profile/support" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/support.svg" alt="Support icon" /></span>
                <span className="ml-3">Support</span>
              </Link>
              <ul className="ml-8 space-y-2 mt-2">
                <li>
                  <Link href="/profile/support-center" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/support-center.svg" alt="Support center icon" /></span>
                    <span className="ml-3">Support center</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/profile/discover" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/discover.svg" alt="Discover icon" /></span>
                <span className="ml-3">Discover</span>
              </Link>
              <ul className="ml-8 space-y-2 mt-2">
                <li>
                  <Link href="/profile/trade-perks" className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
                    <span className="w-5 h-5"><img src="/icons/trade-perks.svg" alt="Trade perks icon" /></span>
                    <span className="ml-3">Trade Perks</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/logout" className="flex items-center p-4 text-red-600 hover:bg-gray-100">
                <span className="w-5 h-5"><img src="/icons/log-out.svg" alt="Log out icon" /></span>
                <span className="ml-3">Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Company description</h2>
          <div className="flex justify-end mb-4">
            <button className="text-gray-600 hover:text-gray-800">Edit</button>
          </div>
          <p className="text-gray-600 mb-4">
            About your company
            <br />
            Talk about your educational background, but focus on the most important degrees,
            certifications, or training
          </p>
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Guarantee</h3>
            <p className="text-gray-600 mb-2">
              Increase your chances of getting hired by offering a guarantee.
            </p>
            <p className="text-gray-600 mb-2">
              Homeowners are aware guarantees vary and should discuss the terms in advance.
            </p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" name="guarantee" className="mr-2" defaultChecked />
                Yes, I offer a guarantee
              </label>
              <label className="flex items-center">
                <input type="radio" name="guarantee" className="mr-2" />
                No, I do not offer a guarantee
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t p-4 text-center text-sm text-gray-500">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Support center</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookie policy</a>
          <a href="#" className="hover:underline">Cookie settings</a>
          <a href="#" className="hover:underline">Terms and conditions</a>
        </div>
        <p className="mt-2">© 2008-2025 The Builder Network Limited</p>
      </footer>
    </div>
  );
};

export default ProfilePage;