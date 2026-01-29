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
      title: "Rust Chat",
      role: "Sole Contributor",
      images: null,
      repo: "https://github.com/kolin-newby/rust-chat",
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={[
            "Rust",
            "asynchronous I/O",
            "TCP",
            "Matrix",
            "versioned",
            "chat protocol",
          ]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            An open-source TCP-based network chat built in Rust that I started
            for educational purposes. I started this project with the intention
            to evolve it into a Matrix compatible client.
          </span>
          <span>
            I am the sole contributor at the moment, developing the strictly
            versioned chat protocol with explicit IDs and timestamps. The
            software uses an "event envelope" architecture along with
            asynchronous I/O tasks to pass messages and system events across the
            network.
          </span>
        </TextHighlighterContainer>
      ),
      skills: ["Rust", "Async I/O", "TCP", "Matrix", "Chat Protocol"],
    },
    {
      title: "Resurface API Logger",
      role: "Individual Contributor",
      images: null,
      repo: "https://github.com/resurfaceio/logger-go",
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={[
            "open-source",
            "Goroutine",
            "Go",
            "NDJSON",
            "API",
            "web traffic",
          ]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            An open-source API Logger that can hook directly into an API's
            source code or act as middleware in many architectures. It collects
            the API's request and response data, packages it, and sends it to
            the configured destination. The logger is built in Go and uses
            Goroutines and NDJSON to batch API data and send it to the
            destination, minimizing performance overhead.
          </span>
          <span>
            I was part of the team that started the initial development of the
            logger in 2020. Later, I was assigned to lead the maintenance of
            existing features and the development of new major features such as
            the asynchronous Goroutine submission, as well as the NDJSON
            batching and general performance improvements.
          </span>
        </TextHighlighterContainer>
      ),
      skills: [
        "Go",
        "Goroutines",
        "Web Traffic",
        "NDJSON",
        "RESTful APIs",
        "GraphQL APIs",
      ],
    },
    {
      title: "API Traffic Load Tester",
      role: "Individual Contributor",
      images: null,
      repo: "https://github.com/resurfaceio/blowhole",
      textSection: (
        <TextHighlighterContainer
          className="flex flex-col space-y-2"
          terms={["concurrency", "Goroutines", "gRPC", "Go", "open-source"]}
          caseSensitive
          holdAfterAllSec={10}
          perWordFillSec={0.45}
        >
          <span>
            An open-source API load-tester built in Go that uses gRPC and
            concurrent Goroutines to effectively simulate different levels of
            traffic to a given API endpoint. It was originally developed to help
            test and validate the open-source loggers from Resurface Labs,
            including the Go logger included in another project.
          </span>
          <span>
            I led the initial development of the load tester in 2023,
            implementing the load tester's base functionality including sending
            high concurrency web traffic to a given endpoint through a
            distributed, asynchronous 'coordinator' and 'worker' architecture,
            with node communication via gRPC.
          </span>
        </TextHighlighterContainer>
      ),
      skills: ["Golang", "JSON", "Goroutines", "APIs", "gRPC"],
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
      id="projects"
      aria-label="projects"
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
