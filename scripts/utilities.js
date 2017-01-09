function forEach(array, callback_func) {
    
    for(var i=0; i< array.length; i++) {
        callback_func(array[i]);
    }
    
}