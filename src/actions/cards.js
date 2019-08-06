export default {
  addCard: (columnIndex, text) => ({
    type: 'CARDS:ADD',
    payload: {
      columnIndex,
      text
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


