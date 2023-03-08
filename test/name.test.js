import { expect, test, describe } from "vitest";

const {
  random,
  convertICStoJSON,
  findDate,
  randomWord,
} = require("../commands/name");

describe("Test command name module", () => {
  test("Random number between range", () => {
    const res = expect(random(1, 5));
    res.toBeGreaterThanOrEqual(1);
    res.toBeLessThanOrEqual(5);
  });

  test("Convert ICS to JSON", async () => {
    const res = await convertICStoJSON();
    expect(res).toBeInstanceOf(Array);
  });

  test("Find today in ics array", async () => {
    const res = await convertICStoJSON();
    const course = findDate(res);
    expect(course).toBeInstanceOf(Object);
    expect(course.summary).not.toBeUndefined();
  });

  test("Fetch random word from course summary", async () => {
    const mockedObject = {
      summary: "CONFERENCE",
      description: "",
      startDate: "20230407T134500",
      endDate: "20230407T171500",
      location: "Salle 12",
    };

    const res = await randomWord(mockedObject);
    expect(res).toBeTypeOf("string");
  });
});
