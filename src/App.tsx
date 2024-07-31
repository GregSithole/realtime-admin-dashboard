import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, { CatchAllNavigate, DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, dataProvider, liveProvider } from "./providers";

import { Home, ForgotPassword, Login, Register } from "./pages";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import CompanyList from "./pages/company/list";
import CompanyCreate from "./pages/company/create";
import CompanyEdit from "./pages/company/edit";
import TaskList from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<AntdApp>
					<DevtoolsProvider>
						<Refine
							dataProvider={dataProvider}
							liveProvider={liveProvider}
							notificationProvider={useNotificationProvider}
							routerProvider={routerBindings}
							authProvider={authProvider}
							resources={resources}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								useNewQueryKeys: true,
								liveMode: "auto",
							}}
						>
							<Routes>
								<Route path="/register" index element={<Register />} />
								<Route path="/login" index element={<Login />} />
								<Route path="/forgot-password" index element={<ForgotPassword />} />
								<Route element={
									<Authenticated key="authenticated-layout" fallback={<CatchAllNavigate to="/login" />}>
										<Layout>
											<Outlet />
										</Layout>
									</Authenticated>}>
									<Route index element={<Home />} />
									<Route path="/companies">
										<Route index element={<CompanyList />} />
										<Route path="new" element={<CompanyCreate />} />
										<Route path="edit/:id" element={<CompanyEdit />} />
									</Route>
									<Route path="/tasks" element={<TaskList><Outlet /></TaskList>}>
										<Route path="new" element={<CreateTask />} />
										<Route path="edit/:id" element={<EditTask />} />
									</Route>
								</Route>
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
