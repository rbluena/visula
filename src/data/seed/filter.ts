export const options = {
  random: [
    {
      label: "Random",
      options: [
        { label: "Word", value: "word" },
        { label: "Sentence", value: "sentence" },
        { label: "Paragraph", value: "paragraph" },
      ],
    },
  ],
  occupation: [
    {
      label: "Occupation",
      options: [
        { label: "Job title", value: "person.jobTitle" },
        { label: "Job type", value: "person.jobType" },
        { label: "Job description", value: "person.jobDescriptor" },
        { label: "Bio", value: "person.bios" },
      ],
    },
  ],
  person: [
    {
      label: "Person",
      options: [
        { label: "First name", value: "person.firstName" },
        { label: "Last name", value: "person.lastName" },
        { label: "Middle name", value: "person.middleName" },
        { label: "Full name", value: "person.fullName" },
        { label: "Prefix", value: "person.prefix" },
        { label: "Age", value: "age" },
        { label: "Gender", value: "person.gender" },
      ],
    },
  ],
  location: [
    {
      label: "Location",
      options: [
        { label: "Address", value: "location.address" },
        { label: "Country", value: "location.country" },
        { label: "City", value: "location.city" },
        { label: "State", value: "location.state" },
        { label: "Street", value: "location.street" },
        { label: "Zip code", value: "location.zipCode" },
        { label: "Latitude", value: "location.latitude" },
        { label: "Longitude", value: "location.langitude" },
      ],
    },
  ],
  date: [
    {
      label: "Date",
      options: [{ label: "Date", value: "date.anytime" }],
    },
  ],
  boolean: [
    { label: "Boolean", options: [{ label: "True/False", value: "boolean" }] },
  ],
  object: [{ label: "Object", options: [] }],
};

export const groupedOptions = [
  ...options.random,
  ...options.occupation,
  ...options.date,
  ...options.location,
  ...options.boolean,
];
