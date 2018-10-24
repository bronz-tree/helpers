/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//                                                                         //
//                           strings utility functions                      //
//                                                                         //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

//utilty functions used on strings
//--------------------------------


const levenshtein = require('fast-levenshtein');

//function that trims string containing numbers, eliminating zeroes in the start of the string.
// caution: unstable in very large numbers.
exports.cleanZeroesFromString = function (str) {
    str = Number(str).toString();
    return str
};


//checks a couple of strings if there is a similarity between them
//similarity: if one fully contains another , or if there is only single letter diffrence
exports.similarityCheck = function (firstStr,secondStr) {

  let ret = false; //by default returns false if split didnt happened
  if(!firstStr || !secondStr){return ret}

    //check if the first contains fully the second or the second contains the first
    let strContained = (firstStr.includes(secondStr)) || (secondStr.includes(firstStr));

    //check if the strings are diffrent in more then one character
    let firstNameDistance =(older.firstName && newer.firstName) ? levenshtein.get(older.firstName, newer.firstName) : false;
    let lastNameDistance = (older.lastName && newer.lastName) ? levenshtein.get(older.lastName, newer.lastName) : false;

    if(!firstNameContained && (older.firstName != newer.firstName) && (firstNameDistance >1)){
      ret = true;
    }
    if(!lastNameContained && (older.lastName != newer.lastName) && (lastNameDistance >1)){
      ret = true;
    }

  return ret;

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

//function that handles mergers and replaces them with data from document(doc) profile
//example:  const mergers = { '{{שם-פרטי}}': 'firstName', 	'{{שם-משפחה}}': 'lastName', '{{ישוב}}': 'city', '{{שכונה}}': 'neighbourhood' }
exports.replaceMergersWithVoterContent = function(UnlayerContent,doc,mergers){
    let ret;
    let re = new RegExp(Object.keys(mergers).join("|"),"gi");
    ret = UnlayerContent.replace(re, function(matched){
        return doc[mergers[matched]]||defaultMergers[matched];
        });
    return ret;
},
