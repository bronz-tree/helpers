/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                                                                         //
//                           array utility functions                      //
//                                                                         //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

//utilty functions used on arrays
//-------------------------------


//function that splits an array into several parts determined by totalPartsNumber, and returns a single part
exports.arraysplitting = function (myArray,Requiredpart, totalPartsNumber) {
  var chunk_size = myArray.length / totalPartsNumber;
  var index = 0;
  var arrayLength = myArray.length;
  var returnDevidedArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      returnDevidedArray.push(myChunk);
  }
  return returnDevidedArray[Requiredpart];
};

//function used to either sort an array in a doc by 2 parameters, or sort an array if no field was injected
// returns sorted doc or array respectively
exports.sortByTwoParameters = function (doc,field,sortHigh,sortLow) {
  if(field) doc[field] = arraySort(doc[field],sortHigh,sortLow);
  if(!field) doc = arraySort(doc,sortHigh,sortLow);

  return doc;
};


//functiuon that sorts array by 2 arguments. one has a higher sort priority.
//first by highPriorityField then by lowPriorityField
function arraySort(array,highPriorityField,lowPriorityField){
    array.sort(function(a,b){
      if(a[highPriorityField] < b[highPriorityField]) return -1;
      if(a[highPriorityField] > b[highPriorityField]) return 1;
      if(a[lowPriorityField]  < b[lowPriorityField])  return 1;
      if(a[lowPriorityField]  > b[lowPriorityField])  return -1;
      return 0;
    });

    return array;
}
