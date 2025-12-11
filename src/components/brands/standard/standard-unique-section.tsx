import { UniqueSectionItem } from "@/data/brandConfigs";

interface StandardUniqueSectionProps {
  type: 'systems' | 'green' | 'expertise' | 'gallery';
  title: string;
  subtitle: string;
  items: UniqueSectionItem[];
  themeColor: string;
  brandSlug: string;
}

// Icon components for each type
function SystemsIcon({ color }: { color: string }) {
  return (
    <svg className="w-8 h-8" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function GreenIcon({ color }: { color: string }) {
  return (
    <svg className="w-8 h-8" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function ExpertiseIcon({ color }: { color: string }) {
  return (
    <svg className="w-8 h-8" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function GalleryIcon({ color }: { color: string }) {
  return (
    <svg className="w-8 h-8" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

// Item icons based on type
function ItemIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'systems':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case 'green':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'expertise':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case 'gallery':
      return (
        <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    default:
      return null;
  }
}

function getMainIcon(type: string, color: string) {
  switch (type) {
    case 'systems': return <SystemsIcon color={color} />;
    case 'green': return <GreenIcon color={color} />;
    case 'expertise': return <ExpertiseIcon color={color} />;
    case 'gallery': return <GalleryIcon color={color} />;
    default: return <SystemsIcon color={color} />;
  }
}

function getBackgroundStyle(type: string, themeColor: string) {
  switch (type) {
    case 'green':
      return { backgroundColor: '#F7FAF7' }; // Light sage for eco theme
    case 'gallery':
      return { backgroundColor: '#FAF9F7' }; // Cream for luxury
    default:
      return { backgroundColor: `${themeColor}08` };
  }
}

export function StandardUniqueSection({
  type,
  title,
  subtitle,
  items,
  themeColor,
}: StandardUniqueSectionProps) {
  return (
    <section className="py-16 md:py-24" style={getBackgroundStyle(type, themeColor)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${themeColor}15` }}
            >
              {getMainIcon(type, themeColor)}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200 group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: `${themeColor}10` }}
              >
                <ItemIcon type={type} color={themeColor} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent */}
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ backgroundColor: themeColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
