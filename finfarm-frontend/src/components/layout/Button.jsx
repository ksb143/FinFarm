import PropTypes from 'prop-types';
Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Button({ children }) {
  return (
    <button className="btn-sm btn bg-lime-500 hover:bg-lime-800 text-white rounded-full font-hopang">
      {children}
    </button>
  );
}
