const sortBabies = (babies, sortOrder) => {
  let sortedBabies = null;
  switch(sortOrder){
    case 'name':
      sortedBabies = [...babies].sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return sortedBabies;
    case 'time':
      sortedBabies = [...babies].sort(function(a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      return sortedBabies;
    case 'length':
      sortedBabies = [...babies].sort(function(a, b) {
        if (a.name.length === b.name.length) return 0;
        if (a.name.length < b.name.length) return 1;
        return -1;
      });
      return sortedBabies;
    default:
      return babies;
  }
}

export default sortBabies;