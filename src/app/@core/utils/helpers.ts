import { Subscription } from 'rxjs';

export const cleanUpSubscriptions = (subscriptions: Subscription[]) => {
  subscriptions.forEach((subscription) => {
    subscription.unsubscribe();
  });
};

function transformDate(date, key, timeArray) {
  let time;
  const newDate = new Date(date);
  let d;
  time = timeArray.includes(key)
    ? newDate.toLocaleTimeString([], { hour12: true })
    : '';
  d = newDate
    .toString()
    .split(' ')
    .slice(1, 4)
    .toString()
    .replace(',', ' ');

  return timeArray.includes(key) ? d.concat(', ' + time) : d.concat('');
}

export const formatDates = (obj, datesArray, timeArray: Array<string>) => {
  const newDates = datesArray.map((date) =>
    transformDate(obj[date], date, timeArray),
  );

  for (let i = 0; i < datesArray.length; i++) {
    obj[datesArray[i]] = newDates[i];
  }

  return obj;
};

export function paginate(event, service) {
  const { pageIndex, pageSize } = event;
  const currentParams = this[service].search.getValue();
  this[service].search.next({
    ...currentParams,
    page: pageIndex,
    size: pageSize,
  });
}

export function onCheck({ checked }, permission, service, checkedItems) {
  let data = this[service][checkedItems].getValue();
  checked
    ? data.push(permission)
    : (data = data.filter(
        (item) => item.creationDate !== permission.creationDate,
      ));
  this[service][checkedItems].next(data);
  data.length >= 1 ? this.checked.emit(true) : this.checked.emit(false);
}

export const setQueries = (
  queries: any,
  pageSize?: number,
  queryParams?: string,
) => {
  const dataBuffer = queryParams;
  Object.keys(queries).forEach((key) => {
    queryParams += `${key}=${queries[key]}&`;
  });
  const resp =
    dataBuffer === undefined
      ? queryParams
      : (queryParams += `size=${pageSize}`);

  return resp;
};

export const selectedFilter = (
  params: object,
  key: string,
  value?: string,
): object => {
  params = { ...params, [key]: value };
  if (!value || !value.toString().trim().length) {
    delete params[key];
  }

  return params;
};

/**
 * @method backupTestFunction
 * @description This method returns an object for testing purposes
 * @param {object} object
 * @param {string} key
 * @param {boolean} ifTest
 */
export const backupTestFunction = (object, key, ifTest) =>
  ifTest ? Object(object[key]) : object[key];

export const sortingDataAccessor = (item, property, ifTest = false) => {
  let newItem = {};
  if (property.includes('.')) {
    return property
      .split('.')
      .reduce((object, key) => backupTestFunction(object, key, ifTest), item);
  }
  item[property] = Date.parse(item[property])
    ? Date.parse(item[property])
    : item[property];
  newItem[property] = Number(item[property])
    ? Number(item[property])
    : item[property];
  if (typeof newItem[property] === 'string') {
    newItem[property] = newItem[property].toLowerCase();
  }

  return newItem[property] ? item[property] : newItem[property];
};

export const helperQueryParams = (filters, status, page, size) => {
  return filters
    ? `status=${status}${filters}&page=${page}&size=${size}`
    : `status=${status}&page=${page}&size=${size}`;
};

export const objectIsEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};

export const forLoopHelper = (searchValues, temp) => {
  for (const key of Object.keys(temp)) {
    temp[key] ? (searchValues[key] = temp[key]) : (temp[key] = temp[key]);
  }
};

/**
 * @method sortLogic
 * @description Returns a negative or positive integer for two compared arguments
 * @param {any} x - argument I
 * @param {any} y - argument II
 * @returns {number}
 */
export const sortLogic = (x: any, y: any): number => {
  return x < y ? 1 : -1;
};

/**
 * @method arrangeSortLogic
 * @description This method arranges the data array alphabetically
 * @param {array} data - array of strings
 * @returns {void}
 */
export const arrangeSortLogic = (data) => {
  return data.sort((a, b) => sortLogic(b.toLowerCase(), a.toLowerCase()));
};

/**
 * @method arrangeSortLogic
 * @description This method arranges the data array alphabetically
 * @param {array} data - array of strings
 * @returns {void}
 */
export const sortObjects = (data, objectProp) => {
  return data.sort((a, b) =>
    sortLogic(b[objectProp].toLowerCase(), a[objectProp].toLowerCase()),
  );
};

/**
 * @method cummulativeSum
 * @description Logic for calculating the sum of numbers in an array of objects
 * @param {array} data Array of object data
 * @param {string} objectProp String that matches object property
 */
export const cummulativeSum = (data: any, objectProp: string): number => {
  return data
    .map((input) => input[objectProp])
    .reduce((acc, value) => acc + value, 0);
};

/**
 * @method findConcatPercentage
 * @description Method that calculates the percentage of a commodity and appends it to a stringed value
 * @param {array} data Array of data
 * @param {object} values object with values to parse into the method
 * @property {string} name object key name
 * @property {string} value object data value
 * @property {number} sum cummulative sum of data
 * @returns {array} returns an array
 */
export const findConcatPercentage = (data, values) => {
  const { name, value, sum } = values;

  return data.map(
    (data) => `${data[name]} (${((data[value] / sum) * 100).toFixed(1)}%)`,
  );
};

/**
 * @method mapData
 * @description Method that creates a new array off an array of object
 * @param {array} data Array of data
 * @param {string} key object key to specify
 * @param {boolean} addComma toggles comma separators
 * @returns {array} returns an array
 */
export const mapData = (data, key, addComma) => {
  return addComma
    ? data.map((data) => data[key].toLocaleString())
    : data.map((data) => data[key]);
};

/**
 * @method cummulativeAverageSum
 * @description Method that sums up a given array number
 * @param {array}
 * @returns {void}
 */
export const cummulativeAverageSum = (data) => {
  return data.map((obj) => Number(obj)).reduce((acc, val) => acc + val, 0);
};

/**
 * @method dividData
 * @description Method that performs a division on array object values
 * @param {array} data array of object
 * @param {object} propName object of string property similar to the name of the component property
 * @returns {void}
 */
export const divideData = (data, propName) => {
  const { objectProp1, objectProp2 } = propName;

  return data.map((data) =>
    (Number(data[objectProp1]) / Number(data[objectProp2])).toFixed(1),
  );
};

export const arrayStringToObject = (array: string[], key: string) => {
  const result = [];
  array.forEach((value: string) => {
    if (value.trim()) {
      result.push({ [key]: value });
    }
  });

  return result;
};

export const cleanInput = (data, key) => {
  return data[key] || '';
};

/**
 * Adds a plus '+' to the beginning to the farmer's msisdn or secondaryMsisdn if there is no plus already.
 */
export const formatReturnedMsisdnNumbers = (data) => {
  Object.keys(data).forEach((key) => {
    if ((key === 'msisdn' || key === 'secondaryMsisdn') && data[key]) {
      data[key] =
        data[key].charAt(0) === '+' ? data[key] : `+${data[key].trim()}`;
    }
  });

  return data;
};
/**
  * filter function to ensure that autocomplete words
  * @param value search term
  * @param options the search object
  * @param key the key to filter by
  */
export const filter = (value: string, options: any[], key: string): string[] => {
  const filterValue = value.toLowerCase();
  return options.filter((option: any) =>
    option[key].toLowerCase().includes(filterValue),
  );
};
