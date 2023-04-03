type Props = {
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  return <div className={`${showEditor ? "" : "hidden"}`}>NodeEditor</div>;
};

export default NodeEditor;
