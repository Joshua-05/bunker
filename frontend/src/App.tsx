import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoot from "./components/auth/index.tsx";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import LobbiPage from "./components/lobbi/index.tsx";
import MenuPage from "./components/menu/index.tsx";
import RulesPage from "./components/rules/index.tsx";
import CreateLobbiPage from "./components/lobbi/create.tsx";
import PrivateRoute from "./utils/router/privateRoute.tsx";
import { ColorModeContext, useMode } from "./theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";


// shift alt f
export default function App() {
	const [theme, colorMode] = useMode()
	return (
		<>
			<Provider store={store}>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme = {theme}>
						<CssBaseline />
						<BrowserRouter>
							<Routes>
								<Route path="login" element={<AuthRoot />} />
								<Route path="registr" element={<AuthRoot />} />
								<Route element={<PrivateRoute />}>												
									<Route path="menu" element={<MenuPage />} />
									<Route path="lobbi" element={<LobbiPage />} />
									<Route path="lobbi-create" element={<CreateLobbiPage />} />
									<Route path="rules" element={<RulesPage />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</Provider>
		</>
	);
}
