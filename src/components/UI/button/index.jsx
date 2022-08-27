const Button = ({ children, className, onClick }) => {
  return (
    <button className={`btnPrimarty ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
