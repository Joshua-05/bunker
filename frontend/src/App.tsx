import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute.tsx";
import Menu from "./components/menu/menu.tsx";
import AuthRoot from "./components/auth/index.tsx";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import LobbiPage from "./components/lobbi/index.tsx";

// shift alt f
export default function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route element={<PrivateRoute />}>
							<Route path="menu" element={<Menu />} />
						</Route>
						<Route path="login" element={<AuthRoot />} />
						<Route path="registr" element={<AuthRoot />} />
						<Route path="lobbi" element={<LobbiPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}
