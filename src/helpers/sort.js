const sortBabies = (babies, sortOrder, sortAsc) => {
  let sortedBabies = null;
  switch(sortOrder){
    case 'name':
      if (sortAsc[0]){
        sortedBabies = [...babies].sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
      } else {
        sortedBabies = [...babies].sort(function(a, b) {
          return b.name.localeCompare(a.name);
        });
      }
      sortAsc = [!sortAsc[0], true, true];
      return [sortedBabies, sortAsc];
    case 'time':
      if (sortAsc[1]){
        sortedBabies = [...babies].sort(function(a, b) {
          return new Date(a.created_at) - new Date(b.created_at);
        });
      } else {
        sortedBabies = [...babies].sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      }
      sortAsc = [true, !sortAsc[1], true];
      return [sortedBabies, sortAsc];
    case 'length':
      if (sortAsc[2]){
        sortedBabies = [...babies].sort(function(a, b) {
          if (a.name.length === b.name.length) return 0;
          if (a.name.length < b.name.length) return -1;
          return 1;
        });
      } else {
        sortedBabies = [...babies].sort(function(a, b) {
          if (a.name.length === b.name.length) return 0;
          if (a.name.length < b.name.length) return 1;
          return -1;
        });
      }
      sortAsc = [true, true,!sortAsc[2]];
      return [sortedBabies, sortAsc];
    default:
      return babies;
  }
}

export default sortBabies;