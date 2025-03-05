import React, { useEffect } from "react";
import Navbar from "../page_components/navbar";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutUs() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library for animations
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should happen only once
    });

    // Smooth scroll to the top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[url('https://virtutal-daa-lab.netlify.app/imgs/headerImg.png')] bg-cover bg-top min-h-screen text-white">
      <Navbar />

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center h-screen px-6 bg-black bg-opacity-60"
        data-aos="fade-in"
      >
        <h2 className="text-5xl font-extrabold mb-6 text-center" data-aos="fade-up">
          About Us
        </h2>
        <p
          className="text-lg leading-relaxed text-center max-w-4xl mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Welcome to our platform! We are dedicated to providing an interactive
          and engaging experience for exploring algorithms and data structures.
          Our mission is to empower learners, developers, and enthusiasts with
          tools and resources to deepen their understanding of computer science
          fundamentals.
        </p>
        <p
          className="text-lg leading-relaxed text-center max-w-4xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          With a user-friendly interface and visually rich simulations, we aim
          to make complex topics accessible and enjoyable. Join us in building
          a community where curiosity and knowledge thrive.
        </p>
      </div>

      {/* Footer */}
      <footer
        className="bg-gray-800 text-white py-8"
        data-aos="slide-up"
        data-aos-duration="1500"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
          {/* Address Section */}
          <div className="mb-6 md:mb-0" data-aos="fade-right" data-aos-delay="300">
            <h3 className="text-lg font-semibold mb-2">Our Address</h3>
            <p>SRM University KTR</p>
            <p>Chennai</p>
            <p>Tamil Nadu</p>
          </div>
          {/* Contact Section */}
          <div data-aos="fade-left" data-aos-delay="300">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Dr. U. Sakthi - sakthiu@srmist.edu.in</p>
            <p>Sudeep Kumar - sudeepkumar2412@gmail.com</p>
            <p>Satyam Kumar Choudhary- choudharysatyam808@gmail.com</p>
            <p>Siddheshwar Dubey - siddh200321@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
