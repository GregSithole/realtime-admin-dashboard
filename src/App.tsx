import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authProvider, dataProvider, liveProvider } from "./providers";

import { Home, ForgotPassword, Login, Register } from "./pages";

function App() {
	return (
		<BrowserRouter>
			<GitHubBanner />
			<RefineKbarProvider>
				<AntdApp>
					<DevtoolsProvider>
						<Refine
							dataProvider={dataProvider}
							liveProvider={liveProvider}
							notificationProvider={useNotificationProvider}
							routerProvider={routerBindings}
							authProvider={authProvider}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								useNewQueryKeys: true,
								liveMode: "auto",
							}}
						>
							<Routes>
								<Route index element={<WelcomePage />} />
								<Route index element={<Home />} />
								<Route path="/register" index element={<Register />} />
								<Route path="/login" index element={<Login />} />
								<Route path="/forgot-password" index element={<ForgotPassword />} />

							</Routes>
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
						</Refine>
						<DevtoolsPanel />
					</DevtoolsProvider>
				</AntdApp>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
