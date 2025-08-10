import React from "react";
// "use client";
// import React from 'react';
// import Header from "../../components/Header";
// import { Montserrat,Inter} from 'next/font/google';
// import Image from 'next/image';

// const montserrat = Montserrat({
//   weight: ['400', '700'], // Regular and bold weights
//   subsets: ['latin'],    // Default subset for English text
// });
// const inter = Inter({
//   weight: ['400', '700'], // Regular and bold weights
//   subsets: ['latin'],    // Default subset for English text
// });

// export default function TradespersonLandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div
//         className="flex-grow bg-cover bg-center bg-no-repeat pb-[100px]"
//         style={{ backgroundImage: "url('/images/background/Tradeperson_landing_page.png')" }}
//       >
//         <div className="max-w-5xl mx-auto p-8 pt-24">
//           <h1 className={`${montserrat.className} text-[45px] font-600 text-[#ffffff] `}>
//             A Trusted Way to Find 
//           </h1> 
//           <h1 className={`${montserrat.className} text-[45px] font-600 text-[#ffffff] mb-4`}>
//             the Right Jobs for you 
//           </h1>
//           <div className={'pl-2 bg-black rounded-2xl'}>
//             <h4 className={`${montserrat.className} font-medium text-lg  ml-[20px] pt-[20px] text-[#ffffff] mb-4`}>
//               View local trade work
//             </h4>
//             <div className="flex space-x-4 ml-[35px] mb-4">
//               <div className="flex-1 pt-0.5">
//                 <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
//                   Your main trade
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-9 max-w-xs  border border-gray-300 rounded-md bg-white"
//                   placeholder="  Please Enter "
//                 />
//               </div>
//               <div className="flex-1 mr-[200px] ">
//                 <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
//                   Your postcode
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-9.5 max-w-xs  border border-gray-300 rounded-md bg-white"
//                   placeholder="  Please Enter "
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-4 ml-[35px] mb-6">
//               <div className="flex-1 pt-0.5">
//                 <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
//                   Your main trade
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full h-9 max-w-xs  border border-gray-300 rounded-md bg-white"
//                   placeholder="  Please Enter "
//                 />
//               </div>  
//               <button
//                 onClick={() => window.location.href = '/signup'}
//                 className="w-full h-10 mt-[27px] mr-[230px] max-w-xs  pr-[25px] bg-[#1239AC] text-white rounded-md hover:bg-[#8EB5FF] transition"
//               >
//                 Sign up for free
//               </button>
//             </div>

//             <p className={`${montserrat.className} text-sm text-[#ffffff] mb-2 ml-[35px]`}>
//               By clicking Sign up for free, you agree to The Builder Network.
//             </p>
//             <p className={`${montserrat.className} text-sm text-[#ffffff] ml-[35px] pb-8`}>
//               For information on how we process your data, see our{' '}
//               <span className="underline">Privacy policy</span>,{' '}
//               <span className="underline">Terms and Conditions</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* how to find work section */}
      
//       <div className={`${montserrat.className} max-w-5xl mx-auto text-center text-[45px] font-bold text-[#000000]`}>
//         <h1>How to find the work</h1>
//         <h1>you want?</h1>
//       </div>
//       <div className="flex items-center max-w-5xl mx-auto p-2 pb-6 ">
//         <Image
//           src="/images/background/tbg3.png"
//           alt="How to find work illustration"
//           width={120}
//           height={60}
//         />
//       </div>
//         <div className="flex flex-col md:flex-row justify-between mt-4 mb-8">
//           <div className="flex-1 p-4 text-center mt-6">
//             <Image
//               src="/images/background/Container1.png"
//               alt="Container 1"
//               className='mx-auto'
//               width={250}
//               height={250}
//             />
//             <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-1`}>Step 1</h2>
//             <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-3`}>Get Matched with the Right Leads</h3>
//             <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>Create your free professional profile, and we’ll send you job leads that fit your trade and service area.</p>
//           </div>
//           <div className="flex-1 p-4 text-center">
//             <Image
//               src="/images/background/Container2.png"
//               alt="Container 2"
//               className='mx-auto'
//               width={300}
//               height={300}
//             />
//             <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-2`}>Step 2</h2>
//             <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-8`}>Show You're Interested.</h3>
//             <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>Reply to as many leads as you like. Customers review your profile, past work, and ratings to decide who they want to contact.</p>
//           </div>
//           <div className="flex-1 p-4 text-center mt-6">
//             <Image
//               src="/images/background/Container3.png"
//               alt="Container 3"
//               className='mx-auto'
//               width={250}
//               height={250}
//             />
//             <h2 className={`${montserrat.className} text-2xl font-bold text-[#000000] mt-1`}>Step 3</h2>
//             <h3 className={`${montserrat.className} text-xl font-bold text-[#000000] mt-3`}>Connect and Get to Work</h3>
//             <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>If a customer shortlists you, pay a small fee to access their contact details and move forward with the job.</p>
//           </div>
//         </div>
//       {/* Ready to find work section */}

