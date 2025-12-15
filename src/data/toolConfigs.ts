/**
 * Tool Configuration System
 * Follows same structure as brands but for tools category
 */

import type { BrandConfig, ProductLine } from './brandConfigs';

export const toolConfigs: Record<string, BrandConfig> = {
  montolit: {
    slug: 'montolit',
    name: 'Montolit',
    layout: 'custom',
    logo: '/images/construction-tools/montolit.png',
    website: 'https://www.montolit.com',
    theme: {
      primary: '#0160aa',
      secondary: '#e51719',
    },
    hero: {
      type: 'image',
      src: '/images/tools/montolit/hero.jpg',
      alt: 'Montolit - Professional Tile Cutting Tools',
    },
    description: 'Italian manufacturer of professional tile cutting and installation tools. Industry-leading precision and durability for contractors.',
    metaDescription: 'Montolit UAE - Professional tile cutters, manual cutters, and installation tools for contractors in Dubai, Abu Dhabi, Sharjah.',
    category: 'tool',
    productLines: [
      {
        slug: 'tile-cutters-and-blades',
        name: 'Tile Cutters and Blades',
        description: 'Professional tile cutters and diamond blades for precise cutting of ceramic, porcelain, and natural stone tiles.',
        metaDescription: 'Montolit tile cutters and blades UAE - Professional tile cutting tools for ceramic, porcelain, and stone in Dubai.',
        images: ['/images/tools/montolit/tile-cutters.jpg'],
        content: {
          seoTitle: 'Montolit Tile Cutters & Diamond Blades | UAE Distributor',
          h1: 'Professional Tile Cutters and Diamond Blades Built for Precision',
          intro: 'Since 1946, Montolit has been crafting tile cutting tools that professionals trust on job sites across 120 countries. Their manual cutters and diamond blades represent nearly eight decades of Italian engineering focused on one goal: clean, accurate cuts every time. The Masterpiuma series sets the standard for manual tile cutting, while DNA diamond blades deliver performance that outpaces conventional options by a significant margin. Whether you work with delicate glass mosaics or dense porcelain slabs, Montolit tools handle the material with consistency that builds your reputation.',
          whySection: {
            title: 'Why Contractors Choose Montolit Cutters',
            bullets: [
              'Titanium-coated tungsten carbide wheels rated for 5,000 meters of cutting life',
              'Patented DNA Technology arranges diamonds for faster, cooler cuts through porcelain',
              '100% Made in Italy with fully recyclable components',
              'Masterpiuma P5 handles tiles up to 63.5 inches with single-rail precision',
              'DNA SCX blades cut through high-density porcelain up to 30mm thick',
              'CPV fine-grit blades minimize chipping on glass and delicate materials',
              'Adjustable breaking systems accommodate tile thicknesses from 3mm to 22mm'
            ]
          },
          applications: {
            title: 'Where These Tools Perform',
            items: [
              'Large-format porcelain installations in commercial lobbies and showrooms',
              'Residential bathroom renovations with ceramic and glass tile',
              'Natural stone flooring projects requiring diagonal and L-shaped cuts',
              'Pool surrounds and outdoor areas using frost-resistant tiles',
              'Kitchen backsplash work demanding precise edge finishing',
              'High-traffic retail spaces with technical porcelain flooring'
            ]
          },
          howToChoose: {
            title: 'Selecting Your Montolit Cutter or Blade',
            bullets: [
              'For porcelain under 10mm: Masterpiuma P3 offers lighter weight without sacrificing accuracy',
              'For tiles over 600mm: Masterpiuma P5 provides the rail length and stability you need',
              'For wet cutting with grinders: DNA SCX blades deliver clean edges on thick porcelain',
              'For noise-sensitive sites: DNA SCX-S Silent version reduces sound without cutting performance',
              'For glass and mosaics: CPV (CERMONT) blades use fine grit to prevent chipping',
              'For rectified porcelain: TCS Turbo Bistury handles high-density materials',
              'For daily production work: Consider wheel replacement frequency and spare parts availability'
            ]
          },
          commonMistakes: {
            title: 'Mistakes That Cost Time and Tiles',
            bullets: [
              'Using worn scoring wheels past their effective life leads to uneven breaks and wasted material',
              'Selecting blades meant for ceramic when cutting dense porcelain causes overheating and slow progress',
              'Skipping proper blade break-in on new diamond blades reduces their overall lifespan',
              'Ignoring manufacturer cutting depth limits risks blade damage and unsafe operation',
              'Forcing cuts instead of letting the tool do the work creates chipped edges and irregular lines'
            ]
          },
          trustSignals: {
            title: 'Montolit by the Numbers',
            items: [
              { label: 'Years of Manufacturing', value: 'Since 1946' },
              { label: 'Countries Served', value: '120+' },
              { label: 'Wheel Life Rating', value: '5,000 meters' },
              { label: 'Max Cutting Length', value: '63.5 inches' },
              { label: 'Porcelain Depth (SCX)', value: 'Up to 30mm' },
              { label: 'Origin', value: '100% Made in Italy' }
            ]
          },
          faqs: [
            {
              question: 'What makes Montolit scoring wheels last longer than competitors?',
              answer: 'Montolit uses titanium-coated tungsten carbide construction rated for 5,000 meters of cutting. This coating reduces friction and heat buildup during scoring, which extends wheel life significantly compared to standard carbide wheels that typically last 500-1,000 meters.'
            },
            {
              question: 'How does DNA Technology improve diamond blade performance?',
              answer: 'DNA stands for Diamonds Network Arrangement - a patented method that positions diamond particles in an optimized pattern across the blade segment. This arrangement creates consistent cutting points, reduces vibration, and allows better cooling during wet cuts. The result is faster cutting speed with less wear on the blade.'
            },
            {
              question: 'Can Montolit manual cutters handle large format porcelain slabs?',
              answer: 'Yes, the Masterpiuma P5 accommodates tiles up to 63.5 inches (161cm) in length. Its single-rail design maintains scoring accuracy across the full length, and the adjustable breaking system handles porcelain from 3mm to 20mm thick. For slabs beyond this size, Montolit offers the Flash Line system.'
            },
            {
              question: 'Which blade should I use for glass tiles and mosaics?',
              answer: 'The CPV (CERMONT) blade uses fine diamond grit specifically designed for glass and delicate materials. Its continuous rim reduces vibration that causes chipping, and the narrow kerf minimizes material loss. Run this blade with plenty of water and at moderate speed for cleanest results.'
            },
            {
              question: 'Why do some contractors prefer manual cutters over wet saws?',
              answer: 'Manual cutters offer several advantages: no water mess or cleanup, faster setup time, quieter operation, and portability between job sites. For straight cuts on tiles within the cutter capacity, a quality manual cutter like the Masterpiuma can produce cleaner edges faster than a wet saw.'
            },
            {
              question: 'How often should diamond blades be dressed or reconditioned?',
              answer: 'When cutting speed decreases noticeably or the blade starts glazing over, dress the blade by making a few cuts through a dressing stone or abrasive brick. This exposes fresh diamond particles. Most contractors dress their blades every few hours of active cutting on hard materials.'
            },
            {
              question: 'What is the difference between DNA SCX and DNA SCX-S blades?',
              answer: 'Both use the same DNA diamond arrangement for cutting performance. The SCX-S version adds laser-cut slots in the blade body that reduce noise during operation - helpful for indoor work or noise-restricted sites. Cutting speed and edge quality remain identical between versions.'
            },
            {
              question: 'Does Lapiz Blue stock replacement parts for Montolit tools?',
              answer: 'Yes, we maintain inventory of scoring wheels, breaking pads, rail components, and other wear parts for the Masterpiuma series and other Montolit tools. Having replacement parts available locally means less downtime waiting for shipments from overseas suppliers.'
            }
          ],
          cta: {
            title: 'Ready to Cut with Confidence?',
            subtitle: 'Get Montolit tools that match your project requirements',
            checklist: [
              'Masterpiuma P3 and P5 manual cutters in stock',
              'Full range of DNA diamond blades for wet cutting',
              'Specialty blades for glass, porcelain, and natural stone',
              'Replacement scoring wheels and wear parts available',
              'Technical guidance on tool selection',
              'Competitive pricing for UAE contractors',
              'Fast delivery across Dubai, Abu Dhabi, and Sharjah'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Italian Engineering for Demanding Cuts',
                content: 'Walk onto any professional tile installation site, and chances are you will find Montolit tools at work. Since 1946, this Italian manufacturer has focused exclusively on creating equipment that makes tile cutting faster, cleaner, and more reliable. Their headquarters near Milan houses both design and production - every cutter and blade ships from Italy after passing strict quality standards. This concentration of expertise shows in details like the Masterpiuma single-rail system, which eliminates the flex found in dual-rail designs and maintains scoring accuracy across tiles exceeding 1.5 meters in length.'
              },
              {
                title: 'The Science Behind DNA Diamond Blades',
                content: 'Conventional diamond blades scatter cutting particles randomly across the segment surface. Montolit DNA Technology takes a different approach - positioning each diamond in a calculated pattern that creates consistent contact points during cutting. This arrangement means the blade engages material more efficiently, generates less heat, and maintains its cutting profile longer. Contractors report noticeably faster cuts through dense porcelain compared to standard blades, with the added benefit of smoother edge finishes that require less grinding afterward.'
              },
              {
                title: 'Manual Cutters That Work All Day',
                content: 'The Masterpiuma series represents the evolution of manual tile cutting over decades of refinement. The P5 model handles the largest format tiles on the market today, while the P3 offers a lighter option for standard residential work. Both share the same titanium-coated scoring wheel technology rated for 5,000 meters - roughly 10 times the lifespan of basic carbide wheels. The breaking mechanism adjusts precisely for tile thickness, applying even pressure that produces clean snaps without edge damage. Contractors find these cutters pay for themselves quickly through reduced material waste and faster production.'
              },
              {
                title: 'Blades for Every Material Challenge',
                content: 'Not all tiles cut the same way. High-density porcelain demands aggressive diamond segments, while glass requires fine grit to prevent chipping. Montolit produces specific blades for each application: the TCS and TCHD Turbo Bistury series for rectified porcelain, CPV blades for glass and mosaic work, and the versatile SCX range for general ceramic and porcelain cutting. This specialization means you select the blade that matches your material rather than compromising with a general-purpose option.'
              },
              {
                title: 'Built for the UAE Market',
                content: 'Tile installation in the UAE presents specific challenges - large commercial projects, tight schedules, and materials ranging from imported Italian marble to locally sourced ceramic. Montolit tools handle this variety with the durability needed for intensive use in demanding conditions. As authorized distributors, Lapiz Blue maintains stock of popular models and replacement parts, ensuring contractors across Dubai, Abu Dhabi, and Sharjah can access these tools without international shipping delays.'
              },
              {
                title: 'Scoring Wheel Technology Explained',
                content: 'The scoring wheel might seem like a simple component, but it determines cut quality more than any other part of a manual cutter. Montolit uses tungsten carbide as the base material, then applies a titanium coating that reduces friction during scoring. This combination creates a wheel that maintains its sharp edge through thousands of meters of use. When the wheel eventually wears, replacement takes seconds - the quick-change system means you are back to cutting in under a minute.'
              },
              {
                title: 'Investment That Returns Daily',
                content: 'Professional tile cutters and quality diamond blades represent an investment in your work quality and efficiency. A Masterpiuma cutter that lasts years and produces consistently clean cuts costs more upfront than budget alternatives, but the math favors quality. Fewer broken tiles, faster production, and results that satisfy clients add up to real savings. Montolit has built its reputation on tools that professionals buy once and rely on for the long term.'
              }
            ]
          },
          suggestedImages: [
            {
              description: 'Masterpiuma P5 manual tile cutter positioned on large format porcelain tile',
              alt: 'Montolit Masterpiuma P5 tile cutter with extended rail for large format tiles'
            },
            {
              description: 'Close-up of titanium-coated tungsten carbide scoring wheel making incision',
              alt: 'Montolit scoring wheel cutting through porcelain tile surface'
            },
            {
              description: 'DNA SCX diamond blade mounted on wet tile saw cutting thick porcelain',
              alt: 'Montolit DNA SCX blade wet cutting high-density porcelain'
            },
            {
              description: 'Breaking mechanism in action showing clean tile snap along score line',
              alt: 'Montolit tile cutter breaking mechanism producing clean edge'
            },
            {
              description: 'CPV fine-grit blade cutting glass mosaic tiles without chipping',
              alt: 'Montolit CPV blade for glass tile cutting'
            },
            {
              description: 'Professional installer using Masterpiuma P3 on residential bathroom project',
              alt: 'Contractor using Montolit P3 cutter for bathroom tile installation'
            },
            {
              description: 'Range of Montolit diamond blades showing different segment designs',
              alt: 'Montolit diamond blade collection for various tile materials'
            },
            {
              description: 'Finished tile installation showing precision cuts at corners and edges',
              alt: 'Professional tile work completed with Montolit cutting tools'
            }
          ]
        }
      },
      {
        slug: 'large-format-and-electrical-tools',
        name: 'Large Format and Electrical Tools',
        description: 'Specialized tools for large format tiles and electric cutting systems for high-volume professional work.',
        metaDescription: 'Montolit large format tile tools UAE - Electric cutters and large format tile handling systems for Dubai contractors.',
        images: ['/images/tools/montolit/large-format.jpg'],
        content: {
          seoTitle: 'Montolit Large Format Tile Tools & Electric Saws | UAE',
          h1: 'Large Format Handling and Electric Cutting Systems',
          intro: 'Modern architecture demands oversized tiles that older tools simply cannot handle. Porcelain slabs measuring 300x150cm have become standard in high-end projects, requiring equipment designed specifically for their weight, fragility, and cutting demands. Montolit developed the SuperLift handling system, F1 Brooklyn electric wet saws, and Flash Line cutting systems to address these challenges head-on. These tools let installers work confidently with large format materials, reducing breakage during transport and achieving accurate cuts across dimensions that would overwhelm conventional equipment.',
          whySection: {
            title: 'Why Large Format Demands Specialized Tools',
            bullets: [
              'SuperLift handles tiles up to 80kg with four 200mm vacuum cups and wheeled transport',
              'F1 Brooklyn wet saws deliver 2.2kW motor power with 50mm cutting depth',
              'Flash Line system cuts slabs up to 360cm using modular rail extensions',
              'SuperLift E-Power adds electronic vacuum monitoring with auto-reactivation',
              'Patented Squeeze tile locking prevents movement during scoring on large slabs',
              'Foldable saw frames allow transport between job sites without disassembly',
              'Every electric saw includes matched DNA diamond blades for immediate productivity'
            ]
          },
          applications: {
            title: 'Project Types Requiring These Tools',
            items: [
              'Commercial lobbies featuring full-slab porcelain feature walls',
              'Luxury residential projects with seamless large format flooring',
              'Hotel and hospitality spaces using oversized tiles for visual impact',
              'Retail environments with minimal grout lines and contemporary aesthetics',
              'High-rise construction with efficient large panel installation',
              'Showroom displays requiring precision cuts in premium materials'
            ]
          },
          howToChoose: {
            title: 'Matching Equipment to Your Project Scale',
            bullets: [
              'For tiles up to 120cm: Standard Masterpiuma cutters handle most requirements',
              'For slabs 120-200cm: Flash Line 2 provides the rail length needed',
              'For slabs over 200cm: Flash Line 3 with extension bars reaches 360cm',
              'For wet cutting thick porcelain: F1 Brooklyn offers motor power and blade capacity',
              'For two-person handling: SuperLift basic model provides reliable vacuum grip',
              'For solo handling: SuperLift E-Power electronic system maintains suction automatically',
              'For high-volume production: Consider multiple handling systems to maintain workflow'
            ]
          },
          commonMistakes: {
            title: 'Errors That Break Expensive Slabs',
            bullets: [
              'Attempting to lift large format tiles by edge grip instead of using proper suction systems',
              'Running electric saws without adequate water flow causes blade overheating and material damage',
              'Skipping vacuum gauge checks before lifting leads to dropped panels and injuries',
              'Using undersized cutting systems that cannot fully support slab weight during scoring',
              'Neglecting to secure tiles properly before cutting allows vibration-induced cracking'
            ]
          },
          trustSignals: {
            title: 'Large Format Capabilities',
            items: [
              { label: 'SuperLift Capacity', value: '80kg max load' },
              { label: 'Suction Cup Size', value: '200mm diameter' },
              { label: 'F1 Brooklyn Motor', value: '2.2kW / 2200W' },
              { label: 'Max Cutting Depth', value: '50mm' },
              { label: 'Flash Line 3 Length', value: '360cm' },
              { label: 'Blade Included', value: 'DNA diamond' }
            ]
          },
          faqs: [
            {
              question: 'How does the SuperLift system prevent dropped tiles?',
              answer: 'SuperLift uses four 200mm diameter vacuum cups that create strong suction across the tile surface. The cups connect to a rigid frame that distributes weight evenly, preventing stress concentration. Vacuum gauges on each cup show suction status in real time, letting you verify grip before lifting. The wheeled base allows transport without repeatedly releasing and reattaching suction.'
            },
            {
              question: 'What is the difference between SuperLift and SuperLift E-Power?',
              answer: 'The standard SuperLift uses manual pump-action to create vacuum. SuperLift E-Power adds an electronic pump that automatically maintains vacuum pressure - if suction drops due to surface irregularities or minor leaks, the system reactivates to restore grip. This electronic monitoring provides additional safety margin during extended handling operations.'
            },
            {
              question: 'Can the F1 Brooklyn cut natural stone as well as porcelain?',
              answer: 'Yes, with the appropriate blade selection. The 2.2kW motor provides sufficient power for marble, granite, and other natural stones. Choose softer bond diamond blades for harder stones like granite, and harder bond blades for softer stones like marble. The wet cutting system keeps material cool and suppresses dust regardless of material type.'
            },
            {
              question: 'How does the Flash Line system work for oversized slabs?',
              answer: 'Flash Line uses modular aluminum rails that lock together to create a scoring guide across any length. The patented Squeeze system clamps the tile securely, while a wheeled scoring head runs along the rail to create a consistent incision. For slabs up to 360cm, Flash Line 3 uses three 120cm bars. After scoring, the built-in breaking system snaps the tile cleanly along the line.'
            },
            {
              question: 'What maintenance does an electric wet saw require?',
              answer: 'Keep the water reservoir clean and filled during operation - dirty water contains abrasive particles that accelerate blade wear. Check blade condition regularly for worn segments or damage. Clean the table surface after each session to prevent material buildup that could affect cut accuracy. Inspect electrical connections and cord condition periodically for safety.'
            },
            {
              question: 'Why do Montolit saws include DNA blades rather than generic options?',
              answer: 'Matching the blade to the saw ensures optimal performance from first use. DNA blades are engineered for the RPM and power output of Montolit saws, meaning proper cutting speed and heat dissipation. Using mismatched blades can result in slow cutting, premature wear, or poor edge quality - problems that waste time and material on expensive large format projects.'
            },
            {
              question: 'Can one person safely handle large format tiles with SuperLift?',
              answer: 'The SuperLift E-Power version enables solo handling for tiles within its weight capacity. The electronic vacuum monitoring maintains grip without requiring a second person to watch gauges. However, for the largest and heaviest slabs, two-person handling remains safer and more practical - SuperLift works well with a person at each end of the frame.'
            },
            {
              question: 'What size electric saw do I need for my typical projects?',
              answer: 'F1 Brooklyn is available in four sizes based on cutting length requirements. Measure the largest tiles you regularly work with and select a saw that accommodates diagonal cuts across that dimension. For occasional oversized pieces, the Flash Line system provides an alternative to purchasing a larger saw. Lapiz Blue can help match equipment to your project profile.'
            }
          ],
          cta: {
            title: 'Handle Large Format with Confidence',
            subtitle: 'Equipment sized for modern tile dimensions',
            checklist: [
              'SuperLift vacuum handling systems for safe tile transport',
              'F1 Brooklyn electric wet saws with DNA blades included',
              'Flash Line cutting systems for oversized porcelain slabs',
              'Electronic E-Power upgrade for automated vacuum monitoring',
              'Replacement parts and consumables in local stock',
              'Technical support for equipment selection and operation',
              'Delivery throughout UAE for job site convenience'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'The Challenge of Modern Tile Dimensions',
                content: 'Tile manufacturers have pushed formats larger each year, responding to designer demands for uninterrupted surfaces and minimal grout lines. A single porcelain slab now commonly measures 300x150cm and weighs over 60kg. These dimensions exceed what traditional tile tools can safely handle - both during cutting and during the critical transport from cutting station to installation point. Montolit recognized this shift early and invested in developing equipment purpose-built for large format work.'
              },
              {
                title: 'SuperLift: Engineering Safe Transport',
                content: 'Dropping a large format tile does not just waste expensive material - it creates a serious safety hazard. The SuperLift system approaches this problem with four independently sealed vacuum cups mounted on a rigid aluminum frame. Each cup measures 200mm in diameter, creating substantial grip area. Vacuum gauges provide visual confirmation of seal integrity before lifting. The wheeled base allows controlled movement without releasing suction, and adjustable handles position the system for different tile dimensions.'
              },
              {
                title: 'Electric Cutting Power Where It Matters',
                content: 'The F1 Brooklyn wet saw series delivers what large format installation demands: motor power that maintains blade speed through thick material, cutting depth that handles even gauged porcelain panels, and a frame design that supports the full slab during operation. The 2.2kW motor does not bog down when pushing through dense porcelain, and the water management system keeps cutting cool without flooding the work area. Foldable legs and wheels make transport between sites practical despite the serious build quality.'
              },
              {
                title: 'Flash Line: Precision Scoring at Any Length',
                content: 'When tiles exceed the capacity of even the largest manual cutters, Flash Line provides a solution. This modular rail system locks together in 120cm sections, extending as needed to span any slab dimension. The patented Squeeze mechanism clamps the tile firmly during scoring, preventing the micro-movements that cause irregular breaks. A wheeled scoring head glides along the rail, and the same system incorporates the breaking mechanism - no need to transfer the scored tile to a separate breaking station.'
              },
              {
                title: 'Matching Tools to Project Requirements',
                content: 'Not every project requires the full large format toolkit. Residential bathrooms using 60x120cm tiles work perfectly with standard Masterpiuma cutters. The specialized equipment becomes essential when slab dimensions push beyond conventional tool limits or when project volume makes handling efficiency critical. Understanding where these thresholds fall helps contractors invest wisely - buying capability they will actually use rather than equipment that sits idle.'
              },
              {
                title: 'DNA Blades for Electric Cutting',
                content: 'Montolit packages each F1 Brooklyn saw with a matched DNA diamond blade - the same technology that sets their standalone blades apart. This bundling ensures the saw performs optimally from the first cut, rather than leaving blade selection to chance. DNA blade geometry works with the specific motor speed and power output of the saw, managing heat buildup and maintaining cutting rate through extended production runs on demanding materials.'
              },
              {
                title: 'Support for UAE Large Format Projects',
                content: 'Large format tile installation has grown significantly across the UAE, driven by commercial developments and high-end residential projects that favor contemporary design aesthetics. Lapiz Blue stocks SuperLift systems, F1 Brooklyn saws, and Flash Line components to support this market segment. Local availability means contractors can access equipment and replacement parts without the delays and complications of international sourcing. Technical guidance helps match tools to specific project requirements.'
              }
            ]
          },
          suggestedImages: [
            {
              description: 'SuperLift handling system with four vacuum cups attached to large porcelain slab',
              alt: 'Montolit SuperLift vacuum system lifting 300x150cm porcelain tile'
            },
            {
              description: 'F1 Brooklyn electric wet saw cutting through thick porcelain panel',
              alt: 'Montolit F1 Brooklyn wet saw with DNA blade cutting porcelain'
            },
            {
              description: 'Flash Line 3 rail system extended across oversized slab for scoring',
              alt: 'Montolit Flash Line modular cutting system on large format tile'
            },
            {
              description: 'Close-up of SuperLift vacuum gauge showing secure suction status',
              alt: 'Montolit SuperLift vacuum pressure gauge indicating safe grip'
            },
            {
              description: 'Two installers using SuperLift to transport large format tile to installation area',
              alt: 'Workers handling large porcelain slab with Montolit SuperLift system'
            },
            {
              description: 'F1 Brooklyn saw in folded transport position with wheels visible',
              alt: 'Montolit F1 Brooklyn portable wet saw in transport mode'
            },
            {
              description: 'Squeeze tile locking mechanism securing slab before Flash Line scoring',
              alt: 'Montolit Squeeze clamp system holding tile for precision cutting'
            },
            {
              description: 'Completed large format installation in commercial lobby showing minimal grout lines',
              alt: 'Large format porcelain flooring installed with Montolit cutting systems'
            }
          ]
        }
      },
      {
        slug: 'accessories',
        name: 'Accessories',
        description: 'Essential accessories including scoring wheels, breaking systems, and replacement parts for Montolit tools.',
        metaDescription: 'Montolit accessories UAE - Scoring wheels, replacement parts, and tool accessories in Dubai.',
        images: ['/images/tools/montolit/accessories.jpg'],
        content: {
          seoTitle: 'Montolit Accessories & Drill Bits | Diamond Core UAE',
          h1: 'Diamond Drill Bits, Scoring Wheels, and Professional Accessories',
          intro: 'The right accessory makes the difference between a clean job and a callback. Montolit accessories extend from precision drill bits that bore through porcelain without cracking, to scoring wheels that maintain their edge through thousands of meters, to measuring tools that ensure accurate layout every time. Twenty years of development went into the Mondrillo dry drilling system alone - the first worldwide solution for drilling porcelain without water. These accessories represent focused engineering solutions to specific installation challenges.',
          whySection: {
            title: 'Why Montolit Accessories Stand Apart',
            bullets: [
              'FSB diamond core bits cut fast, clean holes through porcelain, ceramic, and granite',
              'Mondrillo dry drilling system enables water-free porcelain drilling - first worldwide',
              'Titanium-coated scoring wheels rated for 5,000 meters of continuous use',
              'Patented protractor squares ensure accurate angle measurements for diagonal cuts',
              'Dressing tools with abrasive stone refresh diamond blades between jobs',
              'Quick-change wheel systems minimize downtime during high-volume work',
              'OEM replacement parts maintain original tool performance specifications'
            ]
          },
          applications: {
            title: 'Where These Accessories Excel',
            items: [
              'Drilling outlet and fixture holes in installed porcelain wall tiles',
              'Creating clean penetrations for plumbing and electrical in bathroom installations',
              'Maintaining manual cutter performance with regular wheel replacement',
              'Restoring cutting efficiency on glazed-over diamond blades',
              'Marking accurate diagonal cuts on floor tiles requiring miter work',
              'Replacing wear components to extend tool life beyond original specifications'
            ]
          },
          howToChoose: {
            title: 'Selecting the Right Accessory',
            bullets: [
              'For porcelain drilling with water: FSB diamond core bits deliver speed and clean edges',
              'For porcelain drilling without water: Mondrillo dry system with Performer coolant fluid',
              'For scoring wheel replacement: Match wheel type to your specific Masterpiuma model',
              'For blade maintenance: Diamond dressing tools restore cutting action on glazed segments',
              'For angle measurement: Patented protractor squares integrate with Montolit cutter guides',
              'For general replacement parts: Consult model number for compatible OEM components',
              'For high-volume drilling: Consider multiple bit sizes to match common fixture requirements'
            ]
          },
          commonMistakes: {
            title: 'Accessory Errors That Cost Time',
            bullets: [
              'Running core bits without proper cooling causes premature diamond loss and bit failure',
              'Continuing to use worn scoring wheels creates inconsistent breaks and wasted tiles',
              'Forcing drill bits through material instead of letting diamonds cut damages both bit and tile',
              'Using incorrect wheel type for cutter model affects scoring depth and break quality',
              'Skipping blade dressing when cutting speed decreases shortens overall blade life'
            ]
          },
          trustSignals: {
            title: 'Accessory Specifications',
            items: [
              { label: 'Scoring Wheel Life', value: '5,000 meters' },
              { label: 'Dry Drilling Innovation', value: '20+ years R&D' },
              { label: 'Core Bit Materials', value: 'Porcelain, ceramic, granite' },
              { label: 'Wheel Change Time', value: 'Under 1 minute' },
              { label: 'Compatibility', value: 'All Masterpiuma models' },
              { label: 'Warranty', value: 'OEM manufacturer backing' }
            ]
          },
          faqs: [
            {
              question: 'How does the Mondrillo dry drilling system work without water?',
              answer: 'Mondrillo uses a specially formulated Performer coolant fluid applied to the drill bit before and during use. This fluid lubricates the cutting interface and dissipates heat without the mess of water. The bit design incorporates aggressive diamond segments that cut efficiently at lower temperatures. This combination lets you drill porcelain on installed walls without protecting surrounding areas from water spray.'
            },
            {
              question: 'What is the difference between FSB and FAJ drill bits?',
              answer: 'FSB (Fast Smooth Boring) diamond core bits are optimized for larger hole diameters and faster cutting through thick materials. FAJ diamond drill bits handle smaller holes and precision work where edge quality matters most. Both use diamond particles in a matrix bond, but segment geometry and particle concentration differ based on intended application.'
            },
            {
              question: 'How do I know when to replace a scoring wheel?',
              answer: 'Watch for these signs: visible flat spots on the wheel edge, inconsistent scoring depth requiring multiple passes, increased pressure needed to create incision, or irregular break patterns on tiles that previously cut cleanly. Most wheels show wear visually before performance drops significantly. Keeping spare wheels on hand prevents job delays when replacement becomes necessary.'
            },
            {
              question: 'Can Montolit scoring wheels fit other brand cutters?',
              answer: 'Montolit designs wheels specifically for their cutter geometry and bearing systems. While some wheels may physically fit other brands, performance will not match original specifications. The titanium coating, carbide composition, and edge angle are engineered for Masterpiuma rail and pressure systems. Using OEM wheels ensures the quality that Montolit tools are known for.'
            },
            {
              question: 'How does a diamond dressing tool work?',
              answer: 'Diamond blade segments can glaze over - the metal bond covering exposed diamond particles and reducing cutting action. A dressing tool contains abrasive material that wears away this glaze, exposing fresh diamonds. Make several cuts through the dressing tool with your blade, applying light pressure. Cutting speed typically returns to near-new levels after proper dressing.'
            },
            {
              question: 'What coolant should I use with FSB core bits?',
              answer: 'Standard wet drilling uses clean water as coolant - it dissipates heat and flushes debris from the cut. For best results, maintain steady water flow to the bit during operation. Some contractors add small amounts of cutting oil to the water for dense materials, though plain water works for most porcelain and ceramic applications.'
            },
            {
              question: 'Why did Montolit spend 20 years developing dry drilling?',
              answer: 'Drilling porcelain without water seemed impossible - the material is hard enough to destroy conventional bits instantly without cooling. Montolit engineering worked through multiple approaches before achieving reliable dry drilling. The result addresses a real job site need: making holes in tiles already installed on walls without water damage to surrounding areas or the hassle of containment systems.'
            },
            {
              question: 'Does Lapiz Blue stock replacement parts for older Montolit models?',
              answer: 'We maintain inventory of common replacement parts including scoring wheels, breaking pads, and wear components for current and recent Masterpiuma models. For older or less common models, we can order specific parts through Montolit distribution channels. Contact us with your model number to check availability and lead times.'
            }
          ],
          cta: {
            title: 'Keep Your Tools Performing',
            subtitle: 'Accessories and replacement parts for continuous productivity',
            checklist: [
              'FSB and Mondrillo diamond drill bits in common sizes',
              'Titanium-coated scoring wheels for Masterpiuma series',
              'Performer coolant fluid for dry drilling applications',
              'Diamond dressing tools for blade maintenance',
              'Protractor squares and measurement accessories',
              'OEM replacement parts for wear components',
              'Technical guidance on accessory selection and use'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Small Components, Big Impact on Results',
                content: 'A professional tile installation depends on hundreds of individual cuts and holes, each one visible in the finished work. The quality of those cuts reflects directly on the installer reputation. Montolit accessories ensure that every score, every drill hole, and every measurement meets professional standards. These are not afterthought products - each accessory receives the same engineering attention as the primary tools they support.'
              },
              {
                title: 'The Breakthrough of Dry Porcelain Drilling',
                content: 'For years, drilling through porcelain required water cooling - creating mess, requiring containment, and complicating work on finished walls. Montolit invested over two decades in solving this problem, developing the Mondrillo system that drills porcelain without water. The Performer coolant fluid provides lubrication and heat management in a clean application. This innovation changed how installers approach retrofit work and repairs on existing installations.'
              },
              {
                title: 'Scoring Wheel Engineering',
                content: 'The scoring wheel seems simple - a small disc that scratches the tile surface before breaking. But that scratch determines break quality more than any other factor. Montolit scoring wheels use tungsten carbide as the base material, chosen for its hardness and edge retention. The titanium coating adds a layer that reduces friction during scoring, allowing the wheel to glide rather than drag. Combined, these materials deliver 5,000 meters of effective cutting life.'
              },
              {
                title: 'Diamond Core Bit Technology',
                content: 'FSB core bits embed industrial diamonds in a metal matrix bond around the cutting edge. As the bit rotates, diamonds grind through material particle by particle. The matrix wears slowly, exposing fresh diamonds as older ones dull or dislodge. Proper cooling and speed control maximize bit life - too fast generates excess heat that damages the bond, too slow causes glazing that stops cutting action.'
              },
              {
                title: 'Maintaining Blade Performance',
                content: 'Diamond blades do not wear out in the traditional sense - they glaze over as the metal bond covers active diamond particles. Regular dressing exposes fresh cutting surfaces, restoring performance without replacing the entire blade. A simple dressing tool pays for itself quickly through extended blade life. Most contractors dress their blades every few hours of active cutting on hard materials.'
              },
              {
                title: 'Measurement and Layout Tools',
                content: 'Accurate cutting starts with accurate measurement. Montolit protractor squares feature patented designs that integrate with their cutter guide systems, ensuring angles transfer precisely from measurement to cut. These tools eliminate the compound errors that occur when using separate measuring and cutting devices. For diagonal cuts and miter work, this precision translates directly to tighter joints and cleaner corners.'
              },
              {
                title: 'Local Stock for Immediate Needs',
                content: 'Running out of scoring wheels mid-project stops production. Waiting days for drill bit shipments delays completion. Lapiz Blue maintains inventory of high-turnover Montolit accessories precisely to prevent these situations. Contractors across Dubai, Abu Dhabi, and Sharjah can access replacement parts and consumables without the delays of international ordering. Quick availability keeps projects moving on schedule.'
              }
            ]
          },
          suggestedImages: [
            {
              description: 'FSB diamond core bit drilling clean hole through porcelain floor tile',
              alt: 'Montolit FSB diamond core bit creating precise hole in porcelain'
            },
            {
              description: 'Mondrillo dry drilling system in use on installed wall tile without water',
              alt: 'Montolit Mondrillo dry drilling through porcelain wall tile'
            },
            {
              description: 'Close-up of titanium-coated tungsten carbide scoring wheel edge',
              alt: 'Montolit scoring wheel showing titanium coating detail'
            },
            {
              description: 'Performer coolant fluid being applied to dry drilling bit before use',
              alt: 'Montolit Performer coolant for Mondrillo dry drilling system'
            },
            {
              description: 'Quick-change wheel replacement on Masterpiuma cutter',
              alt: 'Replacing scoring wheel on Montolit Masterpiuma tile cutter'
            },
            {
              description: 'Diamond dressing tool refreshing glazed blade segments',
              alt: 'Montolit dressing tool restoring diamond blade cutting action'
            },
            {
              description: 'Protractor square measuring angle on tile before diagonal cut',
              alt: 'Montolit protractor square for precise tile angle measurement'
            },
            {
              description: 'Array of Montolit accessories including bits, wheels, and measurement tools',
              alt: 'Montolit accessory collection for professional tile installation'
            }
          ]
        }
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Montolit products including transport systems, workstations, and specialized installation tools.',
        metaDescription: 'Montolit other products UAE - Transport systems, workstations, and specialized tools in Dubai.',
        images: ['/images/tools/montolit/others.jpg'],
        content: {
          seoTitle: 'Montolit Finishing Tools & Workstations | UAE Distributor',
          h1: 'Finishing Tools, Grinding Systems, and Job Site Equipment',
          intro: 'Cutting tiles is only part of the installation process. Edges need shaping, corners require rounding, and workspaces need organization that supports efficient production. Montolit addresses these secondary but essential needs with Fleximont diamond grinding wheels, MINIFLEXIMONT flap discs for angle grinders, specialized block cutters for natural stone, and workstation systems that keep tools and materials properly positioned. These products complete the toolkit for installers who understand that finish quality and workflow efficiency determine profitability.',
          whySection: {
            title: 'Why These Specialized Tools Matter',
            bullets: [
              'Fleximont lamellar diamond wheels shape and finish tile edges with precision control',
              'MINIFLEXIMONT flap discs attach to standard angle grinders for quick edge refinement',
              'Squadro diamond blade makes precise square cuts for outlets and fixture openings',
              'Hand polishing pads progress through grits for mirror-finish natural stone edges',
              'Block cutters handle thick natural stone and masonry that standard tools cannot',
              'Transport carts move heavy materials safely without strain or damage risk',
              'Workstations position tiles at proper height for cutting without back fatigue'
            ]
          },
          applications: {
            title: 'Finishing and Specialty Applications',
            items: [
              'Edge profiling on porcelain tiles for bullnose and pencil round details',
              'Removing factory sharp edges from cut tiles before grouting',
              'Creating clean rectangular openings for outlets and switches in wall tiles',
              'Polishing natural marble and granite edges to match field tile finish',
              'Cutting thick stone thresholds and window sills beyond manual cutter capacity',
              'Organizing job site workspace for efficient multi-day installations'
            ]
          },
          howToChoose: {
            title: 'Matching Tools to Finishing Tasks',
            bullets: [
              'For porcelain edge shaping: Fleximont provides controlled material removal without chipping',
              'For quick deburring: MINIFLEXIMONT on angle grinder handles high volume efficiently',
              'For outlet openings: Squadro blade with plunge capability creates clean rectangles',
              'For natural stone finishing: Progress through hand polishing pad grits for gloss',
              'For thick stone cutting: Block cutters handle materials exceeding 50mm thickness',
              'For ergonomic setup: Adjustable workstations reduce fatigue on extended projects',
              'For material transport: Purpose-built carts prevent tile damage during movement'
            ]
          },
          commonMistakes: {
            title: 'Finishing Errors to Avoid',
            bullets: [
              'Using aggressive grinding on thin porcelain removes too much material and weakens edges',
              'Skipping grit progression during polishing leaves visible scratches in final finish',
              'Attempting to cut thick stone with tools designed for standard tiles causes damage',
              'Working at improper height strains back muscles and reduces cutting accuracy',
              'Dragging heavy tile stacks instead of using carts damages material and floors'
            ]
          },
          trustSignals: {
            title: 'Specialty Tool Capabilities',
            items: [
              { label: 'Fleximont Compatibility', value: 'Most angle grinders' },
              { label: 'Polishing Pad Grits', value: '50 to 3000+' },
              { label: 'Block Cutter Capacity', value: '50mm+ thickness' },
              { label: 'Workstation Height', value: 'Adjustable ergonomic' },
              { label: 'Cart Load Rating', value: 'Heavy tile stacks' },
              { label: 'Italian Design', value: 'Montolit quality' }
            ]
          },
          faqs: [
            {
              question: 'What is the difference between Fleximont and MINIFLEXIMONT?',
              answer: 'Fleximont is a full-size lamellar diamond grinding wheel for dedicated grinding machines or larger angle grinders. MINIFLEXIMONT is a compact flap disc version designed for standard 4.5-inch angle grinders. Both use diamond-embedded segments for effective material removal on porcelain and ceramic, but MINIFLEXIMONT offers more portability and convenience for quick finishing tasks on site.'
            },
            {
              question: 'How do I create clean square openings for outlets in tiles?',
              answer: 'The Squadro diamond blade is specifically designed for this application. Mount it on an angle grinder and use the plunge-cutting technique to start inside the marked area. Cut along each side of the rectangle, slightly past corners to ensure clean intersections. The small blade diameter allows tight maneuvering for precise openings that fit electrical boxes and fixtures.'
            },
            {
              question: 'What grit sequence should I use for polishing stone edges?',
              answer: 'Start with coarser grits (50-100) to remove saw marks and shape the profile. Progress through medium grits (200-400) to refine the surface, then fine grits (800-1500) to develop gloss. For mirror finishes, continue to 3000 grit or higher. Each step removes scratches from the previous grit - skipping grits leaves visible marks in the final finish.'
            },
            {
              question: 'When do I need a block cutter instead of a standard tile cutter?',
              answer: 'Standard manual and electric tile cutters handle materials up to roughly 25-50mm thick, depending on the model. Block cutters become necessary for thicker materials like stone thresholds, window sills, pavers, and masonry units that exceed these limits. The heavier construction and larger blade capacity accommodate materials that would overwhelm standard tile tools.'
            },
            {
              question: 'Do workstations really improve productivity?',
              answer: 'Working at the wrong height forces awkward postures that fatigue muscles and reduce concentration over a full workday. Purpose-built workstations position tiles at optimal cutting height, reducing back strain and allowing more precise control. Many installers report faster work and less end-of-day exhaustion after switching from improvised setups to proper workstations.'
            },
            {
              question: 'How do transport carts prevent tile damage?',
              answer: 'Tile carts use padded supports that cradle materials without pressure points that cause cracks. Wheels distribute weight evenly and allow controlled movement without the jolts and impacts of hand carrying. For heavy large format tiles, carts eliminate the twisting forces that occur during manual transport and frequently cause corner chips or full breaks.'
            },
            {
              question: 'Can I use Fleximont wheels on wet tile saws?',
              answer: 'Fleximont wheels are designed for dry use on angle grinders and dedicated grinding machines. The lamellar diamond segments work best at the higher speeds these tools provide. For wet applications on tile saws, use appropriate diamond grinding cups or polishing pads designed for wet use. Mixing wet and dry tool applications typically produces poor results.'
            },
            {
              question: 'Does Lapiz Blue carry the full Montolit specialty product range?',
              answer: 'We stock popular finishing tools including Fleximont wheels, MINIFLEXIMONT discs, and Squadro blades. For less common items like specific block cutter models or specialty workstations, we can order through Montolit distribution channels. Contact us with your requirements for availability and lead times on specialized equipment.'
            }
          ],
          cta: {
            title: 'Complete Your Montolit Toolkit',
            subtitle: 'Finishing tools and job site equipment for professional results',
            checklist: [
              'Fleximont diamond grinding wheels for edge profiling',
              'MINIFLEXIMONT flap discs for angle grinder finishing',
              'Squadro blades for precision outlet and opening cuts',
              'Hand polishing pads in full grit progression',
              'Block cutters for thick natural stone applications',
              'Transport carts and material handling equipment',
              'Workstation systems for ergonomic cutting setup'
            ]
          },
          brandCopy: {
            sections: [
              {
                title: 'Beyond Cutting: The Complete Installation Process',
                content: 'Every tile installation involves more than making cuts. Edges need refinement before grouting. Openings must be created for fixtures and outlets. Materials need moving from delivery point to cutting station to installation area. Work surfaces need positioning that allows accurate cutting without physical strain. Montolit recognizes these requirements and produces tools that address each step with the same quality that defines their cutting equipment.'
              },
              {
                title: 'Diamond Grinding for Precision Edge Work',
                content: 'Factory tile edges often show minor chips or sharpness that affect both appearance and safety. The Fleximont lamellar wheel uses diamond-embedded segments arranged in overlapping layers that remove material progressively without gouging. This controlled action creates smooth edges and allows shaping operations like bullnose profiles. The wheel mounts on standard angle grinders, bringing professional edge finishing capability to any job site.'
              },
              {
                title: 'Quick Finishing with MINIFLEXIMONT',
                content: 'When full edge profiling is not required but cut edges need deburring or light smoothing, MINIFLEXIMONT flap discs provide a fast solution. These compact discs attach to standard angle grinders and use the same diamond technology as larger Fleximont wheels. A few passes removes sharp edges and minor chips, preparing tiles for grouting without the setup time of dedicated grinding equipment.'
              },
              {
                title: 'Creating Clean Openings and Notches',
                content: 'Outlets, switches, and fixtures require rectangular openings cut into tiles already planned for specific wall positions. The Squadro diamond blade handles these cuts with its plunge-cutting capability - starting the cut from the tile surface rather than from an edge. The compact blade diameter allows tight turns at corners, producing clean openings that fit fixture boxes precisely.'
              },
              {
                title: 'Natural Stone Edge Polishing',
                content: 'Cut edges on marble, granite, and other polished stones show dull saw marks that contrast with the field tile finish. Hand polishing pads progress through increasingly fine diamond grits, gradually restoring the polished appearance. Starting with coarse grits removes saw marks, while successively finer grits develop gloss matching the factory finish. This process requires patience but produces seamless edge-to-face transitions.'
              },
              {
                title: 'Heavy Materials Need Proper Handling',
                content: 'A stack of large format porcelain tiles weighs far more than casual handling suggests. Attempting to move these stacks by hand risks dropping tiles, injuring workers, and damaging installation surfaces. Purpose-built transport carts distribute weight properly and allow controlled movement. The investment in handling equipment pays back through reduced breakage and avoided injury claims.'
              },
              {
                title: 'Workstation Ergonomics for Daily Productivity',
                content: 'Professional tile installers make hundreds of cuts per day over years of work. Body position during cutting affects both immediate accuracy and long-term physical health. Montolit workstations position tile cutters at proper height, eliminating the bending and reaching that causes back strain. Many installers discover that proper ergonomics not only reduces fatigue but actually improves cut quality through better visual alignment and steadier hand control.'
              }
            ]
          },
          suggestedImages: [
            {
              description: 'Fleximont lamellar diamond wheel mounted on angle grinder profiling tile edge',
              alt: 'Montolit Fleximont grinding wheel creating bullnose edge on porcelain tile'
            },
            {
              description: 'MINIFLEXIMONT flap disc removing sharp edges from freshly cut tile',
              alt: 'Montolit MINIFLEXIMONT deburring cut tile edge with angle grinder'
            },
            {
              description: 'Squadro blade plunge cutting rectangular opening for electrical outlet',
              alt: 'Montolit Squadro blade cutting outlet opening in wall tile'
            },
            {
              description: 'Hand polishing progression on marble edge showing grit transitions',
              alt: 'Montolit polishing pads restoring shine to cut marble edge'
            },
            {
              description: 'Block cutter handling thick stone threshold material',
              alt: 'Montolit block cutter cutting thick natural stone threshold'
            },
            {
              description: 'Transport cart loaded with large format tile stack',
              alt: 'Montolit transport cart safely moving heavy porcelain tiles'
            },
            {
              description: 'Workstation with tile cutter at ergonomic operating height',
              alt: 'Montolit workstation providing proper cutting height for installer'
            },
            {
              description: 'Complete job site setup showing organized Montolit tools and equipment',
              alt: 'Professional tile installation workspace with Montolit finishing tools'
            }
          ]
        }
      },
    ],
  },

  dewalt: {
    slug: 'dewalt',
    name: 'DeWalt',
    layout: 'custom',
    logo: '/images/construction-tools/dewalt.png',
    website: 'https://www.dewalt.com',
    theme: {
      primary: '#FEBD17',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/dewalt/hero.jpg',
      alt: 'DeWalt - Professional Power Tools',
    },
    description: 'American manufacturer of professional-grade power tools, hand tools, and accessories trusted by contractors worldwide.',
    metaDescription: 'DeWalt UAE - Professional power tools, hand tools, and accessories for contractors in Dubai, Abu Dhabi, Sharjah.',
    category: 'tool',
    productLines: [
      {
        slug: 'hand-tools',
        name: 'Hand Tools',
        description: 'Professional hand tools including hammers, screwdrivers, pliers, and measuring tools built for durability.',
        metaDescription: 'DeWalt hand tools UAE - Professional hand tools for construction and renovation in Dubai.',
        images: ['/images/tools/dewalt/hand-tools.jpg'],
      },
      {
        slug: 'accessories',
        name: 'Accessories',
        description: 'Tool accessories including drill bits, saw blades, sanding discs, and storage solutions.',
        metaDescription: 'DeWalt accessories UAE - Drill bits, saw blades, and tool accessories in Dubai.',
        images: ['/images/tools/dewalt/accessories.jpg'],
      },
      {
        slug: 'anchors-and-fasteners',
        name: 'Anchors and Fasteners',
        description: 'Professional anchoring systems and fasteners for concrete, masonry, and steel applications.',
        metaDescription: 'DeWalt anchors and fasteners UAE - Professional anchoring systems for construction in Dubai.',
        images: ['/images/tools/dewalt/anchors.jpg'],
      },
      {
        slug: 'drills-and-grinders',
        name: 'Drills and Grinders',
        description: 'High-performance drills, impact drivers, and angle grinders for professional applications.',
        metaDescription: 'DeWalt drills and grinders UAE - Professional drilling and grinding tools in Dubai.',
        images: ['/images/tools/dewalt/drills.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional DeWalt products including saws, vacuums, lighting, and jobsite equipment.',
        metaDescription: 'DeWalt other products UAE - Saws, vacuums, and jobsite equipment in Dubai.',
        images: ['/images/tools/dewalt/others.jpg'],
      },
    ],
  },

  hilti: {
    slug: 'hilti',
    name: 'Hilti',
    layout: 'custom',
    logo: '/images/construction-tools/hilti.png',
    website: 'https://www.hilti.com',
    theme: {
      primary: '#E2001A',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/hilti/hero.jpg',
      alt: 'Hilti - Professional Power Tools',
    },
    description: 'Leading manufacturer of professional power tools, anchoring systems, and construction equipment for the building industry.',
    metaDescription: 'Hilti UAE - Professional power tools, drilling equipment, and construction tools for contractors in Dubai.',
    category: 'tool',
    productLines: [
      {
        slug: 'power-tools',
        name: 'Power Tools',
        description: 'Professional power tools including rotary hammers, demolition tools, and cordless systems.',
        metaDescription: 'Hilti power tools UAE - Professional rotary hammers and cordless systems in Dubai.',
        images: ['/images/tools/hilti/power-tools.jpg'],
      },
      {
        slug: 'anchoring',
        name: 'Anchoring',
        description: 'Advanced anchoring systems including mechanical anchors, chemical anchors, and direct fastening.',
        metaDescription: 'Hilti anchoring UAE - Mechanical and chemical anchoring systems for Dubai construction.',
        images: ['/images/tools/hilti/anchoring.jpg'],
      },
      {
        slug: 'laser-measuring-tools-and-scanners',
        name: 'Laser Measuring Tools and Scanners',
        description: 'Precision laser measuring, leveling, and detection tools for accurate layout and scanning.',
        metaDescription: 'Hilti laser tools UAE - Laser measuring and scanning equipment in Dubai.',
        images: ['/images/tools/hilti/laser.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Hilti products including firestop systems, installation channels, and modular support.',
        metaDescription: 'Hilti other products UAE - Firestop and installation systems in Dubai.',
        images: ['/images/tools/hilti/others.jpg'],
      },
    ],
  },

  peygran: {
    slug: 'peygran',
    name: 'Peygran',
    layout: 'custom',
    logo: '/images/construction-tools/peygran.png',
    website: 'https://www.peygran.com',
    theme: {
      primary: '#00A651',
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/peygran/hero.jpg',
      alt: 'Peygran - Tile Installation Systems',
    },
    description: 'Spanish manufacturer of innovative tile leveling systems and installation accessories for perfect tile installations.',
    metaDescription: 'Peygran UAE - Tile leveling systems, spacers, and installation tools for contractors in Dubai.',
    category: 'tool',
    productLines: [
      {
        slug: 'levelling',
        name: 'Levelling',
        description: 'Professional tile leveling systems for lippage-free installations on floors and walls.',
        metaDescription: 'Peygran leveling systems UAE - Tile leveling clips and wedges for Dubai contractors.',
        images: ['/images/tools/peygran/levelling.jpg'],
      },
      {
        slug: 'spacers',
        name: 'Spacers',
        description: 'Precision tile spacers in various sizes for consistent grout joints and professional results.',
        metaDescription: 'Peygran spacers UAE - Tile spacers for consistent grout lines in Dubai.',
        images: ['/images/tools/peygran/spacers.jpg'],
      },
      {
        slug: 'cement-tools',
        name: 'Cement Tools',
        description: 'Professional cement and grouting tools for tile installation and finishing.',
        metaDescription: 'Peygran cement tools UAE - Grouting and cement tools for tile installation in Dubai.',
        images: ['/images/tools/peygran/cement-tools.jpg'],
      },
      {
        slug: 'others',
        name: 'Others',
        description: 'Additional Peygran products including knee pads, buckets, and installation accessories.',
        metaDescription: 'Peygran other products UAE - Installation accessories and tools in Dubai.',
        images: ['/images/tools/peygran/others.jpg'],
      },
    ],
  },

  bihui: {
    slug: 'bihui',
    name: 'Bihui',
    layout: 'custom',
    logo: '/images/construction-tools/bihui.png',
    website: 'https://www.bihuitools.com',
    theme: {
      primary: '#009999',
      secondary: '#000000',
    },
    hero: {
      type: 'image',
      src: '/images/tools/bihui/hero.jpg',
      alt: 'Bihui - Tile Installation Tools',
    },
    description: 'Specialist in professional tile installation tools, power tools, and accessories for modern construction.',
    metaDescription: 'Bihui UAE - Tile installation tools, leveling systems, and tiling accessories for Dubai contractors.',
    category: 'tool',
    productLines: [
      {
        slug: 'power-tools',
        name: 'Power Tools',
        description: 'Professional power tools designed specifically for tile and stone installation work.',
        metaDescription: 'Bihui power tools UAE - Professional tile installation power tools in Dubai.',
        images: ['/images/tools/bihui/power-tools.jpg'],
      },
      {
        slug: 'laser-measuring-tools-and-scanners',
        name: 'Laser Measuring Tools and Scanners',
        description: 'Precision laser measuring and layout tools for accurate tile positioning and alignment.',
        metaDescription: 'Bihui laser tools UAE - Laser measuring equipment for tile installation in Dubai.',
        images: ['/images/tools/bihui/laser.jpg'],
      },
      {
        slug: 'tile-and-marble-grinders',
        name: 'Tile and Marble Grinders',
        description: 'Specialized grinders for tile edge profiling, marble polishing, and surface preparation.',
        metaDescription: 'Bihui tile grinders UAE - Tile and marble grinding tools in Dubai.',
        images: ['/images/tools/bihui/grinders.jpg'],
      },
      {
        slug: 'cement-tools',
        name: 'Cement Tools',
        description: 'Professional cement mixing, application, and finishing tools for tile installation.',
        metaDescription: 'Bihui cement tools UAE - Cement mixing and application tools in Dubai.',
        images: ['/images/tools/bihui/cement-tools.jpg'],
      },
    ],
  },

  keiser: {
    slug: 'keiser',
    name: 'Keiser',
    layout: 'custom',
    logo: '/images/construction-tools/keiser.png',
    website: 'https://www.keiser-tools.com',
    theme: {
      primary: '#1E6BA8',
      secondary: '#2B2B2B',
    },
    hero: {
      type: 'image',
      src: '/images/tools/keiser/hero.jpg',
      alt: 'Keiser - Professional Finishing Tools',
    },
    description: 'Professional finishing tools including paint sprayers, plaster tools, and surface preparation equipment.',
    metaDescription: 'Keiser UAE - Electric paint sprayers, plaster tools, and finishing equipment for Dubai contractors.',
    category: 'tool',
    productLines: [
      {
        slug: 'electric-paint-sprayers',
        name: 'Electric Paint Sprayers',
        description: 'Professional electric paint sprayers for interior and exterior coating applications.',
        metaDescription: 'Keiser paint sprayers UAE - Electric paint spraying equipment in Dubai.',
        images: ['/images/tools/keiser/paint-sprayers.jpg'],
      },
      {
        slug: 'plaster-tools',
        name: 'Plaster Tools',
        description: 'Professional plastering tools including trowels, floats, and finishing equipment.',
        metaDescription: 'Keiser plaster tools UAE - Professional plastering equipment in Dubai.',
        images: ['/images/tools/keiser/plaster-tools.jpg'],
      },
      {
        slug: 'grinders-and-polishing',
        name: 'Grinders and Polishing',
        description: 'Surface grinders and polishing tools for concrete, stone, and floor finishing.',
        metaDescription: 'Keiser grinders UAE - Surface grinding and polishing tools in Dubai.',
        images: ['/images/tools/keiser/grinders.jpg'],
      },
      {
        slug: 'mixing-applications',
        name: 'Mixing Applications',
        description: 'Professional mixing tools and stations for paint, plaster, and construction materials.',
        metaDescription: 'Keiser mixing tools UAE - Professional mixing equipment in Dubai.',
        images: ['/images/tools/keiser/mixing.jpg'],
      },
    ],
  },
};

// Helper function to get tool by slug
export function getToolConfig(slug: string): BrandConfig | null {
  return toolConfigs[slug] || null;
}

// Helper function to get all tools
export function getAllTools(): BrandConfig[] {
  return Object.values(toolConfigs).filter(t => t.category === 'tool');
}

// Helper function to get product line from tool
export function getToolProductLine(toolSlug: string, productLineSlug: string): ProductLine | null {
  const tool = getToolConfig(toolSlug);
  if (!tool) return null;
  return tool.productLines.find(pl => pl.slug === productLineSlug) || null;
}
