"use client";

import { useState } from "react";
import { TravelLocation } from "@/data/travel";
import TravelGlobe from "./TravelGlobe";
import TravelModal from "./TravelModal";

export default function TravelView() {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);

  return (
    <div className="relative w-full" style={{ height: "100vh" }}>
      <TravelGlobe
        onLocationSelect={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
      <TravelModal
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}
