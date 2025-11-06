import React, { useEffect, useRef, useState } from "react";

import WorkModal from "../components/work/work-modal";
import WorkList from "../components/work/work-list";

import { useInViewport } from "../common/use-in-viewport";

const WorkPage = ({ darkMode, className = "" }) => {
  const containerRef = useRef(null);
  const isInViewport = useInViewport(containerRef, { threshold: 0 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const workItems = [
    {
      title: "Graylog API Security",
      role: "Full Stack",
      images: [
        "https://u.cubeupload.com/CallAnUbie/settings1.png",
        "https://u.cubeupload.com/CallAnUbie/search5.png",
        "https://u.cubeupload.com/CallAnUbie/signatures1.png",
        "https://u.cubeupload.com/CallAnUbie/summaryresponsescori.jpg",
        "https://u.cubeupload.com/CallAnUbie/summarysignatures.jpg",
        "https://u.cubeupload.com/CallAnUbie/summary2.png",
      ],
      section1: (
        <span className="flex">
          Graylog API Security is a platform that allows users to monitor,
          record, and analyze their APIs' requests and responses. It alerts
          users to potential threats and breaches, and can even intelligently
          track PII to assure that APIs comply with national privacy standards.
        </span>
      ),
      section2: (
        <span className="flex">
          I lead development of the UI and UX for Graylog API Security from July
          of 2021 to June of 2025. In that time I did everything from;
          leveraging tools such as React.js, Node.js, TailwindsCss, and Recharts
          to develop new features, to optimizing backend queries using SQL and
          Trino.
        </span>
      ),
      skills: [
        "React",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "TailwindCSS",
        "Recharts",
        "CSS",
        "SQL",
      ],
    },
    {
      title: "Resurface API Logger",
      role: "Backend",
      images: null,
      section1: (
        <span className="flex">
          The Resurface API Logger is open source software that hooks directly
          into an API as middleware and collects the API's request and response
          data, packages it up, and sends it to whatever destination is
          configured. The logger is built in Golang and utilizes go routines and
          NDJSON to asynchronously bundle API data and send it to the
          destination in the background, minimizing performance overhead.
        </span>
      ),
      section2: (
        <span className="flex">
          I lead the initial development of the logger in 2021. Later, I lead
          the maintenance of existing features and the development of new major
          features such as the asynchronous goroutine submission, as well as the
          NDJSON bundling and general performace improvements.
        </span>
      ),
      skills: [
        "Golang",
        "Web Traffic",
        "JSON/NDJSON",
        "Async Threads",
        "RESTful APIs",
        "GraphQL APIs",
      ],
    },
  ];

  useEffect(() => {
    if (modalOpen && !isInViewport) {
      setModalOpen(false);
      setSelectedWork(null);
    }
  }, [isInViewport, modalOpen]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen relative w-full justify-center ${className}`}
      id={"work"}
    >
      <WorkModal
        open={modalOpen}
        selectedWork={selectedWork}
        setOpen={setModalOpen}
        setSelectedWork={setSelectedWork}
      />
      <WorkList
        workItemList={workItems}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setSelectedWork={setSelectedWork}
      />
    </div>
  );
};

export default WorkPage;
