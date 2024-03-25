import PropTypes from 'prop-types';

Ad.propTypes = {
  color: PropTypes.string,
  eventType: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  adImage: PropTypes.string,
};

export default function Ad({ color, eventType, title, content, adImage }) {
  return (
    <div
      className={`flex w-full items-center justify-evenly rounded-lg ${color} h-80 px-48`}
    >
      <div className="pr-72">
        <div className="mb-10">
          <i className="rounded-sm border-2 border-solid border-gray-300 bg-white p-1 not-italic text-gray-500">
            {eventType}
          </i>
        </div>
        <div>
          <p className="mt-50 mb-3 whitespace-normal break-keep font-hopang text-5xl">
            {title}
          </p>
          <span className="whitespace-normal break-keep">{content}</span>
        </div>
      </div>
      <div>
        <img src={adImage} alt="광고 이미지" className="h-full max-h-72" />
      </div>
    </div>
  );
}
