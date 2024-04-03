export default function HarvestModal({ onClose, onConfirm }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1000,
      }}
    >
      <p className="text-7xl">수확하시겠습니까?</p>
      <p className="text-2xl text-cyan-300" onClick={onConfirm}>
        예
      </p>
      <br />
      <p className="text-2xl" onClick={onClose}>
        아니오
      </p>
    </div>
  );
}
