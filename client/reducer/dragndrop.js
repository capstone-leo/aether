const initialState = [];

const HOVER_HIGHLIGHT = 'HOVER_HIGHLIGHT'
// const IS_DRAGGING = 'IS_DRAGGING';
// const DROP = 'DROP';

export const hoverHighlight = (hoverEvent) => {
    type: HOVER_HIGHLIGHT,
    hoverEvent
}
// export const isDragging = (dragEvent) => ({
//   type: IS_DRAGGING,
//   dragEvent,
// });

// export const drop = (dropEvent) => {
//   return {
//     type: DROP,
//     dropEvent,
//   };
// };

export default (state = initialState, action) => {
  switch (action.type) {
    case HOVER_HIGHLIGHT: 
    return [...state, action.hoverEvent]
    // case IS_DRAGGING:
    //   return [...state, action.dragEvent]
    // case DROP:
    //   return [...state, action.dropEvent];
    
    default:
      return state;
  }
};
