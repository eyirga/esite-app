import { CgInstagram } from "react-icons/cg";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="mt-12 flex flex-col md:block items-center justify-center text-white text-center">
      <div className="flex gap-4 items-center justify-center cursor-pointer">
          <CgInstagram />
          <CiFacebook />
          <FaXTwitter />
          <FiYoutube />
        </div>
      <div className="mt-8 text-slate-600 p-4">
        <p>eSITESERVER</p>
        eSITE creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
