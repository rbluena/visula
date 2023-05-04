import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@heroicons/react/24/outline";

type ConnModel = {
  id: string;
  unique: string;
  name: string;
};

type Props = {
  children: React.ReactNode;
  connectingModels: ConnModel[];
  value: string;
  onSelectingModel: (value: string) => void;
};

const RelationDropdown = ({
  children,
  onSelectingModel,
  value,
  connectingModels,
}: Props) => {
  return (
    <DropdownMenu.Root>
      {children}

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[220px] py-4 bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <p className="text-sm text-slate-500 pl-[15px] pb-4">Relation</p>

          {connectingModels.map((model) => (
            <DropdownMenu.Item key={model.id}>
              <DropdownMenu.RadioGroup
                value={value}
                onValueChange={onSelectingModel}
              >
                <DropdownMenu.RadioItem
                  value={model.id}
                  className="group text-[13px] leading-none text-violet-800 rounded-[3px] flex items-center h-[25px] px-[5px] hover:bg-violet-700 hover:text-white relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-white"
                >
                  <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    {model.id === value ? (
                      <CheckIcon className="w-[16px] h-[16px]" />
                    ) : null}
                  </DropdownMenu.ItemIndicator>

                  {model.name}
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default RelationDropdown;
