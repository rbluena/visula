import { ModelNode } from "@/components";

// const nodesComponents = {
//   ModelNode,
//   // Field,
// };

export default function getNodeComponent(
  _: "model" | "field",
  props: { comment?: string; fields: any; name: string }
) {
  // console.log(nodesComponents);
  // const Component = nodesComponents["ModelNode"];

  return <ModelNode {...props} />;
}
