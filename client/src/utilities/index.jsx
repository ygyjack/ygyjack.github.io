

class Utility {

  // SORT ORDER
  sortOrder = (arr, type, key, order = 'asc') => {
    if (type == 'num') {
      return (order == 'desc') ?
        arr.sort(function(a, b) {
          return b[key] - a[key];
        }) :
        arr.sort(function(a, b) {
          return a[key] - b[key];
        });
    }
    if (type == 'txt') {
      return (order == 'desc') ?
        arr.sort(function(a, b) {
          var x = !!a[key] ? a[key].toLowerCase() : "";
          var y = !!b[key] ? b[key].toLowerCase() : "";
          return (x == y) ? 0 : (x < y ? 1 : -1);
        }) :
        arr.sort(function(a, b) {
          var x = !!a[key] ? a[key].toLowerCase() : "";
          var y = !!b[key] ? b[key].toLowerCase() : "";
          return (x == y) ? 0 : (x > y ? 1 : -1);
        });
    }
    if (type == 'dat') {
      return (order == 'desc') ?
        arr.sort(function(a, b) {
          return Date.parse(b[key]) - Date.parse(a[key]);
        }) :
        arr.sort(function(a, b) {
          return Date.parse(a[key]) - Date.parse(b[key]);
        });
    }
  }

  url_base64_decode = str => {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }


}

export default new Utility();
