import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd";
import ClearSvg from 'assets/сlear.svg';

import './Card.scss';

const Card = ({cardIndex, children, columnIndex, onRemoveCard}) => {

  function isCardEmpty(cardIndex) {
    return !(cardIndex || cardIndex === 0);
  };
  
  return ( !isCardEmpty(cardIndex) ? (
      <Draggable 
        key={cardIndex} 
        draggableId={`card-${columnIndex}-${cardIndex}`} 
        index={cardIndex}
      >
        {(provided, snapshot) => (
          <div 
            className="card"
            key={cardIndex}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}  
          >
            <div className="card__text">
              {children}          
            </div>
            <img onClick={onRemoveCard.bind(this, columnIndex, cardIndex )} 
                className="card__button" 
                src={ClearSvg} 
                alt="Clear button icon" 
              />
          </div>
        )}
      </Draggable>
    ) : (
      <div className="card">
        {children}
      </div>
    )
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
};

export default Card;