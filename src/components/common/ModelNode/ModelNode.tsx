type Props = {
  fields: any;
  comment?: string;
  name: string;
};

const ModelNode = ({ name, comment }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>{comment}</p>
    </div>
  );
};

export default ModelNode;
