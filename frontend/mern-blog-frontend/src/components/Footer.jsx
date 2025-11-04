import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About MERN Blog</h3>
          <p className="text-gray-400 text-sm">
            MERN Blog is your go-to platform for modern web development tutorials, tech news, and coding tips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
        
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} MERN Blog. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
