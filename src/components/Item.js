import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialLists = [
  { id: "list-1", title: "List 1", items: ["Ans 1", "Ans 2 ", "Ans 3"] },
];

function Item({ cateAns }) {
  const [lists, setLists] = useState(initialLists);
  const [newListTitle, setNewListTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("One");
  const [selectedOptionTwo, setSelectedOptionTwo] = useState("One");
  const [selectedOptionThree, setSelectedOptionThree] = useState("One");

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceList = lists.find(
      (list) => list.id === result.source.droppableId
    );
    const destinationList = lists.find(
      (list) => list.id === result.destination.droppableId
    );

    const [removed] = sourceList.items.splice(result.source.index, 1);
    destinationList.items.splice(result.destination.index, 0, removed);

    setLists([...lists]);
  };

  const handleAddList = () => {
    if (newListTitle) {
      const newList = {
        id: `list-${lists.length + 1}`,
        title: newListTitle,
        items: [newListTitle],
      };

      console.log(...lists);
      setLists([...lists, newList]);

      setNewListTitle("");
    }
  };

  const handleRemoveList = (listId) => {
    const filteredLists = lists.filter((list) => list.id !== listId);
    setLists(filteredLists);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((list, index) => (
          <div key={list.id} className=" flex list-container  w-80">
            {/* <h3>{list.title}</h3> */}
            <span className="flex"></span>
            <Droppable droppableId={list.id} key={list.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list bg-white  "
                >
                  {list.items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="list ml-5 p-1 m-1 border flex "
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/*  Belong to start */}

            <div className="list grid grid-col-3 gap-4 mt-2 ml-4 border h-9 ">
              {/* dropdown button */}
              <label>
                <select
                  id={index}
                  value={selectedOption}
                  onChange={handleChange}
                >
                  <option value="One">--select item--</option>

                  {cateAns.map((list, index) =>
                    list.items.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </label>
              {/* second */}
              <label>
                <select
                  id={index}
                  value={selectedOptionTwo}
                  onChange={(e) => setSelectedOptionTwo(e.target.value)}
                >
                  <option value="One">--select item--</option>
                  {cateAns.map((list, index) =>
                    list.items.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </label>
              {/* third */}
              <label>
                <select
                  id={index}
                  value={selectedOptionThree}
                  onChange={(e) => setSelectedOptionThree(e.target.value)}
                >
                  <option value="One">--select item--</option>
                  {cateAns.map((list, index) =>
                    list.items.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  )}
                </select>
              </label>
            </div>
          </div>
        ))}
      </DragDropContext>
      {/* add Button */}
      <div>
        <input
          className="border ml-5"
          type="text"
          placeholder={`Item ${lists.length} Option`}
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button
          onClick={handleAddList}
          className="border ml-3 rounded-sm bg-slate-400 p-.5"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Item;
