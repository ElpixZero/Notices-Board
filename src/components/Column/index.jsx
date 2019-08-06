import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import AddForm from '../AddForm';
import classNames from 'classnames';
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

  return  (
    <div className="column">
      <Droppable  type="COLUMN" droppableId={`column-${columnIndex}`}>
        {(provided) => ( 
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {title && (
              <div className='column__title'>
                <b>{title}</b>
                <div onClick={removeColumn} className="remove-btn">
                  <img src={ClearSvg} alt="Clear svg icon" />
                </div>
              </div>
            )}
          
           { cards && <div className="column__items"> 
              {cards.map((card, index) => (
                <Card key={index} columnIndex={columnIndex} cardIndex={index}>
                  {card}
                </Card>
              ))}
            </div>}
            
            <AddForm 
              columnIndex={columnIndex} 
              isEmptyColumn={!cards} 
              onAddColumn={addColumn} 
              onAddCard={AddCard} 
            />
            {provided.placeholder}
          </div>
        )}
    </Droppable>
  </div>

)};

/*
Column.propTypes = {
  cards: PropTypes.node,
  title: PropTypes.string,
};

*/
export default Column;