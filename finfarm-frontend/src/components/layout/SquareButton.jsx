import PropTypes from 'prop-types';
SquareButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SquareButton({ children }) {
  return (
    <button className="btn btn-square h-44 w-44 bg-lime-500 font-hopang text-3xl text-white hover:bg-lime-800">
      {children}
    </button>
  );
}
