export default function ProfileImageModal({
  show,
  onClose,
  onConfirm,
  imageSrc,
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-xl border-2 border-gray-300 bg-white px-24 py-10">
      <img
        src={imageSrc}
        alt="Profile Preview"
        className="h-28 w-28 rounded-full object-cover"
      />
      <p className="my-4">정말 프로필 사진을 수정하시겠습니까?</p>
      <div className="flex w-full justify-evenly">
        <button
          className="rounded-full bg-blue-600 px-5 py-1 text-white"
          onClick={onConfirm}
        >
          확인
        </button>
        <button
          className="rounded-full bg-red-600 px-5 py-1 text-white"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
}
