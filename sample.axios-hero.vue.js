export default {
  baseConfig: {
    baseURL: baseUrl(),
  },
  calls: [
    {
      method: "GET",
      url: "/login",
      data: {},
      params: {},
      p: {},
      name: "login",
    },
    {
      method: "GET",
      pattern: "app/{appId}/collection/{collectionId}/survey",
      data: {},
      p: [{ name: "appId" }, { name: "collectionId" }],
      url: "",
      params: {},
      name: "surveys",
    },
  ],
};

function baseUrl() {
  if (process.env.NODE_ENV === "production") {
    return "/api";
  } else {
    return "http://localhost:5000";
  }
}
