const initialState = [
  {
    title: "Month's plans",
    cards: [
      'Go to do the shopping',
      'Buy some food and go to back to do your homework',
      'Go to do the shopping',
      'Go to do tto do the shoppinghe shopping to do the shopping',
      'Go to do the shopping',
      'Go to do tto do the shoppinghe to do the shoppingshopping',
      'Go to do the shopping',
      'Go to do the to do the shoppingshopping',
      'Go to do tto do the shoppinghe shopping',
      'Go to do tto do the shoppinghto do the shoppinge shopping',
      'Go to do the shopping',
      'Go to do the shopping',
      'Go to do thto do the shoppinge shopping',
      'Go to do the shopping',
      'Go to do theto do the shopping shopping',
      'Go to do the shopping',
      'Go to do the shopping',
      'Go to do theto do the shopping shopping',
      'Go to do the sto do the shoppinghopping',
    ]
  },

  {
    title: "Year's plans",
    cards: [
      '1',
      '2',
      '3',
      '4',
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

