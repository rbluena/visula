export const options = {
  random: [
    {
      label: "Random",
      options: [
        { label: "Word", value: "lorem.word" },
        { label: "Sentence", value: "lorem.sentence" },
        { label: "Paragraphs", value: "lorem.paragraphs" },
        { label: "Slug", value: "lorem.slug" },
      ],
    },
  ],
  number: [
    {
      label: "Number",
      options: [
        { label: "Integer", value: "number.int" },
        { label: "Decimal", value: "number.float" },
        { label: "Binary", value: 'number.binary.{ "min": 0, "max": 65535 }' },
        { label: "Phone", value: "phone.number" },
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
        { label: "Bio", value: "person.bio" },
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
        { label: "Age", value: 'number.int.{"min": 5, "max": 100}' },
        { label: "Gender", value: "person.sex" },
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
        { label: "Longitude", value: "location.longitude" },
        { label: "Coordinates", value: "coordinates" },
      ],
    },
  ],
  date: [
    {
      label: "Date",
      options: [
        { label: "Date", value: "date.anytime" },
        { label: "Month", value: "date.month" },
      ],
    },
  ],
  internet: [
    {
      label: "Internet",
      options: [
        { label: "Email", value: "internet.email" },
        { label: "URL", value: "internet.url" },
        { label: "IP", value: "internet.ipv4" },
      ],
    },
  ],
  commerce: [
    {
      label: "Commerce",
      options: [
        { label: "Product", value: "commerce.product" },
        { label: "Price", value: "commerce.price" },
      ],
    },
  ],
  boolean: [
    { label: "Boolean", options: [{ label: "True/False", value: "boolean" }] },
  ],
  // object: [{ label: "Object", options: [] }],
};

export const groupedOptions = [
  ...options.random,
  ...options.number,
  ...options.person,
  ...options.occupation,
  ...options.date,
  ...options.internet,
  ...options.location,
  ...options.commerce,
  ...options.boolean,
];
