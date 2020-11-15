const data = {
  all_post: [
    { id: 1, title: "Big win for DACA!", category: ['1','2'] },
    { id: 2, title: "Take their power away!", category: ['2','3'] },
  ],
  all_category: [
    { id: 1, name: "Activism" },
    { id: 2, name: "Politics" },
    { id: 3, name: "Nature" },
  ],
};

export default (state = data, action) => {
  switch (action.type) {
    case "POST_ADDED":
      return {
        ...state,
        all_post: [...state.all_post, action.post],
      };
    case "POST_UPDATE":
      var new_post = state.all_post.map(function(item) {
        if(item.id == action.post.id){
          return action.post
        }else{
          return item
        }
      })
      return {
        ...state,
        all_post: [...new_post],
      };
    case "POST_REMOVE":
      var new_post = state.all_post.filter(function(item) {
        return item.id != action.post.id;
      })
      return {
        ...state,
        all_post: [...new_post],
      };
    case "CATEGORY_ADDED":
      return {
        ...state,
        all_category: [...state.all_category, action.category],
      };
    case "CATEGORY_UPDATE":
      var new_cat = state.all_category.map(function(item) {
        if(item.id == action.category.id){
          return action.category
        }else{
          return item
        }
      })
      return {
        ...state,
        all_category: [...new_cat],
      };
    case "CATEGORY_REMOVE":
      var new_cat = state.all_category.filter(function(item) {
        return item.id != action.category.id;
      })
      return {
        ...state,
        all_category: [...new_cat],
      };
    default:
      return state;
  }
};
