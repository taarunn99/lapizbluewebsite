// src/components/ui/whatsapp-chat-demo.tsx
import Link from "next/link";

const phoneNumber = "971502814338";
const defaultMessage = "Hi, I have a purchase order for Lapiz Blue";
const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(defaultMessage)}`;

// Contact types with creative messages
const contacts = [
  {
    id: 1,
    name: "Bulk Contractor",
    role: "Construction Project Manager",
    avatar: "BC",
    message: "Need 500 bags of cement for Al Ain project. Can you quote?",
    time: "10:24 AM",
    bgColor: "bg-[#406E8E]"
  },
  {
    id: 2,
    name: "Home DIY",
    role: "Homeowner",
    avatar: "HD",
    message: "Looking for waterproofing solution for my villa terrace",
    time: "Yesterday",
    bgColor: "bg-[#5A8CAF]"
  },
  {
    id: 3,
    name: "Design Studio",
    role: "Interior Designer",
    avatar: "DS",
    message: "Premium flooring samples for Marina Heights project?",
    time: "2 days ago",
    bgColor: "bg-[#406E8E]"
  },
  {
    id: 4,
    name: "Facility Pro",
    role: "Facilities Manager",
    avatar: "FP",
    message: "Need Mapei grout and adhesives for maintenance work",
    time: "3 days ago",
    bgColor: "bg-[#5A8CAF]"
  },
  {
    id: 5,
    name: "BuildCo UAE",
    role: "Construction Company",
    avatar: "BU",
    message: "Bulk order inquiry: Steel reinforcement & concrete additives",
    time: "1 week ago",
    bgColor: "bg-[#406E8E]"
  }
];

// Sample chat conversation (showing contractor interaction)
const chatMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hello! I need construction materials for a new project in Dubai",
    time: "10:15 AM"
  },
  {
    id: 2,
    sender: "us",
    text: "Welcome to Lapiz Blue! We'd be happy to help with your project. What materials are you looking for?",
    time: "10:16 AM"
  },
  {
    id: 3,
    sender: "them",
    text: "We need waterproofing solutions, tile adhesives, and premium paints",
    time: "10:18 AM"
  },
  {
    id: 4,
    sender: "us",
    text: "Perfect! We are authorized distributors of Mapei, plus we stock Kerakoll, Dulux Paints, Weber Saint Gobain, Laticrete, Pidilite Puma and more. Click below to chat with us on WhatsApp for instant quotes 24/7! 👇",
    time: "10:20 AM"
  }
];

export default function WhatsAppChatDemo() {
  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <meta itemProp="name" content="WhatsApp Business Chat - Lapiz Blue" />
      <meta itemProp="description" content="Connect with Lapiz Blue on WhatsApp for instant quotes on construction materials, bulk orders, and technical support 24/7" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-3">
          24/7 WhatsApp Support
        </h2>
        <p className="text-center text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          From contractors to DIY enthusiasts - Get instant quotes, technical details, and purchase orders on WhatsApp
        </p>
      </div>

      {/* Chat Interface Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[750px] md:h-[700px]">

          {/* Sidebar - Contact List */}
          <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col max-h-40 md:max-h-none overflow-hidden">
            {/* Sidebar Header */}
            <div className="bg-[#406E8E] text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Chats</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${index === 0 ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${contact.bgColor} text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h4>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{contact.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{contact.role}</p>
                      <p className="text-sm text-gray-600 truncate">{contact.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-[#f0f2f5]">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
              <div className="bg-[#406E8E] text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm">
                BC
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{contacts[0].name}</h3>
                <p className="text-xs text-gray-500">{contacts[0].role}</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px] md:max-h-none">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'us' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      msg.sender === 'us'
                        ? 'bg-[#406E8E] text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm md:text-base mb-1">{msg.text}</p>
                    <span className={`text-xs ${msg.sender === 'us' ? 'text-gray-200' : 'text-gray-500'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Big Centered CTA Button */}
              <div className="flex justify-center pt-4 pb-2">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#d5e2cc] text-[#23395B] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_4px_14px_0_rgba(64,110,142,0.25)] hover:shadow-[0_6px_20px_0_rgba(64,110,142,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 md:gap-3"
                  itemProp="url"
                  aria-label="Start WhatsApp chat with Lapiz Blue"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm md:text-base lg:text-lg">Start WhatsApp Chat Now</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Input Area with Send CTA */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center">
                  <input
                    type="text"
                    value={defaultMessage}
                    readOnly
                    className="flex-1 bg-transparent text-gray-700 outline-none text-sm md:text-base cursor-default"
                    aria-label="Pre-filled WhatsApp message"
                  />
                </div>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#d5e2cc] hover:bg-[#c5d2bc] text-[#23395B] p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                  aria-label="Send message on WhatsApp"
                  title="Click to open WhatsApp and send message"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Click send to chat with our team on WhatsApp • Available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "WhatsApp Business Chat - Lapiz Blue",
            "description": "Connect with Lapiz Blue on WhatsApp for construction materials, bulk orders, technical support. Serving contractors, DIY homeowners, interior designers, facility managers, and construction companies in UAE.",
            "url": typeof window !== 'undefined' ? window.location.href : '',
            "mainEntity": {
              "@type": "Organization",
              "name": "Lapiz Blue",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": `+${phoneNumber}`,
                "contactType": "Customer Service",
                "availableLanguage": ["English", "Arabic"],
                "areaServed": "AE",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              }
            },
            "potentialAction": {
              "@type": "CommunicateAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": whatsappUrl,
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              }
            }
          })
        }}
      />
    </section>
  );
}
