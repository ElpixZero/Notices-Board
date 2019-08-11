import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import AddForm from '../AddForm';
import ClearSvg from 'assets/сlear.svg';
import { Droppable } from "react-beautiful-dnd";

import './Column.scss';

const Column = ({
  columnIndex, 
  title, 
  cards, 
  onRemoveColumn, 
  addColumn, 
  AddCard,
}) => {
    
  const removeColumn = () => {
    if (global.confirm('Вы действительно хотите удалить?')) {
      onRemoveColumn(columnIndex);
    }
  };

  return cards ? (
    <Droppable type="CARDS" droppableId={`column-${columnIndex}`}>
      {(provided) => ( 
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column__inner">
            { title && (
              <div className='column__title'>
                <b>{title}</b>
                <div onClick={removeColumn} className="remove-btn">
                  <img src={ClearSvg} alt="Clear svg icon" />
                </div>
              </div>
            )}

            { cards && 
              <div className="column__items"> 
                {cards.map((card, index) => (
                  <Card key={index} columnIndex={columnIndex} cardIndex={index}>
                    {card}
                  </Card>
                ))}
                {provided.placeholder}
              </div>
            }

            <AddForm 
              columnIndex={columnIndex} 
              isEmptyColumn={!cards} 
              onAddColumn={addColumn} 
              onAddCard={AddCard} 
            />
          </div>
        </div>
      )}
    </Droppable>
  ) : (
    <div className={"column column--empty"}>
      <div className="column__inner">
        <AddForm
          isEmptyColumn={true}
          columnIndex={columnIndex}
          onAddColumn={addColumn}
          onAddCard={AddCard}
        />
      </div>
    </div>
  )
};

Column.propTypes = {
  cards: PropTypes.node,
  title: PropTypes.string
};

export default Column;