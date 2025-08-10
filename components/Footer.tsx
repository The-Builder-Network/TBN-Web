// Renamed to Footer.tsx for TypeScript support
// const Footer = () => {
//   return (
//     <section>
//       <div className="bg-[#1646D2] px-9 py-6 flex items-center justify-between">
//         <span className="text-white text-[21px] font-semibold text-sm ml-[15%]">
//           Post your job now
//         </span>
//         <button className="w-[38px] h-[38px] p-0 border-none bg-transparent mr-[19%]">
//           <Image
//             src="/icons/right-arrow.svg"
//             alt="Arrow Button"
//             width={48}
//             height={48}
//           />
//         </button>
//       </div>
//       <footer className="text-neutral-900 px-6 md:px-24 pt-12 pb-8 text-sm font-sans">
//         <div className="max-w-7xl mx-auto pb-10 ml-[13%]">
//           <div className="text-lg font-bold text-[#0059ff] mb-6 -ml-[21%]">
//             <div className="text-lg font-bold flex items-center gap-2 ml-[17%]">
//               <div className="text-white font-bold text-xl">
//                 {/* <img
//                   src="/public/images/logo/logo.png.png"
//                   alt="The Builder Network Logo"
//                   className="h-9 mb-4"
//                 /> */}
//                 <Image
//                   src="/images/logo/logo.png"
//                   alt="The Builder Network Logo"
//                   width={375}
//                   height={100}
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-xs text-gray-800">
//             <ul className="space-y-2.5">
//               <li><a href="#" className="underline">Post a job</a></li>
//               <li><a href="#" className="underline">How it works</a></li>
//               <li><a href="#" className="underline">Find trades</a></li>
//               <li><a href="#" className="underline">Customer helpdesk</a></li>
//               <li><a href="#" className="underline">Ask a trades'<br/> person</a></li>
//             </ul>
//             <ul className="space-y-2">
//               <li><a href="#" className="underline">Register as trades<br/>person</a></li>
//               <li><a href="#" className="underline">Quality requirements</a></li>
//               <li><a href="#" className="underline">Reviews policy</a></li>
//               <li><a href="#" className="underline">Tradespeople helpdesk</a></li>
//             </ul>
//             <ul className="space-y-3">
//               <li><a href="#" className="underline">About us</a></li>
//               <li><a href="#" className="underline">Press and media</a></li>
//               <li><a href="#" className="underline">Vacancies</a></li>
//               <li><a href="#" className="underline">Become a partner</a></li>
//             </ul>
//             <ul className="space-y-3">
//               <li><a href="#" className="underline">Trades</a></li>
//               <li><a href="#" className="underline">Services</a></li>
//               <li><a href="#" className="underline">Cities</a></li>
//               <li><a href="#" className="underline">Pricing guides</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4 ml-[13%] mr-[10%]">
//           <div className="flex flex-wrap items-center gap-3">
//             <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
//               <path d="M16 20.213V26.8599H19.625V20.213H22.3281L22.8906 17.1567H19.625V16.0755C19.625 14.4599 20.2594 13.8411 21.8969 13.8411C22.4062 13.8411 22.8156 13.8536 23.0531 13.8786V11.1067C22.6063 10.9849 21.5125 10.8599 20.8812 10.8599C17.5406 10.8599 16 12.438 16 15.8411V17.1567H13.9375V20.213H16Z" fill="#262627"/>
//             </svg></a>
//             <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
//               <path d="M25.7675 15.1953C25.593 14.5384 25.0789 14.021 24.4262 13.8454C23.2432 13.5264 18.4993 13.5264 18.4993 13.5264C18.4993 13.5264 13.7554 13.5264 12.5723 13.8454C11.9196 14.021 11.4055 14.5384 11.2311 15.1953C10.9141 16.3861 10.9141 18.8705 10.9141 18.8705C10.9141 18.8705 10.9141 21.3549 11.2311 22.5456C11.4055 23.2026 11.9196 23.6984 12.5723 23.874C13.7554 24.193 18.4993 24.193 18.4993 24.193C18.4993 24.193 23.2431 24.193 24.4262 23.874C25.0789 23.6984 25.593 23.2026 25.7675 22.5456C26.0845 21.3549 26.0845 18.8705 26.0845 18.8705C26.0845 18.8705 26.0845 16.3861 25.7675 15.1953ZM16.9477 21.1261V16.6148L20.9127 18.8705L16.9477 21.1261Z" fill="#262627"/>
//             </svg></a>
//             <a href="#"><svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" fill="#F1FAEE"/>
//               <rect x="1" y="1.35986" width="35" height="35" rx="17.5" stroke="#DFDFE4"/>
//               <path d="M22.6609 12.3599H24.8672L20.0484 17.8661L25.7172 25.3599H21.2797L17.8016 20.8161L13.8266 25.3599H11.6172L16.7703 19.4692L11.3359 12.3599H15.8859L19.0266 16.513L22.6609 12.3599ZM21.8859 24.0411H23.1078L15.2203 13.6099H13.9078L21.8859 24.0411Z" fill="#262627"/>
//             </svg></a>
//             <span className="ml-2 font-medium">Excellent</span>
//             <svg width="101" height="20" viewBox="0 0 101 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M0.0585938 19.3012H18.5206V0.859863H0.0585938V19.3012Z" fill="#00B67A"/>
//               <path d="M15.7987 8.70564L5.32729 16.304L6.85528 11.6079L2.85547 8.70564H7.79944L9.3271 4.00928L10.8548 8.70564H15.7987ZM9.32748 13.402L12.1873 12.8011L13.3267 16.304L9.32748 13.402Z" fill="#F1FAEE"/>
//               <path d="M20.4609 19.3012H38.923V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
//               <path d="M20.4609 19.3012H29.6919V0.859863H20.4609V19.3012Z" fill="#00B67A"/>
//               <path d="M29.9125 13.3308L32.3648 12.8014L33.499 16.3838L29.6533 13.5168L25.6576 16.3838L27.2084 11.6707L23.1484 8.75785H28.1667L29.7169 4.04443L31.2677 8.75785H36.2857L29.9125 13.3308Z" fill="#F1FAEE"/>
//               <path d="M40.875 19.3012H59.337V0.859863H40.875V19.3012Z" fill="#00B67A"/>
//               <path d="M40.875 19.3012H50.106V0.859863H40.875V19.3012Z" fill="#00B67A"/>
//               <path d="M56.6151 8.70564L46.1437 16.304L47.6717 11.6079L43.6719 8.70564H48.6158L50.1435 4.00928L51.6712 8.70564L56.6151 8.70564ZM50.1439 13.402L53.0037 12.8011L54.1431 16.304L50.1439 13.402Z" fill="#F1FAEE"/>
//               <path d="M61.293 19.3012H79.755V0.859863H61.293V19.3012Z" fill="#00B67A"/>
//               <path d="M61.293 19.3012H70.524V0.859863H61.293V19.3012Z" fill="#00B67A"/>
//               <path d="M77.0292 8.70564L66.5581 16.304L68.0857 11.6079L64.0859 8.70564H69.0299L70.5576 4.00928L72.0852 8.70564L77.0292 8.70564ZM70.558 13.402L73.4177 12.8011L74.5571 16.304L70.558 13.402Z" fill="#F1FAEE"/>
//               <path d="M81.6953 19.3012H100.157V0.859863H81.6953V19.3012Z" fill="#DCDCE6"/>
//               <path d="M81.6953 19.3012H90.9263V0.859863H81.6953V19.3012Z" fill="#00B67A"/>
//               <path d="M97.4315 8.70564L86.9604 16.304L88.4881 11.6079L84.4883 8.70564H89.4322L90.9599 4.00928L92.4876 8.70564H97.4315ZM90.9603 13.402L93.8201 12.8011L94.9595 16.304L90.9603 13.402Z" fill="#F1FAEE"/>
//             </svg>
//             <svg className="h-4 w-4" viewBox="0 0 18 17" fill="none"><path d="M17.25 6.48H10.68L8.65 0.26L6.61 6.48L0.04 6.47L5.37 10.32L3.33 16.53L8.65 12.69L13.97 16.53L11.93 10.32L17.25 6.48Z" fill="#00B67A"/></svg>
//             <span className="font-medium">Trustpilot</span>
//           </div>
//         </div>
//         <div className="mt-6 text-gray-500 text-xs ml-[13%] mr-[10%]">
//           <div className="space-x-4 mb-2 md:mb-5">
//             <a href="#" className="underline">Privacy</a>
//             <a href="#" className="underline">Cookie policy</a>
//             <a href="#" className="underline">Cookie settings</a>
//             <a href="#" className="underline">Terms and conditions</a>
//           </div>
//         </div>
//       </footer>
//       <div className="bg-[#262627] text-[#FFFFFF] text-center py-6 px-4 text-[16px]">
//         ©2025 The Builder Network Limited
//       </div>
//     </section>
//   );
// };