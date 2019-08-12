import React, {Fragment} from 'react';
import Card from '../../containers/Card';
import Button from '../Button';
import AddSvg from 'assets/add.svg';
import ClearSvg from 'assets/сlear.svg';

import './AddForm.scss';

const AddForm = ({
  valueForCard, 
  setValueForCard, 
  showForm,
  setShowForm, 
  textareaRef, 
  isEmptyColumn, 
  onAdd
}) => {
  return (
    <Fragment> 
      { showForm ? (
        <div className="add-form">
          <div className="add-form__input">
            <Card>
              <textarea placeholder={isEmptyColumn ? "Введите название колонки" : "Введите текст карточки"} 
                ref={textareaRef} rows="3"
                onChange={e => setValueForCard(e.target.value)}
                value={valueForCard}
              />
            </Card>
            <div className="add-form__button-add">
              <Button onClick={onAdd}>
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
        <div className="add-form add-form__button"> 
          <div className="add-form__button-show">
          <div className="add-form__button-add-btn">
            <img src={AddSvg} alt="Add button icon" />
            <span onClick={setShowForm.bind(this, true)}>
              {isEmptyColumn ? "Добавить еще одну колонку" : "Добавить еще одну карточку"}
            </span>
          </div>
        </div>
        </div>
      )}
    </Fragment>
  );
}

export default AddForm;