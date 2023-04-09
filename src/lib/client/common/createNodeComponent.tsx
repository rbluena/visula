import { ModelNode } from "@/components";
import type { Props as ModelComponentProps } from "@/components/common/ModelNode/ModelNode";

// const nodesComponents = {
//   ModelNode,
//   // Field,
// };

export default function getNodeComponent(
  _: "model",
  props: ModelComponentProps
) {
  // console.log(nodesComponents);
  // const Component = nodesComponents["ModelNode"];

  return <ModelNode {...props} />;
}
