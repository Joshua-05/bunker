import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute.tsx";
import Menu from "./components/menu/menu.tsx";
import AuthRoot from "./components/auth/index.tsx";


// shift alt f
export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path="menu" element={<Menu />} />
					</Route>
					<Route path="login" element={<AuthRoot />} />
					<Route path="registr" element={<AuthRoot />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
