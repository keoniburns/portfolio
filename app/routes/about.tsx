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
              src="https://via.placeholder.com/400x500"
              alt="Your Name"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <p className="mb-4 text-gray-300">
            Hello! I'm [Your Name], a [Your Profession] based in [Your
            Location]. I specialize in creating [what you do] that [the value
            you provide].
          </p>

          <p className="mb-4 text-gray-300">
            My journey began with [your background/education] and I've been
            passionate about [your field] for [number] years. I enjoy [your
            interests related to your work] and am constantly expanding my
            knowledge in [areas you're developing].
          </p>

          <p className="mb-6 text-gray-300">
            When I'm not coding, you can find me [your hobbies/interests outside
            of work].
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
