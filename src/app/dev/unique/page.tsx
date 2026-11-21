import type { Metadata } from "next";
import KerakollAdhesiveSelector from "@/components/brands/unique/kerakoll-adhesive-selector";
import WeberRepairEstimator from "@/components/brands/unique/weber-repair-estimator";
import LaticretePoolSystem from "@/components/brands/unique/laticrete-pool-system";
import PidiliteFloorPlanner from "@/components/brands/unique/pidilite-floor-planner";
import AkzonobelFinishPicker from "@/components/brands/unique/akzonobel-finish-picker";
import FilaCareRoutine from "@/components/brands/unique/fila-care-routine";
import KalingaSlabYield from "@/components/brands/unique/kalinga-slab-yield";

/** Bench for the seven brand tools. Under /dev, which robots disallows; not in the sitemap. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function UniqueBench() {
  return (
    <main>
      <h1 className="sr-only">Brand tools preview</h1>
      <KerakollAdhesiveSelector />
      <WeberRepairEstimator />
      <LaticretePoolSystem />
      <PidiliteFloorPlanner />
      <AkzonobelFinishPicker />
      <FilaCareRoutine />
      <KalingaSlabYield />
    </main>
  );
}
