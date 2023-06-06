import React from "react";
import { groupedOptions } from "@/data/seed/filter";
import { Select, Button } from "@/components/form";
import { ModelField } from "@/types";
import { Controller } from "react-hook-form";

type Props = {
  field: ModelField;
  modelId: string;
  control: any;
  register: any;
  removeField: Function;
};

const FieldGenComponent = ({ field, control, removeField }: Props) => {
  if (field.relation) {
    // TODO: Apply relation dummy data generation
    return null;
  }

  return (
    <div
      key={field.id}
      className="flex flex-col bg-indigo-50 py-4 px-4 mb-2 max-w-[450px]"
    >
      <p className="text-lg font-semibold">{field.name}</p>
      <div className="flex gap-4">
        <Controller
          control={control}
          name={`${field.fieldId}`}
          render={({ field }) => (
            <Select
              {...field}
              isClearable
              placeholder="Select type"
              options={groupedOptions}
            />
          )}
        />

        {/* <div className="flex flex-col">
          <div className="flex gap-2">
            <Select
              label="Options"
              options={[
                { label: "Min", value: 0 },
                { label: "Max", value: 45 },
              ]}
              placeholder=""
            />
            <Select label="Something" />
          </div>

          <div>
            <Select
              label="Options"
              options={[
                { label: "Min", value: 0 },
                { label: "Max", value: 45 },
              ]}
              placeholder=""
            />
          </div>

          <Button>Add constraint</Button>
        </div> */}

        <Button type="button" onClick={() => removeField(field.id)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default FieldGenComponent;
