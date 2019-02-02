// Ideal scenario:
// Checks to see if the key inside of the initialState
// if exists, it re-assigns to the state with Object.assign
// If fails, returns an updated object with a newData key for that formData

// Shallow data structure:
// e.g.
// const initialState = {
//   formData: {
//     ...formKey: {
//       ...formKey
//     }
//   }

//   calculatorData: {
//     ...calculatorKey: {
//       ...calcData
//     }
//   }
// }



const previous =
{
  hi: [{ 123: 'magic' }],
  hello: [{ 1: '456' }]
};

const newData = { 2: 456 };


const d = (data, initialState, key) => {
  if (Object.keys(initialState).includes(key)) {
    return Object.assign({}, initialState, {
      [key]: [...initialState[key], data]
    })
  };

  return Object.assign({}, initialState, { [key]: [data] });
};

const res = d(newData, previous, 'no');

console.log(JSON.stringify(res, null, 2));