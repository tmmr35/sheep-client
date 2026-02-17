import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [price, setPrice] = useState<string>("버튼을 눌러 시세를 확인하세요");

	const handleButtonClick = async () => {
		setCount((count) => count + 1); // 기존 카운트 기능 유지

		try {
			// [주의] 프록시 에러를 피하기 위해 전체 주소를 직접 입력합니다.
			const response = await axios.get(
				"/api/v1/stock/price?ticker=005930"
			);
			console.log(response.data);
			setPrice(
				`삼성전자 현재가: ${Number(
					response.data.stck_prpr
				).toLocaleString()}원`
			);
		} catch (error) {
			console.error("에러 발생:", error);
			setPrice("시세를 불러오지 못했습니다. (백엔드를 확인하세요)");
		}
	};

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={handleButtonClick}>count is {count}</button>
				<p
					style={{
						fontWeight: "bold",
						fontSize: "1.2rem",
						color: "#646cff",
					}}
				>
					{price}
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
