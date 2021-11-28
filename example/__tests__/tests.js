const request = require("supertest");
const App = require("../app");

describe("Scenario 1", () => {
  const app = new App();
  const server = app.httpServer;

  afterAll(() => {
    app.stop();
  });

  const personModel = {
    name: "John",
    age: 34,
    hobbies: ["none"],
  };
  const updatedPersonModel = {
    name: "John",
    age: 35,
    hobbies: ["guitar", "piano"],
  };
  let personId;

  it("get all persons should return empty array", async () => {
    const response = await request(server).get("/person");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("post person should create new person", async () => {
    const response = await request(server).post("/person").send(personModel);
    const { id } = response.body;
    personId = id;

    expect(response.statusCode).toBe(200);
    expect(id).toBeDefined();
  });

  it("get person by id should return valid person", async () => {
    const response = await request(server).get(`/person/${personId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: personId, ...personModel });
  });

  it("put person by id should update that person", async () => {
    const response = await request(server)
      .put(`/person/${personId}`)
      .send(updatedPersonModel);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: personId, ...updatedPersonModel });
  });

  it("delete person should delete the person", async () => {
    const response = await request(server).delete(`/person/${personId}`);

    expect(response.statusCode).toBe(204);
  });

  it("get person by id should return not found code", async () => {
    const response = await request(server).get(`/person/${personId}`);

    expect(response.statusCode).toBe(404);
  });
});

describe("Scenario 2", () => {
  const app = new App();
  const server = app.httpServer;

  afterAll(() => {
    app.stop();
  });

  const personModel = {
    name: "John",
    age: 34,
    hobbies: [],
  };
  const personModelWithoutName = {
    age: 35,
    hobbies: ["guitar", "piano"],
  };
  const personModelWithoutAge = {
    name: "John",
    hobbies: ["guitar", "piano"],
  };
  const personModelWithoutHobbies = {
    name: "John",
    age: 35,
  };
  let personId;

  it("post person should return validation error if required fields are missing", async () => {
    const response = await request(server)
      .post("/person")
      .send(personModelWithoutName);
    expect(response.statusCode).toBe(400);
  });

  it("post person with valid model should create new person ", async () => {
    const response = await request(server).post("/person").send(personModel);
    const { id } = response.body;
    personId = id;
    expect(response.statusCode).toBe(200);
    expect(id).toBeDefined();
  });

  it("put person should return validation error if required name field is missing", async () => {
    const response = await request(server)
      .put(`/person/${personId}`)
      .send(personModelWithoutName);
    expect(response.statusCode).toBe(400);
  });

  it("put person should return validation error if required hobbies field is missing", async () => {
    const response = await request(server)
      .put(`/person/${personId}`)
      .send(personModelWithoutHobbies);
    expect(response.statusCode).toBe(400);
  });

  it("put person should return validation error if required age field is missing", async () => {
    const response = await request(server)
      .put(`/person/${personId}`)
      .send(personModelWithoutAge);
    expect(response.statusCode).toBe(400);
  });

  it("get all persons should return array with one valid person", async () => {
    const response = await request(server).get("/person");
    const data = response.body;

    expect(response.statusCode).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0]).toEqual({ id: personId, ...personModel });
  });
});

describe("Scenario 3", () => {
  const app = new App();
  const server = app.httpServer;

  afterAll(() => {
    app.stop();
  });

  const personModelArray = [
    {
      name: "John",
      age: 34,
      hobbies: ["none"],
    },
    {
      name: "Jack",
      age: 12,
      hobbies: [],
    },
    {
      name: "User",
      age: 45,
      hobbies: ["dotenv", "expect"],
    },
  ];
  const personModelIdArray = [];

  it("post all persons should return 200 for each person in array", async () => {
    for await (const personModel of personModelArray) {
      const response = await request(server).post("/person").send(personModel);
      const { id } = response.body;
      personModelIdArray.push(id);

      expect(response.statusCode).toBe(200);
    }
  });

  it("get all persons should return array of persons with valid models", async () => {
    const response = await request(server).get("/person");
    const data = response.body;

    expect(response.statusCode).toBe(200);
    expect(data.length).toBe(3);
    data.forEach((person, idx) => {
      expect(person).toEqual({
        id: personModelIdArray[idx],
        ...personModelArray[idx],
      });
    });
  });

  it("delete first person should return 204", async () => {
    const response = await request(server).delete(
      `/person/${personModelIdArray[0]}`
    );
    expect(response.statusCode).toBe(204);
  });

  it("get all persons should return array of persons without first person", async () => {
    const response = await request(server).get("/person");
    const data = response.body;

    expect(response.statusCode).toBe(200);
    expect(data.length).toBe(2);
    data.forEach((person, idx) => {
      expect(person).toEqual({
        id: personModelIdArray[idx + 1],
        ...personModelArray[idx + 1],
      });
    });
  });
});
