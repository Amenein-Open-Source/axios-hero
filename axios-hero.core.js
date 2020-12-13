class AxiosHero {
  constructor(baseURL, headers) {
    const baseConfig = {
      baseURL,
      headers,
    };
    this.mainAxiosInstance = axios.create(baseConfig);
    this.Calls = {};
  }

  makeRequest(n, p) {
    this.Calls[n].data = p.data;
    this.Calls[n].p = p.p;
    this.Calls[n].url = this.Calls[n].url.replace("{id}", p.p["id"]);
    return this.mainAxiosInstance(this.Calls[n]);
  }

  makeNewEndpoint(call) {
    this.Calls[call.name] = call;
  }

  makeMultiEndpoints(calls) {
    calls.forEach((call) => {
      this.Calls[call.name] = call;
    });
    console.log(this.Calls);
  }
}

class CRUDHero {
  constructor() {
    this.Models = {};
  }

  setModel(name, model) {
    this.Models[name] = model;
  }

  setMultiModel(models) {
    for (let name in models) {
      this.Models[name] = models[name];
    }
  }

  crudHeroTable(targetID, model, payload) {
    const holder = document.getElementById(targetID);
    let table = document.createElement("table");
    let htable = document.createElement("thead");
    table.appendChild(htable);
    for (var el in models[model]) {
      let ehtable = document.createElement("th");
      ehtable.innerHTML = models[model][el].label;
      htable.appendChild(ehtable);
    }
    payload.forEach((p) => {
      let trow = document.createElement("tr");
      table.appendChild(trow);
      for (var el in p) {
        if (el != "id") {
          let rtable = document.createElement("td");
          rtable.innerHTML = p[el];
          trow.appendChild(rtable);
        }
      }
    });
    holder.appendChild(table);
  }

  crudHeroForm(targetID, model) {
    const holder = document.getElementById(targetID);
    console.log(holder);
    let form = document.createElement("form");
    for (var el in models[model]) {
      let label = document.createElement("label");
      let element = document.createElement("input");
      label.innerHTML = models[model][el].label;
      element.placeholder = models[model][el].label;
      element.setAttribute("type", models[model][el].type);
      form.appendChild(label);
      form.appendChild(element);
    }
    holder.appendChild(form);
  }
}

// ================Exmaple================
const axHero = new AxiosHero("https://jsonplaceholder.typicode.com", {
  "X-MAN": "XMannss",
});

axHero.makeNewEndpoint({
  method: "POST",
  url: "posts/{id}/comments",
  data: {},
  params: {},
  p: {},
  name: "login",
});

axHero.makeMultiEndpoints([
  {
    method: "GET",
    url: "posts/{id}/comments",
    data: {},
    params: {},
    p: {},
    name: "login",
  },
]);

const axCRUD = new CRUDHero();
const models = {
  comment: {
    postId: {
      label: "PostId",
      type: "text",
    },
    email: {
      label: "Email",
      type: "text",
    },
    body: {
      label: "Comment",
      type: "text",
    },
    name: {
      label: "Writer",
      type: "text",
    },
  },
};
axCRUD.setMultiModel(models);

axHero
  .makeRequest("login", {
    data: {
      dan: "dan",
    },
    p: {
      id: "2",
    },
  })
  .then((res) => {
    console.log(res.data);

    axCRUD.crudHeroTable("holder", "comment", res.data);
  });
axCRUD.crudHeroForm("holder", "comment");
