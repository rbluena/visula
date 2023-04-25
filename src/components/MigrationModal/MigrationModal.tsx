import Modal from "@/components/common/Modal";
import { useGlobalStore } from "@/lib/client/store/global";

const MigrationModal = () => {
  const { isMigrationModalOpen, setMigrationModal } = useGlobalStore(
    (state) => state
  );

  return (
    <Modal isOpen={isMigrationModalOpen} setIsOpen={setMigrationModal}>
      <div>
        <h2>This is migration modal</h2>
      </div>
    </Modal>
  );
};

export default MigrationModal;
