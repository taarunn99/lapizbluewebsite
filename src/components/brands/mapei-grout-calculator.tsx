"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Grout product data with verified packaging sizes from TDS
const groutProducts = [
  {
    id: "ultracolor-plus",
    name: "Ultracolor Plus",
    type: "Cementitious",
    description: "High-performance, anti-efflorescence, quick-setting grout with BioBlock & DropEffect technology",
    jointWidth: { min: 2, max: 20 },
    densityFactor: 1.6,
    sizes: [
      { weight: 2, label: "2 kg" },
      { weight: 5, label: "5 kg" },
      { weight: 22, label: "22 kg" },
    ],
    features: ["Quick-setting (3 hrs)", "Water-repellent", "Mould-resistant", "40 colours"],
    bestFor: "Residential & commercial interiors/exteriors",
  },
  {
    id: "keracolor-ff",
    name: "Keracolor FF",
    type: "Cementitious",
    description: "Polymer-modified, water-repellent grout with DropEffect technology for joints up to 6mm",
    jointWidth: { min: 2, max: 6 },
    densityFactor: 1.5,
    sizes: [
      { weight: 2, label: "2 kg" },
      { weight: 5, label: "5 kg" },
      { weight: 20, label: "20 kg" },
    ],
    features: ["Easy workability", "Water-repellent", "Durable", "20 colours"],
    bestFor: "General residential & swimming pools",
  },
  {
    id: "kerapoxy",
    name: "Kerapoxy",
    type: "Epoxy",
    description: "Two-component acid-resistant epoxy grout for industrial and commercial applications",
    jointWidth: { min: 1, max: 10 },
    densityFactor: 1.6,
    sizes: [
      { weight: 2, label: "2 kg" },
      { weight: 5, label: "5 kg" },
      { weight: 10, label: "10 kg" },
    ],
    features: ["Acid-resistant", "Chemical-resistant", "HACCP compliant", "17 colours"],
    bestFor: "Food industry, labs, chemical-exposed areas",
  },
  {
    id: "kerapoxy-easy-design",
    name: "Kerapoxy Easy Design",
    type: "Epoxy",
    description: "Decorative epoxy grout with BioBlock technology, easy to apply and clean",
    jointWidth: { min: 1, max: 15 },
    densityFactor: 1.6,
    sizes: [
      { weight: 3, label: "3 kg" },
    ],
    features: ["Easy to clean", "Bacteriostatic", "Decorative", "41 colours"],
    bestFor: "Showrooms, bathrooms, thermal facilities",
  },
  {
    id: "kerapoxy-cq",
    name: "Kerapoxy CQ",
    type: "Epoxy",
    description: "Premium epoxy grout with color-coated quartz for superior stain resistance",
    jointWidth: { min: 1.5, max: 10 },
    densityFactor: 1.6,
    sizes: [
      { weight: 3, label: "3 kg" },
      { weight: 10, label: "10 kg" },
    ],
    features: ["High stain resistance", "No sealer needed", "Color-coated quartz", "40 colours"],
    bestFor: "Countertops, high-traffic commercial areas",
  },
];

// Common tile presets
const tilePresets = [
  { name: "Custom", length: 0, width: 0, thickness: 0 },
  { name: "Mosaic 25x25mm", length: 25, width: 25, thickness: 6 },
  { name: "Small 100x100mm", length: 100, width: 100, thickness: 7 },
  { name: "Standard 150x150mm", length: 150, width: 150, thickness: 6 },
  { name: "Medium 200x200mm", length: 200, width: 200, thickness: 9 },
  { name: "Large 300x300mm", length: 300, width: 300, thickness: 10 },
  { name: "Extra Large 600x600mm", length: 600, width: 600, thickness: 10 },
  { name: "Plank 150x600mm", length: 600, width: 150, thickness: 9 },
  { name: "Plank 200x1200mm", length: 1200, width: 200, thickness: 10 },
  { name: "XL Format 800x800mm", length: 800, width: 800, thickness: 10 },
];

