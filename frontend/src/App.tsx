import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoot from "./pages/auth/index.tsx";
import LobbiPage from "./pages/lobbi/index.tsx";
import MenuPage from "./pages/menu/index.tsx";
import RulesPage from "./pages/rules/index.tsx";
import CreateLobbiPage from "./pages/lobbi/create.tsx";
import PrivateRoute from "./utils/router/privateRoute.tsx";
import { ColorModeContext, useMode } from "./theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutComponent from "./components/layout/index.tsx";

// shift alt f
export default function App() {
	const [theme, colorMode] = useMode();
	return (
		<>
				<BrowserRouter>
					<ColorModeContext.Provider value={colorMode}>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<LayoutComponent>
								<Routes>
									<Route path="login" element={<AuthRoot />} />
									<Route path="registr" element={<AuthRoot />} />
									<Route path="/" element={<MenuPage />} />
									<Route path="rules" element={<RulesPage />} />
									<Route element={<PrivateRoute />}>
										<Route path="lobbi" element={<LobbiPage />} />
										<Route path="lobbi-create" element={<CreateLobbiPage />} />
										
									</Route>
								</Routes>
							</LayoutComponent>
						</ThemeProvider>
					</ColorModeContext.Provider>
				</BrowserRouter>
		</>
	);
}