//       <div className="bg-[#1646D2] py-12">
//         <div className="max-w-5xl mx-auto p-4 text-center">
//           <h1 className={`${montserrat.className} text-4xl font-extrabold text-white mb-4`}>Ready to find work that fits your skills?</h1>
//           <p className={`${montserrat.className} text-lg text-white mt-8 mb-12`}>Good tradespeople are always in demand—but finding the right job at the right time can be tough.The Builder Network makes it easy, connecting you with job leads tailored to your trade and location.</p>
          
//           <div className="flex flex-col md:flex-row justify-between mt-4 mb-6">
//             <div className="flex-1 bg-white p-6 mb-4 md:mb-0 md:mr-4 rounded-lg">
//               <Image
//                 src="/images/background/VerticalBorder.png"
//                 alt="everything you want"
//                 className='mb-10'
//                 width={300}
//                 height={150}
//               />
//               <ul className={`${inter.className} text-sm text-left  text-black`}>
//                 <li className="mb-2">-Over 150,000 jobs posted each month</li>
//                 <li className="mb-2">-Only see jobs that match your trade and skills</li>
//                 <li className="mb-2">-Choose your preferred work areas and job types</li>
//                 <li className="mb-2">-Take on big projects or smaller tasks—it’s your call</li>
//               </ul>
//             </div>
//             <div className="flex-1 bg-white p-6 mb-4 md:mb-0 md:mr-4 rounded-lg">
//               <Image
//                 src="/images/background/VerticalBorder2.png"
//                 alt="everything you want"
//                 className='mb-10'
//                 width={300}
//                 height={150}
//               />
//               <ul className={`${inter.className} text-sm text-left text-black`}>
//                 <li className="mb-2">-Sign up free with zero commitment</li>
//                 <li className="mb-2">-Respond to job leads when it suits you</li>
//                 <li className='mb-2'>-Show interest in unlimited jobs for free.</li>
//                 <li className="mb-2">-Pay only when you’re shortlisted</li>
//               </ul>
//             </div>
//             <div className="flex-1 bg-white p-6 rounded-lg">
//               <Image
//                 src="/images/background/VerticalBorder3.png"
//                 alt="everything you want"
//                 className='mb-10'
//                 width={300}
//                 height={150}
//               />
//               <ul className={`${inter.className} text-sm text-left text-black`}>
//                 <li className="mb-2">-Create a free profile to highlight your expertise</li>
//                 <li className="mb-2">-Earn trust through customer reviews</li>
//                 <li className='mb-2'>-Attract new clients and grow your business</li>
//               </ul>
//             </div>
//           </div>
//           <h1 className={`${montserrat.className} text-2xl font-extrabold text-white mt-10 mb-4`}>Say yes to the work you want</h1>
//           <button className='bg-white rounded-4xl p-2 pr-20 pl-20'>Join for free</button>
//         </div>
//       </div>

//     </div>
//   );
// }


"use client";
import React from 'react';
import { Montserrat, Inter } from 'next/font/google';
import Header from "../../components/Header";
import Image from 'next/image';

