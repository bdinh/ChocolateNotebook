import chocolateBars from '../chocolate-bars.json';

export function Search(query)  {
  let results = [];
  for (let bar in chocolateBars) {
    if (query.includes(chocolateBars[bar].fields.cocoa_percent)) {
      results.push(chocolateBars[bar]);
    } else if (chocolateBars[bar].fields.name.toLocaleLowerCase() === query.toLocaleLowerCase()) {
      results.push(chocolateBars[bar]);
    } else if (chocolateBars[bar].fields.company.toLocaleLowerCase() === query.toLocaleLowerCase()) {
      results.push(chocolateBars[bar]);
    }
  }
  return results;
}

export default Search;
