import React, { useState, useEffect } from "react";
import SecondsCounter from "./SecondsCounter.jsx";

const Home = () => {
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(true);
	const [mode, setMode] = useState("up"); 

	// Inputs del usuario
	const [countdownInput, setCountdownInput] = useState(10);
	const [alertInput, setAlertInput] = useState("");

	// Alerta
	const [alertTarget, setAlertTarget] = useState(null);
	const [alertFired, setAlertFired] = useState(false);

	
	useEffect(() => {
		if (!isRunning) return;

		const intervalId = setInterval(() => {
			setSeconds((prev) => {
				if (mode === "down") {
					if (prev <= 1) {
						setIsRunning(false); // se detiene solo al llegar a 0
						return 0;
					}
					return prev - 1;
				}
				return prev + 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [isRunning, mode]);

	// Revisa la alerta cada vez que cambian los segundos
	useEffect(() => {
		if (alertTarget !== null && !alertFired && seconds === alertTarget) {
			alert(`¡Se alcanzó el tiempo de ${alertTarget} segundos!`);
			setAlertFired(true);
		}
	}, [seconds, alertTarget, alertFired]);

	const handleStop = () => setIsRunning(false);
	const handleResume = () => setIsRunning(true);

	const handleRestart = () => {
		setSeconds(mode === "down" ? countdownInput : 0);
		setAlertFired(false);
		setIsRunning(true);
	};

	const handleStartCountUp = () => {
		setMode("up");
		setSeconds(0);
		setAlertFired(false);
		setIsRunning(true);
	};

	const handleStartCountdown = () => {
		if (countdownInput <= 0) return;
		setMode("down");
		setSeconds(countdownInput);
		setAlertFired(false);
		setIsRunning(true);
	};

	const handleSetAlert = () => {
		const value = Number(alertInput);
		if (!Number.isNaN(value) && value >= 0) {
			setAlertTarget(value);
			setAlertFired(false);
		}
	};

	return (
		<div
			className="container text-center d-flex flex-column justify-content-center align-items-center gap-4"
			style={{ minHeight: "80vh" }}
		>
			<h1>Seconds Counter</h1>

			<SecondsCounter seconds={seconds} />

			<div className="d-flex gap-2 flex-wrap justify-content-center">
				<button className="btn btn-warning" onClick={handleStop} disabled={!isRunning}>
					Detener
				</button>
				<button className="btn btn-success" onClick={handleResume} disabled={isRunning}>
					Resumir
				</button>
				<button className="btn btn-secondary" onClick={handleRestart}>
					Reiniciar
				</button>
			</div>

			<div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
				<input
					type="number"
					className="form-control"
					style={{ width: "120px" }}
					value={countdownInput}
					min="1"
					onChange={(e) => setCountdownInput(Number(e.target.value))}
				/>
				<button className="btn btn-primary" onClick={handleStartCountdown}>
					Iniciar cuenta regresiva
				</button>
				<button className="btn btn-outline-primary" onClick={handleStartCountUp}>
					Volver a cuenta normal
				</button>
			</div>

			<div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
				<input
					type="number"
					className="form-control"
					style={{ width: "160px" }}
					placeholder="Segundos para alerta"
					value={alertInput}
					min="0"
					onChange={(e) => setAlertInput(e.target.value)}
				/>
				<button className="btn btn-info" onClick={handleSetAlert}>
					Avisarme en ese segundo
				</button>
			</div>

			<p className="text-center mb-0">
				Hecho por <a href="https://github.com/mieresantonio">Antonio Mieres</a>, con amor!
			</p>
		</div>
	);
};

export default Home;