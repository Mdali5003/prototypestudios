import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "971509325501";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`;

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    style={{ cursor: "pointer" }}
  >
    <MessageCircle size={26} className="text-white" />
  </a>
);

export default WhatsAppButton;
