import { ModelNode } from "@/components";
import type { Props as ModelComponentProps } from "@/components/common/ModelNode/ModelNode";

export default function getNodeComponent(props: ModelComponentProps) {
  return <ModelNode {...props} />;
}
