/**
 * How a product is measured, when it is not measured by area.
 *
 * An admixture is dosed against the weight of cement, a seaming tape by the
 * linear metre, a screed binder per cubic metre of sand. None of those is an
 * area sum, so none of them gets a calculator, but all of them are the figure
 * a salesperson rang up to ask for. Printing the sheet's own sentence is more
 * use than a calculator that pretends the product spreads over a floor.
 */
export function DosageNote({ reason, name }: { reason: string; name: string }) {
  return (
    <div className="border border-[#161925]/12 bg-[#FAFAF8] p-6 sm:p-8">
      <p className="label-sh text-[#161925]/65">As published in the data sheet</p>
      <p className="mt-3 max-w-[62ch] font-manrope text-base leading-relaxed text-[#161925]">
        {reason}
      </p>
      <p className="mt-4 font-manrope text-xs leading-relaxed text-[#161925]/65">
        There is no area calculator for {name} because the sheet does not publish a rate per square
        metre. Send us the job and we will work the quantity out with you.
      </p>
    </div>
  );
}
