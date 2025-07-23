'use client'; // Add this to enable client-side rendering for Swiper

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import React from 'react'; // Explicitly import React
import { Montserrat, Inter } from 'next/font/google';
import Header from "../components/Header";

// Define fonts
const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Statically define JobBanners component
function JobBanners() {
  return (
    <div className="bg-[#1646D2] py-8 px-2">
      <div className="relative rounded-xl max-w-7xl mx-auto h-[240px] flex items-center px-6 -mt-32 z-10">
        {/* Background Image */}
        <Image
          src="/images/job.jpg"
          alt="Background"
          fill
          className="object-cover rounded-2xl"
        />
        {/* Optional overlay for style */}
        <div className="absolute inset-0 bg-opacity-30 z-0" />
        {/* Text */}
        <div className="z-10 ml-[7%] text-white text-[38px] font-bold">
          Post your job now
        </div>
        {/* Button */}
        <div className="ml-auto mr-[7%] z-10">
          <button className="bg-blue-600 text-white text-sm font-medium px-10 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition">
            CLICK
            <Image
              src="/icons/right-arrow.svg"
              alt="Arrow Button"
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>
      <div className="bg-[#1646D2] px-20 py-10 flex items-center justify-between"></div>
    </div>
  );
}

// Statically define Footers component
function Footers() {
  return (
    <>
      {/* Main Footer */}
      <footer
        className="text-white px-6 md:px-24 pt-12 pb-8 text-sm font-sans bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bgFooter.jpg')" }}
      >
        {/* Navigation Section */}
        <div className="max-w-7xl mx-auto pb-10 ml-[5%]">
          <div className="text-white font-bold text-xl">
            <Image
              src="/images/builder-name.png"
              alt="The Builder Network Logo"
              width={160}
              height={48}
              className="h-12 mb-8 w-auto"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-xs text-white">
            <ul className="space-y-4">
              <li><a href="#" className="underline">Post a job</a></li>
              <li><a href="#" className="underline">How it works</a></li>
              <li><a href="#" className="underline">Find trades</a></li>
              <li><a href="#" className="underline">Customer helpdesk</a></li>
            </ul>
            <ul className="space-y-4">
              <li><a href="#" className="underline">Register as trades person</a></li>
              <li><a href="#" className="underline">Quality requirements</a></li>
              <li><a href="#" className="underline">Reviews policy</a></li>
              <li><a href="#" className="underline">Tradespeople helpdesk</a></li>
            </ul>
            <ul className="space-y-4">
              <li><a href="#" className="underline">About us</a></li>
              <li><a href="#" className="underline">Press and media</a></li>
              <li><a href="#" className="underline">Vacancies</a></li>
              <li><a href="#" className="underline">Become a partner</a></li>
            </ul>
            <ul className="space-y-4">
              <li><a href="#" className="underline">Trades</a></li>
              <li><a href="#" className="underline">Services</a></li>
              <li><a href="#" className="underline">Cities</a></li>
              <li><a href="#" className="underline">Pricing guides</a></li>
            </ul>
          </div>
        </div>
        {/* Trustpilot + Store Badges */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4 ml-[5%] mr-[10%]">
          {/* Left: Social & Trustpilot */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Icons */}
            <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
              <path d="M16 20.213V26.8599H19.625V20.213H22.3281L22.8906 17.1567H19.625V16.0755C19.625 14.4599 20.2594 13.8411 21.8969 13.8411C22.4062 13.8411 22.8156 13.8536 23.0531 13.8786V11.1067C22.6063 10.9849 21.5125 10.8599 20.8812 10.8599C17.5406 10.8599 16 12.438 16 15.8411V17.1567H13.9375V20.213H16Z" fill="#262627"/>
            </svg></a>
            <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
              <path d="M25.7675 15.1953C25.593 14.5384 25.0789 14.021 24.4262 13.8454C23.2432 13.5264 18.4993 13.5264 18.4993 13.5264C18.4993 13.5264 13.7554 13.5264 12.5723 13.8454C11.9196 14.021 11.4055 14.5384 11.2311 15.1953C10.9141 16.3861 10.9141 18.8705 10.9141 18.8705C10.9141 18.8705 10.9141 21.3549 11.2311 22.5456C11.4055 23.2026 11.9196 23.6984 12.5723 23.874C13.7554 24.193 18.4993 24.193 18.4993 24.193C18.4993 24.193 23.2431 24.193 24.4262 23.874C25.0789 23.6984 25.593 23.2026 25.7675 22.5456C26.0845 21.3549 26.0845 18.8705 26.0845 18.8705C26.0845 18.8705 26.0845 16.3861 25.7675 15.1953ZM16.9477 21.1261V16.6148L20.9127 18.8705L16.9477 21.1261Z" fill="#262627"/>
            </svg></a>
            <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
              <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
              <path d="M22.6609 12.3599H24.8672L20.0484 17.8661L25.7172 25.3599H21.2797L17.8016 20.8161L13.8266 25.3599H11.6172L16.7703 19.4692L11.3359 12.3599H15.8859L19.0266 16.513L22.6609 12.3599ZM21.8859 24.0411H23.1078L15.2203 13.6099H13.9078L21.8859 24.0411Z" fill="#262627"/>
            </svg></a>
          </div>
          {/* Right: App Store Badges */}
          <div className="flex items-center gap-1">
            <Image src="/images/google-play.svg" alt="Get it on Google Play" width={135} height={40} className="h-12 w-auto" />
            <Image src="/images/app-store.svg" alt="Download on the App Store" width={135} height={40} className="h-12 w-auto" />
          </div>
        </div>
        {/* Bottom Links */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-white text-xs ml-[5%] mr-[10%]">
          <div className="space-x-4 mb-2 md:mb-0">
            <a href="#" className="underline">Privacy</a>
            <a href="#" className="underline">Cookie policy</a>
            <a href="#" className="underline">Cookie settings</a>
            <a href="#" className="underline">Terms and conditions</a>
          </div>
        </div>
      </footer>
      {/* Blue Panel */}
      <section className="bg-[#1646D2] text-[#FFFFFF] md:px-24 py-8 text-[13px]">
        <div className="mb-8 mr-[10%] mt-[4%] ml-[5%]">
          <p className="font-bold text-[19.38px] mb-6">Find tradespeople in your area</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-4">
            {[
              "London", "Manchester", "Glasgow", "Bristol", "Birmingham", "Nottingham",
              "Leeds", "Liverpool", "Sheffield", "Edinburgh", "Cardiff", "Leicester",
              "Stockport", "Newcastle Upon Tyne", "Milton Keynes", "Northampton",
              "Norwich", "Derby", "Reading", "Coventry", "Stoke On Trent", "Cambridge",
              "Southampton", "More cities +"
            ].map(city => (
              <a
                key={city}
                href="#"
                className="underline hover:text-black block break-words whitespace-pre-line"
              >
                {city}
              </a>
            ))}
          </div>
        </div>
        <div className="mb-2 mr-[10%] ml-[5%]">
          <p className="font-bold text-[19.38px] mb-6">Our tradespeoples professions</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-4">
            {[
              "Handymen", "Painters and\nDecorators", "Builders", "Landscape Gardeners",
              "Carpenters", "Plasterers", "Tilers", "Flooring Fitters", "Fencers",
              "Bricklayers", "Bathroom Fitters", "Window Fitters", "Kitchen Fitters",
              "Fascias and Soffits\nInstallers", "Gas Engineers", "Roofers",
              "Fireplace Installers", "More trades +"
            ].map(trade => (
              <a
                key={trade}
                href="#"
                className="underline hover:text-black block break-words whitespace-pre-line"
              >
                {trade}
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Partner section */}
      <div className="bg-[#FFFFFF] text-[#62626A] text-center text-[14px] py-4 px-6">
        <div>©2025 The Builder Network Limited</div>
      </div>
    </>
  );
}

// Statically define ServiceCarousel component
function ServiceCarousel() {
  const slides = [
    {
      title: 'Painting & Decorating',
      description:
        'Ready to refresh your space with a new look? Our expert guides help you explore ideas, estimate costs, and find the right professionals to bring your vision to life.',
      image: '/images/c1.png',
    },
    {
      title: 'Plumbing',
      description:
        'Wondering what plumbing services cost or what’s involved? Our comprehensive guides break it all down — from pricing to what to expect — so you can plan with confidence.',
      image: '/images/c2.png',
    },
    {
      title: 'Gardening & Landscaping',
      description:
        'Dreaming of a garden that soothes and inspires? Our detailed guides cover design tips, costs, and how to find the best landscapers for the job.',
      image: '/images/c3.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white w-full overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-[6%]">
        <div className="inline-block mb-4 px-3 py-1 bg-[#1646D2] text-white text-xs font-semibold tracking-wider">
          POPULAR TRADES
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug -mb-12">
          Discover Trusted Services for <br className="hidden md:inline" />
          Every Home Project
        </h1>
      </div>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={8000}
        slidesPerView="auto"
        spaceBetween={30}
        grabCursor={false}
        allowTouchMove={false}
        className="w-full"
      >
        {[...slides, ...slides, ...slides].map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!w-[500px] flex-shrink-0"
          >
            <div
              className="relative h-[500px] overflow-hidden rounded-2xl -skew-x-6 shadow-lg"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 right-6 p-10">
                <div className="bg-[#FFFFFF] h-[300px] p-5">
                  <h3 className="text-xl font-bold text-gray-900 mt-15">{slide.title}</h3>
                  <p className="text-base text-gray-700 mb-2">{slide.description}</p>
                  <button className="bg-[#1646D2] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section>
        {/* Hero Section */}
        <div style={{ backgroundImage: 'url(/images/banner.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Main Hero Content */}
          <div className="flex flex-col md:flex-row items-center justify-center px-10 md:px-20 pt-40 pb-32 relative z-10">
            {/* Left Side */}
            <div className="max-w-lg text-white space-y-8 text-center">
              <div className="space-y-2">
                <p className="text-[16px] tracking-widest uppercase font-normal">THE RELIABLE WAY TO HIRE A</p>
                <h1 className="text-[42px] font-kollektif md:text-6xl font-bold">Trades Person</h1>
              </div>
              {/* Search Box */}
              <div className="mt-20 w-full flex justify-center">
                <div className="w-full max-w-md">
                  <p className="text-2xl mb-8 text-white text-center font-semibold">What Is Your Job?</p>
                  <input
                    type="text"
                    placeholder="For example: painting"
                    className="p-3 rounded-full bg-[#1646D2] text-white text-base text-center
                              placeholder-white placeholder-opacity-75
                              focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white text-black items-center px-4 py-2 rounded-lg shadow-md w-fit space-y-1 mt-4 mb-4 ml-10">
            <div className="flex items-center space-x-1 text-sm font-medium">
              <span>Excellent</span>
              <span className="px-1 text-green-500 text-x font-bold">★</span>
              <span>Trustpilot</span>
            </div>
            <svg width="121" height="30" viewBox="0 0 101 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.0585938 19.3012H18.5206V0.859863H0.0585938V19.3012Z" fill="#00B67A"/>
              <path d="M15.7987 8.70564L5.32729 16.304L6.85528 11.6079L2.85547 8.70564H7.79944L9.3271 4.00928L10.8548 8.70564H15.7987ZM9.32748 13.402L12.1873 12.8011L13.3267 16.304L9.32748 13.402Z" fill="#000000"/>
              <path d="M20.4609 19.3012H38.923V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
              <path d="M20.4609 19.3012H29.6919V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
              <path d="M29.9125 13.3308L32.3648 12.8014L33.499 16.3838L29.6533 13.5168L25.6576 16.3838L27.2084 11.6707L23.1484 8.75785H28.1667L29.7169 4.04443L31.2677 8.75785H36.2857L29.9125 13.3308Z" fill="#000000"/>
              <path d="M40.875 19.3012H59.337V0.859863H40.875V19.3012Z" fill="#00B67A"/>
              <path d="M40.875 19.3012H50.106V0.859863H40.875V19.3012Z" fill="#00B67A"/>
              <path d="M56.6151 8.70564L46.1437 16.304L47.6717 11.6079L43.6719 8.70564H48.6158L50.1435 4.00928L51.6712 8.70564L56.6151 8.70564ZM50.1439 13.402L53.0037 12.8011L54.1431 16.304L50.1439 13.402Z" fill="#000000"/>
              <path d="M61.293 19.3012H79.755V0.859863H61.293V19.3012Z" fill="#00B67A"/>
              <path d="M61.293 19.3012H70.524V0.859863H61.293V19.3012Z" fill="#00B67A"/>
              <path d="M77.0292 8.70564L66.5581 16.304L68.0857 11.6079L64.0859 8.70564H69.0299L70.5576 4.00928L72.0852 8.70564L77.0292 8.70564ZM70.558 13.402L73.4177 12.8011L74.5571 16.304L70.558 13.402Z" fill="#000000"/>
              <path d="M81.6953 19.3012H100.157V0.859863H81.6953V19.3012Z" fill="#DCDCE6"/>
              <path d="M81.6953 19.3012H90.9263V0.859863H81.6953V19.3012Z" fill="#00B67A"/>
              <path d="M97.4315 8.70564L86.9604 16.304L88.4881 11.6079L84.4883 8.70564H89.4322L90.9599 4.00928L92.4876 8.70564H97.4315ZM90.9603 13.402L93.8201 12.8011L94.9595 16.304L90.9603 13.402Z" fill="#000000"/>
            </svg>
          </div>
          {/* Stats Section with matching style */}
          <div className="rounded-tr-2xl bg-[#1646D2] py-10 text-white flex justify-around text-center mr-[60%] relative">
            <div className="mx-auto flex flex-col md:flex-row justify-around text-center gap-20 mb-11">
              <div>
                <h2 className="text-3xl font-bold">232,870</h2>
                <p className="text-[16px]">tradespeople</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">40+</h2>
                <p className="text-[16px]">trade categories</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold">2,509,604</h2>
                <p className="text-[16px]">reviews</p>
              </div>
            </div>
          </div>
          {/* Bottom Image Transition (4h.png) */}
          <Image src="/images/4h.png" alt="Bottom Image" width={1920} height={80} className="w-full h-[80px] z-10 relative -mt-20" />
        </div>
        <div className={`${montserrat.className} max-w-5xl mx-auto text-center text-[15px] font-semibold text-[#1646D2] mt-15`}>
                <p>HOW TO HIRE THE RIGHT</p>
        </div>      
        <div className={`${montserrat.className} max-w-5xl mx-auto text-center text-[45px] font-bold text-[#000000]`}>
                <h1>Trades person</h1>
        </div>
        <div className="flex max-w-5xl p-2 pb-6 mx-auto items-center pl-[450px]">
          <Image
            src="/images/background/tbg3.png"
            alt="How to find work illustration"
            width={120}
            height={60}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 mb-8">
          <div className="flex-1 p-4 text-center mt-6">
            <Image
              src="/images/background/Container1.png"
              alt="Container 1"
              className="mx-auto"
              width={250}
              height={250}
            />
            <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-1`}>Step 1</h2>
            <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-3`}>Get Matched with the Right Leads</h3>
            <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>Create your free professional profile, and we will send you job leads that fit your trade and service area.</p>
          </div>
          <div className="flex-1 p-4 text-center">
            <Image
              src="/images/background/Container2.png"
              alt="Container 2"
              className="mx-auto"
              width={300}
              height={300}
            />
            <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-2`}>Step 2</h2>
            <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-8`}>Show You are Interested.</h3>
            <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>Reply to as many leads as you like. Customers review your profile, past work, and ratings to decide who they want to contact.</p>
          </div>
          <div className="flex-1 p-4 text-center mt-6">
            <Image
              src="/images/background/Container3.png"
              alt="Container 3"
              className="mx-auto"
              width={250}
              height={250}
            />
            <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-1`}>Step 3</h2>
            <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-3`}>Connect and Get to Work</h3>
            <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>If a customer shortlists you, pay a small fee to access their contact details and move forward with the job.</p>
          </div>
        </div>
        
      </section>


      {/* 3rd section */}

      <div className="bg-[#F7F7F7] px-20 py-20 flex items-center justify-between"></div>
      <section className="relative w-full min-h-screen">
        {/* Background image with custom shape overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/b311.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <Image src="/images/4h2.png" alt="Bottom Image" width={1920} height={130} className="w-full h-[130px] z-10 relative -mb-20" />
        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-start gap-10 mt-18">
          {/* Left Side - Text + Cards */}
          <div className="flex-1 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Why The Builder Network is  <br />
              <span className="text-white">the Reliable Way</span>
            </h2>
            <p className="text-[13px] mb-10 max-w-lg">
              Hiring a tradesperson when you need one isnt always easy. The Builder Network simplifies
              the process, giving you confidence and control every step of the way.
            </p>
            <div className="max-w-[682px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[320px]">
                {[
                  {
                    title: 'Find Skilled Tradespeople',
                    desc: 'Post your job for free and connect with professionals who have the right skills for the task. Only those interested will respond — you choose who to engage.',
                    icon: '/images/1.png',
                  },
                  {
                    title: 'Genuine Customer Reviews',
                    desc: 'Read real reviews from previous \n customers to help you make informed \n hiring decisions with confidence.',
                    icon: '/images/2.png',
                  },
                  {
                    title: 'Full Control at Every Step',
                    desc: 'Browse profiles, work history, and ratings before you chat. Only the tradespeople \nyou select can contact you.\n \n',
                    icon: '/images/3.png',
                  },
                  {
                    title: 'A Hassle-Free Experience',
                    desc: 'No cold calls, no pressure. Just an easy-to-use platform that lets you manage the \n process on your terms — from start to finish.',
                    icon: '/images/4.png',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-[#74787C] p-5 rounded-xl shadow flex items-start space-x-2"
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={62}
                      height={92}
                      className="-ml-2 -mt-5"
                    />
                    <div>
                      <h3 className="font-semibold text-[13px] h-[10px] text-[#000000] mb-4">{item.title}</h3>
                      <p className="text-[11px] whitespace-pre-line">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1646D2] text-white py-6 px-6 flex flex-col sm:flex-row items-center justify-between pb-14 mt-8">
          <h3 className="text-3xl font-semibold mb-3 sm:mb-0 ml-30">
            Ready to hire a trades person?
          </h3>
          <button className="bg-white text-[#000000] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition mr-50">
            Post your job
          </button>
        </div>
      </section>
      {/* Your "How to find the work" section */}
      
      <div className="bg-[#F7F7F7] px-20 py-20 flex items-center justify-between"></div>
      <div className="bg-[#FFFFFF] min-h-screen">
        <ServiceCarousel />
      </div>
      <>
        <style>
          {`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .scroll-left {
              animation: scroll-left 60s linear infinite;
            }
          `}
        </style>
        <div className="bg-[#0047FF] w-full overflow-hidden py-2">
          <div className="flex whitespace-nowrap scroll-left">
            <Image
              src="/images/unnamed.png"
              alt="Scrolling Text"
              width={1600}
              height={60}
            />
            <Image
              src="/images/unnamed.png"
              alt="Scrolling Text Duplicate"
              width={1600}
              height={60}
            />
          </div>
        </div>
      </>
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bghome.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 ml-25 flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Text Section */}
          <div className="max-w-xl text-center md:text-left">
            <span className="text-sm p-1 text-[#FFFFFF] bg-[#1646D2] uppercase tracking-wide">
              Looking for more work?
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              Grow Your Trade<br />
              Business with The<br />
              Builder Network
            </h1>
            <p className="text-gray-600 mb-6">
              Join a trusted platform built to help tradespeople like you win more jobs.
              Sign up for free and get matched with local opportunities that suit your skills and schedule.
              Whether youre after big projects or quick fillers — the choice is yours.
            </p>
            <button className="bg-[#1646D2] text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition">
              Tradespeople — Join for Free
            </button>
          </div>
          {/* Image Section */}
          <div className="relative mr-16">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/main-worker.jpg"
                alt="Main worker"
                width={300}
                height={400}
                className="rounded-xl w-[504px] h-[500px]"
              />
            </div>
            <div className="absolute bottom-12 -left-4 w-[177px] h-[186px] rounded-xl overflow-hidden border-4 border-white shadow-md">
              <Image
                src="/images/small-worker.jpg"
                alt="Small worker"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#F7F7F7] px-20 py-10 flex items-center justify-between"></div>
      {/* Download our app Section */}
      <section className="relative z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/bgphone.jpg" alt="Background" fill className="object-cover" />
        </div>
        {/* Foreground Content */}
        <div className="text-white pb-0 px-6 md:px-20 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative">
            {/* Text Content */}
            <div className="md:w-1/2 z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Download our app</h2>
              <p className="mb-10 text-sm md:text-base">
                Posting and managing your jobs is even easier with the Builder Network app.
                Add photos and information in an instant and keep things moving with
                notifications and chat, allowing you to message tradespeople wherever you are.
                Once the jobs done, leave a rating and review straight from your phone.
              </p>
              {/* App store buttons */}
              <div className="flex gap-1 mb-8 -ml-5">
                <Image src="/images/google-play.svg" alt="Get it on Google Play" width={135} height={40} className="h-12 w-auto" />
                <Image src="/images/app-store.svg" alt="Download on the App Store" width={135} height={40} className="h-12 w-auto" />
              </div>
              <p className="text-sm">
                Looking for our trades<br /> person app?
                <span className="inline-block ml-35">
                  <a href="#" className="underline text-white">Find it here</a>
                </span>
              </p>
            </div>
            {/* Phone Image */}
            <div className="md:w-1/2 relative -mt-28 z-10">
              <Image src="/images/phone.png" alt="App screenshot" width={300} height={600} className="w-full max-w-xs mx-auto" />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#F7F7F7] py-31 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid for the four cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-[12%]">
            {/* Card 1: Millions of genuine reviews */}
            <div className="bg-[#1646D2] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-[350px] ml-8 mr-8">
              <div className="ml-10">
                <h2 className="text-4xl font-bold mb-4">Millions of genuine reviews</h2>
                <p className="text-gray-200">Reviews on The Builder Network are<br/> written by customers like you</p>
              </div>
              <div className="mt-8 flex justify-end">
                <button className="bg-white text-[#0866FF] font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300 mr-18">
                  Post your job
                </button>
              </div>
            </div>
            {/* Card 2: Supply and fit 2 fence panels */}
            <div className="bg-[#1646D2] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-[350px] w-[590px]">
              <div className="ml-8 mr-8">
                <h3 className="text-4xl font-bold mb-2">Supply and fit<br/> 2 fence panels</h3>
                <div className="flex space-x-1 mb-4">
                  <span className="text-[#F19100]">⭐</span>
                  <span className="text-[#F19100]">⭐</span>
                  <span className="text-[#F19100]">⭐</span>
                  <span className="text-[#F19100]">⭐</span>
                  <span className="text-[#F19100]">⭐</span>
                </div>
                <p className="text-gray-200 text-sm">
                  Oscar replaced two fence panels that had been blown off by the <br/> wind. He is a very nice guy and got the job done...
                </p>
              </div>
              <p className="mt-4 text-sm font-semibold ml-8">AFFINITY DECKING LTD</p>
            </div>
            {/* Card 3: Display units in a commercial premises */}
            <div className="bg-[#1646D2] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-[350px] ml-8 mr-8">
              <div className="ml-8 mr-8">
                <h3 className="text-4xl font-bold mb-2">Display units in a commercial premises</h3>
                <div className="flex space-x-1 mb-4">
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                </div>
                <p className="text-gray-200 text-sm">
                  Overall the team did an okay job on the cabinet. There was a<br/> delay - which arguably was part my fault for the...
                </p>
              </div>
              <p className="mt-4 text-sm font-semibold ml-8">FOXY FURNITURE LTD</p>
            </div>
            {/* Card 4: Coffee table and clothes rack */}
            <div className="bg-[#1646D2] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between h-[350px] w-[590px]">
              <div className="ml-8 mr-8">
                <h3 className="text-4xl font-bold mb-2">Coffee table and <br/> clothes rack</h3>
                <div className="flex space-x-1 mb-4">
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                  <span className="text-[#FFBD00]">⭐</span>
                </div>
                <p className="text-gray-200 text-sm">
                  He did a great job fixing my table! He was very professional, <br/> friendly, and helpful. Highly recommend his serve...
                </p>
              </div>
              <p className="mt-4 text-sm font-semibold ml-8">CB General Builders</p>
            </div>
          </div>
        </div>
      </div>
      {/* JobBanner1 */}
      <JobBanners />
      {/* Footer1 */}
      <Footers />
    </div>
  );
}