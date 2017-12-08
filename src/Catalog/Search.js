import chocolateBars from '../chocolate-bars.json';

export function Search(query, dataset = chocolateBars)  {
  let results = [];
  for (let bar in dataset) {
    if (query.includes(dataset[bar].fields.cocoa_percent)) {
      results.push(dataset[bar]);
    } else if (dataset[bar].fields.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      results.push(dataset[bar]);
    } else if (dataset[bar].fields.company.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      results.push(dataset[bar]);
    }
  }
  return results;
}

export default Search;
