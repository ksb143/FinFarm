import PropTypes from 'prop-types';
SquareButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SquareButton({ children }) {
  return (
    <button className="btn btn-square bg-lime-500 hover:bg-lime-800 font-hopang text-white w-44 h-44 text-3xl">
      {children}
    </button>
  );
}
