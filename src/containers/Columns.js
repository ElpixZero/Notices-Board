import React, {Fragment} from 'react';
import Column from '../components/Column';
import {connect} from 'react-redux';
import columnsActions from '../actions/columns';
import cardsActions from '../actions/cards';
import { DragDropContext } from "react-beautiful-dnd";

const Columns = ({
    items, 
    addColumn, 
    addCard, 
    removeColumn, 
    reorderCards, 
    removeCard
  }) => {
    
  const onDragEnd = (result) => {
    const {source, destination} = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    reorderCards({
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
    });
    
  }

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}> 
        {items.map( (item, index) => (
          <Column 
            {...item} 
            addColumn={addColumn} 
            columnIndex={index}
            AddCard={addCard}
            onRemoveColumn={removeColumn}
            key={index} 
            onReorder={reorderCards}
            onRemoveCard={removeCard}
          />
        ))}
      </DragDropContext>
      
      <Column addColumn={addColumn} onAddCard={addCard} />
    </Fragment>
  );
}

const mapStateToProps = ({columns}) => ({
  items: columns
});

const mapActionsToProps = {
  ...columnsActions,
  ...cardsActions
};

export default connect(mapStateToProps, mapActionsToProps)(Columns);