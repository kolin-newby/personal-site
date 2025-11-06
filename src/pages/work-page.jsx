import React, { useEffect, useRef, useState } from "react";

import WorkModal from "../components/work/work-modal";
import WorkList from "../components/work/work-list";

import { useInViewport } from "../common/use-in-viewport";
import TextHighlighterContainer from "../components/text-highlighter-container";

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
      repo: null,
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={[
            "threats",
            "breaches",
            "track PII",
            "design and development",
            "UI and UX",
            "new features",
            "optimizing",
            "monitor",
            "record",
            "analyze",
            "frontend",
            "backend",
          ]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            Graylog API Security is a platform that lets teams monitor, record,
            and analyze their APIs' requests and responses. It alerts users to
            potential threats and breaches, and can even intelligently track PII
            to ensure that APIs comply with national privacy standards.
          </span>
          <span>
            I led design and development of the UI and UX for Graylog API
            Security from July of 2021 to June of 2025. In that time, I had a
            hand in every aspect of the product from; leveraging React,
            TypeScript, Node.js, TailwindsCss, and Recharts to develop new
            interfaces and features on the frontend, to optimizing queries and
            backend data structures using Java, SQL and Trino.
          </span>
        </TextHighlighterContainer>
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
      repo: "https://github.com/resurfaceio/logger-go",
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={[
            "open-source",
            "asynchronous",
            "Goroutine",
            "Go",
            "NDJSON",
            "API",
          ]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            The Resurface API Logger is open-source software that hooks directly
            into an API as middleware and collects the API's request and
            response data, packages it, and sends it to the configured
            destination. The logger is built in Go and uses Goroutines and
            NDJSON to asynchronously batch API data and send it to the
            destination, minimizing performance overhead.
          </span>
          <span>
            I led the initial development of the logger in 2021. Later, I lead
            the maintenance of existing features and the development of new
            major features such as the asynchronous Goroutine submission, as
            well as the NDJSON batching and general performance improvements.
          </span>
        </TextHighlighterContainer>
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
    {
      title: "Blowhole API Load Tester",
      role: "Web Traffic",
      images: null,
      repo: "https://github.com/resurfaceio/blowhole",
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={[
            "high-throughput",
            "asynchronous",
            "gRPC",
            "Go",
            "open-source",
          ]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            The Blowhole load tester is open-source, API load-testing software
            that utilizes Go, gRPC, and concurrent Goroutines to effectively
            simulate different levels of traffic to a given endpoint. It was
            originally developed to help test the open-source loggers from
            Resurface Labs, including the Go logger included in my other work.
          </span>
          <span>
            I led the initial development of the load tester in 2023. I
            implemented the load tester's base functionality including sending
            high-throughput web traffic to a given endpoint through a
            distributed, asynchronous 'coordinator' and 'worker' architechture,
            where the nodes communicate via gRPC.
          </span>
        </TextHighlighterContainer>
      ),
      skills: ["Golang", "JSON", "Async Threads", "RESTful APIs", "gRPC"],
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
