import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import changelog from "@assets/CHANGELOG.md";
import logo from "@assets/logo.svg";
import syncLogo from "@assets/icons8-sync.svg";
import aboutLogo from "@assets/icons8-about.svg";
import Modal from "@components/Modal";

const Banner = (props: {
  title: string;
  repoUrl: string;
  gitCommit?: string;
  appVersion: string;
  creationTimestamp?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [changelogText, setChangelogText] = useState("");
  useEffect(() => {
    fetch(changelog)
      .then((response) => response.text())
      .then((text) => {
        setChangelogText(text);
      });
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between overflow-hidden bg-gray-800 p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="mr-2 h-10 w-10 md:mr-4" />
        <a
          href={props.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white sm:truncate md:text-xl"
        >
          <h1>{props.title}</h1>
        </a>
      </div>
      <div className="ml-2 mr-2 flex whitespace-nowrap text-white md:mr-0">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <button onClick={() => setShowModal(true)} className="mr-1">
              <img src={aboutLogo} className="h-4 md:h-6" alt="Sync Logo" />
            </button>
            <span className="text-xs md:text-base">
              {props.appVersion +
                (props.gitCommit
                  ? ` (${props.gitCommit.substring(0, 8)})`
                  : "")}
            </span>
          </div>
          <div className="mt-1 flex flex-row">
            <img src={syncLogo} className="mr-1 h-4" alt="Sync Logo" />
            <span className="text-xs">
              {new Date(props.creationTimestamp ?? Date.now()).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          overflow="overflow-scroll"
        >
          <ReactMarkdown className="prose prose-sm">
            {changelogText}
          </ReactMarkdown>
        </Modal>
      )}
    </nav>
  );
};

export default Banner;
