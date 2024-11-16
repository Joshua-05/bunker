import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AuthRoot from "./pages/auth/index.tsx";
import LobbiListPage from "./pages/lobbiList/index.tsx";
import MenuPage from "./pages/menu/index.tsx";
import RulesPage from "./pages/rules/index.tsx";
import CreateLobbiPage from "./pages/lobbiList/create.tsx";
import PrivateRoute from "./utils/router/privateRoute.tsx";
import { ColorModeContext, useMode } from "./theme/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutComponent from "./components/layout/index.tsx";
import LobbyRoomPage from "./pages/lobbyRoom/index.tsx";
import { Footer, Header } from "./components/wrap/wrap.tsx";
import GamePage from "./pages/game/index.tsx";


// shift alt f
export default function App() {
	const [theme, colorMode] = useMode();
	return (
		<>
				<BrowserRouter>
					{/* <ColorModeContext.Provider value={colorMode}> */}
						{/* <ThemeProvider theme={theme}> */}
							{/* <CssBaseline /> */}
							{/* <LayoutComponent> */}
								<RoutesWrapper/>
							{/* </LayoutComponent> */}
						{/* </ThemeProvider> */}
					{/* </ColorModeContext.Provider> */}
				</BrowserRouter>
		</>
	);
}


const RoutesWrapper = () => {
	const location = useLocation(); 
	const hideHeaderAndFooter = location.pathname === '/game';
	return (
		<>
			{!hideHeaderAndFooter && <Header />}
			<Routes>
				<Route path="login" element={<AuthRoot />} />
				<Route path="registr" element={<AuthRoot />} />
				<Route path="/" element={<MenuPage />} />
				<Route path="rules" element={<RulesPage />} />
				<Route element={<PrivateRoute />}>
					<Route path="lobby" element={<LobbiListPage />} />
					<Route path="lobby-create" element={<CreateLobbiPage />} />
					<Route path="lobby-room/:lobbyId" element={<LobbyRoomPage />} />
					<Route path="game" element={<GamePage />} />
				</Route>
			</Routes>
			{!hideHeaderAndFooter && <Footer />}
		</>
	);
};
