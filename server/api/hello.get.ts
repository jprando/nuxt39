export default defineEventHandler((event) => {
  return {
    valor: "Hello hello",
    reqUrl: event.node.req.url,
  };
});
