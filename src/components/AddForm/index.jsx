import React, {Fragment, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './AddForm.scss';
import Card from '../Card';
import Button from '../Button';
import AddSvg from 'assets/add.svg';
import ClearSvg from 'assets/сlear.svg';

const AddForm = ({columnIndex, isEmptyColumn, onAddColumn, onAddCard}) => {
  const [showForm, setShowForm] = useState(false);
  const textareaRef = useRef(null);
  const [valueForCard, setValueForCard] = useState("");
  
  useEffect( () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showForm]);

  const onAdd = () => {
    if(isEmptyColumn) {
      onAddColumn(valueForCard);
    } else {
      onAddCard(columnIndex, valueForCard);
    }
    
    setValueForCard('');
    setShowForm(false);
  }

  return (
    <Fragment> 
      { showForm ? (
        <div className="add-form">
          <div className="add-form__input">
            <Card>
              <textarea placeholder={isEmptyColumn ? "Введите название колонки" : "Введите название карточки"} 
                ref={textareaRef} rows="3"
                onChange={e => setValueForCard(e.target.value)}
                value={valueForCard}
              />
            </Card>
            <div className="add-form__button-add">
              <Button onClick={onAdd}
                >
                {isEmptyColumn ? "Добавить колонку" : "Добавить карточку"}
              </Button>
              <img onClick={setShowForm.bind(this, false)} 
                className="add-form__button-clear" 
                src={ClearSvg} 
                alt="Clear button icon" 
              />
            </div>
          </div>
        </div> 
      ) : (
        <div className="add-form__button-show">
          <div className="add-form__button-add-btn">
            <img src={AddSvg} alt="Add button icon" />
            <span onClick={setShowForm.bind(this, true)}>
              {isEmptyColumn ? "Добавить еще одну колонку" : "Добавить еще одну карточку"}
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default AddForm;