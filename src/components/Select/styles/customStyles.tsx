const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "17.5rem",
    maxWidth: "23.875rem",
    height: "3.125rem",
    padding: window.innerWidth < 1680 ? "0 1.56rem" : "0 1.56rem",
    fontSize: "0.875rem",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "0.93rem",
    boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fafafa",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 5,
    width: '24rem',
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 5,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2c2c2c" : "#fff",
    padding: "0.3rem 1rem",
    height: "2.125rem",
    fontSize: "1rem",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      color: "#333",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "0.93rem",
    padding: "0 0.31rem",
    backgroundColor: "#2c2c2c",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      borderRadius: "0.93rem",
      backgroundColor: "#2c2c2c",
      color: "#fff",
    },
  }),
};

export default customStyles;
