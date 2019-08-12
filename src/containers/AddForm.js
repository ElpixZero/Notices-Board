import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import AddFormComponent from '../components/AddForm';
import {connect} from 'react-redux';
import columnsActions from '../actions/columns';
import cardsActions from '../actions/cards';

const AddForm = ({columnIndex, isEmptyColumn, addColumn, addCard}) => {
  const [showForm, setShowForm] = useState(false);
  const textareaRef = useRef(null);
  const [valueForCard, setValueForCard] = useState("");
  
  useEffect( () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showForm]);

  const onAdd = () => {
    if (isEmptyColumn) {
      let textForColumn = valueForCard ? valueForCard : 'Нет названия';
      addColumn(textForColumn);
    } else {
      addCard(columnIndex, valueForCard);
    }
    
    setValueForCard('');
    setShowForm(false);
  }

  return (
    <AddFormComponent
      showForm={showForm}
      setShowForm={setShowForm}
      textareaRef={textareaRef}
      valueForCard={valueForCard}
      setValueForCard={setValueForCard}
      onAdd={onAdd}

      isEmptyColumn={isEmptyColumn} 
    />
  );
}


const mapStateToProps = ({columns}) => ({
  items: columns
});

const mapActionsToProps = {
  ...columnsActions,
  ...cardsActions
};

export default connect(mapStateToProps, mapActionsToProps)(AddForm);