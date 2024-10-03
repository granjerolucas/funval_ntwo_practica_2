export const getRequest = (url) => {
  const ctr = new AbortController();
  let req = fetch(url, { signal: ctr.signal });
  return {
    action: req.then((res) => res.json()),
    cancel: () => {
      try {
        if (req) ctr.abort("CancelRequest");
      } catch (error) {
        throw new Error("");
      }
    },
  };
};
