import React from "react";

export function meta() {
  return [
    { title: "About Me - Portfolio" },
    {
      name: "description",
      content: "Learn more about my background and experience",
    },
  ];
}

export default function About() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/3">
          <div className="bg-[#282828] rounded-lg overflow-hidden">
            <img
              src="/me2.JPEG"
              alt="Your Name"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <p className="mb-4 text-gray-300">
            Hello! I'm Keoni Burns, a Software Engineer based in Los Angeles. I
            currently work in the compliance and time and attendance space, but
            I have a love for Ai and embedded systems, specifically autonomous
            navigation.
          </p>

          <p className="mb-4 text-gray-300">
            I currently work for Excalibur Security leading the initiative for a
            proprietary time and attendance platform. I have been developing
            this platform for the past 6 months with a small team of hungry
            developers and our goal is to be a competitor alongside the likes of
            workday and ukg. Previously I have worked across the tech stack and
            in differing disciplines like mobile/web development, DevOps and
            infrastructure, and project management.
          </p>

          <p className="mb-6 text-gray-300">
            When I'm not coding, you can find me at the local pool hall with my
            girlfriend or if its the season at heavenly or boreal shredding some
            pow.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-[#1DB954] text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all"
            >
              Contact Me
            </a>
            <a
              href="/path-to-your-resume.pdf"
              target="_blank"
              className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>

        <div className="bg-[#181818] p-6 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">Company Name</h3>
            <span className="text-gray-400">2020 - Present</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">Senior Position</h4>
          <p className="text-gray-300">
            Description of your role, responsibilities, and key achievements. Be
            sure to highlight specific projects and the impact your work had.
          </p>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">Previous Company</h3>
            <span className="text-gray-400">2018 - 2020</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">Junior Position</h4>
          <p className="text-gray-300">
            Description of your role, responsibilities, and key achievements. Be
            sure to highlight specific projects and the impact your work had.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Education</h2>

        <div className="bg-[#181818] p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold text-white">University Name</h3>
            <span className="text-gray-400">2014 - 2018</span>
          </div>
          <h4 className="text-[#1DB954] mb-2">Degree in Relevant Field</h4>
          <p className="text-gray-300">
            Brief description of your studies, relevant coursework, and any
            honors or special achievements.
          </p>
        </div>
      </div>
    </div>
  );
}
