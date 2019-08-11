export default {
  addCard: (columnIndex, text) => ({
    type: 'CARDS:ADD',
    payload: {
      columnIndex,
      text
    }
  }),

  removeCard: (columnIndex, cardIndex) => ({
    type: 'CARDS:REMOVE',
    payload: {
      columnIndex,
      cardIndex
    }
  }),

  reorderCards: ({sourceColumnId, destinationColumnId, sourceIndex, destinationIndex}) => ({
    type: 'CARDS:REORDER',
    payload: {
      sourceIndex,
      destinationIndex,
      sourceColumnId,
      destinationColumnId 
    }
  })
}


