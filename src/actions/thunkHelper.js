let tryLoad = (loadFunction, loadAction, recieveAction, rejectAction) => {
  return async function(dispatch, getState) {
    dispatch(loadAction());
    try {
        let data = await loadFunction();
        dispatch(recieveAction(data));
    }
    catch(error){
      console.log("Error in thunk helper " + error.message);
      dispatch(rejectAction());
    }
  }
};

export {tryLoad};
