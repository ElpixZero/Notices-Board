const initialState = [
  {
    title: "Планы на месяц",
    cards: [
      'Съездить на море',
      'Разработка новостного блога',
      'Бегать по утрам каждые нечетные дни недели',
      'Уделять по 3 часа изучению Реакта',
      'Найти работу на позицию Junior Front-end developer',
      'Изучать NodeJs',
      '2 часа каждый день на изучение Английского',
    ]
  },

  {
    title: "Планы на Понедельник",
    cards: [
      'Утренная пробежка',
      'Поехать в магазин за продуктами',
      'Чтение "Совершенный код"',
      'Посмотреть фильм "Кто я"',
    ]
  },
];

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CARDS:ADD':
      return state.map( (item, index) => {
          if (action.payload.columnIndex === index) {
            return {
              ...item,
              cards: [
                ...item.cards,
                action.payload.text
              ]
            }
          }

          return item;
      });

      case 'CARDS:REMOVE':
        return state.map( (item, index) => {
            if (action.payload.columnIndex === index) {
              return {
                ...item,
                cards: item.cards.filter( (item, index) => {
                  return !(index === action.payload.cardIndex);
                }),
              }
            }
            return item;
        });
      
    case 'COLUMNS:ADD':
      return [
        ...state,
        {
          title: action.payload,
          cards: []
        }
      ];

    case 'COLUMNS:REMOVE':
      return state.filter( (item, index) => {
        return action.payload !== index; 
      });

    case 'CARDS:REORDER': 
      if (action.payload.sourceColumnId === action.payload.destinationColumnId) {
        return state.map( (item, index) => {
          if (action.payload.sourceColumnId === `column-${index}`) {
            const result = Array.from(item.cards);
            const [removed] = result.splice(action.payload.sourceIndex, 1);
            result.splice(action.payload.destinationIndex, 0, removed);
            return {
              title: item.title,
              cards: result
            }
          }
            return item;
        });
      } else {
        const destinationColumnId = action.payload.destinationColumnId.slice(7);
        const sourceColumnId = action.payload.sourceColumnId.slice(7);

        const sourceColumn = Array.from(state[sourceColumnId].cards);
        const removedCard = sourceColumn.splice(action.payload.sourceIndex, 1);

        const destinationColumn = Array.from(state[destinationColumnId].cards);
        destinationColumn.splice(action.payload.destinationIndex, 0, removedCard[0]);

        return state.map( (item, index) => { 
          if (action.payload.sourceColumnId === `column-${index}`) {
            return {
              title: item.title,
              cards: sourceColumn
            }
          }

          if (action.payload.destinationColumnId === `column-${index}`) {
            return {
              title: item.title,
              cards: destinationColumn
            }
          } 

          return item;
        });
      }

    default:
      return state;
  }
}

