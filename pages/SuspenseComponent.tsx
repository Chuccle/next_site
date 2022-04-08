
export default function SuspenseComponent() {


// we define two variables, one holding data, and one holding a value if the promise
//was resolved
let myData = {};
let promise = {};
// our React component which will be rendered inside Suspense boundaries
const SuspenseComponent = ({ value:any }) => {
  //our method which will be fired when we call the component
  const waitForData = () => {
    //if data already there, we return it and render is done, if not the Spinner is spinning
    if (myData[value] !== undefined) return myData[value];
    // an array to remember already computed values
    if (!promise[value])
      promise[value] = fetch(
        "https://jsonplaceholder.typicode.com/todos/" + `${value}`
      )
        .then((res) => res.json())
        .then((d) => (myData[value] = d));
    // we can also throw a new Promise with rejection like below
    // throw new Promise((undefined,rej)=>rej())
    throw promise[value];
  };

  const data = waitForData();
  // we fill in what is returned from the typicode API, if no data returned we display
  // a fixed message
  return (
    <div className="w-full flex justify-center items-center h-screen">
      {data.title || "Hello Ali"}
    </div>
  );
};
}