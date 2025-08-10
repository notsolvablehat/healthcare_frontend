import { Loader } from "lucide-react";

const CustomLoader = ({ text }) => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <Loader className="w-12 h-12 animate-spin text-primary" />
    {text && <p className="text-lg text-gray-600">{text}</p>}
  </div>
);

export default CustomLoader;