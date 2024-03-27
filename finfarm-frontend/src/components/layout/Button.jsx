import PropTypes from 'prop-types';
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Button({ children }) {
  return (
    <button className="btn btn-sm min-w-16 rounded-full bg-lime-500 font-hopang text-white hover:bg-lime-800">
      {children}
    </button>
  );
}
