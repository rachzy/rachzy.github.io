import { aboutRows, profile } from "./profile";

test("about rows keep the spec order and values", () => {
  expect(aboutRows.map((r) => r.label)).toEqual([
    "Birthday",
    "Working at",
    "Enrolled at",
    "Tech fields",
    "Based in",
    "Languages",
    "Interests",
    "Currently playing",
    "Currently reading",
    "Currently studying",
  ]);
  expect(aboutRows[0].value).toBe("February 25th");
  expect(aboutRows.filter((r) => r.groupStart).map((r) => r.label)).toEqual([
    "Interests",
  ]);
});

test("profile copy is verbatim", () => {
  expect(profile.note).toBe(
    "BYI: I'm not interested on internships / non-remote jobs; I hate audios; I hv mod/sev ADHD; I usually forget answering people"
  );
  expect(profile.tagline).toBe(
    "Software engineer, currently working in OT cybersecurity."
  );
  expect(profile.handle).toBe("rachzy");
  expect(profile.fullName).toBe("Henrique Ferreira");
});
