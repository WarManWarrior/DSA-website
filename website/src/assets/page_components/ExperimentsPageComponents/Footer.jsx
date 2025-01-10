import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 p-4 mt-auto text-center text-white">
      <nav className="flex justify-center gap-6">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Contact Us</a>
        <a href="#" className="hover:underline">Our Team</a>
      </nav>
      <p className="mt-2">© All rights reserved</p>
    </footer>
  );
};

export default Footer;
