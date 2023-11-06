import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Item from "./components/Item.js";

import Post from "./components/Preview.js";
const initialLists = [
  { id: "list-1", title: "List 1", items: ["Item 1"] },
  { id: "list-2", title: "List 2", items: ["Item 2"] },
  { id: "list-3", title: "List 3", items: ["Item 3"] },
];

function App() {
  const [lists, setLists] = useState(initialLists);
  const [newListTitle, setNewListTitle] = useState("");

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
        title: `${newListTitle} ${lists.length + 1}`,
        items: [newListTitle],
      };

      setLists([...lists, newList]);

      setNewListTitle("");
    }
  };

  const handleRemoveList = (listId) => {
    const filteredLists = lists.filter((list) => list.id !== listId);
    setLists(filteredLists);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <h3 className="ml-5 text-black ">Category</h3>
        {lists.map((list, index) => (
          <div key={list.id} className="list-container ">
            {/* <h3>{list.title}</h3> */}
            <span className="flex"></span>
            <Droppable droppableId={list.id} key={list.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-container w-60  bg-white  "
                >
                  {list.items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="list ml-5 p-1 m-1 border flex  "
                          >
                            {item}
                            <span className="items-end mr-1">
                              <button
                                className="text-xl ml-3 text-crenter "
                                onClick={() => handleRemoveList(list.id)}
                              >
                                {" "}
                                X
                              </button>
                            </span>
                            <span className="text-xl ml-10  ">|||||</span>
                          </div>
                        </>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* remove button */}
          </div>
        ))}
      </DragDropContext>
      <div>
        <input
          className="border ml-5"
          type="text"
          placeholder={`Category ${lists.length} Option`}
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button
          onClick={handleAddList}
          className="border ml-3 rounded-sm bg-slate-400 p-.5"
        >
          Add Category
        </button>
      </div>
      {/* Second part start */}
      <div>
        <div className="justify-between">
          <span className="list ml-5 p-1 m-1 ">Items</span>
          <span className="list ml-5 p-1 m-1 ">Belong To</span>
        </div>

        <Item cateAns={lists} />
      </div>
    </div>
  );
}

export default App;
