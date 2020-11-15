export const CategoryAdded = (requestData) => {
  return (dispatch) => {
    dispatch(Watch_CategoryAdded(requestData));
    return requestData;
  };
};

export const Watch_CategoryAdded = category =>({
    type:'CATEGORY_ADDED',
    category
})

export const CategoryUpdate = (requestData) => {
    return (dispatch) => {
      dispatch(Watch_CategoryUpdate(requestData));
      return requestData;
    };
  };
  
  export const Watch_CategoryUpdate = category =>({
      type:'CATEGORY_UPDATE',
      category
  })

  export const CategoryDelete = (requestData) => {
    return (dispatch) => {
      dispatch(Watch_CategoryDelete(requestData));
      return requestData;
    };
  };
  
  export const Watch_CategoryDelete = category =>({
      type:'CATEGORY_REMOVE',
      category
  })

  export const PostAdded = (requestData) => {
      console.log('requestData', requestData)
    return (dispatch) => {
      dispatch(Watch_PostAdded(requestData));
      return requestData;
    };
  };
  
  export const Watch_PostAdded = post =>({
      type:'POST_ADDED',
      post
  })
  
  export const PostUpdate = (requestData) => {
      return (dispatch) => {
        dispatch(Watch_PostUpdate(requestData));
        return requestData;
      };
    };
    
    export const Watch_PostUpdate = post =>({
        type:'POST_UPDATE',
        post
    })
  
    export const PostDelete = (requestData) => {
      return (dispatch) => {
        dispatch(Watch_PostDelete(requestData));
        return requestData;
      };
    };
    
    export const Watch_PostDelete = post =>({
        type:'POST_REMOVE',
        post
    })
  
