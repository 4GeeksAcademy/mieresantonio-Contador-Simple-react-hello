import React from "react";
import PropTypes from "prop-types";

const SecondsCounter = ({ seconds }) => {
	return (
		<div className="d-flex align-items-center justify-content-center gap-3 p-4">
			<i className="fa-solid fa-clock fa-3x text-primary"></i>
			<span className="display-3 fw-bold">{seconds}</span>
		</div>
	);
};

SecondsCounter.propTypes = {
	seconds: PropTypes.number.isRequired,
};

export default SecondsCounter;