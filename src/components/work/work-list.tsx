import React from "react";
import WorkListItem from "./work-list-item";
import type { WorkItem } from "../../types/work";

type Props = {
  workItemList?: WorkItem[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWork: React.Dispatch<React.SetStateAction<WorkItem | null>>;
};

const WorkList = ({
  workItemList,
  modalOpen,
  setModalOpen,
  setSelectedWork,
}: Props) => {
  const handleOpenClick = (workItem: WorkItem) => {
    setSelectedWork(workItem);
    setModalOpen(true);
  };

  return (
    <ul
      className={`flex flex-col space-y-6 w-full items-center justify-center transform transition-transform duration-500 ${
        modalOpen ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {workItemList?.map((item, index) => (
        <WorkListItem
          key={item.title + "-" + index}
          workItem={item}
          handleOpenClick={() => handleOpenClick(item)}
        />
      ))}
    </ul>
  );
};

export default WorkList;
