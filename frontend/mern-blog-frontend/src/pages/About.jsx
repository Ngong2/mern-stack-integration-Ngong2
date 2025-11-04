import React from "react";

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-6">
        About MERN Blog
      </h1>

      <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">MERN Blog</span> — a
        modern blogging platform built using the powerful MERN stack
        (MongoDB, Express.js, React, and Node.js). We publish high-quality
        articles, tutorials, and stories about web development, technology,
        and digital innovation.
      </p>

      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        Our mission is to create a vibrant community where developers, learners,
        and creators share ideas, learn new skills, and stay ahead in the
        ever-evolving tech landscape.
      </p>
    </section>
  );
}