export function MapeiGroutCalculator() {
  const [selectedProduct, setSelectedProduct] = useState(groutProducts[0]);
  const [selectedSize, setSelectedSize] = useState(groutProducts[0].sizes[1]); // Default to middle size
  const [tilePreset, setTilePreset] = useState("Custom");
  const [tileLength, setTileLength] = useState<number>(300);
  const [tileWidth, setTileWidth] = useState<number>(300);
  const [tileThickness, setTileThickness] = useState<number>(10);
  const [jointWidth, setJointWidth] = useState<number>(3);
  const [area, setArea] = useState<number>(10);
  const [wastage, setWastage] = useState<number>(10);

  // Handle preset selection
  const handlePresetChange = (presetName: string) => {
    setTilePreset(presetName);
    const preset = tilePresets.find((p) => p.name === presetName);
    if (preset && preset.name !== "Custom") {
      setTileLength(preset.length);
      setTileWidth(preset.width);
      setTileThickness(preset.thickness);
    }
  };

  // Handle product change
  const handleProductChange = (productId: string) => {
    const product = groutProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedSize(product.sizes[Math.floor(product.sizes.length / 2)]); // Select middle size
      // Clamp joint width to product's range
      if (jointWidth < product.jointWidth.min) {
        setJointWidth(product.jointWidth.min);
      } else if (jointWidth > product.jointWidth.max) {
        setJointWidth(product.jointWidth.max);
      }
    }
  };

  // Calculate grout consumption
  const calculation = useMemo(() => {
    if (tileLength <= 0 || tileWidth <= 0 || tileThickness <= 0 || jointWidth <= 0 || area <= 0) {
      return null;
    }

    // Formula: ((A + B) / (A × B)) × C × D × densityFactor = kg/m²
    const A = tileLength;
    const B = tileWidth;
    const C = tileThickness;
    const D = jointWidth;
    const density = selectedProduct.densityFactor;

    const consumptionPerSqm = ((A + B) / (A * B)) * C * D * density;
    const totalConsumption = consumptionPerSqm * area;
    const withWastage = totalConsumption * (1 + wastage / 100);
    const bagsNeeded = Math.ceil(withWastage / selectedSize.weight);

    return {
      consumptionPerSqm: consumptionPerSqm.toFixed(2),
      totalConsumption: totalConsumption.toFixed(2),
      withWastage: withWastage.toFixed(2),
      bagsNeeded,
      bagSize: selectedSize.label,
    };
  }, [tileLength, tileWidth, tileThickness, jointWidth, area, wastage, selectedProduct, selectedSize]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#23395B]/10 text-[#23395B] text-sm font-medium mb-4">
              Grout Calculator
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#23395B] mb-4">
              Calculate Your Grout Requirements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your tile dimensions and area to calculate the exact amount of Mapei grout you need for your project.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#23395B] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Select Grout Product
              </h3>

              <div className="space-y-3">
                {groutProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductChange(product.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedProduct.id === product.id
                        ? "border-[#23395B] bg-[#23395B]/5 shadow-md"
                        : "border-gray-200 hover:border-[#23395B]/30 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#23395B]">{product.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            product.type === "Epoxy"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {product.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {product.sizes.map((size) => (
                            <span key={size.weight} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {size.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedProduct.id === product.id && (
                        <svg className="w-5 h-5 text-[#23395B] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Product Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-[#23395B]/5 rounded-xl"
                >
                  <h4 className="font-medium text-[#23395B] mb-2">Best For:</h4>
                  <p className="text-sm text-gray-600 mb-3">{selectedProduct.bestFor}</p>
                  <h4 className="font-medium text-[#23395B] mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProduct.features.map((feature) => (
                      <span key={feature} className="text-xs bg-white text-[#23395B] px-2 py-1 rounded-full border border-[#23395B]/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#23395B]/10">
                    <p className="text-xs text-gray-500">
                      Joint width: {selectedProduct.jointWidth.min}mm - {selectedProduct.jointWidth.max}mm
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Middle Column - Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#23395B] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Enter Dimensions
              </h3>

              {/* Tile Preset */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tile Size Preset
                </label>
                <select
                  value={tilePreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all bg-gray-50"
                >
                  {tilePresets.map((preset) => (
                    <option key={preset.name} value={preset.name}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tile Dimensions */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tile Length (mm)
                  </label>
                  <input
                    type="number"
                    value={tileLength || ""}
                    onChange={(e) => {
                      setTileLength(Number(e.target.value));
                      setTilePreset("Custom");
                    }}
                    placeholder="e.g. 300"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tile Width (mm)
                  </label>
                  <input
                    type="number"
                    value={tileWidth || ""}
                    onChange={(e) => {
                      setTileWidth(Number(e.target.value));
                      setTilePreset("Custom");
                    }}
                    placeholder="e.g. 300"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tile Thickness (mm)
                  </label>
                  <input
                    type="number"
                    value={tileThickness || ""}
                    onChange={(e) => {
                      setTileThickness(Number(e.target.value));
                      setTilePreset("Custom");
                    }}
                    placeholder="e.g. 10"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joint Width (mm)
                  </label>
                  <input
                    type="number"
                    value={jointWidth || ""}
                    onChange={(e) => setJointWidth(Number(e.target.value))}
                    min={selectedProduct.jointWidth.min}
                    max={selectedProduct.jointWidth.max}
                    placeholder={`${selectedProduct.jointWidth.min}-${selectedProduct.jointWidth.max}`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Range: {selectedProduct.jointWidth.min}-{selectedProduct.jointWidth.max}mm
                  </p>
                </div>
              </div>

              {/* Area and Wastage */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (m²)
                  </label>
                  <input
                    type="number"
                    value={area || ""}
                    onChange={(e) => setArea(Number(e.target.value))}
                    placeholder="e.g. 10"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wastage (%)
                  </label>
                  <input
                    type="number"
                    value={wastage}
                    onChange={(e) => setWastage(Number(e.target.value))}
                    min={0}
                    max={30}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#23395B] focus:ring-2 focus:ring-[#23395B]/20 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 10%</p>
                </div>
              </div>

              {/* Bag Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bag Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size.weight}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedSize.weight === size.weight
                          ? "bg-[#23395B] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#23395B] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Calculation Results
              </h3>

              <AnimatePresence mode="wait">
                {calculation ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Main Result */}
                    <div className="bg-gradient-to-br from-[#23395B] to-[#1E6BA8] rounded-xl p-6 text-white">
                      <div className="text-center">
                        <p className="text-sm opacity-80 mb-1">You Need</p>
                        <p className="text-5xl font-bold mb-2">{calculation.bagsNeeded}</p>
                        <p className="text-lg opacity-90">{calculation.bagSize} bags</p>
                        <p className="text-sm opacity-70 mt-2">{selectedProduct.name}</p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Consumption per m²</span>
                        <span className="font-semibold text-[#23395B]">{calculation.consumptionPerSqm} kg/m²</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Total for {area} m²</span>
                        <span className="font-semibold text-[#23395B]">{calculation.totalConsumption} kg</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">With {wastage}% wastage</span>
                        <span className="font-semibold text-[#23395B]">{calculation.withWastage} kg</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 space-y-3">
                      <a
                        href={`https://wa.me/971488855257?text=Hi, I need a quote for ${calculation.bagsNeeded} bags of ${selectedProduct.name} (${calculation.bagSize}) for ${area}m² area.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Get Quote on WhatsApp
                      </a>
                      <a
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#23395B] text-[#23395B] font-semibold rounded-xl transition-all hover:bg-[#23395B] hover:text-white"
                      >
                        Request Detailed Quote
                      </a>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      * Calculation is indicative. Actual consumption may vary based on tile roughness, substrate conditions, and application method.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Enter dimensions to see results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Product Reference Table - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-[#23395B] mb-6">
              Mapei Grout Product Reference
            </h3>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#23395B]/5">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#23395B]">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#23395B]">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#23395B]">Joint Width</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#23395B]">Available Sizes</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[#23395B]">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {groutProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-medium text-[#23395B]">{product.name}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.type === "Epoxy"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {product.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {product.jointWidth.min}-{product.jointWidth.max}mm
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((size) => (
                            <span key={size.weight} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {size.label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                        {product.bestFor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {groutProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#23395B]">{product.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.type === "Epoxy"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {product.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Joint: {product.jointWidth.min}-{product.jointWidth.max}mm
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.sizes.map((size) => (
                      <span key={size.weight} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {size.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{product.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
