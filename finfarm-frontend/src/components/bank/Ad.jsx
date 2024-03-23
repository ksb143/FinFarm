export default function Ad({ color, eventType, title, content, adImage }) {
  return (
    <div
      className={`flex w-full items-center justify-evenly rounded-lg ${color}`}
    >
      <div>
        <div className="mb-10">
          <i className="rounded-sm border-2 border-solid border-gray-300 bg-white p-1 not-italic text-gray-500">
            {eventType}
          </i>
        </div>
        <div>
          <p className="mt-50 mb-3 font-hopang text-5xl">{title}</p>
          <span>{content}</span>
        </div>
      </div>
      <div>
        <img src={adImage} alt="광고 이미지" />
      </div>
    </div>
  );
}
