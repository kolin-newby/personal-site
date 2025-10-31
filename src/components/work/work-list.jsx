import WorkListItem from "./work-list-item";

const WorkList = ({ workItemList, setModalOpen, setSelectedWork }) => {
  const handleOpenClick = (workItem) => {
    setSelectedWork(workItem);
    setModalOpen(true);
  };

  return (
    <ul
      className={`flex flex-col space-y-6 w-full items-center justify-center`}
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
