type ContentfulConfig = {
  spaceId: string;
  environmentId: string;
  queryEntries?: "sys.id[in]=3exn9898fkffff,658cxwod598823";
};

type ContentfulField = {
  id: string;
  name: string;
  required: boolean;
  localized: boolean;
  type: string;
};

type ContentfulModel = {
  name: string;
  fields: ContentfulField[];
};