// Footer component (converted from TypeScript)
const Footer = () => {
  return (
    <section>
      <div className="bg-[#1646D2] px-9 py-6 flex items-center justify-between">
        <span className="text-white text-[21px] font-semibold text-sm ml-[15%]">
          Post your job now
        </span>
        <button className="w-[38px] h-[38px] p-0 border-none bg-transparent mr-[19%]">
          <Image
            src="/icons/right-arrow.svg"
            alt="Arrow Button"
            width={48}
            height={48}
          />
        </button>
      </div>
      <footer className="text-neutral-900 px-6 md:px-24 pt-12 pb-8 text-sm font-sans">
        <div className="max-w-7xl mx-auto pb-10 ml-[13%]">
          <div className="text-lg font-bold text-[#0059ff] mb-6 -ml-[21%]">
            <div className="text-lg font-bold flex items-center gap-2 ml-[17%]">
              <div className="text-white font-bold text-xl">
                {/* <img
                  src="/public/images/logo/logo.png.png"
                  alt="The Builder Network Logo"
                  className="h-9 mb-4"
                /> */}
                <Image
                  src="/images/logo/logo.png"
                  alt="The Builder Network Logo"
                  width={375}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-xs text-gray-800">
            <ul className="space-y-2.5">
              <li><a href="#" className="underline">Post a job</a></li>
              <li><a href="#" className="underline">How it works</a></li>
              <li><a href="#" className="underline">Find trades</a></li>
              <li><a href="#" className="underline">Customer helpdesk</a></li>
              <li><a href="#" className="underline">Ask a trades<br/> person</a></li>
            </ul>
            <ul className="space-y-2">
              <li><a href="#" className="underline">Register as trades<br/>person</a></li>
              <li><a href="#" className="underline">Quality requirements</a></li>
              <li><a href="#" className="underline">Reviews policy</a></li>
              <li><a href="#" className="underline">Tradespeople helpdesk</a></li>
            </ul>
            <ul className="space-y-3">
              <li><a href="#" className="underline">About us</a></li>
              <li><a href="#" className="underline">Press and media</a></li>
              <li><a href="#" className="underline">Vacancies</a></li>
              <li><a href="#" className="underline">Become a partner</a></li>
            </ul>
            <ul className="space-y-3">
              <li><a href="#" className="underline">Trades</a></li>
              <li><a href="#" className="underline">Services</a></li>
              <li><a href="#" className="underline">Cities</a></li>
              <li><a href="#" className="underline">Pricing guides</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4 ml-[13%] mr-[10%]">
          <div className="flex flex-wrap items-center gap-3">
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
            <span className="ml-2 font-medium">Excellent</span>
            <svg width="101" height="20" viewBox="0 0 101 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.0585938 19.3012H18.5206V0.859863H0.0585938V19.3012Z" fill="#00B67A"/>
              <path d="M15.7987 8.70564L5.32729 16.304L6.85528 11.6079L2.85547 8.70564H7.79944L9.3271 4.00928L10.8548 8.70564H15.7987ZM9.32748 13.402L12.1873 12.8011L13.3267 16.304L9.32748 13.402Z" fill="#F1FAEE"/>
              <path d="M20.4609 19.3012H38.923V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
              <path d="M20.4609 19.3012H29.6919V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
              <path d="M29.9125 13.3308L32.3648 12.8014L33.499 16.3838L29.6533 13.5168L25.6576 16.3838L27.2084 11.6707L23.1484 8.75785H28.1667L29.7169 4.04443L31.2677 8.75785H36.2857L29.9125 13.3308Z" fill="#F1FAEE"/>
              <path d="M40.875 19.3012H59.337V0.859863H40.875V19.3012Z" fill="#00B67A"/>
              <path d="M40.875 19.3012H50.106V0.859863H40.875V19.3012Z" fill="#00B67A"/>
              <path d="M56.6151 8.70564L46.1437 16.304L47.6717 11.6079L43.6719 8.70564H48.6158L50.1435 4.00928L51.6712 8.70564L56.6151 8.70564ZM50.1439 13.402L53.0037 12.8011L54.1431 16.304L50.1439 13.402Z" fill="#F1FAEE"/>
              <path d="M61.293 19.3012H79.755V0.859863H61.293V19.3012Z" fill="#00B67A"/>
              <path d="M61.293 19.3012H70.524V0.859863H61.293V19.3012Z" fill="#00B67A"/>
              <path d="M77.0292 8.70564L66.5581 16.304L68.0857 11.6079L64.0859 8.70564H69.0299L70.5576 4.00928L72.0852 8.70564L77.0292 8.70564ZM70.558 13.402L73.4177 12.8011L74.5571 16.304L70.558 13.402Z" fill="#F1FAEE"/>
              <path d="M81.6953 19.3012H100.157V0.859863H81.6953V19.3012Z" fill="#DCDCE6"/>
              <path d="M81.6953 19.3012H90.9263V0.859863H81.6953V19.3012Z" fill="#00B67A"/>
              <path d="M97.4315 8.70564L86.9604 16.304L88.4881 11.6079L84.4883 8.70564H89.4322L90.9599 4.00928L92.4876 8.70564H97.4315ZM90.9603 13.402L93.8201 12.8011L94.9595 16.304L90.9603 13.402Z" fill="#F1FAEE"/>
            </svg>
            <svg className="h-4 w-4" viewBox="0 0 18 17" fill="none"><path d="M17.25 6.48H10.68L8.65 0.26L6.61 6.48L0.04 6.47L5.37 10.32L3.33 16.53L8.65 12.69L13.97 16.53L11.93 10.32L17.25 6.48Z" fill="#00B67A"/></svg>
            <span className="font-medium">Trustpilot</span>
          </div>
        </div>
        <div className="mt-6 text-gray-500 text-xs ml-[13%] mr-[10%]">
          <div className="space-x-4 mb-2 md:mb-5">
            <a href="#" className="underline">Privacy</a>
            <a href="#" className="underline">Cookie policy</a>
            <a href="#" className="underline">Cookie settings</a>
            <a href="#" className="underline">Terms and conditions</a>
          </div>
        </div>
      </footer>
      <div className="bg-[#262627] text-[#FFFFFF] text-center py-6 px-4 text-[16px]">
        ©2025 The Builder Network Limited
      </div>
    </section>
  );
};

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function TradespersonLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
    <Header/>  
      <div
        className="flex-grow bg-cover bg-center bg-no-repeat pb-[100px]"
        style={{ backgroundImage: "url('/images/background/Tradeperson_landing_page.png')" }}
      >
        <div className="max-w-5xl mx-auto p-8 pt-24">
          <h1 className={`${montserrat.className} text-[45px] font-600 text-[#ffffff] `}>
            A Trusted Way to Find 
          </h1> 
          <h1 className={`${montserrat.className} text-[45px] font-600 text-[#ffffff] mb-4`}>
            the Right Jobs for you 
          </h1>
          <div className={'pl-2 bg-black rounded-2xl'}>
            <h4 className={`${montserrat.className} font-medium text-lg  ml-[20px] pt-[20px] text-[#ffffff] mb-4`}>
              View local trade work
            </h4>
            <div className="flex space-x-4 ml-[35px] mb-4">
              <div className="flex-1 pt-0.5">
                <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
                  Your main trade
                </label>
                <input
                  type="text"
                  className="w-full h-9 max-w-xs  border border-gray-300 rounded-md bg-white"
                  placeholder="  Please Enter "
                />
              </div>
              <div className="flex-1 mr-[200px] ">
                <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
                  Your postcode
                </label>
                <input
                  type="text"
                  className="w-full h-9.5 max-w-xs  border border-gray-300 rounded-md bg-white"
                  placeholder="  Please Enter "
                />
              </div>
            </div>
            <div className="flex space-x-4 ml-[35px] mb-6">
              <div className="flex-1 pt-0.5">
                <label className={`${montserrat.className} block text-sm text-[#ffffff] mb-2`}>
                  Your main trade
                </label>
                <input
                  type="text"
                  className="w-full h-9 max-w-xs  border border-gray-300 rounded-md bg-white"
                  placeholder="  Please Enter "
                />
              </div>  
              <button
                onClick={() => window.location.href = '/signup'}
                className="w-full h-10 mt-[27px] mr-[230px] max-w-xs  pr-[25px] bg-[#1239AC] text-white rounded-md hover:bg-[#8EB5FF] transition"
              >
                Sign up for free
              </button>
            </div>
            <p className={`${montserrat.className} text-sm text-[#ffffff] mb-2 ml-[35px]`}>
              By clicking Sign up for free, you agree to The Builder Network.
            </p>
            <p className={`${montserrat.className} text-sm text-[#ffffff] ml-[35px] pb-8`}>
              For information on how we process your data, see our{' '}
              <span className="underline">Privacy policy</span>,{' '}
              <span className="underline">Terms and Conditions</span>
            </p>
          </div>
        </div>
      </div>
      {/* how to find work section */}
      <div className={`${montserrat.className} max-w-5xl mx-auto text-center text-[45px] font-bold text-[#000000]`}>
        <h1>How to find the work</h1>
        <h1>you want?</h1>
      </div>
      <div className="flex items-center max-w-5xl mx-auto p-2 pb-6 ">
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
          <p className={`${montserrat.className} text-lg font-medium text-[#000000] mt-2 mb-6`}>Create your free professional profile, and we’ll send you job leads that fit your trade and service area.</p>
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
      {/* Ready to find work section */}
      <div className="bg-[#1646D2] py-12">
        <div className="max-w-5xl mx-auto p-4 text-center">
          <h1 className={`${montserrat.className} text-4xl font-extrabold text-white mb-4`}>Ready to find work that fits your skills?</h1>
          <p className={`${montserrat.className} text-lg text-white mt-8 mb-12`}>Good tradespeople are always in demand—but finding the right job at the right time can be tough.The Builder Network makes it easy, connecting you with job leads tailored to your trade and location.</p>
          <div className="flex flex-col md:flex-row justify-between mt-4 mb-6">
            <div className="flex-1 bg-white p-6 mb-4 md:mb-0 md:mr-4 rounded-lg">
              <Image
                src="/images/background/VerticalBorder.png"
                alt="everything you want"
                className="mb-10"
                width={300}
                height={150}
              />
              <ul className={`${inter.className} text-sm text-left text-black list-none`}>
                <li className="mb-2">. Over 150,000 jobs posted each month</li>
                <li className="mb-2">. Only see jobs that match your trade and skills</li>
                <li className="mb-2">. Choose your preferred work areas and job types</li>
                <li className="mb-2">. Take on big projects or smaller tasks—it’s your call</li>
              </ul>
            </div>
            <div className="flex-1 bg-white p-6 mb-4 md:mb-0 md:mr-4 rounded-lg">
              <Image
                src="/images/background/VerticalBorder2.png"
                alt="everything you want"
                className="mb-10"
                width={300}
                height={150}
              />
              <ul className={`${inter.className} text-sm text-left text-black list-none`}>
                <li className="mb-2">. Sign up free with zero commitment</li>
                <li className="mb-2">. Respond to job leads when it suits you</li>
                <li className="mb-2">. Show interest in unlimited jobs for free.</li>
                <li className="mb-2">. Pay only when you’re shortlisted</li>
              </ul>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg">
              <Image
                src="/images/background/VerticalBorder3.png"
                alt="everything you want"
                className="mb-10"
                width={300}
                height={150}
              />
              <ul className={`${inter.className} text-sm text-left text-black list-none`}>
                <li className="mb-2">. Create a free profile to highlight your expertise</li>
                <li className="mb-2">. Earn trust through customer reviews</li>
                <li className="mb-2">. Attract new clients and grow your business</li>
              </ul>
            </div>
          </div>
          <h1 className={`${montserrat.className} text-2xl font-extrabold text-white mt-10 mb-4`}>Say yes to the work you want</h1>
          <button className="bg-white rounded-4xl p-2 pr-20 pl-20">Join for free</button>
        </div>
      </div>
      {/* Trades Section */}
      <section className="text-center text-[#111] px-5 py-16 mb-15">
        <div className="max-w-[880px] mx-auto text-left ">
          <h3 className={`${montserrat.className} text-[20px] font-bold mb-4 pl-3`}>Other <br/>trades</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              "Architectural Designer", "Architectural Technician", "Bathroom Fitter", "Bricklayer", "Carpenter", "Carpet & Lino Fitter",
              "Conservatory Installer", "Conversions Specialist", "Damp Proofing Specialist", "Decking Specialist", "More +"
            ].map((trade, index) => (
              <div key={index} className="bg-[#1646D2] text-[#FFFFFF] text-left p-3 rounded font-medium">
                {trade}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}