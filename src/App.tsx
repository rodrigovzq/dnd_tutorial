import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import './App.css';

const listItems = [
  {
    id: "1",
    name: "Tomate"
  },
  {
    id: "2",
    name: "Agua"
  },
  {
    id: "3",
    name: "Leche"
  },
  {
    id: "4",
    name: "Harina"
  },
  {
    id: "5",
    name: "Carne"
  }
]

// para saber que elemento arrastro con color distinto
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle
})
function App() {

  const [ingredients, setIngredients] = useState(listItems);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    const items = Array.from(ingredients)
    const [reorderedItem] = items.splice(source.index, 1) // el 1 es cuantos elementos se van a mover
    items.splice(destination.index, 0, reorderedItem)

    setIngredients(items)
  }

  return (
    <div className="App">
      <h1>Lista de ingredientes</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ingredients">
          {(provided) => (
            <div className="ingredientes" {...provided.droppableProps} ref={provided.innerRef}>
              {ingredients.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App;
