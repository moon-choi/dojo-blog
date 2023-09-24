import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { //this function fires every render
    // console.log('use effect ran')
    const abortConst = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortConst.signal }) //once we find the data back,
        .then(res => { //response
          // console.log(res)
          if (!res.ok) {
            throw Error('could not fetch the data for that resource')
          }
          return res.json();
        })
        .then((myData) => {
          setData(myData);
          setIsPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          }
          setError(err.message)
          setIsPending(false);
        })

      return () => {
        console.log('cleanup')
        abortConst.abort(); // it will pause the fetch. 
      }
    }, 200);
  }, [url]) //empty array: only run it on initial render

  return {
    data,
    isPending,
    error
  }
}

export default useFetch;