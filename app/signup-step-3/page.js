"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { GoogleMap, useLoadScript, Circle } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "250px", // Reduced height for a more rectangular shape
};

const center = {
  lat: 51.5074, // St James, London
  lng: -0.1278,
};

const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#f0f0f0" }], // Light background color
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#5c5c5c" }], // Dimmed text
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f0f0f0" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#b1b1b1" }], // Lighter color for land parcels
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#d7f0d7" }], // Light green for parks
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }], // Light road color
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#d5d5d5" }], // Grey color for highways
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#dcdcdc" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#d0e3f1" }], // Light blue for water bodies
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ];
  
export default function SignupStep3() {
  const [firstName, setFirstName] = useState("");
  const [radius, setRadius] = useState(15); // Default radius in miles
  const [workThroughoutUK, setWorkThroughoutUK] = useState(false);
  const router = useRouter();

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setFirstName(formData.firstName || "");
      if (formData.radius) setRadius(formData.radius);
      if (formData.workThroughoutUK) setWorkThroughoutUK(formData.workThroughoutUK);
    }
  }, []);

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value));
  };

  const handleWorkThroughoutUKChange = (e) => {
    setWorkThroughoutUK(e.target.checked);
  };

  const handleBack = () => {
    router.push("/signup-step-2");
  };

  const handleContinue = () => {
    // Save selected radius or workThroughoutUK to localStorage
    const savedFormData = localStorage.getItem("signupFormData");
    const formData = savedFormData ? JSON.parse(savedFormData) : {};
    localStorage.setItem(
      "signupFormData",
      JSON.stringify({
        ...formData,
        radius: workThroughoutUK ? null : radius,
        workThroughoutUK,
      })
    );
    router.push("/signup-step-4");
  };

  const handleCancel = () => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="min-h-screen bg-[#F5F6F5] flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center p-4">
        {/* Top Section: Work details, Cancel, Progress Bar */}
        <div className="w-full px-4 relative mb-4">
          <button
            onClick={handleCancel}
            className="absolute top-0 right-4 text-[#4A4A4A] font-inter text-sm underline flex items-center"
          >
            Cancel <span className="ml-1">✕</span>
          </button>
          <h1 className="font-kollektif text-[40px] font-bold text-[#1F2937] mb-2">
            Work details
          </h1>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="w-[20%] h-2 bg-[#4A90E2] rounded-full"></div>
            </div>
            <div className="flex justify-end items-center mt-2">
              <span className="font-inter h-2 font-black text-sm mr-350 text-[#4A4A4A]">
                Step 1/5
              </span>
              <button className="ml-4 underline text-[#4A4A4A] font-inter text-sm flex items-center">
                All steps
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Section: Radius selection */}
        <div className="shadow-sm rounded-md p-4 w-full max-w-lg">
          <h2 className="font-sanserif text-[35px] font-bold text-[#1F2937] mb-2">
            How far can you travel for work?
          </h2>
          <p className="font-inter text-sm text-[#4A4A4A] mb-4">
            Set the maximum distance you are willing to travel from St James.
          </p>
          <a
            href="#"
            className="font-inter text-sm text-[#4A90E2] underline mb-4 block"
          >
            438 leads in your work area
          </a>
          {!workThroughoutUK && (
            <>
              {/* Slider Section (Moved Above Map) */}
              <div className="mb-4">
                <input
                  type="range"
                  id="radius"
                  min="1"
                  max="100"
                  value={radius}
                  onChange={handleRadiusChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="font-inter text-sm text-[#4A4A4A] mt-2 text-center">
                  {radius} miles
                </p>
              </div>
              {/* Map Section (Wider and More Rectangular) */}
              <div className="mb-4 border border-gray-300 rounded-md overflow-hidden w-full max-w-xl mx-auto">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={8}
                  options={{
                    styles: mapStyles,
                    zoomControl: true,
                    zoomControlOptions: {
                      position: google.maps.ControlPosition.LEFT_CENTER,
                    },
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                >
                  <Circle
                    center={center}
                    radius={radius * 1609.34} // Convert miles to meters
                    options={{
                      strokeColor:"#4A90E2",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#9F7AEA",
                      fillOpacity: 0.35,
                    }}
                  />
                </GoogleMap>
              </div>
            </>
          )}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="workThroughoutUK"
              checked={workThroughoutUK}
              onChange={handleWorkThroughoutUKChange}
              className="h-4 w-4 text-[#4A90E2] border-gray-300 rounded focus:ring-[#4A90E2]"
            />
            <label
              htmlFor="workThroughoutUK"
              className="ml-2 font-inter text-sm text-[#4A4A4A]"
            >
              I work throughout the UK
            </label>
          </div>
          <div className="flex space-x-4">
          <button
              onClick={handleBack}
              className="w-1/2 border border-[#4A90E2] text-[#4A90E2] px-4 py-2 rounded-md font-inter text-sm hover:bg-[#E5F0FA] transition"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="w-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-md font-inter text-sm hover:bg-[#357ABD] transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


