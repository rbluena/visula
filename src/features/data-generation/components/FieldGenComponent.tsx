import React from "react";
import { groupedOptions } from "@/data/seed/filter";
import { Select, Button } from "@/components/form";
import { ModelField } from "@/types";
import { Controller } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/outline";

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
      className="flex flex-col bg-slate-50 p-4 mb-2 border-y border-slate-200 max-w-[450px]"
    >
      <p className="text-lg font-semibold">{field.name}</p>
      <div className="flex items-baseline gap-4">
        <Controller
          control={control}
          name={`${field.fieldId}`}
          render={({ field }) => (
            <Select
              {...field}
              isClearable
              placeholder="Select type"
              required
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

        <Button
          type="button"
          variant="danger"
          modifier="outline"
          size="sm"
          onClick={() => removeField(field.id)}
        >
          <span id="" className="sr-only">
            Remove {field.name} from generating content
          </span>
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FieldGenComponent;
